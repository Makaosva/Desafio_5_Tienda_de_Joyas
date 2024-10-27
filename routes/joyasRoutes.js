import { Router } from "express";
import { joyaController } from "../controller/joyasController.js";

const router = Router();

// GET joyas
router.get("/", joyaController.read);

// GET by Id
router.get("/joya/:id", joyaController.readById);

// GET by Filter
router.get("/filtros", joyaController.readByFilter);


export default router;
