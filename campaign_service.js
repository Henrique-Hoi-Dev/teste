const CampaignModel = require('./campaign_model');
const BaseService = require('../../base/base_service');
const validation = require('./campaign_validation');
const validator = require('../../../../utils/validator');
const FilesProvider = require('../../../../providers/files');
const { Readable } = require('stream');
const _ = require('lodash');

class CampaignService extends BaseService {
    constructor() {
        super();
        this.model = CampaignModel;
        this.filesProvider = new FilesProvider();
    }

    async summary() {
        const summaryData = await this.model.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);
        const summary = { READY: 0, PENDENT: 0, INACTIVE: 0, ACTIVE: 0, EXPIRED: 0 };

        summaryData.forEach((element) => {
            summary[element._id] = element.count;
        });

        return summary;
    }

    createQuery(queryData) {
        const { search, status, startDate, endDate, createdBy, integrated, betweenDate, inactiveDate } = queryData;
        const query = {};
        if (startDate && endDate) {
            query.startDate = { $gte: startDate, $lte: endDate };
        } else if (startDate) {
            query.startDate = { $gte: startDate };
        } else if (endDate) {
            query.startDate = { $lte: endDate };
        }
        if (betweenDate) {
            query.endDate = { $gte: betweenDate };
            query.startDate = { $lte: betweenDate };
        }

        if (inactiveDate) {
            query.inactiveDate = { $exists: true, $gte: inactiveDate };
        }

        if (search) {
            query.$or = [
                { createdByName: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } }
            ];
        }
        if (status) query.status = status;
        if (createdBy) query.createdBy = createdBy;
        if (_.isBoolean(integrated)) query.integrated = integrated;

        return query;
    }

    updateHours(numOfHours, date = new Date()) {
        const dateCopy = new Date(date.getTime());

        dateCopy.setHours(dateCopy.getHours() - numOfHours);

        return dateCopy;
    }

    updateCreatedAt(data) {
        return data.map((d) => {
            if (d.createdAt) {
                d.createdAt = this.updateHours(d.createdAt.getTimezoneOffset() / 60, d.createdAt);
            }
            return d;
        });
    }

    async erp(queryData) {
        const { page = 1, limit = 20 } = queryData;
        const query = this.createQuery(queryData);
        query.status = { $in: ['READY', 'ACTIVE', 'INACTIVE', 'EXPIRED'] };

        const options = {
            select: {
                legalDocs: 0,
                banner: 0,
                daysToRescue: 0,
                percentCashback: 0,
                valueCashback: 0,
                rulesDescription: 0,
                cashbackLimit: 0,
                __v: 0
            },
            sort: { startDate: 'desc' },
            page,
            limit
        };

        const data = await this.model.paginate(query, options);
        data.docs = this.updateCreatedAt(data.docs);
        return data;
    }

    async list(queryData) {
        const { page = 1, limit = 20 } = queryData;
        const query = this.createQuery(queryData);

        const options = {
            select: {
                name: 1,
                code: 1,
                createAt: 1,
                startDate: 1,
                endDate: 1,
                createdByName: 1,
                createdBy: 1,
                status: 1,
                createdAt: 1,
                url: 1
            },
            sort: { startDate: 'desc' },
            page,
            limit
        };

        const data = await this.model.paginate(query, options);
        data.docs = this.updateCreatedAt(data.docs);
        return data;
    }

    async get(queryData) {
        const { page = 1, limit = 20 } = queryData;
        const query = this.createQuery(queryData);
        const options = { select: { __v: 0 }, page, sort: { createdAt: 'desc' }, limit };

        const data = await this.model.paginate(query, options);
        data.docs = this.updateCreatedAt(data.docs);

        return data;
    }

    formatCode(code) {
        // code = _.kebabCase(code);
        // code = code.split("-").map(s => s.replace(/\W/gmi, "")).filter(s => !!s).join("-");
        code = _.kebabCase(code);
        code = _.kebabCase(
            code
                .split('-')
                .map((s) => s.replace(/\W/gim, ''))
                .join(' ')
        );

        return code;
    }

    handleMongoError(error) {
        const keys = Object.keys(error.errors);
        const err = new Error(error.errors[keys[0]].message);
        err.field = keys[0];
        err.status = 409;
        throw err;
    }

    async create(createData) {
        try {
            if (!createData.code && createData.name) createData.code = this.formatCode(createData.name);
            else if (createData.code) createData.code = this.formatCode(createData.code);
            if (createData.status === 'ACTIVE' && new Date(createData.startDate) > new Date())
                throw new Error('START_DATE_INVALID');
            if (createData.status === 'ACTIVE' && new Date(createData.endDate) < new Date())
                throw new Error('END_DATE_INVALID');

            if (createData.status === 'READY' || createData.status === 'ACTIVE') {
                createData.integrated = false;
            }

            if (createData.subsidiaries && createData.subsidiaries.length > 0) {
                createData.subsidiariesList = createData.subsidiaries.map((subsidiary) => subsidiary.code);
            } else {
                createData.subsidiariesList = createData.subsidiaries;
            }

            return await this.model.create(createData);
        } catch (error) {
            if (error.name === 'ValidationError' && !!error._message) this.handleMongoError(error);
            throw error;
        }
    }

    async customValidation(schema, data) {
        const result = await new Promise((resolve) => {
            validator(schema)(data, null, (v) => resolve(v));
        });
        if (result) throw result;
    }

    async getByCode(code) {
        const campaign = await this.model.findOne({ code });
        if (!campaign) throw new Error('CAMPAIGN_NOT_FOUND');
        return campaign;
    }

    async update(code, updateData) {
        try {
            console.log('update');
            console.log(JSON.stringify(updateData, null, 2));
            if (updateData.name) updateData.code = this.formatCode(updateData.name);
            else if (updateData.code) updateData.code = this.formatCode(updateData.code);

            let campaign = await this.model.findOne({ code }).select({ _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
            console.log('🚀 ~ file: campaign_service.js:218 ~ CampaignService ~ update ~ campaign:', campaign);

            console.log(
                '🚀 ~ file: campaign_service.js:211 ~ CampaignService ~ update ~ updateData:',
                updateData.rules,
                updateData.rulesDescription
            );

            // const verificarObjetosIguais = (array) => {
            //     for (let i = 0; i < array.length - 1; i++) {
            //         for (let j = i + 1; j < array.length; j++) {
            //             if (JSON.stringify(array[i]) === JSON.stringify(array[j])) {
            //                 return true; // objetos iguais encontrados
            //             }
            //         }
            //     }
            //     return false; // nenhum objeto igual encontrado
            // };
            console.log(
                '🚀 ~ file: campaign_service.js:231 ~ CampaignService ~ addObject ~ addObject:',
                verificarObjetosIguais(campaign.rulesDescription)
            );

            if (
                updateData.status &&
                updateData.status !== 'PENDENT' &&
                updateData.status !== 'EXPIRED' &&
                updateData.status !== campaign.status
            ) {
                if (
                    campaign.status === 'PENDENT' &&
                    (updateData.status === 'READY' || updateData.status === 'ACTIVE')
                ) {
                    updateData.integrated = false;
                } else if (
                    (campaign.status === 'READY' || campaign.status === 'ACTIVE') &&
                    campaign.integrated === true &&
                    updateData.status === 'INACTIVE'
                ) {
                    updateData.integrated = false;
                }
            }

            if (!campaign || (await this._blockToEditCampaign(campaign, updateData)))
                throw new Error('CAMPAIGN_NOT_FOUND');

            if (updateData.valueCashback) {
                delete updateData.percentCashback;
                updateData.$unset = { percentCashback: '' };
            }

            if (updateData.percentCashback) {
                delete updateData.valueCashback;
                updateData.$unset = { valueCashback: '' };
            }

            if (updateData.status === 'INACTIVE') {
                updateData.inactiveDate = this.updateHours(new Date().getTimezoneOffset() / 60, new Date());
            }

            if (updateData.subsidiaries && updateData.subsidiaries.length > 0) {
                updateData.subsidiariesList = updateData.subsidiaries.map((subsidiary) => subsidiary.code);
            } else if (updateData.subsidiariesList && updateData.subsidiariesList.length > 0) {
                createData.subsidiariesList = updateData.subsidiaries;
            }

            const verificarObjetosIguais = (array) => {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = i + 1; j < array.length; j++) {
                        if (JSON.stringify(array[i]) === JSON.stringify(array[j])) {
                            return this.model.findOneAndUpdate({ code }, updateData, { new: true });
                        }
                    }
                }
                return false; // nenhum objeto igual encontrado
            };

            // const result = await this.model.findOneAndUpdate({ code }, updateData, { new: true });
            const result = verificarObjetosIguais(campaign.rulesDescription);
            return result;
        } catch (error) {
            if (error.name === 'ValidationError' && !!error._message) this.handleMongoError(error);
            throw error;
        }
    }

    async updateUrl(code, url) {
        try {
            let campaign = await this.model.findOne({ code }).select({ _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
            if (!campaign) throw new Error('CAMPAIGN_NOT_FOUND');
            console.log('CAMPANHA', campaign, url);

            const result = await this.model.findOneAndUpdate({ code }, { url: url }, { new: true });
            return result;
        } catch (error) {
            if (error.name === 'ValidationError' && !!error._message) this.handleMongoError(error);
            throw error;
        }
    }

    async uploadDocuments(code, payload) {
        let data = [];
        const { files, body } = payload;

        let campaign = await this.model.findOne({ code }).select({ _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        if (!campaign || (await this._blockToEditCampaign(campaign, body))) throw new Error('CAMPAIGN_NOT_FOUND');

        for (const element of files) {
            _.set(element, 'file', this._bufferToStream(element.buffer));
            const uploadedFile = await this.filesProvider.upload(element, 'documents');

            let uploadedDoc = {
                name: uploadedFile.name,
                uuid: uploadedFile.uuid,
                documentCategory: 'documents',
                createdAt: new Date(),
                updatedAt: new Date()
            };

            data.push(uploadedDoc);
        }

        if (campaign.legalDocs && campaign.legalDocs.length > 0) {
            data = [...campaign.legalDocs, ...data];
        }

        return await this.model.findOneAndUpdate(
            { code },
            {
                $set: {
                    legalDocs: data
                }
            },
            { new: true }
        );
    }

    async deleteDocuments({ code, category, uuid }) {
        try {
            let data = [];
            let campaign = await this.model.findOne({ code }).select({ _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });

            await this.filesProvider.delete(category, uuid);

            if (campaign.legalDocs && campaign.legalDocs.length > 0) {
                for (const element of campaign.legalDocs) {
                    if (element.uuid !== uuid) {
                        data.push({ ...element });
                    }
                }
            }

            return await this.model.findOneAndUpdate(
                { code },
                {
                    $set: {
                        legalDocs: data
                    }
                },
                { new: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    _bufferToStream(binary) {
        const readableInstanceStream = new Readable({
            read() {
                this.push(binary);
                this.push(null);
            }
        });

        return readableInstanceStream;
    }

    async _blockToEditCampaign(campaign, updateData) {
        const keys = Object.keys(updateData);

        if (keys.length === 1 && keys.includes('integrated')) return false;

        campaign = campaign.toObject();

        if (updateData.valueCashback && !updateData.percentCashback) {
            delete campaign.percentCashback;
            delete updateData.percentCashback;
        }
        if (updateData.percentCashback && !updateData.valueCashback) {
            delete campaign.valueCashback;
            delete updateData.valueCashback;
        }

        if (campaign.legalDocs && campaign.legalDocs.length > 0)
            campaign.legalDocs.forEach((legalDoc) => {
                legalDoc.createdAt = legalDoc.createdAt.toISOString();
                legalDoc.updatedAt = legalDoc.updatedAt.toISOString();
            });

        if (campaign.startDate) campaign.startDate = campaign.startDate.toISOString();
        if (campaign.endDate) campaign.endDate = campaign.endDate.toISOString();

        console.log('_blockToEditCampaign');
        console.log(JSON.stringify(updateData, null, 2));
        console.log(JSON.stringify(campaign, null, 2));

        if (updateData.status === 'ACTIVE' && updateData.startDate && new Date(updateData.startDate) > new Date())
            throw new Error('START_DATE_INVALID');
        if (updateData.status === 'ACTIVE' && updateData.endDate && new Date(updateData.endDate) < new Date())
            throw new Error('END_DATE_INVALID');
        if (updateData.status === 'ACTIVE' && campaign.startDate && new Date(campaign.startDate) > new Date())
            throw new Error('START_DATE_INVALID');
        if (updateData.status === 'ACTIVE' && campaign.endDate && new Date(campaign.endDate) < new Date())
            throw new Error('END_DATE_INVALID');

        // if (updateData.status === 'READY' && updateData.endDate && new Date(updateData.endDate) < new Date())
        //     throw new Error('END_DATE_INVALID');
        // if (updateData.status === 'READY' && campaign.endDate && new Date(campaign.endDate) < new Date())
        //     throw new Error('END_DATE_INVALID');

        if (campaign.status === 'PENDENT') {
            if (updateData.status === 'EXPIRED') throw new Error('PENDENT_CAMPAIGN_UPDATE_ERROR');
            await this.customValidation(validation.create, { body: { ...campaign, ...updateData } });
        } else if (campaign.status === 'INACTIVE') throw new Error('INACTIVE_CAMPAIGN_UPDATE_ERROR');
        else if (campaign.status === 'EXPIRED') throw new Error('EXPIRED_CAMPAIGN_UPDATE_ERROR');
        else if (campaign.status === 'ACTIVE') {
            if (!['INACTIVE', 'EXPIRED'].includes(updateData.status)) throw new Error('ACTIVE_CAMPAIGN_UPDATE_ERROR');

            if (updateData.status && updateData.status === 'INACTIVE') {
                if (!keys.includes('status') || !keys.includes('reason'))
                    throw new Error('UPDATE_CAMPAIGN_TO_INACTIVE_ERROR');
            } else {
                if (keys.length > 1) throw new Error('ACTIVE_CAMPAIGN_UPDATE_ERROR');
            }
        }
        // else if (campaign.status === 'READY') {
        //     if (!['INACTIVE', 'ACTIVE'].includes(updateData.status)) throw new Error('READY_CAMPAIGN_UPDATE_ERROR');

        //     if (updateData.status && updateData.status === 'INACTIVE') {
        //         if (!keys.includes('status') || !keys.includes('reason'))
        //             throw new Error('UPDATE_CAMPAIGN_TO_INACTIVE_ERROR');
        //     } else {
        //         if (keys.length > 1 || (keys.length === 1 && !keys.includes('status')))
        //             throw new Error('READY_CAMPAIGN_UPDATE_ERROR');
        //     }
        // }

        return false;
    }
}

module.exports = CampaignService;
