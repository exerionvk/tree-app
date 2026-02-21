import React, { useState, useMemo } from 'react';
import TreeView from '../components/TreeView';

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

  const findNodeById = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children.length > 0) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const addNode = (parentId) => {
    const newTree = JSON.parse(JSON.stringify(tree));
    const parent = findNodeById(newTree, parentId);
    if (parent) {
      parent.children.push({
        id: nextId,
        name: `Node ${nextId}`,
        children: [],
      });
      setNextId(nextId + 1);
      setTree(newTree);
    }
  };

  const removeNode = (id) => {
    const removeRecursive = (nodes, targetId) => {
      return nodes.filter((node) => {
        if (node.id === targetId) return false;
        node.children = removeRecursive(node.children, targetId);
        return true;
      });
    };
    setTree(removeRecursive(JSON.parse(JSON.stringify(tree)), id));
    if (editingNodeId === id) {
      setEditingNodeId(null);
    }
  };

  const editNode = (id, newName) => {
    const editRecursive = (nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, name: newName };
        }
        return { ...node, children: editRecursive(node.children) };
      });
    };
    setTree(editRecursive([...tree]));
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