import React, { useState } from "react";
import useProfunctorState from "@staltz/use-profunctor-state";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme
} from "@material-ui/core";
import TreeView, {
  makeTree,
  node,
  deselect,
  addNode,
} from "./TreeView";
import ContentLayout from "../../components/Layout/ContentLayout";

const useStyles = makeStyles<Theme>({
  rootDrag: {
    height: '80vh',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  tree: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexGrow:1,
    minHeight: '100%',
    '& > :first-child': {
      flex: 1,
      overflowY: 'scroll',
      height: '100%',
    },
  },
  gimmeSomeSpace: {
    marginBottom: '20px',
  },
  formControl: {
    margin: "4px",
    minWidth: 120,
  },
  tempSelect: {
    paddingTop: '12px',
    paddingBottom: '8px',
  },
});

const initialTree = makeTree([
  node("First parent", { type: 'screen'}, [
    node("Child one", { type: 'question' }, []),
    node("Child two", { type: 'condition' }, []),
  ]),
  node("Second parent", { type: 'condition' }, [
    node("Child one", { type: 'calculation' }, []),
    node("Child two", { type: 'payment' }, []),
  ]),
]);


const DragAndDropPoC = (props:any) => {
  const appState = useProfunctorState({ tree: initialTree })
  const classes = useStyles();
  const [type, setType] = useState('');

  const treeState = appState.promap(
    state => state.tree,
    (tree, state) => ({ ...state, tree }),
  );

  const handleType = (event: any) => {
    event.stopPropagation();
    setType(event.target.value);
  };

  return (
    <ContentLayout title={props.title}>
      <div
        className={classes.rootDrag}
        onClick={e => {
          if (
            !(e.target as Element).matches(".tree > div *") &&
            !(e.target as Element).matches("[role=toolbar] *")
          )
            deselect(treeState)
        }}
      >
        <TreeView
          className={classes.tree}
          addNode={(selected:any) => addNode(treeState, node(`new ${type}`, { type: type }, []))}
          {...treeState}
        />
        <div
          role="toolbar"
          aria-controls="tree"
          aria-label="add or remove components"
        >
          <Divider className={classes.gimmeSomeSpace} />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="input-label">Type</InputLabel>
            <Select
              labelId="input-label"
              id="input"
              value={type}
              onChange={handleType}
              label="Age"
              classes={{root: classes.tempSelect}}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="screen">Screen</MenuItem>
              <MenuItem value="question">Question Set</MenuItem>
              <MenuItem value="condition">Condition</MenuItem>
              <MenuItem value="calculation">Calculation Set</MenuItem>
              <MenuItem value="payment">Payment</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addNode(treeState, node(`new ${type}`, { type: type }, []))}
            aria-label="add component"
          >
            Add item
          </Button>
        </div>
      </div>
    </ContentLayout>
  )
};

export default DragAndDropPoC;