import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Sprout, 
  ShieldAlert, 
  RefreshCw,
  MessageSquareHeart,
  ChevronDown
} from 'lucide-react';
import { County, LivestockType } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  timestamp: string;
}

interface ShambaCompanionProps {
  isOpen: boolean;
  onClose: () => void;
  farmerCounty?: County;
  farmerLivestock?: string;
}

const QUICK_QUESTIONS = [
  "Kuku zimeacha kula vizuri, what should I check?",
  "Ng'ombe amepunguza maziwa from 22L to 16L this week",
  "How to protect zero-grazing cows from heavy rain & mastitis?",
  "Cheap TMR silage formula to replace commercial dairy meal"
];

export const ShambaCompanion: React.FC<ShambaCompanionProps> = ({
  isOpen,
  onClose,
  farmerCounty,
  farmerLivestock
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'companion',
      text: `Shamba iko aje mkulima! 👌\nI'm your **Shamba Companion**.\n\nAsk me anything about your livestock, poultry, feeds, or how this week's weather affects your farm. Hii ni ya sisi — what are you seeing kwa shamba today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query.trim(),
          county: farmerCounty || 'Kiambu',
          livestock: farmerLivestock || 'Dairy & Poultry',
          history: messages.slice(-4).map(m => ({ role: m.sender, content: m.text }))
        })
      });

      const data = await res.json();
      const botMsg: Message = {
        id: `c-${Date.now()}`,
        sender: 'companion',
        text: data.reply || 'Mkulima, check feed and water intake first. What breed are you keeping?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Companion request error:', err);
      const fallbackMsg: Message = {
        id: `c-${Date.now()}`,
        sender: 'companion',
        text: `Yeah, that could be worth checking 👌\n\nCheck these 3 key things:\n• Feed intake and fresh clean water\n• Sudden night temperature changes\n• Animal resting bedding (keep it dry)\n\nWhat have you noticed so far kwa shamba?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[600px] h-[85vh] bg-white rounded-3xl shadow-2xl border border-[#D8E4D3] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
      
      {/* Top Companion Header */}
      <div className="bg-[#143525] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#2D6A4F]/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-[#2D6A4F] border border-[#52B788]/50 flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5 text-[#95D5B2]" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#143525]" />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-base font-extrabold text-white">Shamba Companion</h3>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#52B788]/25 text-[#95D5B2] font-bold rounded-md">
                AI Vet Guide
              </span>
            </div>
            <p className="text-[11px] text-[#A3B899]">
              Everyday Kenyan farming partner • 60% Eng / 40% Swahili
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          aria-label="Close Assistant"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-[#F8FAF6]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#1B4332] text-white font-medium rounded-tr-xs shadow-xs'
                  : 'bg-white text-[#1C3624] border border-[#DCE7D6] rounded-tl-xs shadow-xs space-y-1'
              }`}
            >
              <div className="whitespace-pre-line">
                {msg.text}
              </div>
              <div
                className={`text-[10px] text-right mt-1 ${
                  msg.sender === 'user' ? 'text-white/60' : 'text-[#7C9786]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#DCE7D6] rounded-2xl p-3.5 text-xs text-[#52796F] flex items-center space-x-2 shadow-xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2D6A4F]" />
              <span>Shamba Companion inatafakari...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="px-3 py-2 bg-[#EFF5EC] border-t border-[#DDE7DA] flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold text-[#52796F] uppercase shrink-0">Quick:</span>
        {QUICK_QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(q)}
            className="px-2.5 py-1 bg-white hover:bg-[#E3EDE0] border border-[#CFDFCB] rounded-full text-[11px] font-medium text-[#1B4332] shrink-0 whitespace-nowrap transition-colors"
          >
            {q.substring(0, 32)}...
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-[#E3ECE0] flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder="Uliza swali: maziwa, kuku, weather, feeds..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3.5 py-2.5 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 text-[#1B4332]"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 bg-[#1B4332] hover:bg-[#143525] disabled:opacity-40 text-white rounded-xl transition-colors shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
