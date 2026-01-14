// TypeScript types for the Sudo-Start application

export type OS = 'macos' | 'linux';
export type Shell = 'bash' | 'zsh' | 'fish';
export type Category = 'ide' | 'browser' | 'tool' | 'runtime' | 'database' | 'container' | 'terminal';

// App version with platform-specific install commands
export interface AppVersion {
  id: string;
  label: string; // e.g. "Stable", "Beta", "Insiders"
  macCommand: string;
  linuxCommand: string;
}

// Platform availability
export interface PlatformSupport {
  macos: boolean;
  linux: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon?: string; // Optional icon URL or icon name
  
  // Platform support
  platforms: PlatformSupport;
  
  // Version support
  defaultVersion: string;
  versions: AppVersion[];
  
  // Legacy support for backward compatibility
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
  addDefaultAppsToBucket: () => void;
  setGeneratedScript: (script: string) => void;
  setCurrentStep: (step: 'boot' | 'catalog' | 'chat' | 'output') => void;
  toggleChat: () => void;
  clearBucket: () => void;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

