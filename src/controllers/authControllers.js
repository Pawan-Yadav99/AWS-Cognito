const authService = require("../servies/authService");
const constants = require("../utils/constansts");


const createUser = (req, res, next) => {
    try {
        authService.createUser(req.body).then(data => {
            return res.send({
                statusCode: 201,
                message: constants.messages.create,
                data: data.user
            });
        })

    }
    catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    return authService.loginUser(req.body).
        then(result => {
            res.send({
                statusCode: 200,
                message: constants.messages.login,
                data: result
            });
        }).catch(err => {
            next(err);
        });
}


const deleteUser = async (req, res, next) => {
    return authService.deleteUser(req.body).
        then(result => {
            res.send({
                statusCode: 200,
                message: constants.messages.delete,
            });
        }).catch(err => {
            next(err);
        });
}

const changePassword = async (req, res, next) => {
    return authService.changePassword(req.body).
        then(result => {
            res.send({
                statusCode: 200,
                message: constants.messages.update,
            });
        }).catch(err => {
            next(err);
        });
}

module.exports = { deleteUser, createUser, loginUser, changePassword };