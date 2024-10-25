import { Router } from "express";
import { joyaController } from "../controller/joyasController.js";

const router = Router();

// GET joyas
router.get("/joyas", joyaController.read);

// GET by Id
router.get("/joya/:id", joyaController.readById);

// GET by Order
router.get("/joyas/orden", joyaController.readByOrder);

// GET by Filter
router.get("/joyas/filtro", joyaController.readByFilter);

// GET by paginacion
router.get("/joyas/paginacion", joyaController.readByPagination);

export default router;
