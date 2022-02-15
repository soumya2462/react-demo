
// Role Module
// For adding default all option in Role list.

export default class addRoles  {

    static AddRolesOptions(response){
        var AddRole=response; 
        var obj={
            Created_By: null,
            Created_Date: null,
            Isreadonly: false,
            Main_Module_ID: 2,
            ModulePage: null,
            Module_ID: 0,
            Module_Name: "ALL",
            Module_Parent_ID: null,
            Priority: 1,
            Updated_By: null,
            Updated_Date: null,
            IsSelected:false
        }  
        AddRole.unshift(obj);
       
        return AddRole;
        }

}


