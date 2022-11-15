const { validationResult, ValidationChain } = require("express-validator");
// can be reused by many routes

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        let errorMessage = errors.array()[0].msg;
        if (errors.array()[0].nestedErrors && errors.array()[0].nestedErrors.length > 0)
            errorMessage = errors.array()[0].nestedErrors[0].msg;
        console.log(JSON.stringify(errors));
        res
            .status(400)
            .json({
                status: "fail",
                error: { statusCode: 400, status: "fail" },
                message: errorMessage,
            });
    };
};
module.exports = validate;