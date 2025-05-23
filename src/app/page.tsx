import React from 'react';
import Link from 'next/link';
import { CheckCircleIcon, Squares2X2Icon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

function ResourceCard({ title, description, href, icon }: { title: string; description: string; href?: string; icon: React.ReactNode }) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-icon">{icon}</div>
        <h3 className="section-heading">{title}</h3>
        <p className="body-text">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">From Novelty to Necessity: The Blueprint for Effective Agents</h1>
        <p className="text-lg text-gray-800 mb-8 max-w-3xl">The Blueprint for Effective Agents was created by the Grammarly user research team and is a living, evolving collection of practical guidance and best practices for designing human-centered AI products. Our recommendations are based on data and insights from external and internal research, industry experts, and academic research.</p>
        
        {/* Primary CTA */}
        <div className="mb-14">
          <Link href="/agents-info">
            <button className="btn-primary text-lg px-8 py-4">
              Get started
            </button>
          </Link>
        </div>

        <section className="section">
          <h2 className="resources-header">Resources</h2>
          <div className="card-grid">
            <Link href="/use-cases" className="block">
              <ResourceCard
                title="Use cases"
                description="Explore real-world scenarios and needs that drive agent and AI product design."
                icon={<CheckCircleIcon className="w-8 h-8 text-green-700" />}
              />
            </Link>
            <Link href="/prioritization-framework" className="block">
              <ResourceCard
                title="Prioritization Framework"
                description="A structured approach to scoring and aligning on the most impactful opportunities."
                icon={<Squares2X2Icon className="w-8 h-8 text-green-700" />}
              />
            </Link>
            <Link href="/ai-success-blueprint" className="block">
              <ResourceCard
                title="AI Success Blueprint"
                description="Step-by-step guidance for prioritizing, marketing, building, and evaluating agents."
                icon={<ClockIcon className="w-8 h-8 text-green-700" />}
              />
            </Link>
            <a href="mailto:research@grammarly.com" className="block">
              <ResourceCard
                title="Get in touch"
                description="Email us at research@grammarly.com"
                icon={<EnvelopeIcon className="w-8 h-8 text-green-700" />}
              />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
