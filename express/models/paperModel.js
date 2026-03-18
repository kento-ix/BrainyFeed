import db from "../database/db.js";


//get all review paper
export const getReviewPapers = (limit = 10, offset = 0) => {
    return db.prepare(
        `SELECT * FROM Papers
        WHERE IsReview = 1
        ORDER BY Year DESC
        LIMIT ? OFFSET ?
    `).all(limit, offset);
}

export const getReviewPapersByCategory = (categoryName) => {
    return db.prepare(`
        SELECT p.* FROM Papers p
        JOIN Categories c ON p.CategoryID = c.CategoryID
        WHERE p.IsReview = 1 AND c.Name = ?
        ORDER BY p.Year DESC
    `).all(categoryName);
};

export const getRelatedPapers = (reviewId) => {
    return db.prepare(`
        SELECT p.* FROM Papers p
        JOIN PaperRelations pr ON p.PaperID = pr.PaperID
        WHERE pr.ReviewID = ?
    `).all(reviewId);
};