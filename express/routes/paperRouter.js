import express from "express";
import { getRecentReviews, searchReviewPapers } from "../controllers/paperController.js";
import { sanitizeSearchQuery } from "../middleware/sanitizeQuery.js";

const router = express.Router();

router.get('/search', sanitizeSearchQuery, searchReviewPapers);
router.get("/reviews", getRecentReviews);

export default router;