export const sanitizeSearchQuery = (req, res, next) => {
    const { topic } = req.query;
    if (topic) {
        req.query.topic = topic.trim().replace(/\s+/g, '+');
    }
    next();
};

export const savePaperValidator = (req, res, next) => {
    res.locals.errors = [];
    const { email, paperId, title } = req.body;

    // check to make sure email exist
    if(!email) {
        res.locals.errors.push({
            field: 'email',
            message: 'email is required'
        });
    }
    // check to make sure paperID is exist
    if(!paperId) {
        res.locals.errors.push({
            field: 'paperId',
            message: 'paperId is require'
        });
    }
    // check to make sure title is exist because this is not null
    if(!title) {
        res.locals.errors.push({
            field: 'title',
            message: 'title is require'
        });
    }

    next();
};

export const sanitizeEmailQuery = (req, res, next) => {
    res.locals.errors = [];
    const { email } = req.query;

    if(!email) {
        res.locals.errors.push({
            field: 'email',
            message: 'email is required'
        });
    } else {
        req.query.email = email.trim();
    }
    next();
};
