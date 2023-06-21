import UnitService from "../service/UnitService2";

import NotFoundException from "../exception/NotFoundException";

class UnitController {
    async create(req, res) {
        try {
            const unit = await UnitService.create(req.body);

            return res.json({
                "unit": unit,
                "message": "Successfully created"
            });

        } catch (err) {
            if (err instanceof NotFoundException) {
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
            const unit = await UnitService.update(req.body);

            return res.json({
                "unit": unit,
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
            const unit = await UnitService.readOne(req.query);

            return res.json({
                "unit": unit,
                "message": "Unit found"
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

    async deleteOne(req, res) {
        try {
            const deleted = await UnitService.deleteOne(req.body);

            return res.json({
                "message": "Unit successfully deleted",
                "deletedUnitCount": deleted.deletedUnit.deletedCount,
                "deletedAssetsCount": deleted.deletedAssets.deletedCount
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
            const deletedUnits = await UnitService.deleteManyByCompany(req.body);

            return res.json({
                "deletedCount": deletedUnits,
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

export default new UnitController