import Unit from "../model/Unit";
import Company from "../model/Company";

import NotFoundException from "../exception/NotFoundException";
import AssetService from "./AssetService";

class UnitService {

    async create(data) {

        const { name, companyId} = data;

        const company = await Company.findById(companyId).select('-__v');
        if (!company)
            throw new NotFoundException("Company not found");

        const unit = await Unit.create({
            name,
            company: companyId
        }); 

        return unit;
    }

    async update(data) {

        const {unitId ,name, companyId } = data;

        const company = await Company.findById(companyId).select('-__v');
        if (!company)
            throw new NotFoundException("Company not found");

        const unit = await Unit.findById(unitId).select('-__v');
        if (!unit)
            throw new NotFoundException("Unit not found");


        unit.name = name;
        unit.company = companyId;
        await unit.save();

        return unit;
    }

    async deleteOne(data) {

        const { unitId } = data;

        const deletedUnit = await Unit.deleteOne({ _id: unitId });
        const deletedAssets = await AssetService.deleteManyByUnit(data);

        return {
            "deletedUnit": deletedUnit,
            "deletedAssets": deletedAssets
        };
    }

    async deleteManyByCompany(data) {

        const { companyId } = data;

        const deletedUnits = await Unit.deleteMany({company: companyId});
        const deletedAssets = await AssetService.deleteManyByCompany(data);

        return {
            "deletedUnits": deletedUnits,
            "deletedAssets": deletedAssets
        };
    }

    async readOne(data) {

        /*Pesquisa feita apenas por ID, seria interessante também
         um filtro combinando nome da unit + company id */

        const { unitId } = data;

        const unit = await Unit.findById(unitId).select('-__v').populate({ path: 'company', select: '-__v' });
        if (!unit)
            throw new NotFoundException("Unit not found");

        return unit;
    }

}

export default new UnitService