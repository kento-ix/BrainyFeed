import express from "express";
import { searchReviewPapers, savePaper, getSavedPapers } from "../controllers/paperController.js";
import { sanitizeSearchQuery, savePaperValidator, sanitizeEmailQuery } from "../middleware/papers.js";

const router = express.Router();

router.get('/search', [sanitizeSearchQuery], searchReviewPapers);
router.post('/save', [savePaperValidator], savePaper);
router.get('/saved', [sanitizeEmailQuery], getSavedPapers);

export default router;
