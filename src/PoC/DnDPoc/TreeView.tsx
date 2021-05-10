import React, { useState } from "react";
import Tree, { moveItemOnTree, mutateTree } from "@atlaskit/tree";
import { curry } from "ramda";
import produce from "immer";
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card";

export const expand = curry(({ setState }, itemId) => {
  setState((state:any) => mutateTree(state, itemId, { isExpanded: true }))
});

export const collapse = curry(({ setState }, itemId) => {
  setState((state:any) => mutateTree(state, itemId, { isExpanded: false }))
});

export const select = curry(({ setState }, itemId) => {
  setState(produce(draft => selectItem(draft, itemId)))
})

const selectItem = (draft:any, itemId:any) => {
  draft.selectedItem = itemId
  Object.keys(draft.items).forEach(
    id => (draft.items[id] = mutateTree(draft, id, {}).items[id]),
  )
}

export const deselect = ({ setState }: any) => {
  setState(
    produce((draft:any) => {
      draft.selectedItem = null
      Object.keys(draft.items).forEach(
        id => (draft.items[id] = mutateTree(draft, id, {}).items[id]),
      )
    }),
  )
}

export const addNode = ({ state, setState }: any, node:any) => {
  //const parent = state.selectedItem || "root"
  const parent = "root"

  setState(
    produce((draft:any) => {
      draft.items[parent].isExpanded = true
      draft.items[parent].hasChildren = true
      draft.items[parent].children.push(node.id)
      draft.items[node.id] = { ...node, parent }
      selectItem(draft, node.id)
    }),
  )
}

export const addCondition = ({ state, setState }: any, condition: any) => {
  const parent = "root"
  const child = node("default child", {}, []);

  condition.children.push(child.id);
  condition.hasChildren = true;
  condition.isExpanded = true;
  condition.isChildrenLoading = false;
  condition.data = { ...condition.data, type: 'condition' };

  setState(
    produce((draft:any) => {
      draft.items[parent].isExpanded = true
      draft.items[parent].hasChildren = true
      draft.items[parent].children.push(condition.id)
      draft.items[condition.id] = { ...condition, parent }
      draft.items[child.id] = { ...child, condition }
      selectItem(draft, condition.id)
    }),
  )
}

export const removeNode = curry(({ state, setState }:any, itemId:any) => {
  setState(
    produce((draft:any) => {
      if (!itemId || itemId === "root") return
      const item = draft.items[itemId]
      const parent = draft.items[item.parent]
      const itemIndex = parent.children.indexOf(itemId)

      draft.items[item.parent].children = parent.children.filter(
        (id: any) => id !== itemId,
      )

      delete draft.items[itemId]

      parent.hasChildren = !!parent.children.length

      selectItem(
        draft,
        parent.children[itemIndex === 0 ? 0 : itemIndex - 1] || parent.id,
      )
    }),
  )
})

export const removeSelectedNode = ({ state, setState }:any) => {
  removeNode({ state, setState }, state.selectedItem)
}

export const handleKeyDown = curry(({ addNode, state, setState }, e) => {
  if (state.selectedItem && !state.isDragging) {
    if (e.key === "ArrowUp")
      select({ state, setState }, findPrevNode(state, state.selectedItem))

    if (e.key === "ArrowDown")
      select({ state, setState }, findNextNode(state, state.selectedItem))

    if (e.key === "ArrowRight") {
      expand({ state, setState }, state.selectedItem)
      select({ state, setState }, state.selectedItem)
    }

    if (e.key === "ArrowLeft") {
      collapse({ state, setState }, state.selectedItem)
      select({ state, setState }, state.selectedItem)
    }

    if (e.key === "n") {
      addNode(state.selectedItem)
    }

    if (e.key === "d") {
      removeSelectedNode({ state, setState })
    }

    if (e.keyCode === 32 /* Spacebar */) {
      setState((state:any) => ({ ...state, isDragging: !state.isDragging }))
    }
  }
})

const TreeView = ({ addNode, state, setState, promap, className }:any) => {
  const [enableMerge, setEnableMerge] = useState(true); 

  // TODO
  // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  const checkCanMerge = (droppedOnId: string):boolean => {
    let setMerge = true;

    if (droppedOnId !== null){
      const type = state.items[droppedOnId].data.type;
      if (type !== 'screen' && type !== 'condition'){
        setMerge = false;
      }
    }
    
    setEnableMerge(setMerge);
    return setMerge;
  };
  
  const renderItem = curry(({ state, setState }, props) => (
    <Card
      {...props}
      select={select({ state, setState })}
      deselect={() => deselect({ setState })}
      selectedItem={state.selectedItem}
      removeCard={removeNode({ state, setState })}
      checkCanMerge={checkCanMerge}
    />
  ))

  return (
    <div
      className={`${className} tree`}
      id="tree"
      onKeyDown={handleKeyDown({ addNode, state, setState })}
    >
      <Tree
        tree={state}
        renderItem={renderItem({ state, setState })}
        onExpand={expand({ state, setState })}
        onCollapse={collapse({ state, setState })}
        onDragStart={dragStart({ state, setState })}
        //@ts-ignore
        onDragEnd={dragEnd({ state, setState })}
        offsetPerLevel={30}
        isDragEnabled
        isNestingEnabled={enableMerge}
      />
    </div>
  )
}

// - Helpers

const dragStart = curry(({ state, setState }, itemId) =>{
  collapse({state, setState});
  return select({ state, setState }, itemId);
})

const dragEnd = curry(({ state, setState }, source, destination:any) => {
  if (!destination) {
    return
  }

  const oldParent = state.items[source.parentId]
  const newParent = state.items[destination.parentId]
  const childId = oldParent.children[source.index]
  const child = state.items[childId]

  setState((state:any) => {
    const nextState = moveItemOnTree(state, source, destination)
    return {
      ...state,
      ...nextState,
      isDragging: false,
      items: {
        ...nextState.items,
        [childId]: { ...child, parent: newParent.id },
      },
    }
  })
  select(
    { state, setState },
    newParent.isExpanded ? oldParent.children[source.index] : newParent.id,
  )
})

export const node = (title:any, data:any, children:any) => ({
  id: uuidv4(),
  data: { title, ...data },
  hasChildren: !!children.length,
  isExpanded: !!children.length,
  isChildrenLoading: false,
  children,
})

export const makeTree = (nodes:any) => ({
  rootId: "root",
  selectedItem: null,
  isDragging: false,
  items: {
    root: {
      id: "root",
      children: nodes.map((node:any) => node.id),
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: "root",
        type: 'condition',
      },
    },
    ...flattenNodes({}, nodes, "root"),
  },
})

const flattenNodes = (root:any, nodes:any, parent:any) =>
  nodes.reduce(
    (acc:any, node:any) => ({
      ...acc,
      [node.id]: {
        ...node,
        parent,
        children: node.children.map((child:any) => child.id),
      },
      ...flattenNodes(root, node.children, node.id),
    }),
    root,
  )

export const findNextNode = (state:any, itemId:any, traverseChildren:boolean = true):any => {
  const item = state.items[itemId]
  const parent = state.items[item.parent]

  if (!parent) return item.children[0]

  if (item.isExpanded && item.children[0] && traverseChildren)
    return item.children[0]

  const itemsIndex = parent.children.indexOf(itemId)

  if (!parent.children[itemsIndex + 1]) {
    return findNextNode(state, parent.id, false)
  }

  return parent.children[itemsIndex + 1]
}

const findLastExpandedChild = (state:any, itemId:any):any => {
  const item = state.items[itemId]

  if (item.hasChildren && item.isExpanded)
    return findLastExpandedChild(state, item.children[item.children.length - 1])
  else return itemId
}

export const findPrevNode = (state:any, itemId:any) => {
  const item = state.items[itemId]
  const parent = state.items[item.parent]
  const itemIndex = parent.children.indexOf(itemId)

  if (parent.id === "root" && item.id === parent.children[0]) {
    return findLastExpandedChild(
      state,
      parent.children[parent.children.length - 1],
    )
  }

  const prevItem = state.items[parent.children[itemIndex - 1]]

  if (!prevItem) return parent.id

  return prevItem.hasChildren && prevItem.isExpanded
    ? findLastExpandedChild(
        state,
        prevItem.children[prevItem.children.length - 1],
      )
    : prevItem.id
}

export default TreeView;