import { useState, useMemo, useCallback } from 'react';
import { TreeNode, UseTreeReturn } from '../types/tree.types';
import { 
  addNodeToTree, 
  removeNodeFromTree, 
  editNodeInTree 
} from '../utils/treeUtils';

export const useTree = (): UseTreeReturn => {
  // Мемоизируем начальное состояние
  const initialTree = useMemo<TreeNode[]>(() => [
    { id: 1, name: 'Node 1', children: [] },
    { id: 2, name: 'Node 2', children: [] },
    { id: 3, name: 'Node 3', children: [] },
    { id: 4, name: 'Node 4', children: [] },
    { id: 5, name: 'Node 5', children: [] },
  ], []);

  const [tree, setTree] = useState<TreeNode[]>(initialTree);
  const [nextId, setNextId] = useState<number>(6);
  const [editingNodeId, setEditingNodeId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // Сброс дерева
  const resetTree = useCallback((): void => {
    setTree(initialTree);
    setNextId(6);
    setEditingNodeId(null);
    setEditValue('');
  }, [initialTree]);

  // Добавление узла
  const addNode = useCallback((parentId: number): void => {
    const newNode: TreeNode = {
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

  // Удаление узла
  const removeNode = useCallback((id: number): void => {
    const newTree = removeNodeFromTree(tree, id);
    setTree(newTree);
    
    setEditingNodeId(prevId => prevId === id ? null : prevId);
  }, [tree]);

  // Редактирование узла
  const editNode = useCallback((id: number, newName: string): void => {
    const newTree = editNodeInTree(tree, id, newName);
    setTree(newTree);
  }, [tree]);

  // Начать редактирование
  const startEdit = useCallback((id: number, currentName: string): void => {
    setEditingNodeId(id);
    setEditValue(currentName);
  }, []);

  // Изменение значения при редактировании
  const handleEditChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditValue(e.target.value);
  }, []);

  // Сохранить редактирование
  const saveEdit = useCallback((): void => {
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