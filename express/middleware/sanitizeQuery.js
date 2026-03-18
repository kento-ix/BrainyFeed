export const sanitizeSearchQuery = (req, res, next) => {
    const { topic } = req.query;

    if (topic) {
        req.query.topic = topic.trim().replace(/\s+/g, '+');
    }

    next();
};