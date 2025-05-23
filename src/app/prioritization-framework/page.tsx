import React from 'react';

export default function PrioritizationFramework() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Prioritization Framework</h1>
        <h2 className="subheading mb-4">…for Use Cases, Agents, Apps, and Partnerships</h2>
        <section className="mb-10">
          <h3 className="section-heading mb-2">Workflow</h3>
          <ul className="list-disc list-inside mb-4 body-text">
            <li>UXMR submits max-diff/conjoint results along with other behavioral and attitudinal data</li>
            <li>Product Marketing provides TAM, competitive landscape, growth hypotheses</li>
            <li>Strategic Finance provides monetization paths, pricing potential</li>
            <li>Run a scoring workshop where cross-functional teams rate each use case together to align on shared understanding.</li>
          </ul>
          <h4 className="subheading mb-2">Prioritization Matrix:</h4>
          <ul className="list-disc list-inside mb-2 body-text">
            <li>Plot use cases on a 2x2 (e.g., Impact vs. Relevance) for visual alignment</li>
            <li>Identify high-score clusters, balance short-term wins with strategic long-term bets, and document tradeoffs clearly</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="section-heading mb-4">Factors</h2>
          {/* Factor 1 Table */}
          <h3 className="subheading mb-2">Factor 1: Relevance (UXMR)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-[#e0e6e0] bg-[#f4f7f4]">
              <thead>
                <tr>
                  <th className="px-4 py-2 body-text font-semibold">Subfactor</th>
                  <th className="px-4 py-2 body-text font-semibold">Description</th>
                  <th className="px-4 py-2 body-text font-semibold">Research Inputs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Task frequency</td>
                  <td className="px-4 py-2 body-text">How often users encounter or perform this task?</td>
                  <td className="px-4 py-2 body-text">Usage Analytics, Surveys</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Task importance</td>
                  <td className="px-4 py-2 body-text">Is this task central to user success, goals, or performance?</td>
                  <td className="px-4 py-2 body-text">Surveys, In-depth Interviews</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Current AI behavior</td>
                  <td className="px-4 py-2 body-text">Are users already trying to do this with AI or scripting tools?</td>
                  <td className="px-4 py-2 body-text">Usage Analytics, Surveys</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Effort/Tedium</td>
                  <td className="px-4 py-2 body-text">Is it a pain point, repetitive, or outside users' core strengths?</td>
                  <td className="px-4 py-2 body-text">In-depth Interviews</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Factor 2 Table */}
          <h3 className="subheading mb-2">Factor 2: Capability (Product/Engineering)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-[#e0e6e0] bg-[#f4f7f4]">
              <thead>
                <tr>
                  <th className="px-4 py-2 body-text font-semibold">Subfactor</th>
                  <th className="px-4 py-2 body-text font-semibold">Description</th>
                  <th className="px-4 py-2 body-text font-semibold">Research Inputs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Feasibility</td>
                  <td className="px-4 py-2 body-text">Can current models handle this accurately with low hallucination risk?</td>
                  <td className="px-4 py-2 body-text">ML/AI Team Assessment</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Confidence & Safety</td>
                  <td className="px-4 py-2 body-text">Will users trust AI to assist or automate this task?</td>
                  <td className="px-4 py-2 body-text">UX Research, Trust & Safety</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Clear I/O</td>
                  <td className="px-4 py-2 body-text">Is the task well-scoped, with defined inputs and outputs?</td>
                  <td className="px-4 py-2 body-text">UX Design, Task Analysis</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Factor 3 Table */}
          <h3 className="subheading mb-2">Factor 3: Strategic Alignment (PM/M)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-[#e0e6e0] bg-[#f4f7f4]">
              <thead>
                <tr>
                  <th className="px-4 py-2 body-text font-semibold">Subfactor</th>
                  <th className="px-4 py-2 body-text font-semibold">Description</th>
                  <th className="px-4 py-2 body-text font-semibold">Research Inputs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Brand relevance</td>
                  <td className="px-4 py-2 body-text">Is this use case conceptually adjacent to what we are already known for?</td>
                  <td className="px-4 py-2 body-text">Brand Positioning, Company Strategy</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">User base overlap</td>
                  <td className="px-4 py-2 body-text">Does this help us grow our audience by appealing to new, high-value segments in addition to our current base?</td>
                  <td className="px-4 py-2 body-text">TAM Analysis, Persona Mapping, Competitive Evaluation</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Reciprocal benefit</td>
                  <td className="px-4 py-2 body-text">Will this agent, app, or partnership provide a reciprocal benefit to all agents, apps, or data on our platform?</td>
                  <td className="px-4 py-2 body-text">Data Engineering Evaluation; Company Strategy</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Factor 4 Table */}
          <h3 className="subheading mb-2">Factor 4: Business Impact (Strategic Finance, Growth)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-[#e0e6e0] bg-[#f4f7f4]">
              <thead>
                <tr>
                  <th className="px-4 py-2 body-text font-semibold">Subfactor</th>
                  <th className="px-4 py-2 body-text font-semibold">Description</th>
                  <th className="px-4 py-2 body-text font-semibold">Research Inputs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Revenue potential</td>
                  <td className="px-4 py-2 body-text">Is there a path to monetization or willingness to pay? How much of the projected monetization can come from existing users?</td>
                  <td className="px-4 py-2 body-text">TAM/SAM Estimation, Pricing Research</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Retention and stickiness</td>
                  <td className="px-4 py-2 body-text">Will this deepen engagement or increase usage frequency?</td>
                  <td className="px-4 py-2 body-text">Cohort Analysis, Product Analytics</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Expansion and growth</td>
                  <td className="px-4 py-2 body-text">Does this unlock new markets, use cases, or user segments? Is there a clear path to monetization across distinct user groups?</td>
                  <td className="px-4 py-2 body-text">Market Sizing, Trend Analysis</td>
                </tr>
                <tr className="odd:bg-white even:bg-[#f4f7f4]">
                  <td className="px-4 py-2 body-text font-semibold">Marketing lift</td>
                  <td className="px-4 py-2 body-text">Could this generate buzz, PR, or help position us as a leader?</td>
                  <td className="px-4 py-2 body-text">Product Marketing, Competitive Intel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
} 