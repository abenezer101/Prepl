"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does the autonomous AI screener work?",
    answer: "Our AI screener conducts technical and behavioral interviews over voice or text, adapting its questions based on the candidate's responses. It evaluates their skills in real-time and provides a detailed score and transcript for your review."
  },
  {
    question: "Can I customize the interview questions?",
    answer: "Yes, you can upload your existing rubrics, select required skills from our library, or provide a job description for the AI to auto-generate a tailored interview plan."
  },
  {
    question: "What types of roles can Prepl screen for?",
    answer: "Prepl is optimized for software engineering, product management, data science, and customer success roles. We continually expand our skill libraries based on industry standards."
  },
  {
    question: "Does the AI support multi-language interviews?",
    answer: "Currently, our primary focus is English, but our latest models support conversational and technical screening in over 20 languages including Spanish, French, and German."
  },
  {
    question: "How do you handle candidate data and privacy?",
    answer: "We are GDPR & SOC2 compliant. Candidate transcripts and audio data are encrypted at rest and in transit. You have full control over data retention policies within your workspace."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full max-w-[800px] mx-auto px-6 font-sans">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Frequently asked questions
        </h2>
        <p className="text-zinc-400 text-lg">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div 
              key={index}
              initial={false}
              className={`border-b border-zinc-800 overflow-hidden ${
                isOpen ? 'pb-6' : 'pb-4'
              }`}
            >
              <button
                className="w-full flex items-center justify-between text-left py-2 focus:outline-none cursor-pointer group"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className={`text-lg font-medium transition-colors ${
                  isOpen ? 'text-stone-200' : 'text-zinc-300 group-hover:text-stone-200'
                }`}>
                  {faq.question}
                </span>
                <span className="ml-4 shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 text-zinc-500 group-hover:bg-stone-800/30 group-hover:text-stone-200 transition-colors">
                  {isOpen ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="pt-2 pr-12 text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
