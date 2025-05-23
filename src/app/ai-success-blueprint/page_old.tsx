import React from 'react';
import Link from 'next/link';

export default function AISuccessBlueprint() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">AI Success Blueprint</h1>
        <p className="text-lg text-gray-800 mb-8">Welcome to the AI Success Blueprint. This page contains detailed information about our AI initiatives and success stories.</p>
        
        <div className="flex flex-col gap-8 w-full max-w-4xl">
          {/* Prioritize Card */}
          <div className="card">
            <div className="card-content grid grid-cols-[1fr,auto] gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-900 font-bold text-base" aria-label="Step 1">1</span>
                  <h2 className="section-heading">Prioritize</h2>
                </div>
                <p className="body-text">What use cases should we be solving via assistive and agentic experiences? Score use cases across Relevance, Capability, Strategic Alignment, and Business Impact.</p>
              </div>
              <div className="flex items-center">
                <Link href="/ai-success-blueprint/prioritize" className="btn-primary">Enter Step</Link>
              </div>
            </div>
          </div>

          {/* Market Card */}
          <div className="card">
            <div className="card-content grid grid-cols-[1fr,auto] gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-900 font-bold text-base" aria-label="Step 2">2</span>
                  <h2 className="section-heading">Market</h2>
                </div>
                <p className="body-text">Who should we be targeting with our assistive and agentic experiences? Define user segments and messaging for successful outcomes.</p>
              </div>
              <div className="flex items-center">
                <Link href="/ai-success-blueprint/market" className="btn-primary">Enter Step</Link>
              </div>
            </div>
          </div>

          {/* Build Card */}
          <div className="card">
            <div className="card-content grid grid-cols-[1fr,auto] gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-900 font-bold text-base" aria-label="Step 3">3</span>
                  <h2 className="section-heading">Build</h2>
                </div>
                <p className="body-text">What are the components of building successful assistive and agentic experiences? Evaluate along Scope, Anchor, Control, Humanity, and Mediation.</p>
              </div>
              <div className="flex items-center">
                <Link href="/ai-success-blueprint/build" className="btn-primary">Enter Step</Link>
              </div>
            </div>
          </div>

          {/* Evaluate Card */}
          <div className="card">
            <div className="card-content grid grid-cols-[1fr,auto] gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-900 font-bold text-base" aria-label="Step 4">4</span>
                  <h2 className="section-heading">Evaluate</h2>
                </div>
                <p className="body-text">How do we determine whether assistive or agentic experiences successfully address use cases and user segments? Engage in internal evaluations and user research.</p>
              </div>
              <div className="flex items-center">
                <Link href="/ai-success-blueprint/evaluate" className="btn-primary">Enter Step</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 