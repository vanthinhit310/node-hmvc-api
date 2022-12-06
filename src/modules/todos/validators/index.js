const { check, validationResult } = require("express-validator");

const createRules = () => {
    return [
        check("title").isString().bail().notEmpty(),
        check("description").isString().bail().notEmpty(),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        success: false,
        message: "Data given invalid!",
        errors: extractedErrors,
    });
};

module.exports = {
    createRules,
    validate,
};
