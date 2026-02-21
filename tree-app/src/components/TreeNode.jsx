import React from 'react';

const TreeNode = ({ 
  node, 
  onAdd, 
  onRemove, 
  onEdit, 
  editingNodeId, 
  editValue, 
  onEditChange, 
  onEditSave, 
  onEditStart,
  isRoot = false
}) => {
  const isEditing = editingNodeId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`tree-node ${isRoot ? 'tree-node-root' : ''}`}>
      <div className="tree-node-content">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={onEditChange}
            onBlur={onEditSave}
            onKeyDown={(e) => e.key === 'Enter' && onEditSave()}
            className="tree-node-input"
            autoFocus
          />
        ) : (
          <span className={`tree-node-name ${hasChildren ? 'has-children' : ''}`}>
            {node.name}
          </span>
        )}

        <div className="tree-node-buttons">
          <button 
            onClick={() => onAdd(node.id)}
            className="tree-node-btn tree-node-btn-add"
          >
            Add
          </button>
          <button 
            onClick={() => onRemove(node.id)}
            className="tree-node-btn tree-node-btn-remove"
          >
            Remove
          </button>
          <button 
            onClick={() => onEditStart(node.id, node.name)}
            className="tree-node-btn tree-node-btn-edit"
          >
            Edit
          </button>
        </div>
      </div>

      {node.children.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          onAdd={onAdd}
          onRemove={onRemove}
          onEdit={onEdit}
          editingNodeId={editingNodeId}
          editValue={editValue}
          onEditChange={onEditChange}
          onEditSave={onEditSave}
          onEditStart={onEditStart}
          isRoot={false}
        />
      ))}
    </div>
  );
};

export default TreeNode;