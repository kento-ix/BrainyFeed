import express from "express";
import { searchReviewPapers, savePaper, getSavedPapers, deletesavedPaper } from "../controllers/paperController.js";
import { sanitizeSearchQuery, savePaperValidator, sanitizeEmailQuery, deleteSavedPaperValidator } from "../middleware/papers.js";

const router = express.Router();

router.get('/search', [sanitizeSearchQuery], searchReviewPapers);
router.post('/save', [savePaperValidator], savePaper);
router.get('/saved', [sanitizeEmailQuery], getSavedPapers);
router.delete('/saved', [deleteSavedPaperValidator], deletesavedPaper);

export default router;
