import React from 'react';
import Link from 'next/link';

const researchInputs = [
  {
    title: 'Understanding the market and perceptions of AI',
    links: [
      { label: 'Knowledge Workforce Segmentation', url: '#' },
      { label: 'Knowledge Worker Segmentation – Grammarly & Coda Users', url: '#' },
      { label: 'Building a Human-Centered Agent Network', url: '#' },
    ],
  },
  {
    title: 'Identifying high-value use cases',
    links: [
      { label: 'AI Agents User Expectations, Experiences, and Use Cases', url: '#' },
      { label: 'Tools & Agents Survey', url: '#' },
      { label: 'Hero Use Cases for Agents/Apps', url: '#' },
    ],
  },
  {
    title: 'Deep dive on students',
    links: [
      { label: 'Students + Grammarly in the Age of AI', url: '#' },
      { label: 'Student Collaboration: Brown University + Grammarly', url: '#' },
    ],
  },
  {
    title: 'Understanding product market fit',
    links: [
      { label: 'Research Kit: AI Editor (Round 1)', url: '#' },
      { label: 'Research Kit: AI Editor (Round 2)', url: '#' },
      { label: 'Testing New UX Paradigms: Agent Comments', url: '#' },
    ],
  },
];

const aiUsageLandscape = [
  {
    group: 'Knowledge Workers',
    percent: '39%',
    use: 'Revising, summarizing, drafting emails and docs',
    stack: 'Focused → Grammarly + ChatGPT',
    style: 'Conservative, but growing AI habits',
    logo: 'G',
  },
  {
    group: 'Knowledge Workers',
    percent: '45%',
    use: 'Summarizing, finding info, brainstorming',
    stack: 'Diverse → Coda, ChatGPT, Gemini, and others',
    style: 'Open to multiple-AI tools',
    logo: 'C',
  },
  {
    group: 'Students',
    percent: '27%',
    use: 'Revising, summarizing, drafting essays',
    stack: 'Focused → Grammarly + ChatGPT / Gemini / Copilot',
    style: 'Conservative, but growing AI habits',
    logo: 'G',
  },
];

const chapters = [
  {
    id: 1,
    title: 'AI Today',
    desc: 'Understand the current landscape of AI usage and user relationships with AI.',
    icon: '🟩',
  },
  {
    id: 2,
    title: 'What Shapes Adoption',
    desc: 'Explore the factors that drive or block AI partnership and adoption.',
    icon: '🟢',
  },
  {
    id: 3,
    title: 'Designing for Fit',
    desc: 'Learn how to align AI design with user expectations and needs.',
    icon: '🟢',
  },
  {
    id: 4,
    title: 'The AI Success Blueprint',
    desc: 'A practical guide to prioritizing, marketing, building, and evaluating agents.',
    icon: '🟩',
  },
];

export default function AgentsInfo() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Chapters</h1>
        <p className="text-lg text-gray-800 mb-8 max-w-3xl">Explore a series of chapters that break down the key research, frameworks, and actionable strategies for building effective, user-centered AI agents. Each chapter offers practical insights and tools for teams looking to design, prioritize, and launch successful agentic experiences.</p>
        <div className="card-grid">
          {chapters.map((ch) => (
            <div key={ch.id} className="card">
              <div className="card-content">
                <div className="card-icon text-4xl mb-2">{ch.icon}</div>
                <h3 className="section-heading mb-1">{ch.title}</h3>
                <p className="body-text mb-3">{ch.desc}</p>
                <Link href={`/agents-info/chapters/${ch.id}`} className="btn-primary inline-block mt-2">Read the chapter</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 