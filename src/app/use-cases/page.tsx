import React from 'react';
import { UserCircleIcon, PencilSquareIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function UseCases() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-8">Use Cases</h1>
        
        {/* Hero Use Cases Section */}
        <section className="section">
          <h2 className="section-heading">Hero Use Case Exploration (UXMR)</h2>
          <div className="mb-6">
            <h3 className="subheading mb-2">Goal</h3>
            <p className="body-text">To answer this question: "What are some of the hero problems or use cases that motivate our work on agents and apps?"</p>
          </div>
          
          <h3 className="subheading mb-4">Hero Use Cases</h3>
          <div className="card-grid">
            <div className="card">
              <div className="card-content">
                <div className="card-icon mb-2"><UserCircleIcon className="w-8 h-8 text-green-700" /></div>
                <h4 className="section-heading">Infusing Authenticity into Work and School</h4>
                <p className="body-text">In today's digital age, AI can sometimes make communication feel generic and impersonal by flattening unique personalities. Yet, students and professionals alike strive to ensure their true selves shine through in every interaction. It's not just about words; it's about expressing individuality and authenticity in essays, discussion posts, or workplace chats. Each document, email, and message is an opportunity to let your personality radiate and leave a lasting impression. Embrace tools that highlight your distinct voice, making every interaction effective and genuinely representative of who you are. Stand out, be memorable, and let authenticity drive every conversation forward!</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon mb-2"><PencilSquareIcon className="w-8 h-8 text-green-700" /></div>
                <h4 className="section-heading">Breaking Through Writer's Block</h4>
                <p className="body-text">University students and knowledge workers alike often hit walls during their writing process—whether it's drafting a research paper, composing a strategic report, or preparing a presentation. The block can be triggered by unfamiliar subject matter, unclear thinking, or just the pressure to "get it right." When they turn to general AI tools like ChatGPT, they frequently don't know how to engage with the tool effectively or frame their prompts to get meaningful momentum. This friction prolongs writer's block and amplifies stress—whether it's a student staring down a submission deadline or a professional under pressure to deliver polished work.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon mb-2"><ChatBubbleLeftRightIcon className="w-8 h-8 text-green-700" /></div>
                <h4 className="section-heading">Mastering the Art of Confident Communication</h4>
                <p className="body-text">Knowledge workers excel in tight-knit teams, but cross-functional collaboration often turns chaotic. Key information is scattered across various tools and teams, complicating the sharing of updates, decisions, or data without resorting to copy-pasting links or chasing down facts. This makes writing cumbersome, leading to second-guessing, over-explaining, or complete stalls. What they truly desire is clear, credible communication and the confidence that their message will resonate with any audience. Streamlined processes and integrated tools are essential for ensuring effective collaboration and communication, allowing workers to focus on delivering impactful messages without unnecessary hurdles or confusion.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sidekick Use Cases Section */}
        <section className="section">
          <h2 className="section-heading">Sidekick Use Cases</h2>
          <div className="card-grid">
            <div className="card">
              <div className="card-content">
                <h3 className="section-heading">Bridging Communication Gaps</h3>
                <p className="body-text mb-4">Knowledge workers often need to explain complex topics to less technical audiences, which can result in miscommunication and delays.</p>
                <h4 className="subheading mb-2">Associated Agent:</h4>
                <ul className="list-disc pl-5 body-text">
                  <li>Know Your Audience Agent: Suggests content adjustments, added context, and estimates how well audiences will understand a piece of writing.</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="section-heading">Communicating Facts Confidently</h3>
                <p className="body-text mb-4">When sharing factual information (like metrics or updates), knowledge workers fear inaccuracies and credibility loss.</p>
                <h4 className="subheading mb-2">Associated Agent:</h4>
                <ul className="list-disc pl-5 body-text">
                  <li>Fact Checker Agent: Scans for facts and flags potentially outdated or unverifiable information, offering source links or prompts.</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="section-heading">Reducing AI Overuse</h3>
                <p className="body-text mb-4">Students want to use AI effectively but fear being flagged for overuse. AI usage policies are often unclear and vary across professors and courses.</p>
                <h4 className="subheading mb-2">Associated Agent:</h4>
                <ul className="list-disc pl-5 body-text">
                  <li>Class Assistant: Helps students follow AI use guidelines set by professors, orchestrating what types of help are allowed and how.</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="section-heading">Managing Communication Overload</h3>
                <p className="body-text mb-4">Professionals face high message volume and ambiguity. They struggle with prioritizing, extracting intent, and identifying next steps.</p>
                <h4 className="subheading mb-2">Associated Agents:</h4>
                <ul className="list-disc pl-5 body-text">
                  <li>Priority Triage: Ranks messages by urgency.</li>
                  <li>Intent Summarizer: Clarifies ask, sentiment, and urgency.</li>
                  <li>Action Items Agent: Extracts and syncs action items with task tools.</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="section-heading">Adapting Workplace Communication</h3>
                <p className="body-text mb-4">Workers adapt messaging for different audiences and formats but often rewrite, over-explain, or second-guess tone and clarity.</p>
                <h4 className="subheading mb-2">Associated Agents:</h4>
                <ul className="list-disc pl-5 body-text">
                  <li>Tact (Audience Adaptation): Nudges for clarity, tone, and audience fit without rewriting the full message.</li>
                  <li>Brev (Concise Communication): Trims and reformats content to be clearer and more skimmable.</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="section-heading">Navigating Career Growth</h3>
                <p className="body-text mb-4">Students and professionals are uncertain about next steps in their careers—whether job searching, skill-building, or career changes.</p>
                <h4 className="subheading mb-2">Associated Agents:</h4>
                <ul className="list-disc pl-5 body-text">
                  <li>Skills Agent: Identifies skill gaps and recommends resources.</li>
                  <li>Career Agent: Finds adjacent opportunities.</li>
                  <li>Resume Agent: Builds tailored resumes based on contributions and skills.</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="section-heading">AI Literacy for College Students</h3>
                <p className="body-text mb-4">Students must be proficient in AI tools for academic and career success but lack training and confidence in using them responsibly and effectively.</p>
                <h4 className="subheading mb-2">Associated Agent:</h4>
                <ul className="list-disc pl-5 body-text">
                  <li>AIFluent: Teaches prompt engineering and safe AI practices to ensure reliable results while avoiding issues like hallucinations or plagiarism.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 