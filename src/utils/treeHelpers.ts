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

export function collectDescendantBranchIds(node: TreeNode): string[] {
  let ids: string[] = [];
  if (node.type === 'branch' && node.children) {
    node.children.forEach((child: TreeNode) => {
      if (child.type === 'branch') {
        ids.push(child.id);
        ids = ids.concat(collectDescendantBranchIds(child));
      }
    });
  }
  return ids;
}

export function getNodeDepth(nodeId: string, nodeMap: Map<string, TreeNode>): number {
  let depth = 0;
  let currentId = nodeId;
  while (currentId) {
    const node = nodeMap.get(currentId);
    if (!node || !node.parentId) break;
    currentId = node.parentId;
    depth++;
  }
  return depth;
} 