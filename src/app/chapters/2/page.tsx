import React from 'react';
import Link from 'next/link';

export default function Chapter2() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-4">
          <Link href="/chapters" className="text-gray-600 hover:text-gray-900">← Back to Chapters</Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Chapter 2: What Drives, and Blocks, AI Partnership</h1>
        <p className="text-lg text-gray-800 mb-8 max-w-3xl">The impacts of inertia, risk, trust, and control on how AI partnerships form (or don't).</p>
        <h3 className="section-heading mb-2">Inertia: If it doesn't fit, it won't stick.</h3>
        <p className="body-text mb-2">Users are unlikely to adopt tools that disrupt their existing workflows. Many have also already integrated AI tools in their workflows, making switching costs VERY high.</p>
        <h3 className="section-heading mb-2">Task Delegation</h3>
        <p className="body-text mb-2">Task tedium and value are major levers that affect users' desire to offload tasks. Users' willingness to fully automate using AI is also influenced by their existing relationship and perception of AI tools.</p>
        <p className="body-text mb-2">Users commonly want to offload tasks that are tedious and/or present low value for growth.</p>
        <div className="mb-2">
          <div className="font-semibold body-text">Knowledge worker examples:</div>
          <ul className="list-disc list-inside ml-4 body-text">
            <li>Prioritizing & managing communication</li>
            <li>Email summary & prioritization</li>
            <li>Information retrieval</li>
            <li>Organizing documents/files</li>
          </ul>
        </div>
        <div className="mb-2">
          <div className="font-semibold body-text">Student examples:</div>
          <ul className="list-disc list-inside ml-4 body-text">
            <li>Study guide creation</li>
            <li>Summarization</li>
            <li>Citation support</li>
            <li>AI & plagiarism detection</li>
          </ul>
        </div>
        <h3 className="section-heading mb-2">Risk</h3>
        <p className="body-text mb-2">Users Delegate Tasks Based on Risk Perception</p>
        <ul className="list-disc list-inside ml-4 body-text mb-2">
          <li>Users are more open to leveraging agentic AI for tasks that are perceived as low-risk, for which they feel confident that an AI tool can execute correctly without reputational or functional consequences. Tasks like summarizing, formatting, organizing.</li>
          <li>Users are less open to automating tasks that feel high-risk, and that are nuanced and complex, as they feel uncertain that an AI tool can execute them correctly. Tasks that affect tone, relationship, or decision-making.</li>
          <li>Perception of risk is variable by role and context. Students typically prefer greater governance over AI tools at all times due to the concern over bad grades and plagiarism. Certain types of professionals worry more about reputational/brand impact.</li>
        </ul>
        <h3 className="section-heading mb-2">Three Pillars of AI Trust:</h3>
        <ul className="list-disc list-inside ml-4 body-text mb-2">
          <li><span className="font-semibold">Accuracy:</span> Must be correct</li>
          <li><span className="font-semibold">Reliability:</span> Must be predictable</li>
          <li><span className="font-semibold">Transparency:</span> Must be visible</li>
        </ul>
        <p className="body-text mb-2">Trust is built over time, and goes hand in hand with key elements of AI experiences. AI tools need to earn partnership and autonomy.</p>
        <blockquote className="border-l-4 border-[#e0e6e0] pl-4 italic text-green-700 mb-2 body-text">"I want to train and evaluate it like a new hire"<br/>"I'd start small and trust it more as it demonstrates success"<br/>"I want to try it out, but keep my hand on the wheel to stay in control"</blockquote>
        <p className="body-text mb-2">Users fear the "unknown" of AI, unsure of the mistakes a tool can make. Trust is easily broken by any perceived failures in accuracy, reliability, and transparency.</p>
        <ul className="list-disc list-inside ml-4 body-text mb-2">
          <li><span className="font-semibold">Accuracy:</span> Incorrect or falsified output: content is hallucinated or inaccurate</li>
          <li><span className="font-semibold">Reliability:</span> Generic or misaligned output: content is flat, cookie cutter, or disconnected from user intent</li>
          <li><span className="font-semibold">Transparency:</span> Overconfident and risky changes: drastic changes in a users work without clear explanations. Lack of visibility: hidden features or silent actions that a user doesn't control. Privacy and security: sensitive data being stored, accessed, or used without consent</li>
        </ul>
        <h3 className="section-heading mb-2">Control</h3>
        <div className="mb-2 font-semibold body-text">Common Control Needs</div>
        <ul className="list-disc list-inside ml-4 body-text mb-2">
          <li>Preview/check before completion</li>
          <li>Undo functionality</li>
          <li>Modular suggestions (not full rewrites)</li>
          <li>Opt-in agent experience</li>
          <li>Users are more likely to feel comfortable with and adopt AI tools that they can guide, preview, and reverse</li>
        </ul>
        <div className="mb-2 font-semibold body-text">Why Control is Non-Negotiable</div>
        <p className="body-text mb-2">Users want to guide AI: When AI acts fully alone, users feel uneasy and like they have lost power over their work, especially when those actions are not visible or explained.</p>
        <p className="body-text mb-2">Control is a way to signal safety: Users want the ability to exert control over agent actions. While the degree of desired control varies based on the user and task, "steering the ship" is universally essential. That means being able to preview, revise, and reject agent decisions.</p>
        <p className="body-text mb-2">Assistive experiences prevail: but only where value and risk are high. In most work contexts, users want help, not replacement. But for low-value, low-risk tasks, users are more open to autonomous agents, as long as outcomes are reliable, accurate, and transparent.</p>
      </main>
    </div>
  );
} 