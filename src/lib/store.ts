import { create } from 'zustand';
import { AppState, Package } from '@/types';

export const useStore = create<AppState>((set) => ({
  // Initial state
  os: null,
  shell: null,
  bucket: [],
  generatedScript: '',
  currentStep: 'boot',
  isChatOpen: false,

  // Actions
  setOS: (os) => set({ os }),
  
  setShell: (shell) => set({ shell }),
  
  addToBucket: (pkg) =>
    set((state) => {
      // Check if package already exists in bucket
      const exists = state.bucket.find((p) => p.id === pkg.id);
      if (exists) return state;
      return { bucket: [...state.bucket, pkg] };
    }),
  
  removeFromBucket: (pkgId) =>
    set((state) => ({
      bucket: state.bucket.filter((p) => p.id !== pkgId),
    })),
  
  updatePackageVersion: (pkgId, version) =>
    set((state) => ({
      bucket: state.bucket.map((p) =>
        p.id === pkgId ? { ...p, selectedVersion: version } : p
      ),
    })),
  
  setGeneratedScript: (script) => set({ generatedScript: script }),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  
  clearBucket: () => set({ bucket: [] }),
}));
