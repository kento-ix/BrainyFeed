import db from "../database/db.js";

export const upsertPaper = (paperId, title, authors, year, sourceUrl, abstract, isReview) => {
    return db.prepare(`
        INSERT OR IGNORE INTO Papers 
        (PaperID, Title, Authors, Year, SourceURL, Abstract, IsReview)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(paperId, title, authors, year, sourceUrl, abstract, isReview ? 1 : 0);
};

export const savePaperForUser = (email, paperId) => {
    return db.prepare(`
        INSERT OR IGNORE INTO SavedPapers
        (Email, PaperID)
        VALUES (?, ?)
    `).run(email, paperId);
};

export const getSavedPapersByEmail = (email) => {
    return db.prepare(`
        SELECT p.*, sp.SavedAt
        FROM SavedPapers sp
        JOIN Papers p ON sp.PaperID = p.PaperID
        WHERE sp.Email = ?
    `).all(email);
};
