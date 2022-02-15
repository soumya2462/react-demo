import React from "react";
import { 
  Button,
	Divider,
  makeStyles,
}from "@material-ui/core";

const useStyles = makeStyles(() => ({
	buttonGroup: {
		display: "flex", 
		justifyContent: "space-between", 
		padding:20,
	},
}));

type ListButtonGroups = {
	handleSaveButton: () => void,
	handleCancelButton: () => void,
	saveButtonLabel: string,
};

const SaveAndCancelButtons = (props: ListButtonGroups) =>  {
	const { 
		saveButtonLabel,
		handleSaveButton,
		handleCancelButton,
	} = props;

	const classes = useStyles();
	return (
		<div>
			<Divider /> 
			<div data-test="component-save-cancel-buttons" className={classes.buttonGroup}> 
				<Button 
					onClick={handleSaveButton}
					variant="contained"
					color="primary"				
					data-test="save-button">
					{saveButtonLabel}
				</Button> 
				<Button 
					onClick={handleCancelButton}
					variant="outlined"
					data-test="cancel-button">            
					Cancel				
				</Button>
			</div>
		</div>
	)
} 

export default SaveAndCancelButtons;