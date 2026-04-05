import db from "../database/db.js";

export const upsertPaper = (paperId, title, authors, year, sourceUrl, abstract, isReview) => {
    return db.prepare(`
        INSERT OR IGNORE INTO Papers 
        (PaperID, Title, Authors, Year, SourceURL, Abstract, IsReview)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(paperId, title, authors, year, sourceUrl, abstract, isReview ? 1 : 0);
};

export const savePaper = (email, paperId) => {
    return db.prepare(`
        INSERT OR IGNORE INTO SavedPapers
        (Email, PaperID)
        VALUES (?, ?)
    `).run(email, paperId);
};

export const getSavedPapersByEmail = (email, limit, offset) => {
    return db.prepare(`
        SELECT Papers.*, SavedPapers.SavedAt
        FROM SavedPapers
        JOIN Papers ON SavedPapers.PaperID = Papers.PaperID
        WHERE SavedPapers.Email = ?
        LIMIT ? OFFSET ?
    `).all(email, limit, offset);
};
