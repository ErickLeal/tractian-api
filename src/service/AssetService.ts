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

        return asset;
    }

    async update(data) {

        const { image, name, model, owner, description, status, healthLevel, unitId, assetId } = data;

        const asset = await Asset.findById(assetId).select('-__v');
        if (!asset)
            throw new NotFoundException("Asset not found");

        const unit = await Unit.findById(unitId).select('-__v').populate({ path: 'company', select: '-__v' });
        if (!unit)
            throw new NotFoundException("Unit not found");

        asset.image = image;
        asset.name = name;
        asset.model = model;
        asset.owner = owner;
        asset.description = description;
        asset.status = status;
        asset.healthLevel = healthLevel;
        asset.unit = unitId;

        await asset.save();

        return asset;
    }

    async readOne(data) {
        const { assetId } = data;

        const asset = await Asset.findById(assetId).select('-__v')
            .populate({
                path: 'unit',
                select: '-__v',
                populate: {
                    path: 'company',
                    select: '-__v',
                },
            });

        if (!asset)
            throw new NotFoundException("Asset not found");

        return asset;
    }

    async readManyByUnit(data) {
        const { unitId } = data;

        const assets = await Asset.find({unit: unitId}).select('-__v')
            .populate({
                path: 'unit',
                select: '-__v',
                populate: {
                    path: 'company',
                    select: '-__v',
                },
            });

        return assets;
    }

    async readManyByCompany(data) {
        
        /* Nesta função optei por utilizar o aggregate, acho mais performático e de melhor entendimento 
            em funções que envolvem mais de 2 models ou com outros filtros mais complexos */

        const { companyId } = data;
        var assets = await Asset.aggregate([
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

    async deleteOne(data) {

        const { assetId } = data;

        const asset = await Asset.deleteOne({ _id: assetId });

        return asset;
    }

    async deleteManyByUnit(data) {

        const { unitId } = data;

        const assets = await Asset.deleteMany({unit: unitId});

        return assets;
    }

    async deleteManyByCompany(data) {
       
        const assets = await this.readManyByCompany(data);
        const idsList = await assets.map(function(d) {
            return d._id;
        });
        const assetsDeleted = await Asset.deleteMany({ _id: { $in: idsList } });

        return assetsDeleted;
    }

}

export default new AssetService