// Types for the taxonomy tree structure

export type Status = 'nt' | 'lc' | 'vu' | 'en';

export interface LeafNode {
  id: string;
  parentId?: string;
  type: 'leaf';
  data: {
    name: string;
    status: Status;
  };
}

export interface BranchNode {
  id: string;
  parentId?: string;
  type: 'branch';
  label: string;
  children: TreeNode[];
}

export type TreeNode = BranchNode | LeafNode;

// State for tree navigation and visibility
export interface TreeState {
  selectedNodeId: string | null;
  visibleNodeIds: Set<string>;
  expandedPath: string[];
  nodeMap: Map<string, TreeNode>;
}

// Options for tree navigation behavior
export interface TreeNavigationOptions {
  autoExpand?: boolean;
  maxDepth?: number;
  virtualScrolling?: boolean;
} 