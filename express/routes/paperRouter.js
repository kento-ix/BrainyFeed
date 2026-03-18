import express from "express";
import { searchReviewPapers, savePaper, getSavedPapers } from "../controllers/paperController.js";
import { sanitizeSearchQuery, validateSaveBody, sanitizeEmailQuery } from "../middleware/sanitizeQuery.js";

const router = express.Router();

router.get('/search', sanitizeSearchQuery, searchReviewPapers);
router.post('/save', validateSaveBody, savePaper);
router.get('/saved', sanitizeEmailQuery, getSavedPapers);

export default router;
