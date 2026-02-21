import React from 'react';
import TreeNode from './TreeNode';
import '../index.css';

const TreeView = ({ tree, onAdd, onRemove, onEdit, editingNodeId, editValue, onEditChange, onEditSave, onEditStart }) => {
  return (
    <div className="tree-app">
      <h1 className="tree-title">Древовидная структура</h1>
      <div className="tree-view">
        {tree.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            onAdd={onAdd}
            onRemove={onRemove}
            onEdit={onEdit}
            editingNodeId={editingNodeId}
            editValue={editValue}
            onEditChange={onEditChange}
            onEditSave={onEditSave}
            onEditStart={onEditStart}
            isRoot={true}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeView;