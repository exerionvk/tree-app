import { useState, useMemo, useCallback } from 'react';
import { 
  addNodeToTree, 
  removeNodeFromTree, 
  editNodeInTree 
} from '../utils/treeUtils';

export const useTree = () => {
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

  const resetTree = useCallback(() => {
    setTree(initialTree);
    setNextId(6);
    setEditingNodeId(null);
    setEditValue('');
  }, [initialTree]);

  const addNode = useCallback((parentId) => {
    const newNode = {
      id: nextId,
      name: `Node ${nextId}`,
      children: [],
    };
    
    const { newTree, success } = addNodeToTree(tree, parentId, newNode);
    
    if (success) {
      setTree(newTree);
      setNextId(prevId => prevId + 1);
    }
  }, [tree, nextId]);

  const removeNode = useCallback((id) => {
    const newTree = removeNodeFromTree(tree, id);
    setTree(newTree);
    
    setEditingNodeId(prevId => prevId === id ? null : prevId);
  }, [tree]);

  const editNode = useCallback((id, newName) => {
    const newTree = editNodeInTree(tree, id, newName);
    setTree(newTree);
  }, [tree]);

  const startEdit = useCallback((id, currentName) => {
    setEditingNodeId(id);
    setEditValue(currentName);
  }, []);

  const handleEditChange = useCallback((e) => {
    setEditValue(e.target.value);
  }, []);

  const saveEdit = useCallback(() => {
    if (editingNodeId && editValue.trim()) {
      editNode(editingNodeId, editValue);
      setEditingNodeId(null);
    }
  }, [editingNodeId, editValue, editNode]);

  return {
    tree,
    editingNodeId,
    editValue,
    resetTree,
    addNode,
    removeNode,
    editNode,
    startEdit,
    handleEditChange,
    saveEdit
  };
};