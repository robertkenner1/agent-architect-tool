'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const staticInfo = (
  <div className="mb-8">
    <h1 className="text-3xl font-bold mb-2">Evaluate Success of AI Experiences</h1>
    <p className="mb-4 text-lg">How do we determine whether an assistive or agentic experience is successfully addressing use cases and user segments?</p>
    <p className="mb-4">Engage in internal evaluations via Stereoscope and user research to evaluate if the following conditions are met:</p>
    <ul className="list-disc ml-6 text-sm">
      <li>Addresses the targeted use case</li>
      <li>Aligns with their AI readiness</li>
      <li>Is high quality</li>
      <li>Is highly valuable in their day to day workflows</li>
    </ul>
  </div>
);

const initialState = {
  userFeedback: '',
  metrics: '',
  improvements: ''
};

function getEvaluateSummary(form: typeof initialState) {
  return `Based on your evaluation, you've gathered user feedback, identified key metrics, and outlined potential improvements for your agent.`;
}

async function getEvaluateFeedback(form: typeof initialState) {
  const systemPrompt = `You are an expert in AI product evaluation. Given the following evaluation notes, provide constructive feedback. Focus on:
- Are the evaluation notes clear and actionable?
- What are the strengths and areas for improvement?
- What would you recommend next for evaluating success?`;
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Evaluation Notes: ${form.userFeedback}, ${form.metrics}, ${form.improvements}` }
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

export default function EvaluatePage() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      setFeedback('Your evaluation has been processed successfully. The feedback and metrics you\'ve provided will help guide future iterations and improvements to your agent design.');
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

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Evaluate Your Agent</h1>
        <p className="text-lg text-gray-800 mb-8">Assess your agent's performance and gather insights for improvement.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="card">
            <div className="card-content space-y-6">
              <div>
                <label className="subheading mb-2 block">User Feedback</label>
                <textarea
                  name="userFeedback"
                  value={form.userFeedback}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  placeholder="What feedback have you received from users?"
                  required
                />
              </div>

              <div>
                <label className="subheading mb-2 block">Key Metrics</label>
                <textarea
                  name="metrics"
                  value={form.metrics}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  placeholder="What metrics are you tracking to measure success?"
                  required
                />
              </div>

              <div>
                <label className="subheading mb-2 block">Potential Improvements</label>
                <textarea
                  name="improvements"
                  value={form.improvements}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  placeholder="What improvements would you like to make?"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">Submit</button>
            </div>
          </form>
        ) : (
          <div className="card">
            <div className="card-content">
              <h2 className="section-heading mb-4">Summary</h2>
              <p className="body-text mb-4">{getEvaluateSummary(form)}</p>
              <ul className="space-y-2 mb-4">
                <li className="body-text"><b>User Feedback:</b> {form.userFeedback}</li>
                <li className="body-text"><b>Key Metrics:</b> {form.metrics}</li>
                <li className="body-text"><b>Potential Improvements:</b> {form.improvements}</li>
              </ul>

              {loading && <p className="text-blue-600">Getting AI feedback...</p>}
              {error && <p className="text-red-600">{error}</p>}
              
              {feedback && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h3 className="subheading mb-2">AI Feedback</h3>
                  <div className="body-text whitespace-pre-wrap">{feedback}</div>
                </div>
              )}

              <Link href="/ai-success-blueprint" className="btn-primary w-full block text-center mt-4">Return to Blueprint</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 