import { BlueprintStep, blueprintSteps } from '@/data/blueprintSteps';

interface StepResponses {
  [question: string]: string;
}

interface Responses {
  [stepId: string]: StepResponses;
}

export async function generateSummary(responses: Responses): Promise<string> {
  const systemPrompt = `You are creating a comprehensive summary of an AI Success Blueprint implementation.
Format the summary as a well-structured markdown document with the following sections:

1. Executive Summary
   - Brief overview of the AI assistant design
   - Key decisions and recommendations

2. Step-by-Step Analysis
   For each step (Prioritize, Market, Build, Evaluate):
   - Step Overview
   - Key Responses
   - Strengths
   - Areas for Improvement
   - Recommendations

3. Implementation Roadmap
   - Priority actions
   - Timeline suggestions
   - Resource requirements

4. Risk Assessment
   - Potential challenges
   - Mitigation strategies

Keep the tone professional and actionable. Focus on practical insights and next steps.`;

  const messages = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `Here is the complete blueprint implementation data:\n${JSON.stringify(responses, null, 2)}`
    }
  ];

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate summary');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

export function downloadSummary(summary: string) {
  const blob = new Blob([summary], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ai-success-blueprint-summary.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
} 

// Summarize a single agent idea in 8-12 words, clear and specific, for a report heading
export async function summarizeIdea(idea: string): Promise<string> {
  const systemPrompt = `You are an expert at writing concise, clear, and specific report headings. Given an AI agent idea, summarize it in 8-12 words as a report heading. Do not include generic words like 'report' or 'summary'.`;
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: idea }
  ];
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    if (!response.ok) {
      throw new Error('Failed to generate summary');
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
} 