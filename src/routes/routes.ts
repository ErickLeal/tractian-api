import {Router} from 'express';

import UserController from '../controller/UserController';
import CompanyController from '../controller/CompanyController';
import UnitController from '../controller/UnitController';
import AssetController from '../controller/AssetController';

const routes = Router();

//Company routes
routes.post("/company", CompanyController.create)
routes.put("/company", CompanyController.update)
routes.delete("/company", CompanyController.delete)
routes.get("/company", CompanyController.readOne)

//Unit Routes
routes.post("/unit", UnitController.create)
routes.put("/unit", UnitController.update)
routes.delete("/unit", UnitController.deleteOne)
routes.get("/unit", UnitController.readOne)
routes.delete("/unit/bycompany", UnitController.deleteManyByCompany)

//user routes
routes.post("/user", UserController.create)
routes.put("/user", UserController.update)
routes.delete("/user", UserController.deleteOne)
routes.delete("/user/bycompany", UserController.deleteManyByCompany)
routes.get("/user", UserController.readOne)
routes.get("/user/bycompany", UserController.readManyByCompany)

//Asset routes
routes.post("/asset", AssetController.create)

routes.get("/asset/bycompany", AssetController.readManyByCompany)


export default routes