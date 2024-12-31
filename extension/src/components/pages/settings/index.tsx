import React from 'react';
import { ApiKeys } from './api-keys';
import { PromptsSettings } from './prompts';

export default function Settings() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6 font-mono">Settings</h1>
      
      <section className="space-y-6">
        <ApiKeys />
      </section>

      <section className="space-y-6">
        <PromptsSettings />
      </section>
    </div>
  );
}
