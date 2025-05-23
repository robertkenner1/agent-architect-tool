export interface BlueprintStep {
  id: string;
  title: string;
  info: string;
  questions: string[];
}

export const blueprintSteps: BlueprintStep[] = [
  {
    id: "prioritize",
    title: "Prioritize",
    info: "Score each use case across four key dimensions to determine priority:",
    questions: [
      "Describe the use case in 1–2 sentences.",
      "Relevance: How important/frequent is this task for users? (High, Medium, Low)",
      "Capability: Can we build this well with our current abilities? (XS–XL)",
      "Strategic Alignment: Does this fit our brand and goals? (High, Medium, Low)",
      "Business Impact: Will this drive significant business results? (Right to Win, Double Down, Expand)",
    ],
  },
  {
    id: "market",
    title: "Market",
    info: "How should we position and market our AI capabilities?",
    questions: [
      "What is our unique value proposition?",
      "Who are our target users?",
      "What are the key benefits we want to highlight?",
      "How do we differentiate from competitors?",
      "What metrics will we use to measure success?",
    ],
  },
  {
    id: "build",
    title: "Build",
    info: "How should we build and implement our AI solutions?",
    questions: [
      "What technical architecture should we use?",
      "What are our development priorities?",
      "How will we ensure quality and reliability?",
      "What resources and skills do we need?",
      "What is our timeline and milestones?",
    ],
  },
  {
    id: "evaluate",
    title: "Evaluate",
    info: "How should we measure and improve our AI solutions?",
    questions: [
      "What are our key performance indicators?",
      "How will we collect user feedback?",
      "What metrics define success?",
      "How will we iterate and improve?",
      "What are our quality assurance processes?",
    ],
  },
]; 