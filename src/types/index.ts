// TypeScript types for the Sudo-Start application

export type OS = 'macos' | 'linux';
export type Shell = 'bash' | 'zsh' | 'fish';
export type Category =
  | 'ide'
  | 'browser'
  | 'tool'
  | 'runtime'
  | 'database'
  | 'container'
  | 'terminal'
  | 'framework'
  | 'devops'
  | 'data-science'
  | 'mobile'
  | 'game-dev'
  | 'desktop-dev'
  | 'web-server'
  | 'package-manager'
  | 'build-tool'
  | 'cloud'
  | 'utility'
  | 'communication'
  | 'productivity';

// App version with platform-specific install commands
export interface AppVersion {
  id: string;
  label: string;
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
  icon?: string;

  // Platform support
  platforms: PlatformSupport;

  // Version support
  defaultVersion: string;
  versions: AppVersion[];

  // Legacy support
  selectedVersion?: string;
  macosInstallCmd?: string;
  linuxInstallCmd?: string;

  // Versioning templates
  linuxCommandTemplate?: string;
  macosCommandTemplate?: string;
}

export interface AppState {
  os: OS | null;
  shell: Shell | null;
  bucket: Package[];
  generatedScript: string;
  currentStep: 'boot' | 'catalog' | 'chat' | 'output';
  isChatOpen: boolean;

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