'use client';

import React, { useState } from 'react';
import { getAgentFeedback } from '@/utils/agentPrompts';

// First, create a type for the feedback JSON structure
type FeedbackData = {
  Relevance: { score: string; rationale: string };
  Capability: { score: string; rationale: string };
  StrategicAlignment: { score: string; rationale: string };
  BusinessImpact: { score: string; rationale: string };
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
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-[#000000]"
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
                  <div className="space-y-6">
                    {/* Relevance Section */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-blue-50 px-4 py-2 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-blue-800">Relevance</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            feedbackData.Relevance.score === 'High' ? 'bg-green-100 text-green-800' :
                            feedbackData.Relevance.score === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {feedbackData.Relevance.score}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <p className="text-black">{feedbackData.Relevance.rationale}</p>
                      </div>
                    </div>
                    
                    {/* Capability Section */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-purple-50 px-4 py-2 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-purple-800">Capability</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            ['XL', 'L'].includes(feedbackData.Capability.score) ? 'bg-green-100 text-green-800' :
                            ['M'].includes(feedbackData.Capability.score) ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {feedbackData.Capability.score}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <p className="text-black">{feedbackData.Capability.rationale}</p>
                      </div>
                    </div>
                    
                    {/* Strategic Alignment Section */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-green-50 px-4 py-2 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-green-800">Strategic Alignment</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            feedbackData.StrategicAlignment.score === 'High' ? 'bg-green-100 text-green-800' :
                            feedbackData.StrategicAlignment.score === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {feedbackData.StrategicAlignment.score}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <p className="text-black">{feedbackData.StrategicAlignment.rationale}</p>
                      </div>
                    </div>
                    
                    {/* Business Impact Section */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-amber-50 px-4 py-2 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-amber-800">Business Impact</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            feedbackData.BusinessImpact.score === 'Core' ? 'bg-green-100 text-green-800' :
                            feedbackData.BusinessImpact.score === 'Expand' ? 'bg-blue-100 text-blue-800' :
                            feedbackData.BusinessImpact.score === 'Explore' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {feedbackData.BusinessImpact.score}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <p className="text-black">{feedbackData.BusinessImpact.rationale}</p>
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