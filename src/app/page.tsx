'use client';

import { useStore } from '@/lib/store';
import { BootScreen } from '@/components/boot-screen';
import { PackageManager } from '@/components/package-manager';
import { ChatWindow } from '@/components/chat-window';
import { ScriptOutput } from '@/components/script-output';

export default function Home() {
  const { currentStep } = useStore();

  return (
    <main className="min-h-screen">
      {currentStep === 'boot' && <BootScreen />}
      {currentStep === 'catalog' && <PackageManager />}
      {currentStep === 'output' && <ScriptOutput />}

      {/* Chat Window - Available on catalog and output steps */}
      {(currentStep === 'catalog' || currentStep === 'output') && <ChatWindow />}
    </main>
  );
}
