"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, RefreshCw, Download, Copy, CheckCheck } from "lucide-react";
import { FormData } from "@/lib/types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  formData: FormData | null;
}

const ChatInterface = ({ formData }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initial greeting message
  useEffect(() => {
    const initialMessage = {
      role: "assistant" as const,
      content: `Hi there! I'm your Ideation Assistant. I've received your intake form responses and I'm ready to help you brainstorm and develop your idea further. Let's explore your concept together and create a comprehensive value proposition.

Based on your input, I understand you're working on ${formData?.problemStatement ? `addressing the problem: "${formData.problemStatement.substring(0, 100)}${formData.problemStatement.length > 100 ? '...' : ''}"` : 'a new concept'}.

Let's start by discussing your target audience and how your solution addresses their specific needs. What aspects of your value proposition would you like to explore first?`
    };
    
    setMessages([initialMessage]);
  }, [formData]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      // Generate a response based on the conversation context
      const aiResponse = generateResponse(userMessage.content, messages);
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: aiResponse
      }]);
      
      setIsLoading(false);
      
      // Check if we should show summary (in a real app, this would be determined by the AI)
      if (messages.length >= 6 && !showSummary) {
        generateSummary();
      }
    }, 1500);
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Generate AI response (simplified simulation)
  const generateResponse = (userInput: string, conversationHistory: ChatMessage[]): string => {
    const userInputLower = userInput.toLowerCase();
    
    // Check for keywords to determine response
    if (userInputLower.includes("target audience") || userInputLower.includes("customer")) {
      return `Based on your intake form, you're targeting ${formData?.targetAudience.join(", ")}. Let's think about their specific needs and pain points:

1. What specific problems do they face that your solution addresses?
2. How does your solution fit into their existing workflows or habits?
3. What alternatives are they currently using?

Understanding these aspects will help us refine your value proposition to resonate strongly with your target audience.`;
    } 
    else if (userInputLower.includes("revenue") || userInputLower.includes("pricing") || userInputLower.includes("monetization")) {
      return `You've indicated interest in ${formData?.revenueModel.join(", ")} revenue models. Let's explore how these might work for your specific solution:

1. What pricing structure would provide the best value to customers while ensuring profitability?
2. How does your pricing compare to alternatives in the market?
3. Are there opportunities for upselling or cross-selling additional features?

A well-designed revenue model should align with your customers' perceived value and willingness to pay.`;
    }
    else if (userInputLower.includes("risk") || userInputLower.includes("challenge") || userInputLower.includes("concern")) {
      return `You've identified some risks and concerns: "${formData?.riskConcerns}".

Let's address these systematically:

1. Market risks: How crowded is the competitive landscape? What's your differentiation strategy?
2. Technical risks: What are the key technical challenges in building your solution?
3. Regulatory risks: Are there compliance requirements that might impact your solution?

For each risk, we should develop mitigation strategies to increase your chances of success.`;
    }
    else if (userInputLower.includes("innovation") || userInputLower.includes("unique") || userInputLower.includes("different")) {
      return `You've characterized your innovation level as "${formData?.innovationLevel}". This gives us a good framework for positioning your solution.

Let's explore what makes your approach innovative:

1. What specific aspects of your solution are novel or different from existing alternatives?
2. How does this innovation translate to tangible benefits for your users?
3. Is your innovation protected or protectable through IP strategies?

Clearly articulating your innovation will be crucial for attracting both users and potential investors.`;
    }
    else if (userInputLower.includes("summary") || userInputLower.includes("report")) {
      generateSummary();
      return "I'm generating a summary report of our discussion for you now...";
    }
    else {
      // Generic response for other inputs
      return `That's an interesting point about ${userInput.split(" ").slice(0, 3).join(" ")}...

Let's explore this further in the context of your ${formData?.industryDomain || "industry"} focus. 

1. How does this aspect fit with your overall value proposition?
2. What impact might this have on your target audience's experience?
3. Are there any competitive or market insights we should consider here?

Would you like to dive deeper into any specific element of your value proposition?`;
    }
  };

  // Generate summary report
  const generateSummary = () => {
    setShowSummary(true);
    
    // In a real app, this would be generated by the AI based on the conversation
    const summaryText = `# Value Proposition Summary Report

## Problem Statement
${formData?.problemStatement || "Not specified"}

## Target Audience
${formData?.targetAudience.join(", ")}
${formData?.targetAudienceOther ? `Additional audience: ${formData.targetAudienceOther}` : ""}

## Value Proposition
${formData?.valueProposition || "Not specified"}

## Revenue Model
${formData?.revenueModel.join(", ")}
${formData?.revenueModelOther ? `Additional model: ${formData.revenueModelOther}` : ""}

## Innovation Level
${formData?.innovationLevel || "Not specified"}

## Industry/Domain
${formData?.industryDomain || "Not specified"}

## Key Risks & Mitigations
${formData?.riskConcerns || "Not specified"}

### Risk Mitigation Strategies:
1. Conduct thorough market research to validate demand
2. Develop a minimum viable product (MVP) to test key assumptions
3. Consult with regulatory experts if applicable to your domain

## Next Steps Recommendations
1. Refine your value proposition based on our discussion
2. Validate key assumptions through customer interviews
3. Develop a prototype or MVP to test with early adopters
4. Identify key metrics to measure success
5. Create a roadmap for development and go-to-market strategy

This summary represents the current state of your idea based on our ideation session. Use it as a foundation for further development and refinement.`;
    
    setSummary(summaryText);
  };

  // Copy summary to clipboard
  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download summary as text file
  const handleDownloadSummary = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], {type: "text/plain"});
    element.href = URL.createObjectURL(file);
    element.download = "value-proposition-summary.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-160px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
          Ideation Assistant
        </h2>
        <p className="text-[#1A1A1A] opacity-80">
          Let's develop your idea together. I'll help you refine your value proposition and address key considerations.
        </p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "flex justify-end" : "flex justify-start"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-[#0066CC] text-white"
                      : "bg-[#E6F1FF] text-[#1A1A1A]"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </motion.div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#E6F1FF] p-3 rounded-lg text-[#1A1A1A] max-w-[80%]"
                >
                  <div className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Thinking...
                  </div>
                </motion.div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] resize-none"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={input.trim() === "" || isLoading}
                className={`ml-2 p-3 rounded-lg ${
                  input.trim() === "" || isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#0066CC] text-white hover:bg-[#0055AA]"
                } transition-colors`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Summary Panel (conditionally rendered) */}
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-2/5 bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="p-4 bg-[#0066CC] text-white flex justify-between items-center">
              <h3 className="font-bold">Value Proposition Summary</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleCopySummary}
                  className="p-1 rounded hover:bg-[#0055AA] transition-colors"
                  aria-label="Copy summary"
                >
                  {copied ? <CheckCheck className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
                <button
                  onClick={handleDownloadSummary}
                  className="p-1 rounded hover:bg-[#0055AA] transition-colors"
                  aria-label="Download summary"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <pre className="whitespace-pre-wrap font-sans text-[#1A1A1A]">
                {summary}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;