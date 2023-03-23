const SaleModel = require('../sales/sale_model');
const BaseService = require('../../base/base_service');
const CampaignIntegration = require('../../../../providers/campaigns/campaigns_integration');
const MyCashIntegration = require('../../../../providers/mycash/mycash_integrations');
const Authentication = require('../../../../providers/authentication/authentication_integrations');

const XLSX = require('xlsx');

class ReportService extends BaseService {
    constructor() {
        super();
        this._saleModel = SaleModel;
        this._campaignIntegration = new CampaignIntegration();
        this._myCashIntegration = new MyCashIntegration();
        this._authenticationIntegration = new Authentication();
    }

    async _getBalance(cpf) {
        const [balanceAgg] = await this._saleModel.aggregate([
            {
                $match: {
                    cpf: cpf,
                    status: 'AVAILABLE'
                }
            },
            {
                $group: {
                    _id: '$cpf',
                    balance: {
                        $sum: '$availableCashback'
                    }
                }
            }
        ]);
        return balanceAgg;
    }

    _updateHours(numOfHours, date = new Date()) {
        const dateCopy = new Date(date.getTime());

        dateCopy.setHours(dateCopy.getHours() - numOfHours);

        return dateCopy;
    }

    /**
     * A função reports é responsável por gerar relatórios de vendas de acordo com os parâmetros informados.
     * Esses parâmetros podem incluir datas de início e fim, campanhas de marketing específicas, tipo de relatório (em formato de arquivo Excel ou JSON), entre outros.
     * Dentro da função, há uma série de validações e processamentos de dados para garantir que o relatório gerado esteja correto e completo. Isso inclui buscar todas as vendas que correspondam aos parâmetros informados, processá-las para calcular o valor do cashback, agrupá-las por data ou por campanha, e, por fim, gerar o relatório no formato desejado.
     * O relatório gerado pode conter informações como a data da venda, o valor total da venda, o valor do cashback, o nome da campanha de marketing associada, o status da campanha, entre outras informações relevantes.
     */

    async reports({ status, usedCampaign, startDate, endDate }) {
        const query = {};
        const now = new Date();
        const timezoneOffset = now.getTimezoneOffset() / 60;

        if (status) query.status = { $in: status };
        if (usedCampaign) query.usedCampaign = { $in: usedCampaign };
        if (startDate && endDate) {
            query.saleDate = {
                $gte: this._updateHours(timezoneOffset, new Date(startDate)),
                $lte: this._updateHours(timezoneOffset, new Date(endDate))
            };
        } else if (startDate) {
            query.saleDate = { $gte: this._updateHours(timezoneOffset, new Date(startDate)) };
        } else if (endDate) {
            query.saleDate = { $lte: this._updateHours(timezoneOffset, new Date(endDate)) };
        }

        const sales = await this._saleModel.find(query).lean();

        if (sales.length === 0) throw new Error('SALE_NOT_FOUND');

        const result = [];

        sales.forEach((sale) => {
            sale.items.forEach((item) => {
                if (sale.order) {
                    const row = {
                        order: sale.order.number,
                        cpf: sale.cpf,
                        email: sale.customer.email,
                        name: sale.customer.name,
                        phone: sale.customer.phone,
                        totalPrice: sale.items.reduce((prev, cur) => (prev += cur.totalPrice), 0),
                        partnumber: item.partnumber,
                        productValue: item.unitPrice,
                        productCashBack: item.unitCashback,
                        productQuantity: item.quantity,
                        productTotalValue: item.totalPrice,
                        productTotalCashBack: item.totalCashback,
                        productName: item.description,
                        status: sale.status,
                        usedCampaign: sale.usedCampaign,
                        totalCashback: sale.totalCashback,
                        saleDate: sale.saleDate,
                        expirateDate: sale.expirateDate
                    };

                    result.push(row);
                }
            });
        });

        return await this._converterXLSXReport(result);
    }

    async reportsUser(authorizationToken) {
        const users = await this._authenticationIntegration.getAuthAllUsers(authorizationToken);
        if (!users) throw new Error('USER_NOT_FOUND');

        const result = users.map((user) => ({
            name: user.name,
            email: user.email,
            phone: user.phone,
            jobPosition: user.jobPosition,
            department: user.department,
            status: user.status,
            role: user.role
        }));

        return await this._converterXLSXReport(result);
    }

    async reportUserMyCash(authorizationToken) {
        const userMyCash = await this._myCashIntegration.getAllUsers(authorizationToken);
        if (!userMyCash) throw new Error('USER_NOT_FOUND');

        const resultMyCash = await Promise.all(
            userMyCash.map(async (user) => {
                const balanceAgg = await this._getBalance(user.cpf);

                const row = {
                    name: user.name,
                    balance: (balanceAgg && balanceAgg.balance) || 0,
                    email: user.email,
                    gender: user.gender,
                    cpf: user.cpf,
                    dateOfBirthday: user.dateOfBirthday,
                    acceptedNewsletter: user.acceptedNewsletter,
                    acceptedTerms: user.acceptedTerms,
                    dateDeletion: user.dateDeletion
                };

                return row;
            })
        );

        return await this._converterXLSXReport(resultMyCash);
    }

    async _converterXLSXReport(json) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(json);

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        const xlsx = XLSX.write(wb, { type: 'base64' });

        return Buffer.from(xlsx, 'base64');
    }
}

module.exports = ReportService;
