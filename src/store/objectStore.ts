import { create } from 'zustand';
import type { SceneObject } from '../types';

interface ObjectState {
  objects: SceneObject[];
  selectedIds: string[];
  addObject: (object: SceneObject) => void;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  removeSelected: () => void;
  select: (id: string, append?: boolean) => void;
}

export const useObjectStore = create<ObjectState>((set) => ({
  objects: [],
  selectedIds: [],
  addObject: (object) => set((s) => ({ objects: [...s.objects, object] })),
  updateObject: (id, updates) =>
    set((s) => ({
      objects: s.objects.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj)),
    })),
  removeSelected: () =>
    set((s) => ({
      objects: s.objects.filter((obj) => !s.selectedIds.includes(obj.id)),
      selectedIds: [],
    })),
  select: (id, append = false) =>
    set((s) => ({ selectedIds: append ? [...new Set([...s.selectedIds, id])] : [id] })),
}));
