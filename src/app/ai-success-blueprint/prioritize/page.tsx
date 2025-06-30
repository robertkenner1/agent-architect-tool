'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const staticInfo = (
  <div className="mb-8">
    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Prioritization Framework</h1>
    <p className="text-lg text-gray-800 mb-4 max-w-3xl">What use cases should we be solving via assistive and agentic experiences? Score each use case across four key dimensions: <b>Relevance, Capability, Strategic Alignment, and Business Impact</b>.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <div className="card-content">
          <h2 className="subheading mb-1">1. Relevance</h2>
          <p className="body-text mb-1">How important and frequent is the task to users?</p>
          <p className="body-text text-xs">Captures how central a task is to users' goals and daily workflows. It considers task frequency, importance, current user behavior with AI, and whether the task is perceived as tedious, risky, or other factors identified herein.</p>
          <p className="body-text text-xs mt-1 italic">Defined by UXMR.</p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h2 className="subheading mb-1">2. Capability</h2>
          <p className="body-text mb-1">Can we build it well with our current abilities?</p>
          <p className="body-text text-xs">Reflects how well current AI systems can perform the task with accuracy, clarity, and user trust. It evaluates technical feasibility, safety, and whether the task has clear input/output boundaries suitable for automation.</p>
          <p className="body-text text-xs mt-1 italic">Defined by Product + Eng.</p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h2 className="subheading mb-1">3. Strategic Alignment</h2>
          <p className="body-text mb-1">Does it fit our brand, goals, and future strategy?</p>
          <p className="body-text text-xs">Measures how well a use case fits our brand, product strategy, and target segments. Reinforces our right-to-win or opens aligned, valuable new territory for adoption, expansion, upsell leverage, and innovation signaling.</p>
          <p className="body-text text-xs mt-1 italic">Defined by PMM.</p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h2 className="subheading mb-1">4. Business Impact</h2>
          <p className="body-text mb-1">Will it drive meaningful business results?</p>
          <p className="body-text text-xs">Assesses the use case's potential to drive revenue, retention, market expansion, and marketing momentum. It prioritizes initiatives that can materially move key business levers.</p>
          <p className="body-text text-xs mt-1 italic">Defined by Finance + Growth.</p>
        </div>
      </div>
    </div>
  </div>
);

const initialState = {
  description: '',
  relevance: '',
  capability: '',
  alignment: '',
  impact: '',
};

const relevanceOptions = ['High', 'Medium', 'Low'];
const capabilityOptions = ['XS', 'S', 'M', 'L', 'XL'];
const alignmentOptions = ['High', 'Medium', 'Low'];
const impactOptions = ['Right to Win', 'Double Down', 'Expand'];

function getPrioritizeSummary(form: typeof initialState) {
  return `You described the use case as: "${form.description}". You rated its Relevance as ${form.relevance}, Capability as ${form.capability}, Strategic Alignment as ${form.alignment}, and Business Impact as ${form.impact}.`;
}

async function getPrioritizeFeedback(form: typeof initialState) {
  const systemPrompt = `You are an expert in AI product strategy. Given the following use case and scores, provide constructive feedback. Focus on:
- Is the use case clear and actionable?
- Are the scores for Relevance, Capability, Strategic Alignment, and Business Impact justified?
- What are the strengths and areas for improvement?
- What would you recommend next?`;
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Use Case: ${form.description}\nRelevance: ${form.relevance}\nCapability: ${form.capability}\nStrategic Alignment: ${form.alignment}\nBusiness Impact: ${form.impact}` }
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

export default function PrioritizePage() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    const prev = localStorage.getItem('aiSuccessBlueprintResponses');
    const responses = prev ? JSON.parse(prev) : {};
    responses.prioritize = form;
    localStorage.setItem('aiSuccessBlueprintResponses', JSON.stringify(responses));
    setSubmitted(true);
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const aiFeedback = await getPrioritizeFeedback(form);
      setFeedback(aiFeedback);
    } catch (err) {
      setError('Failed to get AI feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-4">
          <Link href="/ai-success-blueprint" className="text-gray-600 hover:text-gray-900">← Back to AI Success Blueprint</Link>
        </div>
        {staticInfo}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="card">
            <div className="card-content space-y-6">
              <div>
                <label className="subheading mb-2 block">Describe the use case in 1–2 sentences</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent force-black-text"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="subheading mb-2 block">Relevance</label>
                <div className="flex gap-2">
                  {relevanceOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.relevance === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="relevance"
                        value={opt}
                        checked={form.relevance === opt}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="subheading mb-2 block">Capability</label>
                <div className="flex gap-2">
                  {capabilityOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.capability === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="capability"
                        value={opt}
                        checked={form.capability === opt}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="subheading mb-2 block">Strategic Alignment</label>
                <div className="flex gap-2">
                  {alignmentOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.alignment === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="alignment"
                        value={opt}
                        checked={form.alignment === opt}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="subheading mb-2 block">Business Impact</label>
                <div className="flex gap-2">
                  {impactOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.impact === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="impact"
                        value={opt}
                        checked={form.impact === opt}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">Submit</button>
            </div>
          </form>
        ) : (
          <div className="card">
            <div className="card-content">
              <h2 className="section-heading mb-4">Summary</h2>
              <p className="body-text mb-4">{getPrioritizeSummary(form)}</p>
              <ul className="space-y-2 mb-4">
                <li className="body-text"><b>Use Case:</b> {form.description}</li>
                <li className="body-text"><b>Relevance:</b> {form.relevance}</li>
                <li className="body-text"><b>Capability:</b> {form.capability}</li>
                <li className="body-text"><b>Strategic Alignment:</b> {form.alignment}</li>
                <li className="body-text"><b>Business Impact:</b> {form.impact}</li>
              </ul>

              {loading && <p className="text-blue-600">Getting AI feedback...</p>}
              {error && <p className="text-red-600">{error}</p>}
              
              {feedback && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h3 className="subheading mb-2">AI Feedback</h3>
                  <div className="body-text whitespace-pre-wrap">{feedback}</div>
                </div>
              )}
              <Link href="/ai-success-blueprint/market" className="btn-primary w-full block text-center mt-4">Next Step →</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 