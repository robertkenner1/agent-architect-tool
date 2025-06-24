'use client';

import React, { useState, useRef } from 'react';
import { getAgentFeedback, getAgentMaturity } from '@/utils/agentPrompts';
import { summarizeIdea, downloadSummary } from '@/utils/summaryGenerator';

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
  const [headerText, setHeaderText] = useState('From Novelty to Necessity: The Blueprint for Effective Agents');
  const [isReportHeader, setIsReportHeader] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [diamondsReady, setDiamondsReady] = useState(false);

  // Helper function to convert level to numeric score for plots
  const getLevelScore = (level: string | undefined): number => {
    if (!level) return 3; // default to medium if level is undefined
    
    switch (level.toLowerCase()) {
      case 'low': return 1;
      case 'medium-low': return 2;
      case 'medium': return 3;
      case 'medium-high': return 4;
      case 'high': return 5;
      default: return 3; // default to medium
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
          setHeaderText('From Novelty to Necessity: The Blueprint for Effective Agents');
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
        <title>From Novelty to Necessity: The Blueprint for Effective Agents</title>
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
            <h1 className="text-3xl font-medium leading-tight text-gray-900 mb-8 mt-16">Describe your agent's purpose, users, and tasks.</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-6">
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      id="agentDescription"
                      rows={4}
                      className="w-full h-[36rem] text-base rounded-2xl bg-[#f8f4e7] border border-[#e6dcc7] p-6 pr-12 pb-10 placeholder-[#b97a3c66] focus:outline-none focus:ring-2 focus:ring-[#e6dcc7] resize-none"
                      placeholder="E.g. Expert Panel Agent analyzes the user's document through the prism of expert publications and experts, and provides high-level, impactful advice, voiced in the Expert's very distinct manner. Users can chat with Expert to get further help, including rewrites, more info on the topic or idea, or more comments to their doc."
                      value={agentDescription}
                      onChange={(e) => setAgentDescription(e.target.value)}
                      required
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
              <div className="mt-12 border border-[#e6dcc7] rounded-2xl p-10 bg-[#f8f4e7]">
                <div ref={reportScrollRef} />
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
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
                </h2>
                {summaryLoading ? (
                  <div className="h-6 mb-4"></div>
                ) : feedbackData && (
                  <button
                    className="text-[#b97a3c] hover:underline transition flex items-center gap-1 mb-4"
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
                {error && <p className="text-red-600">{error}</p>}
                {loading && !feedbackData && !maturityData && (
                  <div className="space-y-16 animate-fade-in">
                    {/* Agent Maturity Classification Section Scaffolding */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-medium text-black w-48">Agent Maturity</h3>
                      </div>
                      
                      {/* Static Agent Types Information - can show immediately */}
                      <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5 mb-6">
                        <div className="mb-4">
                          <p className="text-base text-black font-medium mb-4">
                            Maturity Levels
                          </p>
                        </div>
                        
                        <div className="space-y-4 text-sm text-[#4b3a1a]">
                          <div className="border-l-4 border-[#b97a3c] pl-4">
                            <p className="font-semibold mb-1">L0 - Connector Agents</p>
                            <p>Agents that passively push and pull data from external sources. Simple data ingress/egress with no decision-making or end-to-end use case ownership.</p>
                          </div>
                          
                          <div className="border-l-4 border-[#b97a3c] pl-4">
                            <p className="font-semibold mb-1">L1 - Task Agents</p>
                            <p>Agents built to solve a defined use case, often across multiple tools. They may call other agents or use internal "skills" and have an opinion about their role.</p>
                          </div>
                          
                          <div className="border-l-4 border-[#b97a3c] pl-4">
                            <p className="font-semibold mb-1">L2 - Collaborative Agents</p>
                            <p>Strategic agents that coordinate end-to-end workflows, invoking other agents and tools to achieve outcomes. Proactive by design and can string together multiple steps.</p>
                          </div>
                        </div>
                      </div>

                      {/* Classification placeholder */}
                      <div className="mb-4">
                        <p className="text-base text-black font-medium mb-4">
                          Your agent is currently classified as{' '}
                          <span className="inline-block w-32 h-4 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                        </p>
                      </div>

                      {/* Maturity Dimensions Scaffolding */}
                      <div className="space-y-4">
                        {["Autonomy", "Proactivity", "Integration", "Use Case Ownership", "Orchestration", "Intelligence"].map((label) => (
                          <div key={label} className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-light text-[#4b3a1a]">{label}</span>
                              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-[#b97a3c22] text-transparent">
                                <span className="inline-block w-8 h-3 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                              </span>
                            </div>
                            <div className="relative flex items-center" style={{height: '32px'}}>
                              <div className="w-full h-1 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 bg-[#b97a3c22] rotate-45 animate-pulse" style={{borderRadius: '4px'}}></div>
                              </div>
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-light text-[#4b3a1a] bg-[#e6dcc7] px-2 py-1" style={{clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', paddingRight: '1rem'}}>Low</span>
                              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-light text-[#4b3a1a] bg-[#e6dcc7] px-2 py-1" style={{clipPath: 'polygon(0% 50%, 15% 0%, 100% 0%, 100% 100%, 15% 100%)', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', paddingLeft: '1rem'}}>High</span>
                            </div>
                            <p className="mt-2 text-base text-black font-medium">
                              <span className="inline-block w-full h-4 rounded mb-1 animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                              <span className="inline-block w-3/4 h-4 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Suggestions Section Placeholder */}
                      <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5 mt-6">
                        <h4 className="text-sm font-medium text-[#4b3a1a] mb-3">Improvement Suggestions</h4>
                        <div className="space-y-2">
                          <span className="inline-block w-full h-4 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                          <span className="inline-block w-5/6 h-4 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                          <span className="inline-block w-4/5 h-4 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                        </div>
                      </div>
                    </div>
                    {/* Market Section Scaffolding */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-medium text-black w-48">Market</h3>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* User Type */}
                        <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-light text-[#4b3a1a]">User Type</span>
                          </div>
                          <p className="mt-2 text-base text-black font-medium">
                            <span className="inline-block w-full h-4 rounded mb-1 animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                            <span className="inline-block w-2/3 h-4 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                          </p>
                        </div>
                        {/* Behavioral Segment */}
                        <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-light text-[#4b3a1a]">Behavioral Segment</span>
                          </div>
                          <p className="mt-2 text-base text-black font-medium">
                            <span className="inline-block w-full h-4 rounded mb-1 animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                            <span className="inline-block w-2/3 h-4 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                          </p>
                        </div>
                        {/* AI Mindset */}
                        <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5 md:col-span-2">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-light text-[#4b3a1a]">AI Mindset</span>
                          </div>
                          <p className="mt-2 text-base text-black font-medium">
                            <span className="inline-block w-full h-4 rounded mb-1 animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                            <span className="inline-block w-2/3 h-4 rounded animate-pulse" style={{ background: '#4b3a1a22' }}></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {feedbackData && maturityData && (
                  <div className="space-y-16">
                    {/* Agent Maturity Classification Section */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-medium text-black w-48">Agent Maturity</h3>
                      </div>
                      
                      {/* Static Agent Types Information */}
                      <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5 mb-6">
                        <div className="mb-4">
                          <p className="text-base text-black font-medium mb-4">
                            Maturity Levels
                          </p>
                        </div>
                        
                        <div className="space-y-4 text-sm text-[#4b3a1a]">
                          <div className="border-l-4 border-[#b97a3c] pl-4">
                            <p className="font-semibold mb-1">L0 - Connector Agents</p>
                            <p>Agents that passively push and pull data from external sources. Simple data ingress/egress with no decision-making or end-to-end use case ownership.</p>
                          </div>
                          
                          <div className="border-l-4 border-[#b97a3c] pl-4">
                            <p className="font-semibold mb-1">L1 - Task Agents</p>
                            <p>Agents built to solve a defined use case, often across multiple tools. They may call other agents or use internal "skills" and have an opinion about their role.</p>
                          </div>
                          
                          <div className="border-l-4 border-[#b97a3c] pl-4">
                            <p className="font-semibold mb-1">L2 - Collaborative Agents</p>
                            <p>Strategic agents that coordinate end-to-end workflows, invoking other agents and tools to achieve outcomes. Proactive by design and can string together multiple steps.</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                          <p className="text-base text-black font-medium mb-4">
                            Your agent is currently classified as <strong>{maturityData?.classification?.maturity_classification_name} ({maturityData?.classification?.maturity_classification})</strong>
                          </p>
                      </div>

                      {/* Maturity Dimensions with Plots */}
                      <div className="space-y-4">
                        {[
                          { 
                            label: "Autonomy", 
                            level: maturityData?.classification?.autonomy_level, 
                            description: maturityData?.classification?.autonomy_description,
                            left: "Low",
                            right: "High"
                          },
                          { 
                            label: "Proactivity", 
                            level: maturityData?.classification?.proactivity_level, 
                            description: maturityData?.classification?.proactivity_description,
                            left: "Low",
                            right: "High"
                          },
                          { 
                            label: "Integration", 
                            level: maturityData?.classification?.integration_level, 
                            description: maturityData?.classification?.integration_description,
                            left: "Low",
                            right: "High"
                          },
                          { 
                            label: "Use Case Ownership", 
                            level: maturityData?.classification?.use_case_ownership_level, 
                            description: maturityData?.classification?.use_case_ownership_description,
                            left: "Low",
                            right: "High"
                          },
                          { 
                            label: "Orchestration", 
                            level: maturityData?.classification?.orchestration_level, 
                            description: maturityData?.classification?.orchestration_description,
                            left: "Low",
                            right: "High"
                          },
                          { 
                            label: "Intelligence", 
                            level: maturityData?.classification?.intelligence_level, 
                            description: maturityData?.classification?.intelligence_description,
                            left: "Low",
                            right: "High"
                          },
                        ].map((item) => (
                          <div key={item.label} className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-light text-[#4b3a1a]">{item.label}</span>
                              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-[#b97a3c] text-white">{item.level}</span>
                            </div>
                            <div className="relative flex items-center" style={{height: '32px'}}>
                              <div className="w-full h-1 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#e6dcc7] rounded-full"></div>
                              <div
                                className="absolute transition-all duration-500"
                                style={{
                                  left: diamondsReady && maturityData
                                    ? `calc(${(((getLevelScore(item.level)) - 1) / 4) * 100}% - 8px)`
                                    : 'calc(50% - 8px)'
                                }}
                              >
                                <div className="w-4 h-4 bg-[#b97a3c] rotate-45" style={{borderRadius: '4px'}}></div>
                              </div>
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-light text-[#4b3a1a] bg-[#e6dcc7] px-2 py-1" style={{clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', paddingRight: '1rem'}}>{item.left}</span>
                              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-light text-[#4b3a1a] bg-[#e6dcc7] px-2 py-1" style={{clipPath: 'polygon(0% 50%, 15% 0%, 100% 0%, 100% 100%, 15% 100%)', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', paddingLeft: '1rem'}}>{item.right}</span>
                            </div>
                            <p className="mt-2 text-base text-black font-medium">{item.description}</p>
                          </div>
                        ))}
                      </div>

                      {/* Suggestions Section */}
                      {maturityData?.suggestions && (
                        <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5 mt-6">
                          <h4 className="text-sm font-medium text-[#4b3a1a] mb-3">Improvement Suggestions</h4>
                          <p className="text-base text-black font-medium whitespace-pre-line">{maturityData.suggestions}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Market Section */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-medium text-black w-48">Market</h3>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* User Type */}
                        <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-light text-[#4b3a1a]">User Type</span>
                            <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-[#b97a3c] text-white">{feedbackData?.Market?.UserType?.label ?? ''}</span>
                          </div>
                          <p className="mt-2 text-base text-black font-medium">{feedbackData?.Market?.UserType?.rationale ?? ''}</p>
                        </div>
                        {/* Behavioral Segment */}
                        <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-light text-[#4b3a1a]">Behavioral Segment</span>
                            <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-[#b97a3c] text-white">{feedbackData?.Market?.BehavioralSegment?.label ?? ''}</span>
                          </div>
                          <p className="mt-2 text-base text-black font-medium">{feedbackData?.Market?.BehavioralSegment?.rationale ?? ''}</p>
                        </div>
                        {/* AI Mindset */}
                        <div className="bg-[#f8f4e7] border border-[#e6dcc7] rounded-xl p-5 md:col-span-2">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-light text-[#4b3a1a]">AI Mindset</span>
                            <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-[#b97a3c] text-white">{feedbackData?.Market?.UserAIMindset?.label ?? ''}</span>
                          </div>
                          <p className="mt-2 text-base text-black font-medium">{feedbackData?.Market?.UserAIMindset?.rationale ?? ''}</p>
                        </div>
                      </div>
                    </div>
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