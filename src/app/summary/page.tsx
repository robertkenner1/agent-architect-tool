'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface StepResponses {
  prioritize?: any;
  market?: any;
  build?: any;
  evaluate?: any;
  feedbacks?: {
    prioritize?: string;
    market?: string;
    build?: string;
    evaluate?: string;
  };
}

function getPrioritizeSummary(form: any) {
  return `You described the use case as: "${form.description}". You rated its Relevance as ${form.relevance}, Capability as ${form.capability}, Strategic Alignment as ${form.alignment}, and Business Impact as ${form.impact}.`;
}
function getMarketSummary(form: any) {
  return `You are targeting ${form.userType?.toLowerCase()}s in the behavioral segment "${form.behavioralSegment}" with an AI mindset of "${form.aiMindset}".`;
}
function getBuildSummary(form: any) {
  return `You described your assistive or agentic experience as: "${form.description}". This will guide how you build the experience to align with user perception.`;
}
function getEvaluateSummary(form: any) {
  return `Your evaluation notes: "${form.evaluationNotes}". Use this as a prediction for how successful your AI experience will be with users, and as a basis for further research or internal review.`;
}

async function getOverallSummary(responses: StepResponses) {
  const systemPrompt = `You are an expert in AI product strategy. Given the following step summaries and feedback, provide a high-level summary and overall evaluation. Focus on:
- The overall strengths and areas for improvement
- How well the steps fit together
- Any major risks or opportunities
- A concise, actionable overall evaluation for the agent idea`;
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Step Summaries and Feedback:\n${JSON.stringify(responses, null, 2)}` }
  ];
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error('Failed to get overall summary');
  const data = await res.json();
  return data.message;
}

export default function SummaryPage() {
  const [responses, setResponses] = useState<StepResponses>({});
  const [overall, setOverall] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('aiSuccessBlueprintResponses');
    if (saved) {
      const parsed = JSON.parse(saved);
      setResponses(parsed);
      setLoading(true);
      setError(null);
      getOverallSummary(parsed)
        .then(setOverall)
        .catch(() => setError('Failed to get overall summary.'))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#234137] text-white flex flex-col items-center p-8">
      <div className="w-full max-w-3xl">
        <div className="mb-4">
          <Link href="/" className="text-orange-300 hover:underline">← Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-6">AI Success Blueprint Summary</h1>
        {Object.keys(responses).length === 0 ? (
          <div className="bg-[#2e4d3a] rounded-xl p-6 shadow-lg text-center">
            <p>No responses found. Please complete the steps first.</p>
          </div>
        ) : (
          <>
            <div className="bg-[#2e4d3a] rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-2">High-Level Summary & Overall Evaluation</h2>
              {loading && <p className="text-blue-200">Getting overall summary...</p>}
              {error && <p className="text-red-300">{error}</p>}
              {overall && <div className="whitespace-pre-wrap text-green-200">{overall}</div>}
            </div>
            <div className="space-y-8">
              {responses.prioritize && (
                <section className="bg-[#2e4d3a] rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-2">Prioritize</h2>
                  <p className="mb-4 text-green-200">{getPrioritizeSummary(responses.prioritize)}</p>
                  <ul className="mb-4 space-y-1">
                    <li><b>Use Case:</b> {responses.prioritize.description}</li>
                    <li><b>Relevance:</b> {responses.prioritize.relevance}</li>
                    <li><b>Capability:</b> {responses.prioritize.capability}</li>
                    <li><b>Strategic Alignment:</b> {responses.prioritize.alignment}</li>
                    <li><b>Business Impact:</b> {responses.prioritize.impact}</li>
                  </ul>
                  {responses.feedbacks?.prioritize && (
                    <div className="mt-4 p-4 bg-green-900 rounded">
                      <h3 className="font-semibold mb-2">AI Feedback</h3>
                      <div className="whitespace-pre-wrap">{responses.feedbacks.prioritize}</div>
                    </div>
                  )}
                </section>
              )}
              {responses.market && (
                <section className="bg-[#2e4d3a] rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-2">Market</h2>
                  <p className="mb-4 text-green-200">{getMarketSummary(responses.market)}</p>
                  <ul className="mb-4 space-y-1">
                    <li><b>User Type:</b> {responses.market.userType}</li>
                    <li><b>Behavioral Segment:</b> {responses.market.behavioralSegment}</li>
                    <li><b>User AI Mindset:</b> {responses.market.aiMindset}</li>
                  </ul>
                  {responses.feedbacks?.market && (
                    <div className="mt-4 p-4 bg-green-900 rounded">
                      <h3 className="font-semibold mb-2">AI Feedback</h3>
                      <div className="whitespace-pre-wrap">{responses.feedbacks.market}</div>
                    </div>
                  )}
                </section>
              )}
              {responses.build && (
                <section className="bg-[#2e4d3a] rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-2">Build</h2>
                  <p className="mb-4 text-green-200">{getBuildSummary(responses.build)}</p>
                  <ul className="mb-4 space-y-1">
                    <li><b>Description:</b> {responses.build.description}</li>
                  </ul>
                  {responses.feedbacks?.build && (
                    <div className="mt-4 p-4 bg-green-900 rounded">
                      <h3 className="font-semibold mb-2">AI Feedback</h3>
                      <div className="whitespace-pre-wrap">{responses.feedbacks.build}</div>
                    </div>
                  )}
                </section>
              )}
              {responses.evaluate && (
                <section className="bg-[#2e4d3a] rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-2">Evaluate</h2>
                  <p className="mb-4 text-green-200">{getEvaluateSummary(responses.evaluate)}</p>
                  <ul className="mb-4 space-y-1">
                    <li><b>Evaluation Notes:</b> {responses.evaluate.evaluationNotes}</li>
                  </ul>
                  {responses.feedbacks?.evaluate && (
                    <div className="mt-4 p-4 bg-green-900 rounded">
                      <h3 className="font-semibold mb-2">AI Feedback</h3>
                      <div className="whitespace-pre-wrap">{responses.feedbacks.evaluate}</div>
                    </div>
                  )}
                </section>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
} 