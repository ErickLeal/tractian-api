import Company from "../model/Company";

import UnitService from "./UnitService2";
import UserService from "./UserService";

import NotFoundException from "../exception/NotFoundException";


class CompanyService {

    async create(data) {

        const { name, cnpj} = data;

        const company = await Company.create({
            name,
            cnpj
        });

        return company;
    }

    async update(data) {

        const { name, cnpj } = data;

        const company = await Company.findOne({ cnpj });
        if (!company)
            throw new NotFoundException("Company not found");

        company.name = name;
        await company.save();

        return company;
    }

    async deleteOne(data) {

        const { companyId } = data;

        const deletedCompany = await Company.deleteOne({ _id: companyId });
        const deletedUnits = await UnitService.deleteManyByCompany(data);
        const deletedUsers = await UserService.deleteManyByCompany(data);

        return {
            "deletedCompany": deletedCompany,
            "deletedUnits": deletedUnits,
            "deletedUsers": deletedUsers
        };
    }

    async readOne(data) {

        const { cnpj } = data;

        const company = await Company.findOne({ cnpj });
        if (!company)
            throw new NotFoundException("Company not found");

        return company;
    }

}

export default new CompanyService