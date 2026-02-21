import React, { useState, useMemo } from 'react';
import TreeView from '../components/TreeView';
import { 
  addNodeToTree, 
  removeNodeFromTree, 
  editNodeInTree,
  findNodeById 
} from '../utils/treeUtils';

const TreeContainer = () => {
  const initialTree = useMemo(() => [
    { id: 1, name: 'Node 1', children: [] },
    { id: 2, name: 'Node 2', children: [] },
    { id: 3, name: 'Node 3', children: [] },
    { id: 4, name: 'Node 4', children: [] },
    { id: 5, name: 'Node 5', children: [] },
  ], []);

  const [tree, setTree] = useState(initialTree);
  const [nextId, setNextId] = useState(6);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const resetTree = () => {
    setTree(initialTree);
    setNextId(6);
    setEditingNodeId(null);
    setEditValue('');
  };

  const addNode = (parentId) => {
    const newNode = {
      id: nextId,
      name: `Node ${nextId}`,
      children: [],
    };
    
    const { newTree, success } = addNodeToTree(tree, parentId, newNode);
    
    if (success) {
      setTree(newTree);
      setNextId(nextId + 1);
    }
  };

  const removeNode = (id) => {
    const newTree = removeNodeFromTree(tree, id);
    setTree(newTree);
    
    if (editingNodeId === id) {
      setEditingNodeId(null);
    }
  };

  const editNode = (id, newName) => {
    const newTree = editNodeInTree(tree, id, newName);
    setTree(newTree);
  };

  const startEdit = (id, currentName) => {
    setEditingNodeId(id);
    setEditValue(currentName);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const saveEdit = () => {
    if (editingNodeId && editValue.trim()) {
      editNode(editingNodeId, editValue);
      setEditingNodeId(null);
    }
  };

  return (
    <div>
      <TreeView
        tree={tree}
        onAdd={addNode}
        onRemove={removeNode}
        onEdit={editNode}
        editingNodeId={editingNodeId}
        editValue={editValue}
        onEditChange={handleEditChange}
        onEditSave={saveEdit}
        onEditStart={startEdit}
      />
      <div className="tree-reset-container">
        <button onClick={resetTree} className="tree-reset-btn">
          Reset Tree
        </button>
      </div>
    </div>
  );
};

export default TreeContainer;