import express from "express";
import {
  fetchSpecificSubmissions,
  submitForm,
} from "../controllers/formController.js";

const router = express.Router();

router.post("/submit", submitForm);
router.get("/submit", fetchSpecificSubmissions);

export default router;
