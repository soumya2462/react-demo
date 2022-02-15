


// User Module

export function getAllRegionDistrictAndLocation(companyData){
let companyInfo=[];
let regionInfo=[];
let districtInfo=[];
let locationInfo=[];
let defaultLocationInfo=[];

    for (var i = 0; i < companyData.length; i++) {
      companyInfo.push(companyData[i]);
        if (companyData[i].Regions.length != 0) {
          for (var j = 0; j < companyData[i].Regions.length; j++) {
            regionInfo.push(companyData[i].Regions[j]);
            if (companyData[i].Regions[j].district.length != 0) {
              for (var k = 0; k < companyData[i].Regions[j].district.length; k++) {
                districtInfo.push(companyData[i].Regions[j].district[k]);
                if (companyData[i].Regions[j].district[k].Locations.length != 0) {
                  for (var l = 0; l < companyData[i].Regions[j].district[k].Locations.length; l++) {
                    locationInfo.push(companyData[i].Regions[j].district[k].Locations[l]);
                  }
                }
              }
            }
          }
        }
      }
      let finalData={
        allCompanyInfo:companyInfo,
        allRegionInfo:regionInfo,
        allDistrictInfo:districtInfo,
        allLocationInfo:locationInfo,
        allDefaultLocationInfo:defaultLocationInfo
    }
return finalData;
}


// For adding default Select Role option in role list.
export default class addRole  {

    static AddRoleOption(response){
        var AddData=response; 
        var obj={
          Created_By: null,
          Created_Date: null,
          Is_Admin: null,
          Is_Delete: null,
          Is_Super_Admin_Created: null,
          MainModuleIDs: null,
          MainModuleRoleMapper: null,
          ModuleIds: null,
          ModulePageIds: null,
          ModulePageRoleMapper: null,
          Modules: null,
          RoleType_Name: null,
          Role_ID: 0,
          Role_Name: "Select Role",
          Role_Type: null,
          SearchRoleName: null,
          Updated_By: null,
          Updated_Date: null,
          User_Type: null,
          currentPage:null,
          itemsPerPage: null
        }  
        AddData.unshift(obj);
       
        return AddData;
        }

}
   

 