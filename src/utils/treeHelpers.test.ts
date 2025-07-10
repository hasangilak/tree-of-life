import { describe, it, expect } from 'vitest';
import { parseApiTree, collectDescendantBranchIds, getNodeDepth } from './treeHelpers';
import type { TreeNode } from '../types/tree';

describe('treeHelpers', () => {
  const sampleTree = {
    type: 'branch',
    label: 'Root',
    children: [
      {
        type: 'branch',
        label: 'Branch1',
        children: [
          { type: 'leaf', data: { name: 'Leaf1', status: 'en' } },
          { type: 'leaf', data: { name: 'Leaf2', status: 'vu' } },
        ],
      },
      {
        type: 'branch',
        label: 'Branch2',
        children: [
          { type: 'leaf', data: { name: 'Leaf3', status: 'nt' } },
        ],
      },
    ],
  };

  it('parseApiTree should parse API tree and assign ids', () => {
    const tree = parseApiTree(sampleTree);
    expect(tree).toHaveProperty('id');
    expect(tree.type).toBe('branch');
    if (tree.type === 'branch') {
      expect(tree.children.length).toBe(2);
      expect(tree.children[0].type).toBe('branch');
      if (tree.children[0].type === 'branch') {
        expect(tree.children[0].children[0].type).toBe('leaf');
      }
    }
  });

  it('collectDescendantBranchIds should return all descendant branch ids', () => {
    const tree = parseApiTree(sampleTree);
    const ids = collectDescendantBranchIds(tree);
    expect(Array.isArray(ids)).toBe(true);
    if (tree.type === 'branch') {
      expect(ids.length).toBe(2); // Branch1 and Branch2
      expect(ids).toContain(tree.children[0].id);
      expect(ids).toContain(tree.children[1].id);
    }
  });

  it('getNodeDepth should return correct depth', () => {
    const tree = parseApiTree(sampleTree);
    // Build nodeMap
    function buildNodeMap(node: TreeNode, map = new Map<string, TreeNode>()) {
      map.set(node.id, node);
      if (node.type === 'branch') {
        node.children.forEach(child => buildNodeMap(child, map));
      }
      return map;
    }
    const nodeMap = buildNodeMap(tree);
    expect(getNodeDepth(tree.id, nodeMap)).toBe(0);
    if (tree.type === 'branch') {
      expect(getNodeDepth(tree.children[0].id, nodeMap)).toBe(1);
      if (tree.children[0].type === 'branch') {
        expect(getNodeDepth(tree.children[0].children[0].id, nodeMap)).toBe(2);
      }
    }
  });
}); 