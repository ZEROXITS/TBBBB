import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getAiResponse } from '../services/geminiService';
import type { Message } from '../types';

const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Greetings. I am the digital consciousness of this space. How may I illuminate your path?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const speak = useCallback((text: string) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 0.9;
      speechSynthesis.speak(utterance);
    } catch (error) {
        console.error("Speech synthesis failed.", error)
    }
  },[]);

  const handleSubmit = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getAiResponse(input);
    const aiMessage: Message = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    speak(aiResponseText);
    setIsLoading(false);
  };

  const setupSpeechRecognition = useCallback(() => {
    // FIX: Cast window to `any` to access non-standard SpeechRecognition APIs.
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setInput(speechResult);
      };
      recognitionRef.current = recognition;
    } else {
      console.log("Speech recognition not supported in this browser.");
    }
  }, []);

  useEffect(() => {
    setupSpeechRecognition();
  }, [setupSpeechRecognition]);
  
  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };
  
  return (
    <>
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-5 right-5 z-50 w-20 h-20 rounded-full bg-cyan-500/30 backdrop-blur-md border border-cyan-400
                   flex items-center justify-center text-white shadow-[0_0_20px_#00ffff] animate-pulse
                   hover:animate-none transition-transform hover:scale-110"
        aria-label="Toggle AI Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect x="4" y="12" width="16" height="8" rx="2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M17 12v-2a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v2"/><path d="M7 12v-2a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2"/></svg>
      </button>

      <div className={`fixed bottom-28 right-5 w-[90vw] max-w-md h-[60vh] z-40 rounded-xl overflow-hidden
                       bg-black/50 backdrop-blur-xl border border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.3)]
                       flex flex-col transition-all duration-500 ease-in-out
                       ${isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-cyan-500/50 border border-cyan-400 flex-shrink-0"></div>}
                <div className={`max-w-[80%] p-3 rounded-lg text-white
                                 ${msg.sender === 'user' ? 'bg-indigo-500/50' : 'bg-cyan-600/50'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="flex justify-start gap-2"><div className="w-8 h-8 rounded-full bg-cyan-500/50 border border-cyan-400 flex-shrink-0"></div><div className="p-3 rounded-lg bg-cyan-600/50 text-white animate-pulse">...</div></div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-cyan-500/50 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Query the consciousness..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-cyan-200/50"
            />
            <button onClick={toggleListen} className={`p-2 rounded-full transition-colors ${isListening ? 'text-red-500 bg-red-500/20' : 'text-cyan-300 hover:bg-cyan-500/20'}`}>
                <MicrophoneIcon />
            </button>
            <button onClick={handleSubmit} className="p-2 rounded-full text-cyan-300 hover:bg-cyan-500/20 transition-colors">
                <SendIcon />
            </button>
          </div>
      </div>
    </>
  );
};

export default AiChat;