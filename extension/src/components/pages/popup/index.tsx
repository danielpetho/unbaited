import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from 'react';

function Popup() {
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Load both API key and enabled state
    chrome.storage.local.get(['groqApiKey', 'isEnabled'], (result) => {
      setHasApiKey(!!result.groqApiKey);
      // Default to true if not set
      setIsEnabled(result.isEnabled ?? true);
    });
  }, []);

  const toggleExtension = async (checked: boolean) => {
    setIsEnabled(checked);
    await chrome.storage.local.set({ isEnabled: checked });
    
    // Notify content script of the change
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    tabs.forEach(tab => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { 
          action: "toggleExtension", 
          isEnabled: checked 
        });
      }
    });
  };

  const openSettings = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="w-[300px] p-5 font-mono lowercase">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src="/logos/logo128.png" 
            alt="Unbaited Logo" 
            className="w-6 h-6 rounded-full"
          />
          <h1 className="text-xl font-semibold text-black m-0">
            unbaited
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isEnabled ? 'on' : 'off'}
          </span>
          <Switch
            checked={isEnabled}
            onCheckedChange={toggleExtension}
            className="data-[state=checked]:bg-black"
          />
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-5 text-pretty">
        Control your feed with LLMs on X
      </p>

      {hasApiKey === false && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
          <p className="text-sm text-red-600 font-medium">
            ⚠️ API key not set
          </p>
          <p className="text-sm text-red-500 mt-1">
            Please set your Groq API key in the settings to use this extension.
          </p>
        </div>
      )}

      <div className="p-0 mb-5">
        <p className="text-sm text-muted-foreground mb-2">
          To use this extension, you need to:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li className="my-1">Set up your API keys</li>
          <li className="my-1">Customize system prompts (optional)</li>
        </ul>
      </div>

      <Button 
        onClick={openSettings}
        className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-full 
        text-sm font-semibold transition-colors lowercase"
      >
        Open Settings
      </Button>
    </div>
  );
}

export default Popup;
  