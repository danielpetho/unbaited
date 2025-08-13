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
  // Production Models
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', provider: 'Meta' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', provider: 'Meta' },
  { id: 'meta-llama/llama-guard-4-12b', name: 'Llama Guard 4 12B', provider: 'Meta' },
  
  // Preview Models
  { id: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek R1 Distill Llama 70B (preview)', provider: 'DeepSeek / Meta' },
  { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', name: 'Llama 4 Maverick 17B 128e Instruct (preview)', provider: 'Meta' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout 17B 16e Instruct (preview)', provider: 'Meta' },
  { id: 'meta-llama/llama-prompt-guard-2-22m', name: 'Llama Prompt Guard 2 22M (preview)', provider: 'Meta' },
  { id: 'meta-llama/llama-prompt-guard-2-86m', name: 'Llama Prompt Guard 2 86M (preview)', provider: 'Meta' },
  { id: 'moonshot/kimi-k2-instruct', name: 'Moonshot Kimi K2 Instruct (preview)', provider: 'Moonshot AI' },
  { id: 'openai/gpt-oss-120b', name: 'OpenAI GPT OSS 120B (preview)', provider: 'OpenAI' },
  { id: 'openai/gpt-oss-20b', name: 'OpenAI GPT OSS 20B (preview)', provider: 'OpenAI' },
  { id: 'qwen/qwen3-32b', name: 'Qwen 3 32B (preview)', provider: 'Alibaba Cloud' },
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
