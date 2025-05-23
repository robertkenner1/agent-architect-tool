import React from 'react';
import Link from 'next/link';

export default function Chapter3() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-4">
          <Link href="/chapters" className="text-gray-600 hover:text-gray-900">← Back to Chapters</Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Chapter 3: Aligning AI with User Expectations</h1>
        <p className="text-lg text-gray-800 mb-8 max-w-3xl">User perception of AI dictates how we build and talk about AI.</p>
        <p className="body-text mb-2">Users define AI by their experience, not terminology. "Agent" is a marketing term, and not commonly used or understood by users.</p>
        <p className="body-text mb-2">Users anchor heavily on their experience with common AI tools, like ChatGPT and Gemini. Users do understand that AI tools differ by those that are more assistive and those that are more modular or autonomous.</p>
        <p className="body-text mb-2">38% of knowledge workers and 21% of students report being "very familiar" with "Agents" in the AI context. Only 5% of knowledge workers and 2% of students used "Agent" to describe AI-powered tools when presented with concepts.</p>
        <blockquote className="border-l-4 border-[#e0e6e0] pl-4 italic text-green-700 mb-2 body-text">"I don't really know what an 'agent' is supposed to do... 'assistant' makes more sense to me."</blockquote>
        <h3 className="section-heading mb-2">How Users Perceive AI</h3>
        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="flex-1 card bg-[#f4f7f4] p-4">
            <div className="font-bold mb-2">🌍 General<br/>🧑‍💼 User focused<br/>🧑‍⚖️ Governed control<br/>🧠 Person-like<br/>👑 Hierarchical</div>
          </div>
          <div className="flex-1 card bg-[#f4f7f4] p-4">
            <div className="font-bold mb-2">🧪 Specialized<br/>📋 Task focused<br/>🤖 More autonomous<br/>⚙️ Tool like<br/>🤝 Collaborative</div>
          </div>
        </div>
        <h3 className="section-heading mb-2">How Users Distinguish AI Experiences</h3>
        <ul className="list-disc list-inside mb-2 body-text">
          <li>Scope: General ←→ Specialized</li>
          <li>Anchor: User ←→ Task</li>
          <li>Control: Autonomous ←→ Governed</li>
          <li>Humanity: Person like ←→ Tool like</li>
          <li>Mediation: Hierarchical ←→ Collaborative</li>
        </ul>
        <h3 className="section-heading mb-2">How to categorize AI experiences</h3>
        <div className="mb-2 font-semibold body-text">Assistive</div>
        <ul className="list-disc list-inside ml-4 mb-2 body-text">
          <li>Is it general in its scope of capabilities (i.e., does more than one thing)?</li>
          <li>Is it focused on the user and their needs?</li>
          <li>Does the user have significant control?</li>
          <li>Is is more relatable or human-like?</li>
          <li>Do users "manage" the tool in a hierarchical relationship?</li>
        </ul>
        <div className="mb-2 font-semibold body-text">Agentic</div>
        <ul className="list-disc list-inside ml-4 mb-2 body-text">
          <li>Is it specialized in its scope of capabilities (i.e., does one thing really well)?</li>
          <li>Is it focused on the task at hand?</li>
          <li>Does it act autonomously and handle multi-step processes?</li>
          <li>Is is more neutral and tool-like?</li>
          <li>Do users work with the tool in a collaborative relationship?</li>
        </ul>
        <div className="mb-2 font-semibold body-text">Augmenative</div>
        <ul className="list-disc list-inside ml-4 mb-2 body-text">
          <li>Is it passive personalization that does not involve interacting with the user significantly or taking action on their behalf?</li>
          <li>Is it a detection, awareness, or analytics feature that does not suggest fixes or resolve them?</li>
          <li>Is it search or information retrieval that does not directly assist with a specific task?</li>
          <li>Is it an extension or feature that might be highly specialized but not autonomous?</li>
        </ul>
        <div className="mb-2 body-text">We can leverage both assistive and agentic AI experiences. Prioritize assistive experiences for general, user-focused engagement. Prioritize agentic experiences for focused, task-specific engagement.</div>
      </main>
    </div>
  );
} 