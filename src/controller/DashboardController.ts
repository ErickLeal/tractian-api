import AssetService from "../service/AssetService";

import NotFoundException from "../exception/NotFoundException";

class DashboardController {

    async dashboardAssets(req, res) {
        try {
            //Initial var
            const data = req.body;
            const returnFields = {
                "total":0,
                "runningCount":0,
                "alertingCount":0,
                "stoppedCount":0,
                "healthLevelAcumulate":0,
                "healthLevelAverage":"",
            };
            var assets = [];
            var result = {};

            if(!data.group)
                throw new NotFoundException("Required field group not found");
        

            //Available filters 
            if(data.companyId){
                assets = await AssetService.readManyByCompany(data);
            }else if(data.unitIds){ 
                assets = await AssetService.readManyByUnit(data);
            }else{
                throw new NotFoundException("Required field not found, please use 'companyId' or 'unitIds'");
            }

           var path = ""
            assets.forEach((asset) => {

                //Validate group and path
                if(data.group == "all"){
                    path = "all";
                }else if(data.group == "unit"){
                    path = asset.unit._id;
                    returnFields["unitName"] = asset.unit.name;
                    returnFields["unitId"] = asset.unit._id;
                }else{
                    throw new NotFoundException("Group value not recognized, please use only 'all' or 'unit'");
                }
                if(!result[path]){
                    result[path] = {...returnFields};
                }

                //Data
                result[path].total++;
                result[path].healthLevelAcumulate += asset.healthLevel;
                if(asset.status == "Running"){
                    result[path].runningCount++;
                }else if(asset.status == "Alerting"){
                    result[path].alertingCount++;
                }else if(asset.status == "Stopped"){
                    result[path].stoppedCount++;
                }
                result[path].healthLevelAverage = Math.round(result[path].healthLevelAcumulate / result[path].total)  + "%";
            });

            return res.json({
                "data": Object.values(result),
                "message": "Dashboard generate successfully"
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

}

export default new DashboardController