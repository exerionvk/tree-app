import React from 'react';
import { TreeNode as TreeNodeType, TreeNodeProps } from '../types/tree.types';
import { hasChildren } from '../utils/treeUtils';
import styles from './TreeNode.module.scss';

const TreeNode: React.FC<TreeNodeProps> = ({ 
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

  return (
    <div className={`${styles.node} ${isRoot ? styles.nodeRoot : ''}`}>
      <div className={styles.content}>
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={onEditChange}
            onBlur={onEditSave}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onEditSave()}
            className={styles.input}
            autoFocus
          />
        ) : (
          <span className={`${styles.name} ${hasChildren(node) ? styles.hasChildren : ''}`}>
            {node.name}
          </span>
        )}

        <div className={styles.buttons}>
          <button 
            onClick={() => onAdd(node.id)}
            className={`${styles.btn} ${styles.btnAdd}`}
          >
            Add
          </button>
          <button 
            onClick={() => onRemove(node.id)}
            className={`${styles.btn} ${styles.btnRemove}`}
          >
            Remove
          </button>
          <button 
            onClick={() => onEditStart(node.id, node.name)}
            className={`${styles.btn} ${styles.btnEdit}`}
          >
            Edit
          </button>
        </div>
      </div>

      {node.children.map((child: TreeNodeType) => (
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