import { ApiKeys } from './api-keys';
import { PromptsSettings } from './prompts';
import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const models = [
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B', provider: 'Google' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', provider: 'Meta' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', provider: 'Meta' },
  { id: 'llama-guard-3-8b', name: 'Llama Guard 3 8B', provider: 'Meta' },
  { id: 'llama3-70b-8192', name: 'Llama 3 70B', provider: 'Meta' },
  { id: 'llama3-8b-8192', name: 'Llama 3 8B', provider: 'Meta' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'Mistral' },
];

export default function Settings() {
  const [displayMode, setDisplayMode] = useState<'blur' | 'hide'>('blur');
  const [selectedModel, setSelectedModel] = useState(models[0].id);

  useEffect(() => {
    // Load saved settings
    chrome.storage.sync.get(['displayMode', 'selectedModel'], (result) => {
      if (result.displayMode) {
        setDisplayMode(result.displayMode);
      }
      if (result.selectedModel) {
        setSelectedModel(result.selectedModel);
      }
    });
  }, []);

  const handleDisplayModeChange = (value: string) => {
    const mode = value as 'blur' | 'hide';
    setDisplayMode(mode);
    chrome.storage.sync.set({ displayMode: mode });
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    chrome.storage.sync.set({ selectedModel: modelId });
  };

  const selectedModelName = models.find(m => m.id === selectedModel)?.id || 'Select Model';

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 lowercase">
      <h1 className="text-2xl font-bold mb-6 font-mono">Settings</h1>
      
      <section className="space-y-6">
        <ApiKeys />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono lowercase">Model Selection</h2>
        <div className="flex flex-col space-y-2 font-mono lowercase">
          <Label>Choose Model</Label>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-[240px] flex items-center justify-between px-3 py-2 border rounded-md bg-white font-mono">
              {selectedModelName}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[240px]">
              <DropdownMenuLabel>Models</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {models.map((model) => (
                <DropdownMenuItem
                  key={model.id}
                  onSelect={() => handleModelChange(model.id)}
                  className="flex justify-between font-mono"
                >
                  <span>{model.id}</span>
                  <span className="text-sm text-gray-500">{model.provider}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono">Display Settings</h2>
        <RadioGroup
          defaultValue={displayMode}
          onValueChange={handleDisplayModeChange}
          className="grid gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="blur" id="blur" />
            <Label htmlFor="blur">Blur tweets</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hide" id="hide" />
            <Label htmlFor="hide">Hide tweets</Label>
          </div>
        </RadioGroup>
      </section>

      <section className="space-y-6">
        <PromptsSettings />
      </section>
    </div>
  );
}
