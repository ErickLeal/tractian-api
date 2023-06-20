import UserService from "../service/UserService";

import NotFoundException from "../exception/NotFoundException";
import { MongoError } from 'mongodb';

class UserController {
    async create(req, res) {
        try {
            const user = await UserService.create(req.body);

            return res.json({
                "user": user,
                "message": "Successfully created"
            });

        } catch (err) {
            if (err instanceof MongoError) {
                if (err.code === 11000) {
                    return res.status(400).send({
                        error: err.message,
                        message: "User already exists"
                    });
                } else {
                    return res.status(500).send({
                        error: err.message,
                        message: "Unexpected error"
                    });
                }
            } if (err instanceof NotFoundException) {
                return res.status(400).send({
                    error: err.message,
                    message: err.message
                });
            } else {
                return res.status(500).send({
                    error: err.message,
                    message: "Unexpected error"
                });
            }

        }
    }

    async update(req, res) {
        try {
            const user = await UserService.update(req.body);

            return res.json({
                "user": user,
                "message": "Successfully updated"
            });

        } catch (err) {
            if (err instanceof NotFoundException) {
                return res.status(404).send({
                    error: err.message,
                    message: err.message
                });
            } else {
                return res.status(500).send({
                    error: err.message,
                    message: "Unexpected error"
                });
            }
        }
    }

    async readOne(req, res) {
        try {
            const user = await UserService.readOne(req.query);

            return res.json({
                "user": user,
                "message": "User found"
            });

        } catch (err) {
            if (err instanceof NotFoundException) {
                return res.status(404).send({
                    error: err.message,
                    message: err.message
                });
            } else {
                return res.status(500).send({
                    error: err.message,
                    message: "Unexpected error"
                });
            }

        }
    }

    async readManyByCompany(req, res) {
        try {
            const users = await UserService.readManyByCompany(req.query);

            return res.json({
                "users": users,
                "message": "Reading done successfully"
            });

        } catch (err) {
            return res.status(500).send({
                error: err.message,
                message: "Unexpected error"
            });
        }
    }

    async deleteOne(req, res) {
        try {
            await UserService.deleteOne(req.body);

            return res.json({
                "message": "Successfully deleted"
            });

        } catch (err) {
            return res.status(500).send({
                error: err.message,
                message: "Unexpected error"
            });
        }
    }

    async deleteManyByCompany(req, res) {
        try {
            const deletedUsers = await UserService.deleteManyByCompany(req.body);

            return res.json({
                "deletedCount": deletedUsers.deletedCount,
                "message": "Successfully deleted"
            });

        } catch (err) {
            return res.status(500).send({
                error: err.message,
                message: "Unexpected error"
            });

        }
    }



}

export default new UserController