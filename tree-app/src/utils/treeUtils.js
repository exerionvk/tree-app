export const deepCopyTree = (tree) => {
  return JSON.parse(JSON.stringify(tree));
};

export const findNodeById = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children.length > 0) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const addNodeToTree = (tree, parentId, newNode) => {
  const newTree = deepCopyTree(tree);
  const parent = findNodeById(newTree, parentId);
  
  if (parent) {
    parent.children.push(newNode);
    return { newTree, success: true };
  }
  
  return { newTree, success: false };
};

export const removeNodeFromTree = (tree, targetId) => {
  const removeRecursive = (nodes) => {
    return nodes.filter((node) => {
      if (node.id === targetId) return false;
      node.children = removeRecursive(node.children);
      return true;
    });
  };
  
  return removeRecursive(deepCopyTree(tree));
};

export const editNodeInTree = (tree, nodeId, newName) => {
  const editRecursive = (nodes) => {
    return nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, name: newName };
      }
      return { ...node, children: editRecursive(node.children) };
    });
  };
  
  return editRecursive([...tree]);
};

export const hasChildren = (node) => {
  return node.children && node.children.length > 0;
};