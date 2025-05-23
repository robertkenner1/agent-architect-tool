'use client';

import { useState } from 'react';
import { generateSummary, downloadSummary } from '@/utils/summaryGenerator';
import { BlueprintStep, blueprintSteps } from '@/data/blueprintSteps';

interface SummaryViewProps {
  responses: Record<string, Record<string, string>>;
  chatLog: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export function SummaryView({ responses, chatLog }: SummaryViewProps) {
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const generatedSummary = await generateSummary(responses);
      setSummary(generatedSummary);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (summary) {
      downloadSummary(summary);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">AI Success Blueprint Summary</h1>
        <div className="flex gap-4">
          <button
            onClick={handleGenerateSummary}
            disabled={isGenerating}
            className={`px-4 py-2 rounded-lg ${
              isGenerating
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isGenerating ? 'Generating...' : 'Generate Summary'}
          </button>
          {summary && (
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              Download Summary
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {summary ? (
        <div className="prose max-w-none">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="whitespace-pre-wrap">{summary}</div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Click "Generate Summary" to create a comprehensive report of your AI Success Blueprint implementation.
        </div>
      )}
    </div>
  );
} 