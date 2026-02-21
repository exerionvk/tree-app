import React from 'react';
import TreeView from '../components/TreeView';
import { useTree } from '../hooks/useTree';

const TreeContainer = () => {
  const {
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
  } = useTree();

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