
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ChatInterface from '@/components/ChatInterface';
import { Category } from '@/components/CategorySelector';
import ApiSettings from '@/components/ApiSettings';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const Index = () => {
  // Default to 'Personal' category but hide this from the user
  const [activeCategory, setActiveCategory] = useState<Category>('Personal');

  return (
    <MainLayout title="Indresh 2.0 - Your Personal AI Assistant">
      <div className="flex flex-col h-[80vh]">
        <div className="p-2 bg-white/5 backdrop-blur-sm flex justify-end items-center border-b border-white/10">
          <ApiSettings 
            trigger={
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Settings size={18} />
              </Button>
            } 
          />
        </div>
        <ChatInterface activeCategory={activeCategory} />
      </div>
    </MainLayout>
  );
};

export default Index;
