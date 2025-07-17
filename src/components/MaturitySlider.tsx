'use client';

import React, { useState } from 'react';

interface MaturitySliderProps {
  value: 'L0' | 'L1' | 'L2';
  onChange: (value: 'L0' | 'L1' | 'L2') => void;
  originalLevel?: 'L0' | 'L1' | 'L2';
}

const maturityLevels = [
  {
    id: 'L0',
    label: 'L0',
    name: 'Connector Agent',
    description: 'Passively push and pull data from external sources with simple data ingress/egress, minimal decision-making, and no end-to-end use case ownership.',
    shortDesc: 'Data sync only'
  },
  {
    id: 'L1', 
    label: 'L1',
          name: 'Solution Agent',
    description: 'Built to solve defined use cases, often across multiple tools, and may call other agents or use internal skills with some opinion about their role.',
    shortDesc: 'Solves specific tasks'
  },
  {
    id: 'L2',
    label: 'L2', 
          name: 'Workflow Agent',
    description: 'Strategic agents that coordinate end-to-end workflows, invoke other agents and tools to achieve outcomes, and are proactive by design.',
    shortDesc: 'End-to-end coordination'
  }
];

export function MaturitySlider({ value, onChange, originalLevel }: MaturitySliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const currentIndex = maturityLevels.findIndex(level => level.id === value);
  
  return (
    <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-base font-medium text-black">Global Maturity Level</h4>
        
        {/* Tooltip */}
        <div className="relative">
          <button
            type="button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-5 h-5 rounded-full bg-[#b97a3c] text-white flex items-center justify-center text-xs font-bold cursor-help"
          >
            ?
          </button>
          {showTooltip && (
            <div className="absolute top-6 left-0 w-80 p-4 bg-gray-900 text-white text-sm rounded-lg z-20 shadow-lg">
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-red-300">L0 - Connector Agent</div>
                  <div className="text-xs text-gray-300">Data sync only</div>
                </div>
                <div>
                  <div className="font-semibold text-yellow-300">L1 - Solution Agent</div>
                  <div className="text-xs text-gray-300">Solves specific tasks</div>
                </div>
                <div>
                  <div className="font-semibold text-green-300">L2 - Workflow Agent</div>
                  <div className="text-xs text-gray-300">End-to-end coordination</div>
                </div>
              </div>
              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          )}
        </div>
        
        {originalLevel && originalLevel !== value && (
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            Original: {originalLevel}
          </span>
        )}
      </div>
      
      {/* Slider */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {maturityLevels.map((level, index) => (
            <button
              key={level.id}
              onClick={() => onChange(level.id as 'L0' | 'L1' | 'L2')}
              className={`flex-1 p-3 mx-1 rounded-lg border-2 transition-all duration-200 ${
                value === level.id
                  ? 'border-[#b97a3c] bg-[#b97a3c] text-white'
                  : 'border-[#e6dcc7] bg-[#e6dcc7] text-[#4b3a1a] hover:border-[#b97a3c] hover:bg-[#b97a3c]/10'
              }`}
            >
              <div className="text-sm font-semibold">{level.label}</div>
              <div className="text-xs mt-1">{level.name}</div>
            </button>
          ))}
        </div>
        
        {/* Visual slider track */}
        <div className="relative h-2 bg-gradient-to-r from-[#e6dcc7] via-[#d4c4a8] to-[#c2a982] rounded-full mb-4">
          <div 
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${
              value === 'L0' ? 'bg-red-400' : value === 'L1' ? 'bg-yellow-400' : 'bg-green-400'
            }`}
            style={{ left: `${(currentIndex / (maturityLevels.length - 1)) * 100}%` }}
          />
        </div>
        
        {/* Current level description */}
        <div className="text-sm text-[#4b3a1a] bg-white p-3 rounded-lg border border-[#e6dcc7]">
          <div className="font-medium mb-1">{maturityLevels[currentIndex]?.name}</div>
          <div>{maturityLevels[currentIndex]?.description}</div>
        </div>
      </div>
    </div>
  );
} 