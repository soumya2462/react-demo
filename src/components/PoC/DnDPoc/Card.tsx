import React, { useEffect, useState } from "react";
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'; 
import ArrowRight from '@material-ui/icons/ArrowRight'; 
import { 
  Grid, 
  Theme, 
  Typography, 
  makeStyles,
  Button, 
} from "@material-ui/core"; 
import { Airplay, Exposure, HelpOutline, Lock, Payment } from "@material-ui/icons";

type stylesProps = {
  type: string,
};

const useStyles = makeStyles<Theme, stylesProps>(theme => ({
  root: { 
    border: '1px solid lightgrey', 
    borderRadius: '2px', 
    padding: '8px', 
    backgroundColor: props => getColorFromType(props.type),
    justifyContent: 'space-between', 
    alignItems: 'center',
    display: 'flex',
  },
  preMerge: {
    border: '1px solid lime', 
    borderRadius: '2px',
    padding: '8px', 
    backgroundColor: 'rgba(124,252,0, 0.4)', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    flexShrink: 1,
  },
  listItemTitle: {
    flexGrow: 1,
    display: 'flex',
  },
  listItemType: {
    [theme.breakpoints.up('sm')]: {
      flexBasis: '250px',
    },
  },
  listItemActions: {
    display: 'flex',
    justify: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      flexBasis: '200px',
    },
  },
})); 

const getColorFromType = (type: string): string => {
  let color = '';

  type='default'; //disable row colors from type
  
  switch(type){
    case 'screen':
      color = 'rgba(250,128,114, 0.8)';
      break;
    case 'condition':
      color = 'rgba(211,211,211, 0.8)';
      break;
    case 'calculation':
      color = 'rgba(135,206,250, 0.8)';
      break;
    case 'question':
      color = 'rgba(152,251,152, 0.8)';
      break;
    case 'payment':
      color = 'rgba(255,255,153, 0.8)';
      break;
    default:
      color = 'rgba(255,255,255, 0.8';
  };

  return color;
}

const getIconFromType = (type: string) => {
  let icon = null;

  switch(type){
    case 'screen':
      icon = <Airplay />;
      break;
    case 'condition':
      icon = <Lock />;
      break;
    case 'calculation':
      icon = <Exposure />;
      break;
    case 'question':
      icon = <HelpOutline />;
      break;
    case 'payment':
      icon = <Payment />;
      break;
    default:
  };

  return icon;
}

const getDisplayTextFromType = (type: string) => {
  let text = '';

  text = type.charAt(0).toUpperCase() + type.slice(1);

  if (type === 'calculation' || type === 'question'){
    text = `${text} Set`;
  }

  return text;
}

type CardProps = { 
  item: any, 
  provided: any,
  snapshot: any,
  removeCard: (e: any) => void, 
  onExpand: (e: any) => void, 
  onCollapse: (e: any) => void,
  checkCanMerge: (droppedOnId: string) => boolean,
};

const Card = ({
  item,
  onExpand,
  onCollapse,
  provided,
  snapshot,
  removeCard,
  checkCanMerge,
}: CardProps) => {
  const isParent = item.children.length > 0;
  const [canMerge, setCanMerge ] = useState(false);
  const classes = useStyles({ type: item.data.type });

  useEffect(() => {
    let setMerge = false;
    if (snapshot.draggingOver !== null){
      setMerge = checkCanMerge(snapshot.combineWith);
    }

    setCanMerge(snapshot.combineWith !== null && setMerge);
  }, [snapshot.draggingOver, snapshot.combineWith]);

  return (
    <Grid container 
      id={`card-${item.id}`} 
      ref={provided.innerRef} 
      className={canMerge ? classes.preMerge : classes.root} 
      {...provided.draggableProps} 
      {...provided.dragHandleProps}
    >
      <Grid item className={classes.listItemTitle}>
        { isParent ? (
          item.isExpanded ?
            <ArrowDropDown onClick={() => onCollapse(item.id)} /> 
            : 
            <ArrowRight onClick={() => onExpand(item.id)} /> 
            )
          :
          <svg className="MuiSvgIcon-root" />
        } 
        {getIconFromType(item.data.type)}
        <Typography variant="subtitle1"> 
          {item.data.title}
        </Typography> 
      </Grid> 
      <Grid item xs={12} className={classes.listItemType}>
        <Typography>
          {getDisplayTextFromType(item.data.type)}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.listItemActions}>
        <Button color="primary" onClick={() => {}}>Edit</Button> 
        <Button color="secondary" onClick={() => removeCard(item.id)}>Delete</Button> 
      </Grid>
    </Grid>
  )
}

export default Card;