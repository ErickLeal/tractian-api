import Unit from "../model/Unit";
import Company from "../model/Company";

import NotFoundException from "../exception/NotFoundException";

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
        unit.company = company;

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

        unit.company = company;

        return unit;
    }

    async deleteOne(data) {

        const { unitId } = data;

        const unit = await Unit.deleteOne({ _id: unitId });

        return unit;
    }

    async deleteManyByCompany(data) {

        const { companyId } = data;

        const unit = await Unit.deleteMany({company: companyId});

        return unit;
    }

    async ReadOne(data) {

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