import AssetService from "../service/AssetService";

import NotFoundException from "../exception/NotFoundException";
import { MongoError } from 'mongodb';

class AssetController {
    async create(req, res) {
        try {
            const asset = await AssetService.create(req.body);

            return res.json({
                "asset": asset,
                "message": "Successfully created"
            });

        } catch (err) {
            if (err instanceof MongoError) {
                if (err.code === 11000) {
                    return res.status(400).send({
                        error: err.message,
                        message: "Asset already exists"
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

    async readManyByCompany(req, res) {
        try {
            const assets = await AssetService.ReadManyByCompany(req.query);

            return res.json({
                "assets": assets,
                "message": "Reading done successfully"
            });

        } catch (err) {
            return res.status(500).send({
                error: err.message,
                message: "Unexpected error"
            });
        }
    }

}

export default new AssetController