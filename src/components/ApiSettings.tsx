
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveApiKey } from '@/utils/apiService';
import { useToast } from '@/hooks/use-toast';

interface ApiSettingsProps {
  trigger: React.ReactNode;
}

const ApiSettings: React.FC<ApiSettingsProps> = ({ trigger }) => {
  const [deepseekKey, setDeepseekKey] = useState('');
  const [openrouterKey, setOpenrouterKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved keys when component mounts
    const savedDeepseekKey = localStorage.getItem('deepseekApiKey') || '';
    const savedOpenrouterKey = localStorage.getItem('openrouterApiKey') || '';
    setDeepseekKey(savedDeepseekKey);
    setOpenrouterKey(savedOpenrouterKey);
  }, []);

  const handleSave = () => {
    // Save API keys
    saveApiKey('deepseek', deepseekKey);
    saveApiKey('openrouter', openrouterKey);
    
    toast({
      title: "Settings saved",
      description: "Your API keys have been saved securely to your browser's local storage."
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deepseek" className="text-right col-span-1">
              DeepSeek
            </Label>
            <Input
              id="deepseek"
              type="password"
              value={deepseekKey}
              onChange={(e) => setDeepseekKey(e.target.value)}
              placeholder="sk-*****"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="openrouter" className="text-right col-span-1">
              OpenRouter
            </Label>
            <Input
              id="openrouter"
              type="password"
              value={openrouterKey}
              onChange={(e) => setOpenrouterKey(e.target.value)}
              placeholder="sk-or-*****"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiSettings;
