import React from 'react';
import TreeNode from './TreeNode';
import { TreeViewProps } from '../types/tree.types';
import styles from './TreeView.module.scss';

const TreeView: React.FC<TreeViewProps> = ({ 
  tree, 
  onAdd, 
  onRemove, 
  onEdit, 
  editingNodeId, 
  editValue, 
  onEditChange, 
  onEditSave, 
  onEditStart 
}) => {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Древовидная структура</h1>
      <div className={styles.view}>
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