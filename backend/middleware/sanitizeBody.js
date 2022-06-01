const sanitize = require("../lib/sanitize");

const sanitizeBody = (req, res, next) => {
    sanitize(req.body);
    next()
};

module.exports = sanitizeBody;