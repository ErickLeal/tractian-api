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

    async update(req, res) {
        try {
            const asset = await AssetService.update(req.body);

            return res.json({
                "asset": asset,
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
            const asset = await AssetService.readOne(req.query);

            return res.json({
                "asset": asset,
                "message": "Reading done successfully"
            });

        } catch (err) {
            return res.status(500).send({
                error: err.message,
                message: "Unexpected error"
            });
        }
    }

    async readManyByUnit(req, res) {
        try {
            const assets = await AssetService.readManyByUnit(req.query);

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

    async readManyByCompany(req, res) {
        try {
            const assets = await AssetService.readManyByCompany(req.query);

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

    async deleteOne(req, res) {
        try {
            await AssetService.deleteOne(req.body);

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

    async deleteManyByUnit(req, res) {
        try {
            const deletedAssets = await AssetService.deleteManyByUnit(req.body);

            return res.json({
                "deletedCount": deletedAssets.deletedCount,
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
            const deletedAssets = await AssetService.deleteManyByCompany(req.body);

            return res.json({
                "deletedCount": deletedAssets,
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

export default new AssetController