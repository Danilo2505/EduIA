import { Router } from "express";
import { ContentController } from "../controllers/ContentController";
import { requireAuth } from "../middlewares/auth";

export const contentRoutes = Router();
contentRoutes.use(requireAuth);
contentRoutes.get("/", ContentController.list);
contentRoutes.get("/:id", ContentController.getOne);
contentRoutes.post("/", ContentController.create);
contentRoutes.put("/:id", ContentController.update);
contentRoutes.delete("/:id", ContentController.remove);
contentRoutes.post("/generate", ContentController.generate);
