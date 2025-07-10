import type { TreeNode, Status } from '../types/tree';

let nodeIdCounter = 0;
function generateId() {
  return `node-${nodeIdCounter++}`;
}

export function parseApiTree(
  node: Record<string, unknown>,
  parentId: string | null = null
): TreeNode {
  const id = generateId();
  if (node.type === 'branch') {
    return {
      id,
      type: 'branch',
      label: node.label as string,
      parentId: parentId || undefined,
      children: node.children
        ? (node.children as Record<string, unknown>[]).map((child) => parseApiTree(child, id))
        : [],
    };
  } else if (node.type === 'leaf') {
    return {
      id,
      type: 'leaf',
      data: node.data as { name: string; status: Status },
      parentId: parentId || undefined,
    };
  }
  throw new Error('Unknown node type');
} 