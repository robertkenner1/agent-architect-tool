'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const staticInfo = (
  <div className="mb-8">
    <h1 className="text-3xl font-bold mb-2">Build AI to Meet User Needs</h1>
    <p className="mb-4 text-lg">What are the components of building assistive and agentic experiences that will address prioritized use cases and user segments?</p>
    <p className="mb-4">Evaluate along the following 5 dimensions to determine what the AI experience should look and feel like.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-[#2e4d3a] rounded-lg p-4">
        <h2 className="font-semibold mb-1">1. Scope</h2>
        <p className="text-sm mb-1">General &lt;–&gt; Specialized</p>
        <p className="text-xs text-gray-200">What the tool can do.</p>
      </div>
      <div className="bg-[#2e4d3a] rounded-lg p-4">
        <h2 className="font-semibold mb-1">2. Anchor</h2>
        <p className="text-sm mb-1">User &lt;–&gt; Task</p>
        <p className="text-xs text-gray-200">Its connection to the user or task at hand.</p>
      </div>
      <div className="bg-[#2e4d3a] rounded-lg p-4">
        <h2 className="font-semibold mb-1">3. Control</h2>
        <p className="text-sm mb-1">Autonomous &lt;–&gt; Governed</p>
        <p className="text-xs text-gray-200">The degree to which users can oversee and manipulate the tool.</p>
      </div>
      <div className="bg-[#2e4d3a] rounded-lg p-4">
        <h2 className="font-semibold mb-1">4. Humanity</h2>
        <p className="text-sm mb-1">Person like &lt;–&gt; Tool like</p>
        <p className="text-xs text-gray-200">The extent to which the tool seems relatable or human-like.</p>
      </div>
      <div className="bg-[#2e4d3a] rounded-lg p-4">
        <h2 className="font-semibold mb-1">5. Mediation</h2>
        <p className="text-sm mb-1">Hierarchical &lt;–&gt; Collaborative</p>
        <p className="text-xs text-gray-200">How users engage with and manage the tool.</p>
      </div>
    </div>
  </div>
);

const initialState = {
  scope: '',
  anchor: '',
  control: '',
  humanity: '',
  mediation: ''
};

const scopeOptions = ['Narrow', 'Broad'];
const anchorOptions = ['Task', 'User', 'Context'];
const controlOptions = ['High', 'Medium', 'Low'];
const humanityOptions = ['High', 'Medium', 'Low'];
const mediationOptions = ['Direct', 'Indirect'];

function getBuildSummary(form: typeof initialState) {
  return `Your agent design focuses on ${form.scope.toLowerCase()} scope, anchored in ${form.anchor.toLowerCase()}, with ${form.control.toLowerCase()} user control, ${form.humanity.toLowerCase()} humanity, and ${form.mediation.toLowerCase()} mediation.`;
}

async function getBuildFeedback(form: typeof initialState) {
  const systemPrompt = `You are an expert in AI product design. Given the following description of an assistive or agentic experience, provide constructive feedback. Focus on:
- Is the experience clearly described and actionable?
- How well does it align with the 5 dimensions (Scope, Anchor, Control, Humanity, Mediation)?
- What are the strengths and areas for improvement?
- What would you recommend next?`;
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Description: ${form.description}` }
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

export default function BuildPage() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError('');
    setFeedback('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeedback('Your agent design has been evaluated successfully. The combination of parameters suggests a well-balanced approach that prioritizes user needs while maintaining appropriate levels of automation and control.');
    } catch (err) {
      setError('Failed to submit form. Please try again.');
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

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Build Your Agent</h1>
        <p className="text-lg text-gray-800 mb-8">Design your agent by specifying key parameters that define its behavior and interaction model.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="card">
            <div className="card-content space-y-6">
              <div>
                <label className="subheading mb-2 block">Scope</label>
                <div className="flex gap-2">
                  {scopeOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.scope === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="scope"
                        value={opt}
                        checked={form.scope === opt}
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
                <label className="subheading mb-2 block">Anchor</label>
                <div className="flex gap-2">
                  {anchorOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.anchor === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="anchor"
                        value={opt}
                        checked={form.anchor === opt}
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
                <label className="subheading mb-2 block">User Control</label>
                <div className="flex gap-2">
                  {controlOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.control === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="control"
                        value={opt}
                        checked={form.control === opt}
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
                <label className="subheading mb-2 block">Humanity</label>
                <div className="flex gap-2">
                  {humanityOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.humanity === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="humanity"
                        value={opt}
                        checked={form.humanity === opt}
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
                <label className="subheading mb-2 block">Mediation</label>
                <div className="flex gap-2">
                  {mediationOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.mediation === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="mediation"
                        value={opt}
                        checked={form.mediation === opt}
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
              <p className="body-text mb-4">{getBuildSummary(form)}</p>
              <ul className="space-y-2 mb-4">
                <li className="body-text"><b>Scope:</b> {form.scope}</li>
                <li className="body-text"><b>Anchor:</b> {form.anchor}</li>
                <li className="body-text"><b>User Control:</b> {form.control}</li>
                <li className="body-text"><b>Humanity:</b> {form.humanity}</li>
                <li className="body-text"><b>Mediation:</b> {form.mediation}</li>
              </ul>

              {loading && <p className="text-blue-600">Getting AI feedback...</p>}
              {error && <p className="text-red-600">{error}</p>}
              
              {feedback && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h3 className="subheading mb-2">AI Feedback</h3>
                  <div className="body-text whitespace-pre-wrap">{feedback}</div>
                </div>
              )}

              <Link href="/ai-success-blueprint/evaluate" className="btn-primary w-full block text-center mt-4">Next Step →</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 