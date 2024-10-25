import { joyasModel } from "../models/joyasModel.js";

const read = async (req, res) => {
  try {
    const joyas = await joyasModel.findAll(req.query);
    return res.json(joyas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const readById = async (req, res) => {
  const id = req.params.id;
  console.log("read -->", id);
  try {
    const joya = await joyasModel.findByID(id);
    if (!joya) {
      res.status(404).json({ message: "Joya not found" });
    }
    res.json(joya);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const readByOrder = async (req, res) => {
  try {
    const joyas = await joyasModel.findByOrder(req.query);
    return res.json(joyas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const readByFilter = async (req, res) => {
  try {
    const [filters, values] = joyasModel.prepareFilter(req.query);
    const joyas = await joyasModel.findJoyasByFilter(filters, values);
    if (!joyas) {
      res.status(404).json({ message: "Joya not found" });
    }
    res.json(joyas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const readByPagination = async (req, res) => {
  try {
    const joyas = await joyasModel.findByPagination(req.query);
    return res.json(joyas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const joyaController = {
  read,
  readById,
  readByFilter,
  readByOrder,
  readByPagination,
};
