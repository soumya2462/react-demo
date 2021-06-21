import React, { useState } from "react";
import axios from "axios";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { apiSite } from "../../constants/apiTypes";
import SiteSetup from "../../components/SiteConfig/SiteSetup"; 

const CreateSite = () => {  
  const [siteToCreate, setSiteToCreate] = useState<apiSite>({
    name: "",
    subDomain: "",
    id: "",
    siteId: "",
    audience: "undefined",
    clientId: "",
    packages: [],
    createdDate: {
      seconds: 0,
      nanos: 0,
    },
  });  

  const [validationError, setValidationError] = useState(''); 
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const history = useHistory();
  
  const handleSaveSiteButton = (site: apiSite, packagesValue: string) => {
    const body = {
      name: site.name,
      subDomain: site.subDomain,
      audience: site.audience,
      packages: site.packages
    };
    
    if(packagesValue === "site-packages-some" && site.packages.length == 0)
    {
      setValidationError("Please select at least one package");
      return false;
    }

    axios.post(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/sites`,
      body,
      { headers: {
         ContentType: 'application/json',
         Authorization: `Bearer ${accessToken}`
        }         
      })
    .then(() => {
      //created    
      history.push('/sites');
    },
    (error) => {     
      
      if (error.response){
        setValidationError(error.response.data);
      }else
      {
        //Generic error
        setValidationError("Something went wrong, please try again.");
      }  
    });
  };

  return (
    <SiteSetup 
      data-test="component-site-setup" 
      saveButtonLabel="Save site"
      handleSaveSiteButton={handleSaveSiteButton}
      validationError={validationError}
      pageTitle="Create site"
      passedInSite={siteToCreate}
    />
  );
}

export default CreateSite;