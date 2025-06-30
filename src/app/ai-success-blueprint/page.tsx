'use client';

import React, { useState } from 'react';
import { getAgentFeedback } from '@/utils/agentPrompts';

// First, create a type for the feedback JSON structure
type FeedbackData = {
  Prioritize: {
    Relevance: { score: string; rationale: string };
    Capability: { score: string; rationale: string };
    StrategicAlignment: { score: string; rationale: string };
    BusinessImpact: { score: string; rationale: string };
  };
  Market: {
    UserType: { label: string; rationale: string };
    BehavioralSegment: { label: string; rationale: string };
    UserAIMindset: { label: string; rationale: string };
  };
  Build: {
    Scope: { score: number; rationale: string };
    Anchor: { score: number; rationale: string };
    Control: { score: number; rationale: string };
    Humanity: { score: number; rationale: string };
    Mediation: { score: number; rationale: string };
  };
  Evaluate: {
    SuccessConditionSummary: {
      TargetedUseCase: string;
      AIReadinessAndResonance: string;
      PerceivedQuality: string;
      PerceivedValue: string;
    };
  };
};

export default function AISuccessBlueprint() {
  const [agentDescription, setAgentDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError('');
    setFeedbackData(null);

    try {
      const aiFeedback = await getAgentFeedback(agentDescription, "gpt-4.1");
      
      try {
        const parsedFeedback = JSON.parse(aiFeedback);
        setFeedbackData(parsedFeedback);
      } catch (jsonError) {
        setError('Error parsing feedback. Please try again.');
      }
    } catch (err) {
      setError('Failed to get AI feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">AI Success Blueprint</h1>
        <p className="text-lg text-gray-800 mb-8">Welcome to the AI Success Blueprint. Describe your agent below to get started.</p>
        
        <div className="w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="card">
            <div className="card-content p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Describe Your Agent</h2>
              
              <div className="mb-6">
                <label htmlFor="agentDescription" className="block text-lg font-medium text-gray-700 mb-2">
                  Please answer the following questions:
                </label>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li className="mb-1">Describe the agent</li>
                  <li className="mb-1">Provide as many details as you can</li>
                </ul>
                
                <textarea
                  id="agentDescription"
                  rows={8}
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-[#000000] force-black-text"
                  placeholder="Enter your agent description here..."
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="btn-primary px-6 py-3"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
          
          {submitted && (
            <div className="mt-8 card">
              <div className="card-content p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Feedback</h2>
                
                {loading && <p className="text-blue-600">Getting AI feedback...</p>}
                {error && <p className="text-red-600">{error}</p>}
                
                {feedbackData && (
                  <div className="space-y-8">
                    {/* Prioritize Section */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Prioritize</h3>
                      <div className="space-y-6 bg-blue-50 p-6 rounded-lg">
                        {/* Relevance Section */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Relevance</h3>
                          <div className="flex items-center mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              feedbackData.Prioritize.Relevance.score === 'High' ? 'bg-green-100 text-green-800' :
                              feedbackData.Prioritize.Relevance.score === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {feedbackData.Prioritize.Relevance.score}
                            </span>
                          </div>
                          <p className="text-black">{feedbackData.Prioritize.Relevance.rationale}</p>
                        </div>
                        
                        {/* Capability Section */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Capability</h3>
                          <div className="flex items-center mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              ['XL', 'L'].includes(feedbackData.Prioritize.Capability.score) ? 'bg-green-100 text-green-800' :
                              ['M'].includes(feedbackData.Prioritize.Capability.score) ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {feedbackData.Prioritize.Capability.score}
                            </span>
                          </div>
                          <p className="text-black">{feedbackData.Prioritize.Capability.rationale}</p>
                        </div>
                        
                        {/* Strategic Alignment Section */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Strategic Alignment</h3>
                          <div className="flex items-center mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              feedbackData.Prioritize.StrategicAlignment.score === 'High' ? 'bg-green-100 text-green-800' :
                              feedbackData.Prioritize.StrategicAlignment.score === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {feedbackData.Prioritize.StrategicAlignment.score}
                            </span>
                          </div>
                          <p className="text-black">{feedbackData.Prioritize.StrategicAlignment.rationale}</p>
                        </div>
                        
                        {/* Business Impact Section */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Business Impact</h3>
                          <div className="flex items-center mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              feedbackData.Prioritize.BusinessImpact.score === 'Right-to-Win' ? 'bg-green-100 text-green-800' :
                              feedbackData.Prioritize.BusinessImpact.score === 'Double-Down' ? 'bg-blue-100 text-blue-800' :
                              feedbackData.Prioritize.BusinessImpact.score === 'Expand' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {feedbackData.Prioritize.BusinessImpact.score}
                            </span>
                          </div>
                          <p className="text-black">{feedbackData.Prioritize.BusinessImpact.rationale}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Market Section */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Market</h3>
                      <div className="space-y-6 bg-indigo-50 p-6 rounded-lg">
                        {/* User Type */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">User Type</h3>
                          <div className="flex items-center mb-3">
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                              {feedbackData.Market.UserType.label}
                            </span>
                          </div>
                          <p className="text-black">{feedbackData.Market.UserType.rationale}</p>
                        </div>
                        
                        {/* Behavioral Segment */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Behavioral Segment</h3>
                          <div className="flex items-center mb-3">
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                              {feedbackData.Market.BehavioralSegment.label}
                            </span>
                          </div>
                          <p className="text-black">{feedbackData.Market.BehavioralSegment.rationale}</p>
                        </div>
                        
                        {/* User AI Mindset */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">User AI Mindset</h3>
                          <div className="flex items-center mb-3">
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                              {feedbackData.Market.UserAIMindset.label}
                            </span>
                          </div>
                          <p className="text-black">{feedbackData.Market.UserAIMindset.rationale}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Build Section */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Build</h3>
                      <div className="space-y-8 bg-amber-50 p-6 rounded-lg">
                        {/* Scope */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Scope: <span className="font-normal">General <span className="text-gray-400 mx-2">&lt;-&gt;</span> Specialized</span></h3>
                          <div className="mt-3 relative">
                            <div className="w-full h-[2px] bg-gray-300 rounded">
                              <div 
                                className="absolute h-5 w-5 bg-amber-500 rounded-full top-1/2 -mt-2.5 transform"
                                style={{ left: `${((feedbackData.Build.Scope.score - 1) / 4) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="mt-4 text-black">{feedbackData.Build.Scope.rationale}</p>
                        </div>
                        
                        {/* Anchor */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Anchor: <span className="font-normal">User <span className="text-gray-400 mx-2">&lt;-&gt;</span> Task</span></h3>
                          <div className="mt-3 relative">
                            <div className="w-full h-[2px] bg-gray-300 rounded">
                              <div 
                                className="absolute h-5 w-5 bg-amber-500 rounded-full top-1/2 -mt-2.5 transform"
                                style={{ left: `${((feedbackData.Build.Anchor.score - 1) / 4) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="mt-4 text-black">{feedbackData.Build.Anchor.rationale}</p>
                        </div>
                        
                        {/* Control */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Control: <span className="font-normal">Governed <span className="text-gray-400 mx-2">&lt;-&gt;</span> Autonomous</span></h3>
                          <div className="mt-3 relative">
                            <div className="w-full h-[2px] bg-gray-300 rounded">
                              <div 
                                className="absolute h-5 w-5 bg-amber-500 rounded-full top-1/2 -mt-2.5 transform"
                                style={{ left: `${((feedbackData.Build.Control.score - 1) / 4) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="mt-4 text-black">{feedbackData.Build.Control.rationale}</p>
                        </div>
                        
                        {/* Humanity */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Humanity: <span className="font-normal">Person Like <span className="text-gray-400 mx-2">&lt;-&gt;</span> Tool Like</span></h3>
                          <div className="mt-3 relative">
                            <div className="w-full h-[2px] bg-gray-300 rounded">
                              <div 
                                className="absolute h-5 w-5 bg-amber-500 rounded-full top-1/2 -mt-2.5 transform"
                                style={{ left: `${((feedbackData.Build.Humanity.score - 1) / 4) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="mt-4 text-black">{feedbackData.Build.Humanity.rationale}</p>
                        </div>
                        
                        {/* Mediation */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Mediation: <span className="font-normal">Hierarchical <span className="text-gray-400 mx-2">&lt;-&gt;</span> Collaborative</span></h3>
                          <div className="mt-3 relative">
                            <div className="w-full h-[2px] bg-gray-300 rounded">
                              <div 
                                className="absolute h-5 w-5 bg-amber-500 rounded-full top-1/2 -mt-2.5 transform"
                                style={{ left: `${((feedbackData.Build.Mediation.score - 1) / 4) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="mt-4 text-black">{feedbackData.Build.Mediation.rationale}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Evaluate Section */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Success Condition Summary</h3>
                      <div className="space-y-6 bg-purple-50 p-6 rounded-lg">
                        {/* Targeted Use Case */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Targeted Use Case</h3>
                          <p className="text-black">{feedbackData.Evaluate.SuccessConditionSummary.TargetedUseCase}</p>
                        </div>
                        
                        {/* AI Readiness & Resonance */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">AI Readiness & Resonance</h3>
                          <p className="text-black">{feedbackData.Evaluate.SuccessConditionSummary.AIReadinessAndResonance}</p>
                        </div>
                        
                        {/* Perceived Quality */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Perceived Quality</h3>
                          <p className="text-black">{feedbackData.Evaluate.SuccessConditionSummary.PerceivedQuality}</p>
                        </div>
                        
                        {/* Perceived Value */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Perceived Value</h3>
                          <p className="text-black">{feedbackData.Evaluate.SuccessConditionSummary.PerceivedValue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}