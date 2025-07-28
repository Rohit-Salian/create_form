import express from "express";
import {
  fetchSpecificSubmissions,
  submitForm,
} from "../controllers/formController.js";

const router = express.Router();

router.post("/submit", submitForm);
router.get("/submit/:formId", fetchSpecificSubmissions);

export default router;
