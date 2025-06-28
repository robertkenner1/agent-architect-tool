// Utility functions for maturity analysis and idea expansion

export async function generateMaturitySummary(
  agentDescription: string, 
  maturityLevel: 'L0' | 'L1' | 'L2'
): Promise<string> {
  const systemPrompt = `You are an expert AI agent analyst. Generate a concise paragraph (2-3 sentences) explaining how the described agent operates at the specified maturity level.

Maturity levels:
- L0 (Connector Agent): Passively push/pull data, minimal decision-making, no end-to-end ownership
- L1 (Task Agent): Solve defined use cases across tools, some autonomy within scope  
- L2 (Collaborative Agent): Strategic coordination, proactive, full workflow ownership

Be specific about capabilities and limitations at this level. Focus on what the agent can and cannot do.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Agent: ${agentDescription}\n\nMaturity Level: ${maturityLevel}` }
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
      throw new Error('Failed to generate maturity summary');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error generating maturity summary:', error);
    throw error;
  }
}

export async function generateExpandedIdea(
  agentDescription: string, 
  maturityLevel: 'L0' | 'L1' | 'L2'
): Promise<string[]> {
  const systemPrompt = `You are an expert AI agent designer. Given an agent idea and target maturity level, generate 3-4 bullet points showing how this idea might evolve to operate at that level.

Maturity levels:
- L0 (Connector Agent): Focus on data sync, basic integrations, manual triggers
- L1 (Task Agent): Add contextual understanding, some automation, defined workflows  
- L2 (Collaborative Agent): Full automation, predictive actions, complex orchestration

Return ONLY the bullet points, one per line, starting with "- ". Be concrete and specific.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Agent: ${agentDescription}\n\nTarget Level: ${maturityLevel}` }
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
      throw new Error('Failed to generate expanded idea');
    }

    const data = await response.json();
    // Parse bullet points from response
    const bulletPoints = data.message
      .split('\n')
      .filter((line: string) => line.trim().startsWith('- '))
      .map((line: string) => line.trim().substring(2)); // Remove "- " prefix
    
    return bulletPoints;
  } catch (error) {
    console.error('Error generating expanded idea:', error);
    throw error;
  }
}

export function getMaturityLevelFromClassification(classification: string): 'L0' | 'L1' | 'L2' {
  const normalized = classification?.toLowerCase();
  if (normalized?.includes('low') || normalized?.includes('l0')) return 'L0';
  if (normalized?.includes('high') || normalized?.includes('l2')) return 'L2';
  return 'L1'; // Default to L1 for medium or unknown
}

export function formatMaturityLevel(level: 'L0' | 'L1' | 'L2'): { name: string; description: string } {
  const levels = {
    'L0': {
      name: 'Connector Agent',
      description: 'Passively push and pull data from external sources with simple data ingress/egress, minimal decision-making, and no end-to-end use case ownership.'
    },
    'L1': {
      name: 'Task Agent', 
      description: 'Built to solve defined use cases, often across multiple tools, and may call other agents or use internal skills with some opinion about their role.'
    },
    'L2': {
      name: 'Collaborative Agent',
      description: 'Strategic agents that coordinate end-to-end workflows, invoke other agents and tools to achieve outcomes, and are proactive by design.'
    }
  };
  
  return levels[level];
} 