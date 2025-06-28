'use client';

import React from 'react';

interface AttributeData {
  label: string;
  level: string;
  description: string;
}

interface AttributeVisualizationProps {
  attributes: AttributeData[];
  maturityLevel: 'L0' | 'L1' | 'L2';
}

const attributeDescriptions = {
  'Autonomy': {
    'L0': 'No decision-making authority. Requires explicit invocation for every action.',
    'L1': 'Partial autonomy with limited initiative within defined scope and boundaries.',
    'L2': 'High autonomy with independent decision-making to achieve strategic goals.'
  },
  'Proactivity': {
    'L0': 'Purely reactive. Only responds to direct user requests or external triggers.',
    'L1': 'Sometimes proactive with scheduled actions and context-based suggestions.',
    'L2': 'Fully proactive. Initiates actions based on monitoring and predictive insights.'
  },
  'Integration': {
    'L0': 'Basic 2-way data sync with single sources like calendar or CRM systems.',
    'L1': 'Multi-tool integration with ability to pull data and coordinate across platforms.',
    'L2': 'Comprehensive integration across all relevant tools and systems in workflow.'
  },
  'Use Case Ownership': {
    'L0': 'No end-to-end ownership. Acts only as utility for specific data operations.',
    'L1': 'Owns single job-to-be-done with defined scope and clear boundaries.',
    'L2': 'Full workflow ownership with responsibility for complex multi-step outcomes.'
  },
  'Orchestration': {
    'L0': 'No coordination capabilities. Cannot delegate or manage other agents.',
    'L1': 'Can coordinate sub-tasks and call helper agents within defined workflow.',
    'L2': 'Advanced orchestration of multiple agents, tools, and complex processes.'
  },
  'Intelligence': {
    'L0': 'No contextual understanding or learning. Pure data access and manipulation.',
    'L1': 'Uses user and content context with short-term memory and basic adaptation.',
    'L2': 'Deep contextual intelligence with long-term memory and continuous learning.'
  }
};

export function AttributeVisualization({ attributes, maturityLevel }: AttributeVisualizationProps) {
  const getLevelScore = (level: string): number => {
    if (!level) return 3;
    
    const lowerLevel = level.toLowerCase().trim();
    
    // Handle 5-point scale values
    if (lowerLevel.includes('very low') || lowerLevel === 'very_low') return 1;
    if (lowerLevel.includes('low') && !lowerLevel.includes('medium')) return 2;
    if (lowerLevel.includes('medium') || lowerLevel.includes('moderate')) return 3;
    if (lowerLevel.includes('high') && !lowerLevel.includes('very')) return 4;
    if (lowerLevel.includes('very high') || lowerLevel === 'very_high') return 5;
    
    // Handle L0/L1/L2 values
    if (lowerLevel.includes('l0') || lowerLevel === '0') return 1;
    if (lowerLevel.includes('l1') || lowerLevel === '1') return 3;
    if (lowerLevel.includes('l2') || lowerLevel === '2') return 5;
    
    // Handle numeric values
    const numericValue = parseInt(lowerLevel);
    if (!isNaN(numericValue)) {
      return Math.max(1, Math.min(5, numericValue));
    }
    
    // Default to medium
    return 3;
  };

  const getTraitLevelColor = (level: string): string => {
    const score = getLevelScore(level);
    // Primary button color with increasing intensity based on lightness
    if (score === 1) return "bg-[#d4b896]"; // Lightest
    if (score === 2) return "bg-[#c9a87a]"; // Light
    if (score === 3) return "bg-[#be985e]"; // Medium
    if (score === 4) return "bg-[#b3884d]"; // Dark
    if (score === 5) return "bg-[#b97a3c]"; // Darkest (original)
    return "bg-[#be985e]";
  };

  const getLevelLabel = (level: string): string => {
    const score = getLevelScore(level);
    if (score === 1) return 'Very Low';
    if (score === 2) return 'Low';
    if (score === 3) return 'Medium';
    if (score === 4) return 'High';
    if (score === 5) return 'Very High';
    return 'Medium';
  };

  const getLevelLabelColor = (level: string): string => {
    const score = getLevelScore(level);
    // Match label background to progress bar color
    if (score === 1) return "bg-[#d4b896]"; // Lightest
    if (score === 2) return "bg-[#c9a87a]"; // Light
    if (score === 3) return "bg-[#be985e]"; // Medium
    if (score === 4) return "bg-[#b3884d]"; // Dark
    if (score === 5) return "bg-[#b97a3c]"; // Darkest (original)
    return "bg-[#be985e]";
  };

  const getBorderRadius = (index: number, totalCards: number): string => {
    if (index === 0 && index === totalCards - 1) {
      // Single card
      return 'rounded-xl';
    } else if (index === 0) {
      // First card
      return 'rounded-t-xl';
    } else if (index === totalCards - 1) {
      // Last card
      return 'rounded-b-xl';
    } else {
      // Middle cards
      return '';
    }
  };

    return (
    <div className="rounded-xl overflow-hidden">
      <div className="grid grid-cols-2">
        {attributes.map((attribute, index) => {
          const levelScore = getLevelScore(attribute.level);
          const levelLabel = getLevelLabel(attribute.level);
          const contextualDescription = attributeDescriptions[attribute.label as keyof typeof attributeDescriptions]?.[maturityLevel as keyof typeof attributeDescriptions['Autonomy']] || attribute.description;
          
          // Diamond marker positions and their corresponding scores
          const diamonds = [
            { position: 0, score: 1, bgColor: 'bg-[#d4c4a8]' },
            { position: 25, score: 2, bgColor: 'bg-[#d4c4a8]' },
            { position: 50, score: 3, bgColor: 'bg-[#d4c4a8]' },
            { position: 75, score: 4, bgColor: 'bg-[#d4c4a8]' },
            { position: 100, score: 5, bgColor: 'bg-[#d4c4a8]' }
          ];
          
          return (
            <div 
              key={attribute.label} 
              className={`${
                // Dynamic padding based on position
                index < 2 ? (index >= attributes.length - 2 ? 'py-5' : 'pb-5') : 
                index >= attributes.length - 2 ? 'pt-5' : 'py-5'
              } ${
                index % 2 === 0 ? 'pr-8' : 'pl-8'
              } ${
                index % 2 === 1 ? 'border-l border-[#e6dcc7]' : ''
              } ${
                index >= 2 ? 'border-t border-[#e6dcc7]' : ''
              }`}
            >
              {/* Header with attribute label and progress bar */}
              <div className="mb-3 flex items-center gap-4">
                <span className="text-sm font-medium text-[#4b3a1a] w-40 flex-shrink-0">{attribute.label}</span>
                
                {/* 5-point scale visualization */}
                <div className="flex-1">
                  <div className="relative h-8">
                    {/* Background track */}
                    <div className="absolute inset-x-0 h-2 bg-[#e6dcc7] rounded-full top-1/2 transform -translate-y-1/2"></div>
                    
                    {/* Gradient progress bar */}
                    <div 
                      className={`absolute h-2 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                        levelScore === 5 ? 'rounded-full' : 'rounded-l-full'
                      }`}
                      style={{
                        width: `${(levelScore / 5) * 100}%`,
                        background: (() => {
                          const startColor = '#d4b896'; // Always start with lightest
                          let endColor = '#d4b896'; // Default to lightest
                          
                          if (levelScore >= 2) endColor = '#c9a87a'; // Low
                          if (levelScore >= 3) endColor = '#be985e'; // Medium
                          if (levelScore >= 4) endColor = '#b3884d'; // High
                          if (levelScore >= 5) endColor = '#b97a3c'; // Very High
                          
                          return `linear-gradient(to right, ${startColor}, ${endColor})`;
                        })()
                      }}
                    ></div>
                    
                    {/* Scale stops */}
                    {[1, 2, 3, 4].map((stop) => (
                      <div
                        key={stop}
                        className="absolute w-0.5 h-2 bg-[#f8f4e7] top-1/2 transform -translate-y-1/2 -translate-x-1/2 group cursor-pointer"
                        style={{
                          left: `${(stop / 5) * 100}%`,
                          zIndex: 10
                        }}
                        title={(() => {
                          if (stop === 1) return 'Very Low';
                          if (stop === 2) return 'Low';
                          if (stop === 3) return 'Medium';
                          if (stop === 4) return 'High';
                          if (stop === 5) return 'Very High';
                          return '';
                        })()}
                      >
                        {/* Hover tooltip */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                          {(() => {
                            if (stop === 1) return 'Very Low';
                            if (stop === 2) return 'Low';
                            if (stop === 3) return 'Medium';
                            if (stop === 4) return 'High';
                            if (stop === 5) return 'Very High';
                            return '';
                          })()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description text with inline level label */}
              <div className="text-sm text-[#4b3a1a] leading-relaxed">
                <span className="font-semibold">{levelLabel}.</span> <span>{contextualDescription}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 