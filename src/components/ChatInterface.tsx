import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ChatMessage from './ChatMessage';
import VoiceControls from './VoiceControls';
import { Category } from './CategorySelector';
import { callDeepSeekApi, callOpenRouterApi } from '@/utils/apiService';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  category: Category;
}

interface ChatInterfaceProps {
  activeCategory: Category;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ activeCategory }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Namaste Indresh bhai! Kya hukum hai aaj ke liye? Main Indresh 2.0, aapka personal AI assistant!',
      isUser: false,
      category: 'Personal',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generateIndreshResponse = async (userMessage: string) => {
    // Check if the message is about capabilities
    if (userMessage.toLowerCase().includes("kya kya kar sakte ho") || 
        userMessage.toLowerCase().includes("what can you do")) {
      const capabilities = [
        "Bhai main coding ka samadhan se leke image banane tak sab karta hoon – bas tu bol, ekdum zordar jawaab dunga!",
        "Arre yaar, main toh sab kuch kar sakta hoon! Coding problems solve karna, business ideas dena, ya phir bas timepass - tu bas bol!",
        "Coding, writing, researching, ya phir bas dosti nibhana - jo bhi chahiye batao, main hoon na!",
        "Main tere har sawal ka jawab de sakta hoon - chahe vo technical ho ya personal. Bass pooch le bhai!"
      ];
      return capabilities[Math.floor(Math.random() * capabilities.length)];
    }
    
    // If coding related query, use the DeepSeek API
    if (activeCategory === 'Coding') {
      try {
        const result = await callDeepSeekApi(userMessage);
        
        if (result.error) {
          return `Arre bhai, kuch technical problem ho gaya API ke saath! ${result.response}`;
        }
        
        // Add some personality to the response
        const prefixes = [
          "Bilkul bhai, ye raha code solution: \n\n",
          "Ekdum perfect code mil gaya! Dekho: \n\n",
          "Boss, ye code chalega pakka: \n\n",
          "Ye lo code, ekdum mast: \n\n"
        ];
        
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        return `${prefix}${result.response}`;
      } catch (error) {
        console.error('Error calling API:', error);
        return `Arre bhai, kuch technical problem ho gaya API ke saath! Error details: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    }
    
    // For Personal category, use OpenRouter API
    if (activeCategory === 'Personal') {
      try {
        const result = await callOpenRouterApi(userMessage);
        
        if (result.error) {
          return `Arre bhai, kuch problem ho gaya OpenRouter API ke saath! ${result.response}`;
        }
        
        return result.response;
      } catch (error) {
        console.error('Error calling OpenRouter API:', error);
        return `Arre bhai, kuch technical problem ho gaya API ke saath! Error details: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    }
    
    // Generate personalized responses based on the user message (fallback)
    const responses = [
      `Bilkul bhai! ${userMessage} ke baare mein baat karte hain. Koi specific cheez janna chahte ho?`,
      `Arre haan! ${userMessage} par main kuch interesting bata sakta hoon. Kya specific detail chahiye?`,
      `Kya baat hai! ${userMessage} ke baare mein sochna bahut acha hai. Main help karunga pakka!`,
      `Boss, ${userMessage} ke liye best solution hai ki hum step-by-step approach lein. Pehle batao kya exactly chahiye?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      category: activeCategory,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Generate Indresh response
    try {
      const responseContent = await generateIndreshResponse(inputValue);
      
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        isUser: false,
        category: activeCategory,
      };

      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Arre bhai, kuch technical error ho gaya. Thodi der baad try karte hain!",
        isUser: false,
        category: activeCategory,
      };
      
      setMessages((prevMessages) => [...prevMessages, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleVoiceInput = (text: string) => {
    setInputValue(text);
    toast({
      title: "Voice recognized",
      description: text,
    });
  };

  return (
    <div className="flex flex-col min-h-0 h-full flex-1 glassmorphism-inner overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 rounded-t-2xl min-h-[100px] max-h-[calc(100vh-220px)] flex flex-col justify-end">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            category={message.isUser ? undefined : message.category}
          />
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="border-t border-white/10 p-6 bg-white/3 backdrop-blur-xl rounded-b-2xl">
        <div className="flex gap-3">
          <Input
            placeholder={isLoading ? "Generating response..." : "Type a message or use voice input..."}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-white/15 border-white/10 text-white placeholder:text-white/60 font-medium shadow-inner"
            disabled={isLoading}
            style={{ fontSize: '1.1rem', paddingTop: '0.9rem', paddingBottom: '0.9rem' }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading}
            className="bg-indigo-800/70 hover:bg-indigo-700/90 text-white rounded-xl px-6 shadow-lg font-semibold transition-all border border-indigo-400/20"
          >
            {isLoading ? "..." : "Send"}
          </Button>
          <VoiceControls onVoiceInput={handleVoiceInput} />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
