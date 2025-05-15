"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "@/components/header";
import IntakeForm from "@/components/intake-form";
import ChatInterface from "@/components/chat-interface";
import { FormData } from "@/lib/types";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setShowChat(true);
    
    // Scroll to chat interface
    setTimeout(() => {
      document.getElementById("chat-interface")?.scrollIntoView({ 
        behavior: "smooth" 
      });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Header />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-5xl page-container"
      >
        {!showChat ? (
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                CHIP 400 Intake Form
              </h1>
              <p className="text-lg text-[#1A1A1A] opacity-80">
                Please complete this form to begin your ideation journey. Your responses will help us tailor the ideation process to your specific needs and goals.
              </p>
            </div>
            
            <IntakeForm onSubmit={handleFormSubmit} />
          </motion.div>
        ) : (
          <motion.div
            id="chat-interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ChatInterface formData={formData} />
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}