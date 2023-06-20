import Asset from "../model/Asset";
import Unit from "../model/Unit";

import NotFoundException from "../exception/NotFoundException";

import mongoose from 'mongoose';

class AssetService {

    async create(data) {

        const { image, name, model, owner, description, status, healthLevel, unitId } = data;

        const unit = await Unit.findById(unitId).select('-__v').populate({ path: 'company', select: '-__v' });
        if (!unit)
            throw new NotFoundException("Unit not found");

        const asset = await Asset.create({
            image,
            name,
            model,
            owner,
            description,
            status,
            healthLevel,
            unit: unitId
        });
        asset.unit = unit;

        return asset;
    }

    async ReadManyByCompany(data) {

        /* Nesta função optei por utilizar o aggregate, acho mais performático e de melhor entendimento 
            em funções que envolvem mais de 2 models ou com outros filtros mais complexos */

        const { companyId } = data;

        var assets = Asset.aggregate([
            {
                $lookup: {
                    from: 'units',
                    localField: 'unit',
                    foreignField: '_id',
                    as: 'unit',
                },
            },
            {
                $unwind: '$unit',
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'unit.company',
                    foreignField: '_id',
                    as: 'unit.company',
                },
            },
            {
                $unwind: '$unit.company',
            },
            {
                $match: { 'unit.company._id': mongoose.Types.ObjectId.createFromHexString(companyId) },
            },
            {
                $project: {
                    '__v': 0,
                    'unit.__v': 0,
                    'unit.company.__v': 0
                },
            }
        ]);

        return assets;
    }

}

export default new AssetService