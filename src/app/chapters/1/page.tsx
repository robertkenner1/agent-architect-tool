import React from 'react';
import Link from 'next/link';

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

export default function Chapter1() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-4">
          <Link href="/chapters" className="text-gray-600 hover:text-gray-900">← Back to Chapters</Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Chapter 1: AI Today</h1>
        <p className="text-lg text-gray-800 mb-8 max-w-3xl">The Evolving World of AI Usage, User relationships with AI today, and how to uplevel from adoption to partnership.</p>
        <h3 className="section-heading mb-2">AI Usage Landscapes</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-[#e0e6e0] bg-[#f4f7f4]">
            <thead>
              <tr>
                <th className="px-4 py-2 body-text font-semibold">Group</th>
                <th className="px-4 py-2 body-text font-semibold">% Engage Daily</th>
                <th className="px-4 py-2 body-text font-semibold">Use Cases</th>
                <th className="px-4 py-2 body-text font-semibold">AI Tool Stack</th>
                <th className="px-4 py-2 body-text font-semibold">Adoption Style</th>
              </tr>
            </thead>
            <tbody>
              {aiUsageLandscape.map((row, i) => (
                <tr key={i} className="odd:bg-white even:bg-[#f4f7f4] text-gray-900">
                  <td className="px-4 py-2 font-semibold body-text">{row.group}</td>
                  <td className="px-4 py-2 font-bold text-2xl body-text">{row.percent}</td>
                  <td className="px-4 py-2 body-text">{row.use}</td>
                  <td className="px-4 py-2 body-text">{row.stack}</td>
                  <td className="px-4 py-2 body-text">{row.style}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="section-heading mb-2">User's Shifting Relationship With AI</h3>
        <div className="card mb-6">
          <div className="card-content">
            <div className="font-bold text-lg mb-2">Exploration ✨ → Adoption <span className="text-xs italic">(where we are today)</span> → Dependence 🛟 → Partnership 🤝 <span className="text-xs italic">(where we want to be)</span></div>
            <div className="body-text">Users move from trying out AI, to adopting it, to depending on it, and ultimately to partnering with it for higher-value work.</div>
          </div>
        </div>
        <div className="card mb-6">
          <div className="card-content">
            <div className="text-2xl font-bold mb-2">Many users today have moved beyond asking "What can AI do?" to "How well does it fit what I need?"</div>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <div className="flex-1 card bg-[#f4f7f4] p-4 flex flex-col items-center">
                <div className="font-bold text-lg">Novelty ✨</div>
                <div className="mb-2 body-text">"Try it out"</div>
              </div>
              <div className="flex-1 card bg-[#f4f7f4] p-4 flex flex-col items-center">
                <div className="font-bold text-lg">Utility 🧰</div>
                <div className="mb-2 body-text">"Use it for tasks"</div>
              </div>
              <div className="flex-1 card bg-[#f4f7f4] p-4 flex flex-col items-center">
                <div className="font-bold text-lg">Integration 🔩</div>
                <div className="mb-2 body-text">"Rely on it"</div>
              </div>
            </div>
            <div className="mt-4 text-lg text-center body-text">AI is no longer novel – users expect it to integrate and support their work.</div>
          </div>
        </div>
        <div className="card mb-6">
          <div className="card-content">
            <div className="text-2xl font-bold mb-2">Mapping Users Along their Relationship Journey</div>
            <div className="mb-2 body-text">We can map users by their <span className="font-semibold">AI readiness</span> and <span className="font-semibold">product resonance</span> to predict adoption patterns and strategic fit.</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="card bg-[#f4f7f4] p-4">
                <div className="font-bold">Capable but cautious</div>
                <div className="body-text">AI confident, but unconvinced by current tools</div>
              </div>
              <div className="card bg-[#f4f7f4] p-4">
                <div className="font-bold">Engaged and enabled</div>
                <div className="body-text">Comfortable with AI and interested in exploring new tools</div>
              </div>
              <div className="card bg-[#f4f7f4] p-4">
                <div className="font-bold">Disengaged and doubtful</div>
                <div className="body-text">Low AI confidence and interest, unlikely to adopt</div>
              </div>
              <div className="card bg-[#f4f7f4] p-4">
                <div className="font-bold">Interested but inexperienced</div>
                <div className="body-text">AI curious and productivity motivated</div>
              </div>
            </div>
            <div className="mt-4 text-lg body-text">Note: Product resonance means the degree to which users showed interest in a high level AI product concept.</div>
          </div>
        </div>
        <div className="card mb-6">
          <div className="card-content">
            <div className="text-2xl font-bold mb-2">Who should we focus on building for?</div>
            <div className="mb-2 body-text">Users vary in their AI expectations based on their confidence/comfort (AI readiness) and perceived value fit (Product Resonance).</div>
            <div className="mb-2 body-text">To win early, we should focus our efforts on users who are ready, or nearly ready, for more AI integration:</div>
            <ul className="list-disc list-inside mb-2 body-text">
              <li><span className="font-semibold">Group 1: Engaged and enabled</span></li>
              <li><span className="font-semibold">Group 2: Interested but Inexperienced</span></li>
            </ul>
            <div className="mb-2 body-text">While these two groups may use AI for similar goals, we may need to approach agentic experiences differently based on their variable needs for control and support.</div>
          </div>
        </div>
      </main>
    </div>
  );
} 