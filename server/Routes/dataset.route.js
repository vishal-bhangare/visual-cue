import express from "express";
const datasetRoute = express.Router();
import Dataset from "../Models/Dataset.js";

// for fetching all records
// @queryParams columns to retrive and filter
// @return JSON Object of records
datasetRoute.route("/dataset").get((req, res) => {
  const queryParams = req.query;
  var filters = { _id: 0 };

  for (const [key, value] of Object.entries(queryParams)) {
    if (key.startsWith("col")) filters[value] = 1;
  }

  var queries = {};
  for (const [key, value] of Object.entries(queryParams)) {
    if (!key.startsWith("col")) queries = { ...queries, [key]: value };
  }

  Dataset.find(queries, filters).then((data) => {
    return res.status(200).json({ records: data });
  });
});

// for fetching columns data
// @queryParams distinctValues type of boolean
// @return columns data
datasetRoute.route("/dataset/columns").get(async (req, res) => {
  Dataset.findOne().then(async (data) => {
    const columns = Object.keys(data.toObject()).filter(
      (col) => !["_id", "__v", "url"].includes(col)
    );
    const filters = [
      "country",
      "region",
      "topic",
      "sector",
      "pestle",
      "source",
    ];
    if (req.query.distinctValues) {
      var distinctValues = new Array();
      for (var i = 0; i < filters.length; i++) {
        const values = await Dataset.distinct(filters[i]);
        distinctValues.push({ columnName: filters[i], values: values });
      }
      res.json({ columns: columns, distinctValues: distinctValues });
    } else res.json({ columns: columns });
  });
});

// for fetching records by page
// @queryParams pageNumber, limit(records per page), sortBy(column name), sorting order(desc,default asc)
// @return Object consist of records and and other fields
datasetRoute.route("/dataset/:page").get(async (req, res) => {
  const page = req.params.page;
  const queryParams = req.query;
  const limit = queryParams.limit || 10;
  const sortBy = queryParams.sortBy || null;
  const sortOrder = queryParams.sortOrder == "desc" ? -1 : 1;
  const count = await Dataset.countDocuments();

  const filters = Object.keys(queryParams)
    .filter((key) => !["sortBy", "sortOrder"].includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: queryParams[key],
      };
    }, {});

  const matchF = Object.keys(filters).map((key) => ({ [key]: filters[key] }));
  const totalPages = Math.ceil(count / limit);
  const query = matchF.length ? { $and: matchF } : {};

  Dataset.find(
    query,
    {},
    { skip: limit * page, limit: limit, sort: { [sortBy]: sortOrder } }
  ).then((data) => {
    res.status(200).json({
      records: data,
      totalPages: totalPages,
      hasMore: page + 1 < totalPages,
    });
  });
});

export default datasetRoute;
