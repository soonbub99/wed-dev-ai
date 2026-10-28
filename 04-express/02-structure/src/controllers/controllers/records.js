import * as recordService from "../services/records.js";

export const getRecords = async (req, res) => {
  const rows = await recordService.findRecords(req.query.plate);
  res.status(200).json(rows);
};

export const getRecord = async (req, res) => {
  const result = await recordService.findRecordById(Number(req.params.id));
  res.status(200).json(result);
};
