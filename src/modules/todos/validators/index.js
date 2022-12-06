const { check, validationResult } = require("express-validator");

const createRules = [
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
];

const validate = (schemas) => {
    return async (req, res, next) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const result = validationResult(req);

        if (result.isEmpty()) {
            return next();
        }

        const errors = result.array();
        let extractedErrors = [];

        if (errors.length) {
            extractedErrors = errors.map((err) => ({ [err.param]: err.msg }));
        }

        return res.status(422).send({
            success: false,
            message: "Data given invalid!",
            errors: extractedErrors,
        });
    };
};

module.exports = {
    createRules,
    validate,
};
