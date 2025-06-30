'use client';

import React, { useState, useRef, useEffect } from 'react';

interface RichTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSubmit?: () => void;
  disabled?: boolean;
}

const placeholderExamples = [
  // L0 - Connector Agents
  {
    title: "Google Calendar Sync Agent",
    description: "Pulls events from your calendar and displays them in documents.",
    tasks: [
      "• Connects to Google Calendar API on demand",
      "• Fetches upcoming events when requested",
      "• Displays event details in formatted lists"
    ]
  },
  {
    title: "CRM Data Export Agent", 
    description: "Exports customer contact information from Salesforce to CSV files.",
    tasks: [
      "• Connects to Salesforce on scheduled basis",
      "• Pulls contact records and interaction history", 
      "• Generates CSV files for backup purposes"
    ]
  },
  // L1 - Task Agents
  {
    title: "Content Moderation Agent",
    description: "Reviews and filters user-generated content using AI detection models.",
    tasks: [
      "• Scans posts for inappropriate content automatically",
      "• Categorizes violations and assigns severity levels",
      "• Routes complex cases to human moderators for review"
    ]
  },
  {
    title: "Invoice Processing Agent",
    description: "Handles incoming invoices from extraction through approval routing.",
    tasks: [
      "• Extracts data from invoice PDFs using OCR",
      "• Validates amounts against purchase order records",
      "• Routes to appropriate managers based on approval thresholds"
    ]
  },
  // L2 - Collaborative Agents  
  {
    title: "Project Orchestration Agent",
    description: "Manages end-to-end project workflows by coordinating teams and resources.",
    tasks: [
      "• Monitors project dependencies and automatically adjusts timelines",
      "• Coordinates team schedules and identifies resource conflicts",
      "• Proactively surfaces risks and suggests mitigation strategies"
    ]
  },
  {
    title: "Sales Pipeline Agent",
    description: "Orchestrates the entire sales process from lead qualification to deal closure.",
    tasks: [
      "• Qualifies leads and scores them based on behavioral patterns",
      "• Coordinates follow-up sequences and nurture campaigns",
      "• Learns from successful deals to optimize future opportunities"
    ]
  }
];

export function RichTextInput({ value, onChange, className, onSubmit, disabled }: RichTextInputProps) {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Rotate placeholder every 16 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
    }, 16000);
    return () => clearInterval(interval);
  }, []);

  const currentExample = placeholderExamples[currentPlaceholderIndex];
  const currentPlaceholder = `Example: ${currentExample.description}\n\nWhat it does:\n${currentExample.tasks.join('\n')}`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit?.();
    }

    // Auto-bullet formatting with "- " shortcut (converts to "• ")
    if (e.key === 'Enter' && !e.shiftKey) {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = value.substring(0, cursorPos);
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];

      // Check if current line starts with "• " 
      if (currentLine.trim().startsWith('• ') || currentLine.trim() === '•') {
        e.preventDefault();
        const newValue = value.substring(0, cursorPos) + '\n• ' + value.substring(textarea.selectionEnd);
        onChange(newValue);
        
        // Set cursor position after the "• "
        setTimeout(() => {
          if (textarea) {
            textarea.selectionStart = textarea.selectionEnd = cursorPos + 3;
          }
        }, 0);
      }
    }

    // Delete empty bullet point
    if (e.key === 'Backspace') {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = value.substring(0, cursorPos);
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];

      if (currentLine === '• ' && cursorPos > 0) {
        e.preventDefault();
        const newValue = value.substring(0, cursorPos - 2) + value.substring(cursorPos);
        onChange(newValue);
        
        setTimeout(() => {
          if (textarea) {
            textarea.selectionStart = textarea.selectionEnd = cursorPos - 2;
          }
        }, 0);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const textarea = e.target;
    const cursorPos = textarea.selectionStart;
    
    // Check if user just typed "- " and convert it to "• "
    if (newValue.length > value.length) {
      const addedText = newValue.substring(value.length);
      if (addedText === ' ') {
        const textBeforeCursor = newValue.substring(0, cursorPos);
        const lines = textBeforeCursor.split('\n');
        const currentLine = lines[lines.length - 1];
        
        if (currentLine.endsWith('- ')) {
          const convertedValue = newValue.substring(0, cursorPos - 2) + '• ' + newValue.substring(cursorPos);
          onChange(convertedValue);
          
          // Set cursor position after the "• "
          setTimeout(() => {
            if (textarea) {
              textarea.selectionStart = textarea.selectionEnd = cursorPos;
            }
          }, 0);
          return;
        }
      }
    }
    
    onChange(newValue);
  };

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={currentPlaceholder}
          disabled={disabled}
          className={`w-full h-[24rem] text-sm rounded-2xl p-6 pr-12 pb-20 placeholder-[#b97a3c66] focus:outline-none focus:ring-2 focus:ring-[#e6dcc7] resize-none scrollbar-hide hover:scrollbar-show force-black-text ${className}`}
          style={{ 
            backgroundColor: 'rgba(230, 220, 199, 0.4)',
            color: '#000000 !important'
          }}
        />
      </div>
    </div>
  );
} 