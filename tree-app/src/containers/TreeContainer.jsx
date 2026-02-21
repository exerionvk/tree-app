import React from 'react';
import TreeView from '../components/TreeView';
import { useTree } from '../hooks/useTree';
import styles from '../components/TreeView.module.scss';

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
      <div className={styles.resetContainer}>
        <button onClick={resetTree} className={styles.resetBtn}>
          Reset Tree
        </button>
      </div>
    </div>
  );
};

export default TreeContainer;