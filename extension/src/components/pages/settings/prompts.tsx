import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { 
  DEFAULT_CRITERIA, 
  SYSTEM_PROMPT_PREFIX, 
  SYSTEM_PROMPT_SUFFIX 
} from '@/lib/constants';

export function PromptsSettings() {
  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);
  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(['promptCriteria'], (result) => {
      if (result.promptCriteria) {
        setCriteria(result.promptCriteria);
        setIsDefault(false);
      }
    });
  }, []);

  const handleCriteriaChange = (value: string) => {
    setCriteria(value);
    setIsDefault(value === DEFAULT_CRITERIA);
    chrome.storage.sync.set({ promptCriteria: value });
  };

  const resetToDefault = () => {
    handleCriteriaChange(DEFAULT_CRITERIA);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-mono">Prompt Settings</h2>
        {!isDefault && (
          <button
            onClick={resetToDefault}
            className="text-sm text-gray-500 hover:text-gray-700 font-mono"
          >
            Reset to Default
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 font-mono">
            <Label className="text-gray-700">System Prompt</Label>
            <span className="text-xs text-gray-500">(fixed)</span>
          </div>
          <div className="p-4 bg-gray-100 rounded-md font-mono text-sm text-gray-600">
            {SYSTEM_PROMPT_PREFIX}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 font-mono">
            <Label className="text-gray-700">Detection Criteria</Label>
            <span className="text-xs text-gray-500">(editable)</span>
          </div>
          <textarea
            value={criteria}
            onChange={(e) => handleCriteriaChange(e.target.value)}
            className="w-full h-48 p-4 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter criteria..."
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-gray-700">System Prompt</Label>
            <span className="text-xs text-gray-500">(fixed)</span>
          </div>
          <div className="p-4 bg-gray-100 rounded-md font-mono text-sm text-gray-600">
            {SYSTEM_PROMPT_SUFFIX}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 font-mono">
        Note: The system will always return true/false based on these criteria.
      </div>
    </div>
  );
}
