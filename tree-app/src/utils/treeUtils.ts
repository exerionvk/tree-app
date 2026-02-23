import { TreeNode, AddNodeResult } from '../types/tree.types';

// Функция для глубокого копирования дерева
export const deepCopyTree = (tree: TreeNode[]): TreeNode[] => {
  return JSON.parse(JSON.stringify(tree));
};

// Поиск узла по ID
export const findNodeById = (nodes: TreeNode[], id: number): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children.length > 0) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Добавление нового узла
export const addNodeToTree = (
  tree: TreeNode[], 
  parentId: number, 
  newNode: TreeNode
): AddNodeResult => {
  const newTree = deepCopyTree(tree);
  const parent = findNodeById(newTree, parentId);
  
  if (parent) {
    parent.children.push(newNode);
    return { newTree, success: true };
  }
  
  return { newTree, success: false };
};

// Удаление узла по ID
export const removeNodeFromTree = (tree: TreeNode[], targetId: number): TreeNode[] => {
  const removeRecursive = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.filter((node) => {
      if (node.id === targetId) return false;
      node.children = removeRecursive(node.children);
      return true;
    });
  };
  
  return removeRecursive(deepCopyTree(tree));
};

// Редактирование названия узла
export const editNodeInTree = (
  tree: TreeNode[], 
  nodeId: number, 
  newName: string
): TreeNode[] => {
  const editRecursive = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, name: newName };
      }
      return { ...node, children: editRecursive(node.children) };
    });
  };
  
  return editRecursive([...tree]);
};

// Проверка, есть ли у узла дети
export const hasChildren = (node: TreeNode): boolean => {
  return node.children && node.children.length > 0;
};

// Получить все ID узлов
export const getAllNodeIds = (nodes: TreeNode[]): number[] => {
  let ids: number[] = [];
  
  const collectIds = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      ids.push(node.id);
      if (node.children.length > 0) {
        collectIds(node.children);
      }
    }
  };
  
  collectIds(nodes);
  return ids;
};