// Тип для узла дерева
export interface TreeNode {
  id: number;
  name: string;
  children: TreeNode[];
}

// Тип для пропсов TreeNode компонента
export interface TreeNodeProps {
  node: TreeNode;
  onAdd: (parentId: number) => void;
  onRemove: (id: number) => void;
  onEdit: (id: number, newName: string) => void;
  editingNodeId: number | null;
  editValue: string;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSave: () => void;
  onEditStart: (id: number, currentName: string) => void;
  isRoot?: boolean;
}

// Тип для пропсов TreeView компонента
export interface TreeViewProps {
  tree: TreeNode[];
  onAdd: (parentId: number) => void;
  onRemove: (id: number) => void;
  onEdit: (id: number, newName: string) => void;
  editingNodeId: number | null;
  editValue: string;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSave: () => void;
  onEditStart: (id: number, currentName: string) => void;
}

// Тип для результата добавления узла
export interface AddNodeResult {
  newTree: TreeNode[];
  success: boolean;
}

// Тип для возвращаемого значения useTree хука
export interface UseTreeReturn {
  tree: TreeNode[];
  editingNodeId: number | null;
  editValue: string;
  resetTree: () => void;
  addNode: (parentId: number) => void;
  removeNode: (id: number) => void;
  editNode: (id: number, newName: string) => void;
  startEdit: (id: number, currentName: string) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveEdit: () => void;
}