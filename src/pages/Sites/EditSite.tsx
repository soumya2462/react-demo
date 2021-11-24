import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { apiSite } from '../../constants/apiTypes';
import SiteSetup from '../../components/SiteConfig/SiteSetup';

type paramsType = {
  siteId: string;
};

const EditSite = () => {
  const [siteToEdit, setSiteToEdit] = useState<apiSite>({
    name: '',
    subDomain: '',
    id: '',
    siteId: '',
    audience: 'undefined',
    clientId: '',
    packages: [],
    createdDate: {
      seconds: 0,
      nanos: 0,
    },
  });

  const [validationError, setValidationError] = useState('');
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const history = useHistory();
  const { siteId } = useParams<paramsType>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/sites/${siteId}`, {
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (response) => {
          setSiteToEdit(response.data);
        },
        (error) => {
          if (error.response) {
            setValidationError(error.response.data);
          } else {
            //Generic error
            setValidationError('Something went wrong, please try again.');
          }
        }
      );
  }, [accessToken, siteId]);

  const handleSaveSiteButton = (site: apiSite, packagesValue: string, packages: Array<string>) => {
    var filteredPackages = site.packages.filter((thisPackage) => packages.includes(thisPackage)).map((item) => item);

    const body = {
      name: site.name,
      subDomain: site.subDomain,
      audience: site.audience,
      packages: site.packages,
      siteId: site.siteId,
    };

    if (packagesValue === 'site-packages-some' && filteredPackages.length === 0) {
      setValidationError('Please select at least one package');
      return false;
    }

    axios
      .put(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/sites`, body, {
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        () => {
          //created
          history.push('/sites');
        },
        (error) => {
          if (error.response) {
            setValidationError(error.response.data);
          } else {
            //Generic error
            setValidationError('Something went wrong, please try again.');
          }
        }
      );
  };

  return (
    <SiteSetup
      data-test="component-edit-site"
      saveButtonLabel="Save site"
      handleSaveSiteButton={handleSaveSiteButton}
      validationError={validationError}
      pageTitle="Edit site"
      passedInSite={siteToEdit}
    />
  );
};

export default EditSite;
