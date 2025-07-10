import type { TreeNode } from '../types/tree';

let nodeIdCounter = 0;
function generateId() {
  return `node-${nodeIdCounter++}`;
}

export function parseApiTree(
  node: any,
  parentId: string | null = null
): TreeNode {
  const id = generateId();
  if (node.type === 'branch') {
    return {
      id,
      type: 'branch',
      label: node.label,
      parentId: parentId || undefined,
      children: node.children
        ? node.children.map((child: any) => parseApiTree(child, id))
        : [],
    };
  } else if (node.type === 'leaf') {
    return {
      id,
      type: 'leaf',
      data: node.data,
      parentId: parentId || undefined,
    };
  }
  throw new Error('Unknown node type');
} 