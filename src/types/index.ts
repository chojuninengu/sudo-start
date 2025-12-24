// TypeScript types for the Sudo-Start application

export type OS = 'macos' | 'linux';
export type Shell = 'bash' | 'zsh' | 'fish';

export interface Package {
  id: string;
  name: string;
  description: string;
  category: 'ide' | 'browser' | 'tool' | 'runtime' | 'database' | 'container';
  versions?: string[];
  selectedVersion?: string;
  macosInstallCmd?: string;
  linuxInstallCmd?: string;
}

export interface AppState {
  // OS and Shell selection
  os: OS | null;
  shell: Shell | null;
  
  // Package bucket (cart)
  bucket: Package[];
  
  // Generated script
  generatedScript: string;
  
  // UI state
  currentStep: 'boot' | 'catalog' | 'chat' | 'output';
  isChatOpen: boolean;
  
  // Actions
  setOS: (os: OS) => void;
  setShell: (shell: Shell) => void;
  addToBucket: (pkg: Package) => void;
  removeFromBucket: (pkgId: string) => void;
  updatePackageVersion: (pkgId: string, version: string) => void;
  setGeneratedScript: (script: string) => void;
  setCurrentStep: (step: 'boot' | 'catalog' | 'chat' | 'output') => void;
  toggleChat: () => void;
  clearBucket: () => void;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
