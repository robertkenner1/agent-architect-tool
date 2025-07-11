'use client';

import React from 'react';
import { FaSlack } from 'react-icons/fa';

export function NextStepsSection() {
  const handleContactUs = () => {
    window.open('https://grammarly.enterprise.slack.com/archives/C09515DHMFH', '_blank');
  };

  const handleDownloadReport = () => {
    // This will be called from parent component with actual data
    console.log('Download report requested');
  };

  const handleViewKnowledgeHub = () => {
    // TODO: Replace with actual Knowledge Hub URL
    window.open('https://coda.io/d/Agents-PMM-Workstream_dX5sirzk5jp/Agent-Framework_suamSShJ', '_blank');
  };

  return (
    <div className="mt-4 rounded-xl p-6" style={{ backgroundColor: 'rgba(230, 220, 199, 0.4)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-black">Next Steps</h2>
      </div>
      
      <div>
        <p className="text-sm text-[#4b3a1a] leading-relaxed mb-4">
          Work with UXMR and PMM to assess user value, potential revenue and market opportunity according to our evaluation framework.
        </p>
        
        {/* Action Links */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleContactUs}
            className="flex items-center gap-2 rounded-xl transition-all duration-300 ease-in-out h-9 text-[#b97a3c] hover:bg-[#e6dcc7] px-3"
          >
            <FaSlack className="w-4 h-4" />
            <span className="text-sm font-medium">Contact Us on Slack</span>
          </button>
          
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 rounded-xl transition-all duration-300 ease-in-out h-9 text-[#b97a3c] hover:bg-[#e6dcc7] px-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span className="text-sm font-medium">Download Report</span>
          </button>
        </div>
      </div>
    </div>
  );
} 