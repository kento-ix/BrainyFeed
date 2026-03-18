export const sanitizeSearchQuery = (req, res, next) => {
    const { topic } = req.query;

    if (topic) {
        req.query.topic = topic.trim().replace(/\s+/g, '+');
    }

    next();
};

export const validateSaveBody = (req, res, next) => {
    const { email, paperId, title } = req.body;

    if (!email || !paperId || !title) {
        return res.status(400).json({ error: "email, paperId, and title are required" });
    }

    next();
};

export const sanitizeEmailQuery = (req, res, next) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "email query parameter is required" });
    }

    req.query.email = email.trim();

    next();
};
