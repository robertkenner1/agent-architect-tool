'use client';

import React, { useState } from 'react';

export default function AISuccessBlueprint() {
  const [agentDescription, setAgentDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  async function getAgentFeedback(description: string) {
    const systemPrompt = `You are an expert in AI agent design. Given the following agent description, provide constructive feedback. Focus on:
- Is the agent's purpose clear and well-defined?
- What capabilities would this agent need?
- What potential challenges might arise?
- What recommendations would you give to improve this agent concept?`;
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Agent Description: ${description}` }
    ];
    
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    
    if (!res.ok) throw new Error('Failed to get feedback');
    const data = await res.json();
    return data.message;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError('');
    setFeedback('');

    try {
      const aiFeedback = await getAgentFeedback(agentDescription);
      setFeedback(aiFeedback);
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
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
                
                {feedback && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="body-text whitespace-pre-wrap">{feedback}</div>
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