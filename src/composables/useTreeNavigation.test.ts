import { describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useTreeNavigation } from './useTreeNavigation';
import type { TreeNode } from '../types/tree';

describe('useTreeNavigation', () => {
  let treeData: TreeNode[];
  let root: TreeNode;
  let branch1: TreeNode;
  let branch2: TreeNode;
  let leaf1: TreeNode;
  let leaf2: TreeNode;

  beforeEach(() => {
    leaf1 = { id: 'leaf1', type: 'leaf', data: { name: 'Leaf1', status: 'en' }, parentId: 'branch1' };
    leaf2 = { id: 'leaf2', type: 'leaf', data: { name: 'Leaf2', status: 'vu' }, parentId: 'branch1' };
    branch1 = { id: 'branch1', type: 'branch', label: 'Branch1', parentId: 'root', children: [leaf1, leaf2] };
    branch2 = { id: 'branch2', type: 'branch', label: 'Branch2', parentId: 'root', children: [] };
    root = { id: 'root', type: 'branch', label: 'Root', children: [branch1, branch2] };
    treeData = [root];
  });

  it('selects and expands a branch node', () => {
    const nav = useTreeNavigation(ref(treeData));
    nav.selectNode('branch1');
    expect(nav.selectedNodeId.value).toBe('branch1');
    expect(nav.expandedNodes.value).toContain('branch1');
  });

  it('collapses siblings when expanding a branch', () => {
    const nav = useTreeNavigation(ref(treeData));
    nav.expandNode('branch1');
    expect(nav.expandedNodes.value).toContain('branch1');
    nav.expandNode('branch2');
    expect(nav.expandedNodes.value).toContain('branch2');
    expect(nav.expandedNodes.value).not.toContain('branch1');
  });

  it('collapses all descendants when selecting root', () => {
    const nav = useTreeNavigation(ref(treeData));
    nav.expandNode('branch1');
    expect(nav.expandedNodes.value).toContain('branch1');
    expect(nav.expandedNodes.value).not.toContain('branch2');
    nav.expandNode('branch2');
    expect(nav.expandedNodes.value).toContain('branch2');
    expect(nav.expandedNodes.value).not.toContain('branch1');
    nav.selectNode('root');
    expect(nav.expandedNodes.value).not.toContain('branch1');
    expect(nav.expandedNodes.value).not.toContain('branch2');
  });

  it('collapseNode removes node from expandedNodes', () => {
    const nav = useTreeNavigation(ref(treeData));
    nav.expandNode('branch1');
    expect(nav.expandedNodes.value).toContain('branch1');
    nav.collapseNode('branch1');
    expect(nav.expandedNodes.value).not.toContain('branch1');
  });
}); 