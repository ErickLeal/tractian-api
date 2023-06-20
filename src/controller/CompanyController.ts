import CompanyService from "../service/CompanyService";

import { MongoError } from 'mongodb';
import NotFoundException from "../exception/NotFoundException";

class CompanyController {
    async create(req, res) {
        try {
            const company = await CompanyService.create(req.body);

            return res.json({
                "company": company,
                "message": "Successfully created"
            });

        } catch (err) {
            if (err instanceof MongoError) {
                if (err.code === 11000) {
                    return res.status(400).send({
                        error: err.message,
                        message: "Company already exists"
                    });
                } else {
                    return res.status(500).send({
                        error: err.message,
                        message: "Unexpected error"
                    });
                }
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
            const company = await CompanyService.update(req.body);

            return res.json({
                "company": company,
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

    async delete(req, res) {
        try {
            const deleted = await CompanyService.deleteOne(req.body);

            return res.json({
                "message": "Company successfully deleted",
                "deletedUnitsCount": deleted.deletedUnits.deletedCount,
                "deletedUsersCount": deleted.deletedUsers.deletedCount
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
            const company = await CompanyService.ReadOne(req.query);

            return res.json({
                "company": company,
                "message": "Company found"
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

}

export default new CompanyController