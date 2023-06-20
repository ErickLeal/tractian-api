import User from "../model/User";
import Company from "../model/Company";

import NotFoundException from "../exception/NotFoundException";

class UserService {

    async create(data) {

        const { name, cpf, password, companyId} = data;

        const company = await Company.findById(companyId).select('-__v');
        if (!company)
            throw new NotFoundException("Company not found");

        const user = await User.create({
            name,
            cpf,
            password,
            company: companyId
        }); 
        user.company = company;

        return user;
    }

    async update(data) {

        const {password ,name, companyId, userId } = data;

        const company = await Company.findById(companyId).select('-__v');
        if (!company)
            throw new NotFoundException("Company not found");

        const user = await User.findById(userId).select('-__v');
        if (!user)
            throw new NotFoundException("User not found");

        user.name = name;
        user.company = companyId;
        user.password = password;

        await user.save();

        user.company = company;

        return user;
    }

    async deleteOne(data) {

        const { userId } = data;

        const user = await User.deleteOne({ _id: userId });

        return user;
    }

    async deleteManyByCompany(data) {

        const { companyId } = data;

        const unit = await User.deleteMany({company: companyId});

        return unit;
    }

    async ReadOne(data) {
        const { userId } = data;

        const user = await User.findById(userId).select('-__v').populate({ path: 'company', select: '-__v' });
        if (!user)
            throw new NotFoundException("User not found");

        return user;
    }

    async ReadManyByCompany(data) {
        const { companyId } = data;

        const user = await User.find({company: companyId}).select('-__v').populate({ path: 'company', select: '-__v' });

        return user;
    }

}

export default new UserService