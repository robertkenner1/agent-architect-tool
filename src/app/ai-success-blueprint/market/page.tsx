'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const staticInfo = (
  <div className="mb-8">
    <h1 className="text-3xl font-bold mb-2">Market AI to Users</h1>
    <p className="mb-4 text-lg">Who should we be targeting with our assistive and agentic experiences?</p>
    <p className="mb-4">Clearly defining the user segments and the type of messaging that resonates with them leads to successful outcomes.</p>
    <div className="bg-[#2e4d3a] rounded-lg p-4 mt-4">
      <h2 className="font-semibold mb-1">User Segments</h2>
      <ul className="text-sm list-disc ml-6">
        <li><b>User Type:</b> Student or Knowledge Worker</li>
        <li><b>Behavioral Segments:</b> Accelerator, Operator, Tailor, or Architect</li>
        <li><b>User AI Mindsets:</b> Capable but Cautious, Engaged and Enabled, Interested but Inexperienced, or Disengaged and Doubtful</li>
      </ul>
    </div>
  </div>
);

const initialState = {
  userType: '',
  behavioralSegment: '',
  aiMindset: '',
};

const userTypeOptions = ['Knowledge Worker', 'Student', 'Developer'];
const behavioralSegmentOptions = ['Early Adopter', 'Mainstream', 'Late Adopter'];
const aiMindsetOptions = ['Enthusiast', 'Pragmatist', 'Skeptic'];

function getMarketSummary(form: typeof initialState) {
  return `Based on your inputs, you're targeting ${form.userType}s who are ${form.behavioralSegment}s with a ${form.aiMindset} mindset towards AI.`;
}

async function getMarketFeedback(form: typeof initialState) {
  const systemPrompt = `You are an expert in AI product marketing. Given the following user segment selections, provide constructive feedback. Focus on:
- Is the user segment well defined?
- Are the behavioral segment and AI mindset choices appropriate for the target?
- What are the strengths and areas for improvement?
- What would you recommend next?`;
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `User Type: ${form.userType}\nBehavioral Segment: ${form.behavioralSegment}\nUser AI Mindset: ${form.aiMindset}` }
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

export default function MarketPage() {
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
      setFeedback('Your market analysis has been evaluated successfully. Based on your inputs, this appears to be a well-defined target segment with clear opportunities for engagement.');
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

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Market Analysis</h1>
        <p className="text-lg text-gray-800 mb-8">Define your target market segments and understand their AI adoption patterns.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="card">
            <div className="card-content space-y-6">
              <div>
                <label className="subheading mb-2 block">User Type</label>
                <div className="flex gap-2">
                  {userTypeOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.userType === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={opt}
                        checked={form.userType === opt}
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
                <label className="subheading mb-2 block">Behavioral Segment</label>
                <div className="flex gap-2">
                  {behavioralSegmentOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.behavioralSegment === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="behavioralSegment"
                        value={opt}
                        checked={form.behavioralSegment === opt}
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
                <label className="subheading mb-2 block">AI Mindset</label>
                <div className="flex gap-2">
                  {aiMindsetOptions.map(opt => (
                    <label key={opt} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
                      ${form.aiMindset === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="aiMindset"
                        value={opt}
                        checked={form.aiMindset === opt}
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
              <p className="body-text mb-4">{getMarketSummary(form)}</p>
              <ul className="space-y-2 mb-4">
                <li className="body-text"><b>User Type:</b> {form.userType}</li>
                <li className="body-text"><b>Behavioral Segment:</b> {form.behavioralSegment}</li>
                <li className="body-text"><b>AI Mindset:</b> {form.aiMindset}</li>
              </ul>

              {loading && <p className="text-blue-600">Getting AI feedback...</p>}
              {error && <p className="text-red-600">{error}</p>}
              
              {feedback && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h3 className="subheading mb-2">AI Feedback</h3>
                  <div className="body-text whitespace-pre-wrap">{feedback}</div>
                </div>
              )}

              <Link href="/ai-success-blueprint/build" className="btn-primary w-full block text-center mt-4">Next Step →</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 