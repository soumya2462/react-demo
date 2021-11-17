import React, { ChangeEvent, useEffect, useState } from "react";
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
}from "@material-ui/core";

import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Alert } from "@material-ui/lab";
import { RootState } from "../../store";
import SaveAndCancelButtons from "../../components/Buttons/SaveAndCancelButtons"; 
import { RowProps } from "../../components/List/ListRow";
import { ContentLayout } from "../../components/Layout";
import { apiPackage, apiSite } from "../../constants/apiTypes";
import Color from "../../constants/colors";

const useStyles = makeStyles(() => ({
  form: {
    padding:20,
    marginBottom:20,
  },
  accordionHeader:{
    backgroundColor: Color.LightGray 
  },
  accordionWrapper:{
    marginBottom:20,
  },
  squareRightRadius: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  noBorderLeft:{
    borderLeftStyle: 'none'
  },
  noBorderRight:{
    borderRightStyle: 'none'
  },
  squareLeftRadius: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,    
  },
  noBorderRadius: {      
      borderRadius: 0
  },
}));

export type SiteSetupProps = {
	handleSaveSiteButton: (site: apiSite, packagesValue: string) => void,
	saveButtonLabel: string,
  validationError: string,
  pageTitle : string,
  passedInSite?: apiSite,
};

const SiteSetup = (props: SiteSetupProps) =>  {
	const { 
		handleSaveSiteButton,
		saveButtonLabel,
    validationError,
    pageTitle,
    passedInSite,
	} = props;
  
  const [siteToSave, setSiteToSave] = useState<apiSite>({
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
  const [packagesValue, setPackagesValue] = useState('site-packages-all');
  const [packages, setPackages] = useState<Array<RowProps>>([]);
  const history = useHistory();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const classes = useStyles();

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSiteToSave(siteToSave => ({...siteToSave, [e.target.name]: e.target.value}));
  }

  const handlePackageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tempPackages  = Object.assign([], siteToSave.packages);
    const { value, checked } = e.target;
   
    if(checked) {
      tempPackages.push(value);
    }
    else{
      const index = tempPackages.indexOf(value, 0);
      if (index > -1) {
        tempPackages.splice(index, 1);
      }
    }

    setSiteToSave(siteToSave => {
       return {...siteToSave, packages : tempPackages}
    });
	};

	const showHidePackages = (e: ChangeEvent<{ value: unknown }>) => { 
    if(e.target.value === "site-packages-all")
    {
      setSiteToSave(siteToSave => {
        return {...siteToSave, packages: []}
     });
    }
    setPackagesValue(e.target.value as string);
	};

  const handleCancelSiteButton = () => {
    history.push("/sites");
  }

  const handleAudienceChange = (e: ChangeEvent<{ value: unknown }>) => {    
    setSiteToSave(siteToSave => {
      return {...siteToSave, audience: e.target.value as string}
    });
	};

  useEffect(() => {
    if (passedInSite === undefined) return;

    if (passedInSite.packages.length > 0) {
      setPackagesValue("site-packages-some");
    }
    else {
      setPackagesValue("site-packages-all");
    }

    setSiteToSave(passedInSite);
  }, [passedInSite]);

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_DESIGN_GATEWAY_URL}/packages`,
      { headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      }})
    .then(response => {
      if (response.status === 200)
      {
        setPackages(response.data.map((packageToSelect: apiPackage) => ({id: packageToSelect.id, name: packageToSelect.name })));
      }
    })
    .catch(error => {
      console.log(error);
    });
  }, [accessToken]);

	return (
    <ContentLayout
      title={pageTitle}
      data-test="component-site-setup"
    >
      <Paper elevation={2}>
      <div className={classes.form}>
        <div className={classes.accordionWrapper}>
          {validationError !== "" && (
            <Alert
              severity="error"
              data-test="site-details-validation"
            >{validationError}</Alert>
          )}
          <Accordion defaultExpanded>
            <AccordionSummary
              data-test="site-details-accordion-header"
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel-header"
              className={classes.accordionHeader}
            >
            <Typography
              variant="subtitle2"
              data-test="site-details-accordion-label"
            >
              Site Details
            </Typography>
            </AccordionSummary>
            <AccordionDetails
              data-test="site-details-accordion-details"
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    data-test="site-name-label"
                    variant="subtitle2"
                    align="left"
                  >
                    Name
                  </Typography>
                  <TextField
                    data-test="site-name-input"
                    value={siteToSave.name}
                    name="name"
                    size="small"
                    required={true}
                    onChange={handleTextChange}
                    variant="outlined"
                    fullWidth />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Typography
                    data-test="site-sub-domain-label"
                    variant="subtitle2"
                    align="left"
                  >
                    Site URL
                  </Typography>
                  <Grid container>
                    <Grid item xs={3} md={2} lg={1}>
                      <TextField
                        data-test="https-label"
                        InputProps={{
                          classes: {
                            root:classes.squareRightRadius,
                            notchedOutline: classes.noBorderRight,
                          }}
                        }
                        id="outlined-basic"
                        label="https://"
                        variant="outlined"
                        disabled
                        size="small"
                        fullWidth />
                    </Grid>
                    <Grid item xs={3} md={6} lg={8}>
                      <TextField
                        InputProps = {{classes:{root:classes.noBorderRadius}}}
                        value={siteToSave.subDomain}
                        name="subDomain"
                        data-test="site-sub-domain-input"
                        size="small"
                        required={true}
                        onChange= {handleTextChange}
                        variant="outlined"
                        fullWidth />
                    </Grid>
                    <Grid item xs={6} md={4} lg={3}>
                      <TextField
                        data-test="instandaclaims-label"
                        InputProps={{
                          classes: {
                            root:classes.squareLeftRadius,
                            notchedOutline: classes.noBorderLeft,
                          }}
                        }
                        id="outlined-basic"
                        label=".instandaclaims.com"
                        variant="outlined"
                        disabled
                        size="small"
                        fullWidth />
                    </Grid> 
                  </Grid>
                </Grid> 
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={classes.accordionWrapper}>
          <Accordion defaultExpanded>
            <AccordionSummary
              data-test="site-packages-accordion-header" 
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.accordionHeader}
            >
            <Typography
              variant="subtitle2"
              data-test="site-packages-accordion-label" 
            >
              Packages
            </Typography>
            </AccordionSummary>
            <AccordionDetails
              data-test="site-packages-accordion-details" 
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                      data-test="site-packages-label"
                      variant="subtitle2"
                      align="left"
                    >
                    Which packages should be administered through this site?
                  </Typography>
                  <RadioGroup
                    data-test="site-packages-radiogroup"
                    aria-label="packages"
                    name="packages"
                    value={packagesValue}
                    onChange={showHidePackages} 
                  >
                    <FormControlLabel
                      data-test="site-packages-all-form-control-label"
                      value="site-packages-all" 
                      control={<Radio
                                size="small"
                                color="primary"
                                data-test="site-packages-all-radio" />} 
                      label={<Typography
                              variant="subtitle2"
                              data-test="site-packages-all-label"
                            >
                              All
                            </Typography>} />
                    <FormControlLabel                     
                      data-test="site-packages-some-form-control-label"
                      value="site-packages-some"
                      control={<Radio
                                size="small"
                                color="primary"
                                data-test="site-packages-some-radio" />} 
                      label={<Typography
                              variant="subtitle2"
                              data-test="site-packages-some-label"
                            >
                              Specific packages
                            </Typography>} />
                  </RadioGroup>
                </Grid>
                {packagesValue === "site-packages-some" && (
                <Grid item xs={12}>
                  <FormGroup>
                  {
                    packages.map(packageToSelect =>
                      <FormControlLabel
                        key={packageToSelect.id}
                        control={<Checkbox 
                                    checked={siteToSave.packages.indexOf(packageToSelect.id) > -1} 
                                    onChange={handlePackageChange}
                                    value={packageToSelect.id}
                                    size="small"
                                    color="primary"
                                    name="package" />
                        }
                        label={<Typography variant="subtitle2">
                                {packageToSelect.name}
                              </Typography>} />
                  )}
                  </FormGroup>
                </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={classes.accordionWrapper}>
          <Accordion defaultExpanded>
            <AccordionSummary
              data-test="site-audience-header"
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.accordionHeader}
            >
              <Typography 
                variant="subtitle2"
                data-test="site-audience-accordion-label" 
              >
                Audience
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              data-test="site-audience-accordion-details"
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography 
                      data-test="site-audience-label"
                      variant="subtitle2"
                      align="left"
                    >
                      Who is going to be using this site?
                    </Typography>
                    <RadioGroup 
                      data-test="site-audience-radiogroup"
                      aria-label="audience"
                      name="audience"
                      onChange={handleAudienceChange}
                    >
                      <FormControlLabel
                        data-test="site-audience-public-label"
                        control={<Radio data-test="site-audience-public-radio" size="small" color="primary" value="Public" checked={siteToSave.audience === "Public"} />}
                        label={<Typography variant="subtitle2">Insureds and other members of the public</Typography>} />
                      <FormControlLabel
                        data-test="site-audience-agent-label"
                        control={<Radio data-test="site-audience-agent-radio" size="small" color="primary" value="Agent" checked={siteToSave.audience === "Agent"} />}
                        label={<Typography variant="subtitle2">Agents and other claims administrators</Typography>} />
                    </RadioGroup>
                  </Grid>
                </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
        {<SaveAndCancelButtons
          data-test="save-cancel-buttons"
          saveButtonLabel={saveButtonLabel}
          handleSaveButton={() => handleSaveSiteButton(siteToSave, packagesValue)}
          handleCancelButton={handleCancelSiteButton} />
        }
      </Paper>
    </ContentLayout>
	)
}

export default SiteSetup;