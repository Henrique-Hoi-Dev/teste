"use strict";

const { MongoClient } = require("mongodb");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const XLSX = require("xlsx");
const archiver = require("archiver");
const streamBuffers = require("stream-buffers");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Sao_Paulo");

let client = new MongoClient(
  "mongodb+srv://root-ilia:Tv1wHfYpIHtmGm1g@cluster0.rh37m.mongodb.net/asdc-ms-sales?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    loggerLevel: "debug",
  }
).on("error", (err) => console.log("MongoClient ERROR:", err));

const clientPromise = client
  .connect()
  .catch((err) => console.log("connect ERROR:", err));
const updateHours = (numOfHours, date = new Date()) => {
  const dateCopy = new Date(date.getTime());

  dateCopy.setHours(dateCopy.getHours() - numOfHours);

  return dateCopy;
};
const converterXLSXReport = (json) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(json);

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const xlsx = XLSX.write(wb, { type: "buffer" }); // use 'buffer' instead of 'base64'

  return xlsx;
};
const getSalesCollection = async () => {
  client = await clientPromise;

  return client.db(process.env.DB_NAME).collection("sales");
};
const getSales = async (query, getSalesCollection) => {
  const sales = await getSalesCollection.find(query).toArray();

  return sales;
};
const run = async ({ status, usedCampaign, startDate, endDate }) => {
  const query = {};
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() / 60;

  if (status) query.status = { $in: status };
  if (usedCampaign) query.usedCampaign = { $in: usedCampaign };
  if (startDate && endDate) {
    query.saleDate = {
      $gte: updateHours(timezoneOffset, new Date(startDate)),
      $lte: updateHours(timezoneOffset, new Date(endDate)),
    };
  } else if (startDate) {
    query.saleDate = { $gte: updateHours(timezoneOffset, new Date(startDate)) };
  } else if (endDate) {
    query.saleDate = { $lte: updateHours(timezoneOffset, new Date(endDate)) };
  }
  const salesCollection = await getSalesCollection();
  const sales = await getSales(query, salesCollection);

  if (sales.length === 0) throw new Error("SALE_NOT_FOUND");
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
          totalPrice: sale.items.reduce(
            (prev, cur) => (prev += cur.totalPrice),
            0
          ),
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
          expirateDate: sale.expirateDate,
          userInMycash: sale.userInMycash,
          salesChannel: sale.salesChannel,
        };
        result.push(row);
      }
    });
  });

  console.log(
    JSON.stringify({ time: now, statusCode: 200, body: "report success" })
  );

  const buffer = converterXLSXReport(result);

  // Create a new writable stream
  const writableStreamBuffer = new streamBuffers.WritableStreamBuffer();

  // Create a new archiver
  const archive = archiver("zip");

  archive.on("error", function (err) {
    throw err;
  });

  // Pipe archive data to the file
  archive.pipe(writableStreamBuffer);

  archive.append(buffer, { name: "report.xlsx" });
  await archive.finalize();

  const zipBuffer = writableStreamBuffer.getContents();

  console.log(
    JSON.stringify({ time: now, statusCode: 200, body: "report success" })
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "inline; filename=report.zip",
    },
    body: zipBuffer.toString("base64"),
    isBase64Encoded: true,
  };
};

module.exports = {
  run,
  clientPromise,
};
