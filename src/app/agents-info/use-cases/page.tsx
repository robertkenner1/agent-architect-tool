import React from 'react';

export default function UseCases() {
  return (
    <div className="min-h-screen bg-[#22372e] text-[#e6f2e6] font-sans relative">
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3a5446" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-[#e6f2e6] mb-8">Use Cases</h1>
        {/* Hero Use Cases Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#a3c6a3] mb-4">Hero Use Case Exploration (UXMR)</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Goal</h3>
            <p className="text-base text-[#e6f2e6]/90">To answer this question: "What are some of the hero problems or use cases that motivate our work on agents and apps?"</p>
          </div>
          <h3 className="text-xl font-semibold mb-4">Hero Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-2"><span className="underline">Infusing Authenticity</span> into Work and School</h4>
              <p className="text-base text-[#e6f2e6]/90">In today's digital age, AI can sometimes make communication feel generic and impersonal by flattening unique personalities. Yet, students and professionals alike strive to ensure their true selves shine through in every interaction. It's not just about words; it's about expressing individuality and authenticity in essays, discussion posts, or workplace chats. Each document, email, and message is an opportunity to let your personality radiate and leave a lasting impression. Embrace tools that highlight your distinct voice, making every interaction effective and genuinely representative of who you are. Stand out, be memorable, and let authenticity drive every conversation forward!</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Breaking Through <span className="underline">Writer's Block</span></h4>
              <p className="text-base text-[#e6f2e6]/90">University students and knowledge workers alike often hit walls during their writing process—whether it's drafting a research paper, composing a strategic report, or preparing a presentation. The block can be triggered by unfamiliar subject matter, unclear thinking, or just the pressure to "get it right." When they turn to general AI tools like ChatGPT, they frequently don't know how to engage with the tool effectively or frame their prompts to get meaningful momentum. This friction prolongs writer's block and amplifies stress—whether it's a student staring down a submission deadline or a professional under pressure to deliver polished work.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Mastering the Art of <span className="underline">Confident Communication</span></h4>
              <p className="text-base text-[#e6f2e6]/90">Knowledge workers excel in tight-knit teams, but cross-functional collaboration often turns chaotic. Key information is scattered across various tools and teams, complicating the sharing of updates, decisions, or data without resorting to copy-pasting links or chasing down facts. This makes writing cumbersome, leading to second-guessing, over-explaining, or complete stalls. What they truly desire is clear, credible communication and the confidence that their message will resonate with any audience. Streamlined processes and integrated tools are essential for ensuring effective collaboration and communication, allowing workers to focus on delivering impactful messages without unnecessary hurdles or confusion.</p>
            </div>
          </div>
        </section>
        {/* Sidekick Use Cases Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#a3c6a3] mb-4">Sidekick Use Cases</h2>
          <div className="text-lg text-[#e6f2e6]/90">[Add sidekick use cases here]</div>
        </section>
      </main>
    </div>
  );
} 