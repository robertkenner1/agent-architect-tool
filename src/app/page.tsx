'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getAgentFeedback, getAgentMaturity } from '@/utils/agentPrompts';
import { summarizeIdea, downloadSummary } from '@/utils/summaryGenerator';

import { RichTextInput } from '@/components/RichTextInput';
import { AttributeVisualization } from '@/components/AttributeVisualization';
import { NextStepsSection } from '@/components/NextStepsSection';

// First, create a type for the feedback JSON structure
type FeedbackData = {
  Market: {
    UserType: { label: string; rationale: string };
    BehavioralSegment: { label: string; rationale: string };
    UserAIMindset: { label: string; rationale: string };
  };
};

type MaturityData = {
  classification: {
    agent: string;
    autonomy_level: string;
    autonomy_description: string;
    proactivity_level: string;
    proactivity_description: string;
    integration_level: string;
    integration_description: string;
    use_case_ownership_level: string;
    use_case_ownership_description: string;
    orchestration_level: string;
    orchestration_description: string;
    intelligence_level: string;
    intelligence_description: string;
    maturity_classification: string;
    maturity_classification_name: string;
  };
  suggestions: string;
};

export default function AISuccessBlueprint() {
  const [agentDescription, setAgentDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [maturityData, setMaturityData] = useState<MaturityData | null>(null);
  const reportScrollRef = useRef<HTMLDivElement | null>(null);
  const [ideaSummary, setIdeaSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(false);
  const [headerText, setHeaderText] = useState('Agent Architect Tool');
  const [isReportHeader, setIsReportHeader] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [diamondsReady, setDiamondsReady] = useState(false);
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [showMaturityDefinitions, setShowMaturityDefinitions] = useState(false);
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0);
  
  const loadingSteps = [
    { text: "Parsing high-confidence sources", highlight: "high-confidence" },
    { text: "Analyzing agent traits and maturity", highlight: "agent traits" },
    { text: "Mapping to relevant market segments", highlight: "market segments" },
    { text: "Evaluating UX and integration patterns", highlight: "UX and integration" },
    { text: "Generating tailored recommendations", highlight: "tailored recommendations" }
  ];

  // Loading step animation effect
  useEffect(() => {
    if (loading && !feedbackData && !maturityData) {
    const interval = setInterval(() => {
        setCurrentLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 2500);
    return () => clearInterval(interval);
    }
  }, [loading, feedbackData, maturityData]);

  // Helper function to convert level to numeric score for plots
  const getLevelScore = (level: string | undefined): number => {
    if (!level) return 3; // default to medium if level is undefined
    
    switch (level.toLowerCase()) {
      case 'l0':
      case 'low': return 1;
      case 'l1':
      case 'medium-low': return 2;
      case 'medium': return 3;
      case 'l2':
      case 'medium-high': return 4;
      case 'high': return 5;
      default: return 3; // default to medium
    }
  };

  // Helper function to get trait level color
  const getTraitLevelColor = (level: string | undefined): string => {
    if (!level) return 'bg-gray-400';
    
    switch (level.toLowerCase()) {
      case 'l0':
      case 'low': return 'bg-red-400';
      case 'l1':
      case 'medium': return 'bg-yellow-400';
      case 'l2':
      case 'high': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  // Load saved state on component mount
  React.useEffect(() => {
    const savedState = localStorage.getItem('aiSuccessBlueprintState');
    if (savedState) {
      const { agentDescription, feedbackData, maturityData, ideaSummary } = JSON.parse(savedState);
      if (feedbackData && maturityData && ideaSummary) {
        setAgentDescription(agentDescription);
        setFeedbackData(feedbackData);
        setMaturityData(maturityData);
        setIdeaSummary(ideaSummary);
        setSubmitted(true);
      } else {
        // If report wasn't fully loaded, clear the saved state and focus textarea
        localStorage.removeItem('aiSuccessBlueprintState');
        setAgentDescription(agentDescription);
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }
    }
  }, []);

  // Save state whenever it changes
  React.useEffect(() => {
    if (submitted && feedbackData && ideaSummary) {
      const stateToSave = {
        agentDescription,
        feedbackData,
        maturityData,
        ideaSummary
      };
      localStorage.setItem('aiSuccessBlueprintState', JSON.stringify(stateToSave));
    }
  }, [agentDescription, feedbackData, maturityData, ideaSummary, submitted]);

  // Add intersection observer for header text
  React.useEffect(() => {
    if (!reportScrollRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setHeaderText(ideaSummary ? `Report: ${ideaSummary}` : 'Agent Report');
          setIsReportHeader(true);
        } else {
          setHeaderText('Agent Architect Tool');
          setIsReportHeader(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(reportScrollRef.current);

    return () => observer.disconnect();
  }, [ideaSummary]);

  React.useEffect(() => {
    if (feedbackData) {
      setDiamondsReady(false);
      setTimeout(() => setDiamondsReady(true), 50);
    }
  }, [feedbackData]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError('');
    setFeedbackData(null);
    setMaturityData(null);
    setIdeaSummary(null);
    setSummaryLoading(true);
    setSummaryError(false);

    // Scroll to Agent Report after submit
    setTimeout(() => {
      if (reportScrollRef.current) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const rect = reportScrollRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const extraMargin = 32; // px
        const top = rect.top + scrollTop - headerHeight - extraMargin;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);

    // Fetch summary
    try {
      const summary = await summarizeIdea(agentDescription);
      setIdeaSummary(summary);
    } catch (e) {
      setSummaryError(true);
    } finally {
      setSummaryLoading(false);
    }

    try {
      // Fetch feedback and maturity data sequentially
      const aiFeedback = await getAgentFeedback(agentDescription, "gpt-4.1");
      console.log("Raw aiFeedback response:", aiFeedback);
      
      const aiMaturity = await getAgentMaturity(agentDescription, "gpt-4.1");
      console.log("Raw aiMaturity response:", aiMaturity);
      
      try {
        const parsedFeedback = JSON.parse(aiFeedback);
        const parsedMaturity = JSON.parse(aiMaturity);
        console.log("Parsed maturity data:", parsedMaturity);
        console.log("Classification object:", parsedMaturity.classification);
        setFeedbackData(parsedFeedback);
        setMaturityData(parsedMaturity);
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        console.log("Failed to parse aiFeedback:", aiFeedback);
        console.log("Failed to parse aiMaturity:", aiMaturity);
        setError('Error parsing feedback. Please try again.');
      }
    } catch (err) {
      console.error("API call error:", err);
      setError('Failed to get AI feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-lora" style={{ background: '#f8f4e7', fontFamily: 'Lora, serif' }}>
      <head>
        <title>Agent Architect Tool</title>
      </head>
      <header className="w-full flex justify-between items-center px-8 py-4 mb-2 gap-6 sticky top-0 z-50 bg-[#f8f4e7] border-b border-[#e6dcc7]">
        <div className="flex items-center gap-4">
          <span className="text-base font-semibold text-[#4b3a1a]">{headerText}</span>
          {isReportHeader && feedbackData && (
            <button
              className="text-[#b97a3c] hover:underline transition flex items-center gap-1"
              onClick={() => {
                const text = JSON.stringify(feedbackData, null, 2);
                downloadSummary(text);
              }}
              title="Download Report"
            >
              <span className="text-sm font-medium">Download Report</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://coda.io/d/Agents-PMM-Workstream_dX5sirzk5jp/Agent-Framework_suamSShJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b97a3c] text-base font-semibold hover:underline transition"
          >
            Framework
          </a>
          <a
            href="https://docs.google.com/presentation/d/1dcmbYWXEImja2UP3JyGza0ebIjFyCZR30O7jVjNA3bQ/edit?slide=id.g35c282ad398_0_513#slide=id.g35c282ad398_0_513"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b97a3c] text-base font-semibold hover:underline transition"
          >
            Slide Deck
          </a>
          <a
            href="https://coda.io/d/Agents-Foundational-UXMR-Projects-Hub_d87RA3J92MJ/WIP-Frequently-Asked-Questions-FAQ_su4-wtvn#_lu4kRDXA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b97a3c] text-base font-semibold hover:underline transition"
          >
            FAQ
          </a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <h1 className="text-2xl font-bold text-black mb-8 mt-16 text-center" style={{ letterSpacing: '-0.02em' }}>Describe the functionality of your agent or what types of tasks it would do.</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-6">
                  <div className="relative">
                    <RichTextInput
                      value={agentDescription}
                      onChange={setAgentDescription}
                      onSubmit={() => handleSubmit(new Event('submit') as any)}
                      disabled={loading}
                    />
                    {agentDescription.trim() && (
                      <button
                        type="button"
                        className="absolute bottom-4 left-3 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out h-9 text-[#b97a3c] hover:bg-[#e6dcc7] w-auto px-3"
                        onClick={() => {
                          setAgentDescription('');
                          setSubmitted(false);
                          setFeedbackData(null);
                          setMaturityData(null);
                          setIdeaSummary(null);
                          localStorage.removeItem('aiSuccessBlueprintState');
                          if (textareaRef.current) {
                            textareaRef.current.focus();
                          }
                        }}
                      >
                        <span className="text-sm font-medium">Start over</span>
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`absolute bottom-4 right-3 flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ease-in-out h-9
                        ${!agentDescription.trim() || loading
                          ? 'bg-[#b97a3c] text-white opacity-40 cursor-not-allowed w-9 px-0'
                          : 'bg-[#b97a3c] text-white hover:bg-[#a86d32] w-auto px-3'}
                      `}
                      aria-label="Submit"
                      disabled={!agentDescription.trim() || loading}
                    >
                      {loading ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 animate-spin">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l6-6m-6 6l-6-6" />
                          </svg>
                          {agentDescription.trim() && <span className="text-sm font-medium whitespace-nowrap pr-1">Generate report</span>}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            
            {submitted && (
                              <div className="mt-12 bg-[#f8f4e7]">
                <div ref={reportScrollRef} />
                <h1 className="text-2xl font-bold text-black mb-8">
                  {summaryLoading ? (
                    <span className="inline-block w-40 h-6 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                  ) : ideaSummary ? (
                    <span>{`Report: ${ideaSummary}`}</span>
                  ) : summaryError ? (
                    agentDescription.trim()
                      ? `Report: ${agentDescription.trim().split(/\s+/).slice(0, 7).join(' ')}${agentDescription.trim().split(/\s+/).length > 7 ? '...' : ''}`
                      : 'Agent Report'
                  ) : (
                    'Agent Report'
                  )}
                </h1>

                {error && <p className="text-red-600">{error}</p>}
                {loading && !feedbackData && !maturityData && (
                  <div className="mt-10 flex items-center justify-center min-h-[200px]">
                    <div className="text-base font-normal text-gray-500 transition-all duration-500 ease-in-out">
                      <div className="loading-step shimmer-text">
                        {loadingSteps[currentLoadingStep].text.split(loadingSteps[currentLoadingStep].highlight).map((part, partIndex, parts) => (
                          <span key={partIndex}>
                            {part}
                            {partIndex < parts.length - 1 && (
                              <span className="font-medium">
                                {loadingSteps[currentLoadingStep].highlight}
                              </span>
                            )}
                          </span>
                        ))}
                        <span>…</span>
                      </div>
                    </div>
                  </div>
                )}
                {feedbackData && maturityData && (
                  <div className="space-y-6">
                    {/* Agent Maturity Section - Clean Layout */}
                    <div className="mt-4 rounded-xl p-6" style={{ backgroundColor: 'rgba(230, 220, 199, 0.4)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold text-black">Agent Maturity</h2>
                      </div>
                      <p className="text-sm text-[#6b5e4f] mb-6 leading-relaxed">
                        Your agent's current maturity level and the capabilities that define each stage of development.
                      </p>
                      
                      <div>
                        {/* Horizontal Maturity Stepper */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between relative gap-4">
                            {/* Progress Line Background - extends past L2 to imply more levels */}
                            <div className="absolute top-1/2 h-0.5 bg-[#e6dcc7] z-0 transform -translate-y-1/2" style={{
                              left: '12.5%',
                              right: '5%'
                            }}></div>
                            
                            {/* Progress Line Fill - shows current progress */}
                            <div className={`absolute top-1/2 h-0.5 bg-[#e6dcc7] z-0 transition-all duration-500 transform -translate-y-1/2`} style={{
                              left: '12.5%',
                              width: (maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') || 'L1') === 'L0' ? '0%' :
                                     (maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') || 'L1') === 'L1' ? '29.166%' :
                                     '58.333%'
                            }}></div>
                            
                            {/* Steps */}
                            {[
                              {
                                level: 'L0',
                                name: 'Connector agents',
                                description: 'passively move data between systems with no decision-making',
                                current: (maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') || 'L1') === 'L0'
                              },
                              {
                                level: 'L1',
                                name: 'Task agents',
                                description: 'solve defined use cases with moderate autonomy',
                                current: (maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') || 'L1') === 'L1'
                              },
                              {
                                level: 'L2',
                                name: 'Collaborative agents',
                                description: 'coordinate end-to-end workflows strategically',
                                current: (maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') || 'L1') === 'L2'
                              }
                            ].map((step, index) => (
                              <div key={step.level} className="flex flex-col items-center relative z-10 flex-1">
                                {/* Step Card Content - styled like trait matrix */}
                                <div 
                                  className={`rounded-xl overflow-hidden w-full max-w-xs transition-all duration-300 flex flex-col border-2 border-[#e6dcc7]`}
                                  style={{
                                    backgroundColor: step.current ? '#e6dcc7' : '#f0ead9'
                                  }}
                                >
                                  <div className="p-4 flex flex-col">
                                    {/* Level eyebrow at top of card */}
                                    <div className="mb-2 flex items-center">
                                      <div className="flex items-center gap-2">
                                        {/* Geometric shape icon */}
                                        <div className="w-3 h-3 flex items-center justify-center">
                                          {step.level === 'L0' && (
                                            <div className={`w-3 h-3 rounded-full ${step.current ? 'bg-[#b97a3c]' : 'bg-[#d4b896]'}`}></div>
                                          )}
                                          {step.level === 'L1' && (
                                            <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent ${step.current ? 'border-b-[#b97a3c]' : 'border-b-[#d4b896]'}`}></div>
                                          )}
                                          {step.level === 'L2' && (
                                            <div className={`w-[9px] h-[9px] rotate-45 ${step.current ? 'bg-[#b97a3c]' : 'bg-[#d4b896]'}`}></div>
                                          )}
                                        </div>
                                        <span className={`text-xs tracking-wide ${step.current ? 'font-semibold text-[#b97a3c]' : 'font-medium text-[#6b5e4f]'}`}>Level {step.level.replace('L', '')}</span>
                                      </div>
                                    </div>
                                    


                                    {/* Combined label and description */}
                                    <div className="text-sm leading-relaxed flex-1 text-black">
                                      {step.name} {step.description.toLowerCase()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4 text-black">
                          <p className="text-base text-[#4b3a1a]">
                            Your agent is a {maturityData?.classification?.maturity_classification_name || 'Task Agent'} with {maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') || 'L1'} maturity. {(() => {
                              const level = maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') || 'L1';
                              const definitions = {
                                'L0': 'It passively pushes and pulls data from external sources with no decision-making or end-to-end ownership.',
                                'L1': 'It performs a clearly defined task using simple rules and basic tool coordination.',
                                'L2': 'It coordinates end-to-end workflows, invoking other agents and tools to achieve strategic outcomes.'
                              };
                              return definitions[level as keyof typeof definitions] || definitions['L1'];
                            })()}
                          </p>

                          {/* Evolution section - only for non-L2 agents */}
                          {maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') !== 'L2' && (
                            <div className="mt-6">
                              <p className="text-base font-medium text-black mb-3">To improve its maturity level:</p>
                              
                              <ul className="space-y-1 text-black ml-4">
                                {(() => {
                                  const currentLevel = maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') || 'L1';
                                  const evolutionSuggestions = {
                                    'L0': [
                                      'Add rule-based logic to respond to external triggers with defined actions',
                                      'Pull from multiple sources to coordinate a task (e.g., matching calendar and email)',
                                      'Surface relevant recommendations based on context, not just input'
                                    ],
                                    'L1': [
                                      'Add natural language processing to better understand email content',
                                      'Implement learning to improve categorization accuracy over time',
                                      'Automate responses or actions based on email content'
                                    ]
                                  };
                                  
                                  const suggestions = evolutionSuggestions[currentLevel as keyof typeof evolutionSuggestions] || [];
                                  
                                  return suggestions.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="text-black mr-2">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ));
                                })()}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Agent Traits Section */}
                    <div className="mt-4 rounded-xl p-6" style={{ backgroundColor: 'rgba(230, 220, 199, 0.4)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold text-black">Agent Traits</h2>
                      </div>
                      <p className="text-sm text-[#6b5e4f] mb-6 leading-relaxed">
                        Here's how your agent should incorporate each trait based on our evaluation.
                      </p>

                      {/* Enhanced Attribute Visualization */}
                      <AttributeVisualization
                        attributes={[
                          { 
                            label: "Autonomy", 
                            level: maturityData?.classification?.autonomy_level || '', 
                            description: maturityData?.classification?.autonomy_description || "Decision-making authority and ability to operate without step-by-step instructions"
                          },
                          { 
                            label: "Proactivity", 
                            level: maturityData?.classification?.proactivity_level || '', 
                            description: maturityData?.classification?.proactivity_description || "Initiation of action based on context, predictions, or user needs"
                          },
                          { 
                            label: "Integration", 
                            level: maturityData?.classification?.integration_level || '', 
                            description: maturityData?.classification?.integration_description || "Capability to connect with and operate across multiple tools and systems"
                          },
                          { 
                            label: "Use Case Ownership", 
                            level: maturityData?.classification?.use_case_ownership_level || '', 
                            description: maturityData?.classification?.use_case_ownership_description || "End-to-end responsibility for specific workflows and outcomes"
                          },
                          { 
                            label: "Orchestration", 
                            level: maturityData?.classification?.orchestration_level || '', 
                            description: maturityData?.classification?.orchestration_description || "Multi-step coordination and ability to manage complex workflows"
                          },
                          { 
                            label: "Intelligence", 
                            level: maturityData?.classification?.intelligence_level || '', 
                            description: maturityData?.classification?.intelligence_description || "Contextual understanding, adaptability, and learning capabilities"
                          }
                        ]}
                        maturityLevel={maturityData?.classification?.maturity_classification?.replace('Low', 'L0').replace('Medium', 'L1').replace('High', 'L2') || 'L1'}
                      />
                    </div>
                    
                    {/* Target Audience Section */}
                    <div className="mt-4 rounded-xl p-6" style={{ backgroundColor: 'rgba(230, 220, 199, 0.4)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold text-black">Target Audience</h2>
                        <a
                          href="https://docs.google.com/presentation/d/1dcmbYWXEImja2UP3JyGza0ebIjFyCZR30O7jVjNA3bQ/edit?slide=id.g35b2f72a621_1_944#slide=id.g35b2f72a621_1_944"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#b97a3c] hover:underline transition flex items-center gap-1"
                        >
                          <span className="text-sm font-medium">View Market slides</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </a>
                      </div>
                      <p className="text-sm text-[#6b5e4f] mb-6 leading-relaxed">
                        The specific user types, behavioral segments, and AI mindsets most likely to adopt your agent.
                      </p>
                      <div className="rounded-xl overflow-hidden">
                        <div className="grid grid-cols-2">
                        {/* User Type */}
                          <div className="pb-5 pr-8">
                            <div className="mb-3">
                              <span className="text-sm font-medium text-[#4b3a1a]">User Type</span>
                            </div>
                            <div className="mb-2">
                              <div className="flex flex-wrap gap-2">
                                {['Knowledge workers', 'Students', 'Both'].map((option) => {
                                  const userTypeLabel = feedbackData?.Market?.UserType?.label?.toLowerCase().trim() || '';
                                  const optionLower = option.toLowerCase().trim();
                                  
                                  // Check if this option is mentioned in the user type (handles comma-separated values)
                                  let isSelected = false;
                                  
                                  if (option === 'Both') {
                                    // "Both" is selected if the API response contains both "knowledge" and "student"
                                    isSelected = userTypeLabel.includes('knowledge') && userTypeLabel.includes('student');
                                  } else {
                                    // Regular matching for individual options
                                    isSelected = userTypeLabel === optionLower || 
                                               userTypeLabel.includes(optionLower) || 
                                               optionLower.includes(userTypeLabel) ||
                                               userTypeLabel.split(',').some(part => 
                                                 part.trim().toLowerCase() === optionLower ||
                                                 part.trim().toLowerCase().includes(optionLower.split(' ')[0]) // match first word
                                               );
                                  }
                                  
                                  return (
                                    <span 
                                      key={option}
                                      className={`text-xs px-2 py-1 rounded font-medium ${
                                        isSelected
                                          ? 'bg-[#b3884d] text-white' 
                                          : 'bg-[#e6dcc7] text-[#4b3a1a]'
                                      }`}
                                    >
                                      {option}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="text-sm text-[#4b3a1a] leading-relaxed">
                              <span>{feedbackData?.Market?.UserType?.rationale ?? ''}</span>
                            </div>
                          </div>
                          
                          {/* Behavioral Segment */}
                          <div className="pb-5 pl-8 border-l border-[#e6dcc7]">
                            <div className="mb-3">
                              <span className="text-sm font-medium text-[#4b3a1a]">Behavioral Segment</span>
                            </div>
                            <div className="mb-2">
                              <div className="flex flex-wrap gap-2">
                                {['Operator', 'Explorer', 'Collaborator', 'Creator', 'Analyst'].map((option) => (
                                  <span 
                                    key={option}
                                    className={`text-xs px-2 py-1 rounded font-medium ${
                                      feedbackData?.Market?.BehavioralSegment?.label === option 
                                        ? 'bg-[#b3884d] text-white' 
                                        : 'bg-[#e6dcc7] text-[#4b3a1a]'
                                    }`}
                                  >
                                    {option}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-sm text-[#4b3a1a] leading-relaxed">
                              <span>{feedbackData?.Market?.BehavioralSegment?.rationale ?? ''}</span>
                        </div>
                          </div>
                          
                          {/* AI Mindset - spans 2 columns */}
                          <div className="col-span-2 pt-5 border-t border-[#e6dcc7]">
                            <div className="mb-3">
                              <span className="text-sm font-medium text-[#4b3a1a]">AI Mindset</span>
                            </div>
                            <div className="mb-2">
                              <div className="flex flex-wrap gap-2">
                                {['AI Curious', 'Capable but Cautious', 'Power User', 'Skeptical but Open', 'Engaged and Enabled'].map((option) => {
                                  const aiMindsetLabel = feedbackData?.Market?.UserAIMindset?.label?.toLowerCase().trim() || '';
                                  const optionLower = option.toLowerCase().trim();
                                  const isSelected = aiMindsetLabel === optionLower || 
                                                   aiMindsetLabel.includes(optionLower) || 
                                                   optionLower.includes(aiMindsetLabel);
                                  
                                  return (
                                    <span 
                                      key={option}
                                      className={`text-xs px-2 py-1 rounded font-medium ${
                                        isSelected
                                          ? 'bg-[#b3884d] text-white' 
                                          : 'bg-[#e6dcc7] text-[#4b3a1a]'
                                      }`}
                                    >
                                      {option}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="text-sm text-[#4b3a1a] leading-relaxed">
                              <span>{feedbackData?.Market?.UserAIMindset?.rationale ?? ''}</span>
                        </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Next Steps Section */}
                    <NextStepsSection />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}