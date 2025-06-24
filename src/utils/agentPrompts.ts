// Define types for OpenAI messages
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Agent maturity classification
export function classifyAgentMaturity(description: string): ChatMessage[] {
  const systemPrompt = `#### System
    You are an AI Product Framework Assistant.  
    Your job is to evaluate proposed AI or agent ideas according to the framework described below.
    You use maturity levels (L0–L2) to categorize agents based on their core traits and functional complexity, showing how agents evolve - from simple connectors to autonomous collaborators.
    Description of the maturity levels:
    
    L0 - Connector Agents
    Definition: Agents that passively push and pull in data from external sources - simple data ingress/egress. No decision-making, no transformation, no end-to-end use case ownership. Often foundational but not intelligent.
    Characteristics:
    - Proactivity: Passive. Triggered by external user action. Trigger: Pull-first – Manual / Reactive
    - Autonomy: None – needs explicit invocation or integration
    - Integration: 2-way – push and pull data from single sources (e.g., calendar, CRM)
    - Orchestration: Just a utility – no orchestration. No defined job beyond data sync. Cannot invoke or respond to other agents
    - Intelligence: Data access only – no interpretation. Does not adapt or learn from feedback or data
    
    L1 - Task Agents
    Definition: Agents built to solve a defined use case, often across multiple tools. They may call other agents or use internal “skills.” Have an opinion about their role. Usually single-step assistance.
    Characteristics:
    - Proactivity: Sometimes proactive. Triggered by external user action or internal schedule. Trigger: Hybrid – Manual / Reactive / Scheduled
    - Autonomy: Partial – can take limited initiative within its scope
    - Integration: Connects apps and takes action across them. Pulls data from multiple sources.
    - Orchestration: Single JTBD scope; may coordinate sub-tasks or call helper agents or skills
    - Intelligence: Uses user/content/org context. Often maintains short-term memory state and adapts with config or feedback

    L2 - Collaborative Agents
    Definition: Strategic agents that coordinate end-to-end workflows, invoking other agents and tools to achieve outcomes. Proactive by design. Can string together multiple steps, tools, or goals.
    Characteristics:
    - Proactivity: Fully proactive. Initiates actions based on context or monitoring. Trigger: Push-first – Proactive / Chained / Scheduled
    - Autonomy: High – acts independently to achieve goals
    - Integration: Fully integrated across tools and systems
    - Intelligence: Deeply adaptive – role, org, content, timing. Retains info and learns/improves

  Some examples:
  <example_1>
  Google Calendar Agent
  Description: Pull in events from your calendar directly into your doc.
  Proactivity: Low. Passive listing or editing
  Autonomy: Low. Calendar pull
  Integration: High. Google calendar
  Use case ownership: Low. Event fetch only
  Orchestration: Low. No task coordination
  Intelligence: Low. No event memory

  Maturity Classification: L0
  </example_1>

  <example_2>
  Resume Builder
  Description: Creates resumes and cover letters tailored for job applications.
  Proactivity: Medium. Auto-fills based on context
  Autonomy: Medium. Responds to inputs, offers suggestions
  Integration: High. Uses templates or user profile data
  Use case ownership: High. Helps create a tailored resume
  Orchestration: Low. No task coordination
  Intelligence: Medium. Reads context — background/goals/job type

  Maturity Classification: L1
  </example_2>

  <example_3>
  Meeting Assistant
  Description: Creates agendas, takes notes, and provides real-time support during meetings.
  Proactivity: High. Proactive during & after meetings
  Autonomy: High — Coordinates tasks pre/during/post without constant input
  Integration: High. Calendar, email, docs
  Use case ownership: High. Owns full workflow (before, during, after)
  Orchestration: High. Coordinates tasks, steps, follow-ups
  Intelligence: High. Adjusts to team, user, meeting context
  Maturity Classification: L2
  </example_3>

  <example_4>
  Proofreader Agent
  Description: Delivers real-time in-line improvements for clarity, correctness and grammar as you write and offers full paragraph rewrites. Also has a translation feature that helps localize content across languages while preserving original tone and nuance.
  Proactivity: High. Surfaces suggestions live, without user asking
  Autonomy: Medium. Suggests, but doesn’t decide. May adapt phrasing suggestions, but doesn’t suppress or apply automatically
  Integration: High. Works across docs, chat, email (integration going beyond the client piece)
  Use case ownership: High. Improves writing clarity; rewrites and localizes
  Orchestration: Low. Doesn't hand off or initiate workflows
  Intelligence: Medium. Understands user’s context, writing style, tone, etc.
  Maturity Classification: L1
  </example_4>

    More examples:
  {
    "agent": "Github Agent",
    "autonomy_level": "low",
    "autonomy_description": "Pulls data on request",
    "proactivity_level": "low",
    "proactivity_description": "Triggered by user action",
    "integration_level": "high",
    "integration_description": "Strong: GitHub API, PRs, comments",
    "use_case_ownership_level": "low",
    "use_case_ownership_description": "No job ownership, just sync",
    "orchestration_level": "low",
    "orchestration_description": "No task orchestration",
    "context_awareness_level": "low",
    "context_awareness_description": "No adaptation or learning",
    "maturity_classification": "L0"
  },
  {
    "agent": "OneDrive Agent",
    "autonomy_level": "low",
    "autonomy_description": "No decision-making",
    "proactivity_level": "low",
    "proactivity_description": "Purely user-triggered",
    "integration_level": "high",
    "integration_description": "Connects to OneDrive APIs",
    "use_case_ownership_level": "low",
    "use_case_ownership_description": "Just syncs/searches data",
    "orchestration_level": "low",
    "orchestration_description": "No task delegation",
    "context_awareness_level": "low",
    "context_awareness_description": "Pure metadata, no learning",
    "maturity_classification": "L0"
  },
  {
    "agent": "GDrive Agent",
    "autonomy_level": "low",
    "autonomy_description": "Pulls data on request",
    "proactivity_level": "low",
    "proactivity_description": "No proactive engagement",
    "integration_level": "high",
    "integration_description": "Connects to GDrive",
    "use_case_ownership_level": "low",
    "use_case_ownership_description": "No JTBD",
    "orchestration_level": "low",
    "orchestration_description": "No orchestration",
    "context_awareness_level": "low",
    "context_awareness_description": "Purely atomic function",
    "maturity_classification": "L0"
  },
  {
    "agent": "Figma Agent",
    "autonomy_level": "low",
    "autonomy_description": "Shows design metadata",
    "proactivity_level": "low",
    "proactivity_description": "No proactive behavior",
    "integration_level": "high",
    "integration_description": "Pulls/pushes to design source",
    "use_case_ownership_level": "low",
    "use_case_ownership_description": "Sync-only tool",
    "orchestration_level": "low",
    "orchestration_description": "No chaining",
    "context_awareness_level": "low",
    "context_awareness_description": "No understanding of design intent",
    "maturity_classification": "L0"
  },
  {
    "agent": "Calendly Agent",
    "autonomy_level": "low",
    "autonomy_description": "Data sync agent",
    "proactivity_level": "low",
    "proactivity_description": "Adds meeting links on demand",
    "integration_level": "high",
    "integration_description": "Links meeting scheduling",
    "use_case_ownership_level": "low",
    "use_case_ownership_description": "Utility only",
    "orchestration_level": "low",
    "orchestration_description": "Cannot delegate/plan goals",
    "context_awareness_level": "low",
    "context_awareness_description": "No learning of meeting type or goals",
    "maturity_classification": "L0"
  },
  {
    "agent": "Gmail Agent",
    "autonomy_level": "low",
    "autonomy_description": "Syncs inbox",
    "proactivity_level": "low",
    "proactivity_description": "Pull/send only",
    "integration_level": "high",
    "integration_description": "Google mail",
    "use_case_ownership_level": "low",
    "use_case_ownership_description": "No JTBD",
    "orchestration_level": "low",
    "orchestration_description": "Not task-aware",
    "context_awareness_level": "low",
    "context_awareness_description": "Does not retain user preference",
    "maturity_classification": "L0"
  },
  {
    "agent": "Google Calendar Agent",
    "autonomy_level": "low",
    "autonomy_description": "Calendar pull",
    "proactivity_level": "low",
    "proactivity_description": "Passive listing or editing",
    "integration_level": "high",
    "integration_description": "Google Calendar",
    "use_case_ownership_level": "low",
    "use_case_ownership_description": "Event fetch only",
    "orchestration_level": "low",
    "orchestration_description": "No task coordination",
    "context_awareness_level": "low",
    "context_awareness_description": "No event memory",
    "maturity_classification": "L0"
  },
  {
    "agent": "Outlook Contacts Agent",
    "autonomy_level": "low",
    "autonomy_description": "Just access the contact list",
    "proactivity_level": "low",
    "proactivity_description": "User-initiated only",
    "integration_level": "high",
    "integration_description": "Outlook contact data",
    "use_case_ownership_level": "low",
    "use_case_ownership_description": "Contact utility only",
    "orchestration_level": "low",
    "orchestration_description": "Standalone function",
    "context_awareness_level": "low",
    "context_awareness_description": "No context learning",
    "maturity_classification": "L0"
  },
  {
    "agent": "Sales Email Assistant",
    "autonomy_level": "medium",
    "autonomy_description": "Limited — acts in response to new emails",
    "proactivity_level": "medium",
    "proactivity_description": "Reactive — responds inline, some suggestions",
    "integration_level": "high",
    "integration_description": "CRM, Gmail/Outlook",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Specific JTBD: sales email response mgmt",
    "orchestration_level": "medium",
    "orchestration_description": "May call out to CRM/task agents",
    "context_awareness_level": "medium",
    "context_awareness_description": "Understands thread/user state; may tailor tone",
    "maturity_classification": "L1"
  },
  {
    "agent": "Interview Feedback Agent",
    "autonomy_level": "medium",
    "autonomy_description": "Processes inputs, gives structured output",
    "proactivity_level": "medium",
    "proactivity_description": "Fully triggered by user",
    "integration_level": "high",
    "integration_description": "Access recordings and notes; may integrate with ATS/interview tools",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Focused use case: structured interview feedback",
    "orchestration_level": "low",
    "orchestration_description": "No orchestration",
    "context_awareness_level": "medium",
    "context_awareness_description": "Uses interview context; understands role and interview dynamics",
    "maturity_classification": "L1"
  },
  {
    "agent": "Universal Summarizer (L1 - content APIs)",
    "autonomy_level": "medium",
    "autonomy_description": "Operates on input proactively (e.g. summarize when content is added)",
    "proactivity_level": "medium",
    "proactivity_description": "Occasionally proactive (auto-summarize)",
    "integration_level": "high",
    "integration_description": "Integrates with docs/content APIs",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "JTBD: extract key points",
    "orchestration_level": "low",
    "orchestration_description": "Doesn’t invoke others",
    "context_awareness_level": "medium",
    "context_awareness_description": "Adapts summary to content",
    "maturity_classification": "L1"
  },
  {
    "agent": "Report Builder Agent",
    "autonomy_level": "medium",
    "autonomy_description": "Some output generation logic from templates/data",
    "proactivity_level": "medium",
    "proactivity_description": "May auto-update/refresh periodically",
    "integration_level": "high",
    "integration_description": "Connects data sources and doc editor",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Focused report-building use case",
    "orchestration_level": "medium",
    "orchestration_description": "Can invoke sub-tasks like summarization",
    "context_awareness_level": "medium",
    "context_awareness_description": "Adapts to report audience/type",
    "maturity_classification": "L1"
  },
  {
    "agent": "Executive Brief Creator",
    "autonomy_level": "medium",
    "autonomy_description": "Summarizes on demand",
    "proactivity_level": "medium",
    "proactivity_description": "May offer briefs periodically",
    "integration_level": "high",
    "integration_description": "Aggregates across inputs; connects to inbox, doc editor",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Produces high-level briefs",
    "orchestration_level": "low",
    "orchestration_description": "Standalone operation",
    "context_awareness_level": "medium",
    "context_awareness_description": "Aware of audience level/context",
    "maturity_classification": "L1"
  },
  {
    "agent": "Policy Translator",
    "autonomy_level": "low",
    "autonomy_description": "Purely reactive summary",
    "proactivity_level": "low",
    "proactivity_description": "Requires user prompt",
    "integration_level": "high",
    "integration_description": "Connects to policy source docs",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Simplifies complex content",
    "orchestration_level": "low",
    "orchestration_description": "No chaining",
    "context_awareness_level": "medium",
    "context_awareness_description": "Recognizes and simplifies jargon/context",
    "maturity_classification": "L1"
  },
  {
    "agent": "Presentation Assistant",
    "autonomy_level": "medium",
    "autonomy_description": "Automates formatting",
    "proactivity_level": "medium",
    "proactivity_description": "May suggest themes/visuals/titles",
    "integration_level": "high",
    "integration_description": "Works with docs/slides",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Creates decks and slides",
    "orchestration_level": "medium",
    "orchestration_description": "Can chain content agents",
    "context_awareness_level": "medium",
    "context_awareness_description": "Adjusts design and style to audience and goals",
    "maturity_classification": "L1"
  },
  {
    "agent": "Resume Builder",
    "autonomy_level": "medium",
    "autonomy_description": "Responds to inputs; offers suggestions",
    "proactivity_level": "medium",
    "proactivity_description": "Auto-fills based on context",
    "integration_level": "high",
    "integration_description": "Uses templates or user profile data",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Helps create a tailored resume",
    "orchestration_level": "low",
    "orchestration_description": "No task coordination",
    "context_awareness_level": "medium",
    "context_awareness_description": "Reads context-background/goals/job type",
    "maturity_classification": "L1"
  },
  {
    "agent": "Study Flashcard Agent",
    "autonomy_level": "low",
    "autonomy_description": "Passive content generator",
    "proactivity_level": "low",
    "proactivity_description": "User must trigger generation",
    "integration_level": "high",
    "integration_description": "Links to study material and notes",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Helps students study by converting notes to flashcards",
    "orchestration_level": "low",
    "orchestration_description": "No task chaining or workflow awareness",
    "context_awareness_level": "medium",
    "context_awareness_description": "Understands subject structure and simplifies into card format",
    "maturity_classification": "L1"
  },
  {
    "agent": "Research Paper Agent",
    "autonomy_level": "medium",
    "autonomy_description": "Supports editing/guidance",
    "proactivity_level": "medium",
    "proactivity_description": "May nudge next steps",
    "integration_level": "high",
    "integration_description": "Integrated with editing tools",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Focused research doc support",
    "orchestration_level": "medium",
    "orchestration_description": "Loosely coordinates outline stages",
    "context_awareness_level": "medium",
    "context_awareness_description": "Adapts to academic style/tone/context",
    "maturity_classification": "L1"
  },
  {
    "agent": "Universal Summarizer (cross-sources)",
    "autonomy_level": "medium",
    "autonomy_description": "Automates summarization",
    "proactivity_level": "low",
    "proactivity_description": "Only reactive",
    "integration_level": "high",
    "integration_description": "Across files, web, inbox",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "One job: summarize",
    "orchestration_level": "low",
    "orchestration_description": "No chaining",
    "context_awareness_level": "medium",
    "context_awareness_description": "Adjusts tone/length based on input",
    "maturity_classification": "L1"
  },
  {
    "agent": "Meeting Assistant",
    "autonomy_level": "high",
    "autonomy_description": "High - Coordinates tasks pre/during/post without constant input",
    "proactivity_level": "high",
    "proactivity_description": "Proactive during & after meetings",
    "integration_level": "high",
    "integration_description": "Calendar, email, docs, CRM",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "Owns full workflow (before, during, after)",
    "orchestration_level": "high",
    "orchestration_description": "Coordinates tasks, steps, follow-ups",
    "context_awareness_level": "medium",
    "context_awareness_description": "Adjusts to team, user, meeting context",
    "maturity_classification": "L2"
  },
  {
    "agent": "Khan Writing Coach",
    "autonomy_level": "high",
    "autonomy_description": "Guides students step-by-step without constant prompt",
    "proactivity_level": "high",
    "proactivity_description": "Proactively suggests corrections/steps",
    "integration_level": "high",
    "integration_description": "Embedded in student flows",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "End-to-end assignment coaching",
    "orchestration_level": "high",
    "orchestration_description": "Coordinates learning feedback loop",
    "context_awareness_level": "medium",
    "context_awareness_description": "Adapts to student progress/history",
    "maturity_classification": "L2"
  },
  {
    "agent": "Thesis Advisor",
    "autonomy_level": "high",
    "autonomy_description": "Guides from idea to submission",
    "proactivity_level": "high",
    "proactivity_description": "Recommends structure and progress steps",
    "integration_level": "high",
    "integration_description": "Hooks into research/writing tools",
    "use_case_ownership_level": "high",
    "use_case_ownership_description": "End-to-end ownership of thesis",
    "orchestration_level": "high",
    "orchestration_description": "Delegates to other tools/agents",
    "context_awareness_level": "high",
    "context_awareness_description": "Deep contextual continuity; retains long-term academic goals",
    "maturity_classification": "L2"
  },


  **Your task is to classify the agent into one of the maturity levels based on the description provided.**

  Output the maturity classification in the following JSON format:

  {
    "agent": "<agent_name>",
    "autonomy_level": "<high|medium|low>",
    "autonomy_description": "<description>",
    "proactivity_level": "<high|medium|low>",
    "proactivity_description": "<description>",
    "integration_level": "<high|medium|low>",
    "integration_description": "<description>",
    "use_case_ownership_level": "<high|medium|low>",
    "use_case_ownership_description": "<description>",
    "orchestration_level": "<high|medium|low>",
    "orchestration_description": "<description>",
    "context_awareness_level": "<high|medium|low>",
    "context_awareness_description": "<description>",
    "maturity_classification": "<L0|L1|L2>",
  }
    `;

  const userPrompt = `#### User
    Here is the agent idea:
    ${description}`;

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];
}

// Agent feedback prompt creation
export function createAgentFeedbackPrompt(description: string): ChatMessage[] {
  const systemPrompt = `#### System
    You are an AI Product Framework Assistant.  
    Your job is to evaluate proposed AI or agent ideas according to the framework described below.
    Framework:
    (1-prioritization) First, evaluate the proposed AI or agent idea against four dimensions—Relevance, Capability, Strategic Alignment, and Business Impact—using the scoring rubric below.
    (2-market) Then, given an agent idea, identify the primary user segment it should target, using the taxonomy below.
    (3-build) Score an assistive/agentic experience across five build-dimensions, using the 1-to-5 scales defined below.
    (4-evaluate) Draft a concise executive report following the instructions below.

    
    ### Prioritization Rubrics (read carefully)
    
    1. **Relevance** – How important/frequent is this task for users?
    DESCRIPTION: Captures how central a task is to users' goals and daily workflows. It considers task frequency, importance, current user behavior with AI, and whether the task is perceived as tedious, risky, or other factors identified herein.
    LABELS:
       • High  – daily / mission-critical  
       • Medium – weekly / important for a subset  
       • Low   – infrequent or "nice-to-have"
        
    2. **Capability** – Can we build this well with our current abilities?
    DESCRIPTION: Reflects how well current AI systems can perform the task with accuracy, clarity, and user trust. It evaluates technical feasibility, safety, and whether the task has clear input/output boundaries suitable for automation.
    LABELS:
       • Extra Large – research-grade; not possible today
       • Large – requires custom data pipelines & rigorous evals
       • Medium – needs fine-tuning + heuristics
       • Small – straightforward with off-the-shelf models
    
    3. **Strategic Alignment** – Does this fit our brand and goals?
    DESCRIPTION: Measures how well a use case fits our brand, product strategy, and target segments. Reinforces our right-to-win or opens aligned, valuable new territory for adoption, expansion, upsell leverage, and innovation signaling.
    LABELS:
       • High  – directly tied to a strategic pillar  
       • Medium – adjacent but supportive  
       • Low   – interesting experiment, not on the critical path
    
    4. **Business Impact** – Will this drive significant business results? 
    DESCRIPTION: Assesses the use case's potential to drive revenue, retention, market expansion, and marketing momentum. It prioritizes initiatives that can materially move key business levers.
    LABELS:
       • Right-to-Win – strengthens an existing moat/core revenue engine  
       • Double-Down  – accelerates an area where the company is already winning  
       • Expand       – opens new territory; upside plausible but unproven
    
    ### Instructions
    1. Read the agent idea below.  
    2. Think step-by-step, silently scoring each dimension with *both* a **score label** (from the rubric) and a **one-sentence rationale**.  
    3. Return only a JSON object in the exact schema shown in *Output format*—no extra text.
    
    ### Output JSON format
    
    {
      "Relevance":   { "score": "<High|Medium|Low>", "rationale": "<one sentence>" },
      "Capability":  { "score": "<Extra Large|Large|Medium|Small>",    "rationale": "<one sentence>" },
      "StrategicAlignment": { "score": "<High|Medium|Low>", "rationale": "<one sentence>" },
      "BusinessImpact": { "score": "<Right-to-Win|Double-Down|Expand>", "rationale": "<one sentence>" }
    }
    
    ### Helpful context
    Some context about Grammarly and its users that might be helpful for the rubric scoring
    <context>
    Note that LLMs (Large Language Models) and AI (Artificial Intelligence) will be used interchangeably; LLMs are more precise, but AI is the commonly used term.
 
    Highly capable LLMs will transform every industry and society in the next decade. They will transform how we interact with software and how we do our work. LLMs will also disrupt the competitive dynamics of the technology industry. This transformation and disruption is already underway. Grammarly has been a leader in writing assistance, leveraging NLP (Natural Language Processing) and ML (Machine Learning) to build a beloved product, a strong brand, and a scaled business. We have domain expertise in effective communication, and we have the trust and goodwill of our users. But past success is not a useful guide to the future at a time of transformation. Our strategy is intended to align us on the path forward to reimagine Grammarly in the age of LLMs. We will utilize our strengths, leverage our differentiation, and create a winning position that will enable Grammarly to thrive for many years to come.
    
    
    1/ What is our winning aspiration?
    Communication at work is a conversation with colleagues and customers. We spend more time in conversations at work than in any other activity, but the way we have those conversations hasn't changed much. Thanks to cloud computing, our conversations have become more collaborative (Google Docs) and multi-modal (Zoom), but not much else has evolved. LLMs create new opportunities to make fundamental improvements to conversations at work. Given how frequently we engage in this activity, the opportunity to create value is vast, and that's the basis of our winning aspiration.
    
    Our winning aspiration is to build the most loved, trusted, and widely deployed AI assistant to make conversations at work measurably more valuable.
    
    Notes:
    User love and trust means that our end user is ultimately our single most important constituent.
    Conversations include email, messaging, meetings, and documents. We could pick subsets of this to start and progressively expand our scope.
    "Most widely deployed" means we must find new ways to scale our user base.
    "Measurably more valuable" means defining metrics that clearly show the impact. This is hard, and we will need to experiment and make incremental progress toward this North Star aspiration.
    
    
    2/ Where do we play?
    Product: AI is going to continue to redefine the modern productivity suite. As machines learn to see, listen, talk, write, reason, and interpret emotion, new applications will emerge, and the lines between existing applications will become blurry. Just as our devices became more personal when they leaped off our desktops and into our pockets, so will applications when they exhibit these human characteristics. Not only will the way we interact with these applications change, but our connection to them will also become more personal. 
    
    This re-platforming of the modern productivity suite is our opportunity. We will build an AI-native productivity suite that plays to our advantages by first focusing on communication needs that span existing applications. We will deliver this suite through an assistant with a personality that reminds you of your favorite working relationships.
    
    From Writing Assistant to Communication Assistant. Grammarly will extend beyond text boxes and become a Communication Assistant that's available from anywhere on your device. The applications in our new productivity suite are represented as the assistant's skills:
    
    Writing: While we continue to improve our proofreading skills, we will build a better understanding of the user, their audience, and their task to provide writing assistance that goes beyond correct words. For example, we can help the writer anticipate questions their reader may ask before they hit send or help them understand how their reader may perceive them. We can help people exhibit the necessary communication traits at the right moments so they can be more persuasive when appropriate or use more decisive language when the moment calls for it. In addition to becoming context-aware, the writing suggestions we provide will become personalized so that our users can communicate in the way they prefer, given the context. Finally, we will deliver these writing skills across composition, revision, and comprehension use cases.
    
    Notetaking: Users can add the Communication Assistant to their conversations and it will act like a notetaker that will remember everything for them. Imagine something like the meeting assistants available for video calls, but our Communication Assistant can be added to meetings, channels, documents, threads, and all the places where conversations happen at work. Notes can be automatically organized by meetings, people, commitments (tasks pulled out of your conversations), and topics so that they are easy to browse and search. And of course, all of the data collected by the note-taking skill can augment the writing skill such that we can suggest both the right style and content necessary for the moment.
    
    Coaching: Our assistant can help professionals understand their strengths and weaknesses when communicating at work and provide the coaching necessary to improve their communication skills. When using Grammarly, an L3 engineer should feel that they communicate as well as an L5 engineer. In addition, the Communication Assistant can help professionals improve their working relationships by better understanding their colleagues and sharing advice for how to communicate more effectively or better manage the emotional dynamic between professionals at work.
    
    We're currently developing Writing and Notetaking skills, among the ones listed above. There are likely more skills worth considering, but the goal here is to provide a view of how our AI native productivity suite could take shape.
    
    From Communication Assistant to Communication Intelligence for the Organization. For enterprise buyers, we will provide insights into how well their organization communicates and what they can do to steer communication behaviors across their teams. The communication insights will improve when administrators allow Grammarly to access the organizational knowledge necessary to create a Communication Graph that can map entities such as people, relationships, meetings, topics, and documents onto the insights we deliver. This organizational knowledge will augment the data collected by the communication assistant's notetaking skill and improve the writing suggestions delivered by the writing skill. Organizational leaders can also guide the Communication Assistants of their team members to help them communicate in a way that's aligned with the organization's best practices and policies. 
    
    Making conversation at work more valuable is an ambitious aspiration that can be challenging to measure. As we develop the products described above, we must align on the problems worth solving for our customers and how we might measure our progress toward solving those problems. 
    
    Go To Market: We will reposition our value proposition to match this much broader product offering. We will also evolve our brand so that users continue to love and trust us and believe that we can credibly deliver this much broader value. Our ability to own metrics around better conversations will depend on our brand. Our winning aspiration calls for exploring additional growth levers. We will continue to invest in performance marketing and increase our focus on PLG (product-led growth). We've used PLG for revenue growth but not for user growth. Product-driven network effects and virality will be new areas of investment. The Pro SKU gives us a foundation for both. We will continue to grow our managed business with our direct channel, leveraging self-serve insights to sell to organizational buyers. New growth levers for our managed business include a scaled channel business and innovating on our pricing model (moving from per-seat to outcome-driven) to drive faster organizational adoption.
    
    Customers: We will focus on working professionals navigating a high volume of communication complexity (volume, nuance, varied contexts). Building on that core focus, we will develop aggregated insights and metrics to appeal to enterprise buyers to scale within organizations with many deployed users. 
    
    Geography: We will focus on Tier 1 countries (US, Canada, UK) since the TAM is large (100M+) and we have a very low penetration into the market (~2%). Supporting other languages and other geographic areas is not a focus.
    
    
    3/ How do we win?
    
    No moats are unassailable, and we need to focus on speed and excellence of execution to drive success. However, we have some key advantages that give us a head start; we will need to ensure that we recognize and leverage these competitive advantages.
    
    We have user permission. We have painstakingly built high-quality clients for mobile, desktop, and the web. We have made large investments in efficient cross-client development and client quality, solving app compatibility issues, text corruption issues, and more. Our user experience requires no up-front set-up – it works everywhere a user works. Because of this, we are ubiquitous and are already part of people's daily workflows across every application. No one is surprised to see Grammarly operating inside Slack, Gmail, or Word. We have also invested in a multi-layered security program and a robust set of privacy controls. All of these capabilities mean that we have our users' permission to provide a broader set of assistance. Other AI companies can (and will) try to replicate these assets, but it won't be easy to do across client quality, user experience, and user trust without a significant effort. We have a head start and need to maintain and extend it.
    
    We can create the most accurate user model. Since we are already in people's daily workflows, we can collect rich, granular data about how a user spends their time at work – the apps, the conversations, the people – we can collect data from a very broad set of user actions and, therefore, generate the best insights. We can tailor those insights to specific organizations when augmented with deeper enterprise knowledge. We can surface that data and those insights at the most relevant times in the flow of work, clearly demonstrating the value of the data we're collecting. This breadth of data also puts us in the best position to create metrics around improved conversations that we can own across the industry, providing objective benchmarks on the quality of our second brain. Most AI companies don't have user permission to collect this breadth of data. OS providers like Microsoft could potentially do something similar, but they are incentivized to enable a thriving developer ecosystem on Windows. They will also be constrained by regulatory pressure not to over-reach.
    
    We have a unique brand->self-serve->managed GTM (Go-to-Market) flywheel. We already have a strong brand and a leading brand position around helping people communicate better. We have an efficient self-serve machine to profitably acquire qualified users at scale. Our scaled user acquisition programs reinforce our brand. The scale of our self-serve business also provides a large and growing source of qualified leads and account insights to scale our managed business efficiently. We are not a portfolio with separate consumer and enterprise businesses. We've structured our GTM so that these businesses reinforce each other. Many consumer-facing AI companies will find it hard to replicate the scale of our self-serve acquisition engine to scale quickly; distribution will become a bottleneck for many of today's startups. Many enterprise AI companies will similarly struggle with scale because their products are simply not suited for a self-serve motion. 
    
    4/ What capabilities must we invest in?
    
    Continuing to attract and retain top EPD (Engineering, Product, Design) talent. Executing our product vision requires us to deepen our investment in attracting, retaining, and enabling the best talent, starting with EPD. We operate in a very competitive talent market, and we must ensure that we can continue to develop and strengthen our ability to attract talent from the best AI teams as we scale. Investing in this capability requires that we focus on a few different areas. We need a  compelling and clearly articulated Employee Value Proposition. We need to strengthen systems to recognize and reward outsize impact and to drive accountability when performance expectations are not met. We must evolve our working methods to enable focus and seamless collaboration (removing obstacles and overhead). We will also deepen our investments in strategic research as a strategic driver and also to increase confidence in our technical depth. Enabling world-class teams is not an EPD-specific aspiration, but this focus is intentional since EPD represents the tip of the spear as we execute our strategy.
    
    Building a leading workplace-focused AI brand. Grammarly has high brand recall and positive brand association, but we're known as a student-focused tool that uses NLP to help people proofread their work. We need to shift our brand perception to be known as an essential AI-enabled platform for working professionals. The value proposition laid out in this strategy moves beyond proofreading to helping users through the full lifecycle of their communication journey and delivering quantifiable business outcomes. Delivering on this will likely require multiple product lines. All of these changes must be communicated to our target market through an updated brand. We will need to get very good at launching creative and integrated brand campaigns that cut across marketing and comms and then measuring the impact of these campaigns. We will need a crisp and memorable company narrative that we can use to drive a communication platform that Grammarly leaders can plug into in a scaled and repeatable way. We must build a brand architecture that enables us to move beyond a single product to a portfolio of integrated products.
    
    Increasing operational velocity. The pace of change in AI is extremely rapid, and we need to move faster to build a leading position. Creating the conditions to enable us to move faster will be a core capability that requires focus and investment. We will need to provide all Grammarlians with the best tools to do their jobs more efficiently, including best-of-breed AI services. We must invest in tools and processes to improve developer productivity so our engineering teams can build and launch faster. We must enable teams to take calculated risks, move quickly, and optimize for learning, knowing that not all speculative bets will work out. We must set up teams to work autonomously within the same (or very close) time zones and with clear decision-making so we're not slowed down by cross-continental communication overhead. We must become leaders in adapting our ways of working around our remote/hybrid operating model. We must be able to deliver on complex projects predictably and on time.
    
    
    
    Appendix: What do we believe about the future?
    
    Applications
    App interfaces will evolve to become assistive. Interactions will be driven by a high-level conversation about goals and intent. Github copilot and coding are a lens into the future.
    App boundaries will change, tending towards consolidation. Many ecosystems have been created around incomplete solutions to big business problems (think of Salesforce solving CRM and the many add-ons around the core solution). AI will enable better solutions, removing the need for a patchwork of point solutions.
    Most workflows will be driven through agents. Software will orchestrate and complete tasks on the user's behalf.
    
    Knowledge workers
    User data collection will become much more granular. Users will consent to this increased data collection because its value will be very clear.
    Knowledge work will focus on nuance, judgment, and relationships as routine tasks are automated by AI assistants. The economic value created per employee will go up and increase employee bargaining power.
    AI assistants at work will require mobility and interoperability as employees move from job to job. Thorny issues around IP will arise, and regulation will be needed to provide clarity.
    
    Competitive landscape
    OS vendors will constrain themselves because they need to enable a thriving developer ecosystem vs locking out 3rd parties. As an added inducement, there is the looming threat of regulatory scrutiny with overreach. For example, Microsoft will not shut down the market for platform-level AI assistants, enabling space for Grammarly to operate.
    Large investments in open-source, notably from Meta, will level the playing field and democratize access to large, general pre-trained models. We can fine-tune or build task-specific models using our data.
    Thanks to open-source models, the advantage will accrue to vendors who can earn user trust and use that trust to collect the highest quality, most relevant user data.
    </context>
    
    #### Market Taxonomy
    
    1. **User Type** – broad role/context  
       • Student – in formal education (K-12, university, bootcamp)  
       • Knowledge Worker – professionals whose main work is thinking/communication  
       • Both – idea clearly serves both groups
    <helpul_context_about_user_types>
    ### Audience 1 — Students
    Where they struggle, what it feels like, and how AI can help

    Pre-write (Researching / Brainstorming / Outlining)
    Struggle: Starting from a blank page, narrowing a topic, filtering credible sources
    Feelings: “Blank-page paralysis,” overwhelm, tendency to procrastinate
    AI assistance: Idea prompts, quick outlines, thesis sharpening, source-credibility checks
    Write (Drafting)
    Struggle: Writer’s block mid-draft, scattered flow, switching tone or genre
    Feelings: “Mid-page freeze,” anxiety when transitions or expansions stall
    AI assistance: On-demand sentence expansion, re-phrasing, flow guidance, tone shifting
    Post-write (Revising / Polishing)
    Struggle: Juggling grammar, structure, citations, tone—plus fear of AI detection tools
    Feelings: Revision fatigue, self-criticism, worry about false AI-use accusations
    AI assistance: Guided revision checklists, citation generators, “humanize” rewrites that ease detector anxiety
    Key take-aways

    Students look for help at every breakpoint—start, middle, finish—to regain momentum, clarity, and confidence.
    They want friction removed, not full automation; maintaining ownership of the work matters.
    Transparent, citation-savvy support calms detection fears and builds trust.

    ### Audience 2 — Knowledge Workers
    Snapshot & drivers

    Professionals in tech, marketing, operations, research, and similar fields (age skew ≈ 25-54, many non-native English speakers).
    Primary motivators: simplify work, save time, and improve communication quality.
    Four behavioral segments

    Accelerator – prioritizes speed and AI reuse.
    Operator – values structure and easy navigation of information.
    Tailor – focuses on audience-specific tone and precision.
    Architect – emphasizes planning, documentation, and traceability.
    Pain points & opportunities

    Tool overload: juggling multiple AI apps; desire for a single hub that reduces busywork yet fits existing workflows.
    Quality over speed: many rate accuracy and brand safety above raw output speed.
    Uneven AI comfort: some are highly engaged, others cautious; layered explanations and easy undo build trust.
    Early-career gap: few users aged 18-24—a clear transition opportunity from student to professional tooling.
    Design implications

    Provide segment-aware experiences (e.g., quick templates for Accelerators, detailed scaffolds for Architects).
    Use progressive AI exposure: start skeptics with low-risk checks, then surface advanced features as trust grows.
    Enable cross-tool orchestration so the assistant acts as the glue for generation, revision, and retrieval.
    Bridging the Two Audiences
    Shared need: Both groups crave confidence—students for grades, professionals for credibility.
    Different on-ramps: Students need help getting started; knowledge workers need help staying organized and scaling communication.
    Lifecycle potential: Guiding students into early-career “Operator” or “Tailor” modes can create a continuous user journey from classroom to boardroom.
    </helpul_context_about_user_types>
    
    
    2. **Behavioral Segment** – how they engage with AI products  
       • Accelerator 
       • Operator  
       • Tailor 
       • Architect
    <helpul_context_about_behavioral_segments>
    The four behavioral segments and their relationship with AI tools
    1. Accelerator – “Give me speed”

    Mindset & habits
    Fast-moving communicators who lean heavily on templates, content reuse, and one-click automations to get work out the door. They treat AI as a natural power-up rather than something to be evaluated or debated.
    How they engage with AI
    Adopt new AI products early; daily users of Grammarly, ChatGPT, Copilot, etc.
    Use generation features to jump-start drafts, slides, and email threads, then iterate quickly.
    Care more about raw acceleration than perfect provenance—explainability is nice-to-have, not must-have.
    Product cues that resonate
    Default to “fast mode”: pre-built templates, bulk actions, keyboard shortcuts, and instantaneous rewrite / summarize buttons.
    2. Operator – “Keep me organised”

    Mindset & habits
    Process-oriented communicators who prize clear structure, easy information retrieval, and well-defined next steps. They’re curious about AI but skeptical of letting it write for them.
    How they engage with AI
    Lean on AI for search, smart filtering, and agenda building—not full text generation.
    Value suggestions that slot neatly into existing workflows (e.g., Atlassian or Coda docs) and can be traced later.
    Want confidence that output is accurate and that they remain “in the loop.”
    Product cues that resonate
    Structure before magic: clearly-labeled sections, step-by-step assistants, automatic highlights of missing information, and one-click export to their knowledge base.
    3. Tailor – “Help me hit the perfect tone”

    Mindset & habits
    Audience-centric communicators who obsess over voice, clarity, and nuance. They see AI as a co-writer that can polish—but not replace—their craft.
    How they engage with AI
    Use style-tuning sliders, persona prompts, and brand-tone guardrails to refine drafts.
    Frequently run multiple rewrites, comparing wording until it “sounds right.”
    Less interested in speed gains; more interested in sounding credible, on-brand, and human.
    Product cues that resonate
    Tone dials up front: voice libraries, instant before/after previews, audience simulations, and granular control over formality, complexity, and jargon.
    4. Architect – “Show me the big picture”

    Mindset & habits
    Deliberate planners who document decisions, reflect on outcomes, and build repeatable systems. They’re selective with AI: happy to use it for synthesis, but wary of opaque automation.
    How they engage with AI
    Favour summarisation, meeting-recap, and knowledge-graph features that preserve traceability.
    Expect transparency: citations, document history, and the ability to drill into sources.
    Adopt new AI capabilities once they can see clear governance and version control.
    Product cues that resonate Explain, don’t just produce: timeline views, decision logs auto-generated from chats, linked citations, and options to export structured data for future analysis.
    Cross-segment takeaways for AI product design
    Shared baseline: everyone values tools that simplify work, save time, and upgrade communication quality, but how that value is delivered must flex to segment mindsets.
    Progressive disclosure: start Operators and Architects with low-risk features like proofreading and summaries; surface generative shortcuts first for Accelerators and Tailors.
    Segment-aware defaults: speed toggles for Accelerators, structure-first templates for Operators, tone controls for Tailors, and traceability layers for Architects create instant “this tool gets me” moments.
    </helpul_context_about_behavioral_segments>
    
    3. **User AI Mindset** – their attitude & proficiency with AI  
       • Capable but Cautious 
       • Engaged and Enabled
       • Interested but Inexperienced  
       • Disengaged and Doubtful 
    <helpul_context_about_user_ai_mindset_types>
    Four AI-mindset groups and how they show up in product
    Capable but Cautious — “Show me why it matters”

    Attitude & proficiency – Comfortable running GenAI tools, but not yet convinced your solution fits their workflow; they need a clearer value story before they commit.
    Typical engagement – Will experiment selectively (often on other platforms), double-check AI outputs, and pause when explanations feel thin.
    Design cues that land – Lead with concrete ROI, source-level transparency, and easy undo. Frame features as workflow enhancers—not wholesale replacements.
    Engaged and Enabled — “Give me more power”

    Attitude & proficiency – High AI readiness and high product resonance. Already using multiple GenAI tools and eager to go deeper.
    Typical engagement – Daily power users who jump on new features, stitch tools together, and evangelize internally when they see gains.
    Design cues that land – Expose advanced workflows early, surface power shortcuts, and make it easy for them to share wins (templates, integrations, advocacy programs).
    Interested but Inexperienced — “Help me get started safely”

    Attitude & proficiency – Curious about AI and like the product vision, but still building confidence; they thrive on guidance and low-risk wins.
    Typical engagement – Begin with proofreading or summarization, lean on onboarding tips, and progress as trust grows.
    Design cues that land – Step-by-step wizards, explain-as-you-go tooltips, and gentle nudges from “polish this sentence” → “summarize this doc” → “draft the first outline.”
    Disengaged and Doubtful — “I’m fine without it”

    Attitude & proficiency – Low comfort and low interest in AI solutions; see little reason to change current habits.
    Typical engagement – Rarely open AI features, may disable them if they feel intrusive, and stick to manual checks unless a task is painfully slow.
    Design cues that land – Keep AI optional and unobtrusive. Start with familiar helpers (grammar fixes) that prove value instantly, then layer in heavier features only when invited.
    Cross-mindset design tactics
    Progressive disclosure – Surface depth for Engaged users upfront, but hide complexity behind “learn more” for the Cautious and the Inexperienced.
    Trust levers everywhere – Citations, version history, and one-click revert are universal confidence builders—especially for the hesitant segments.
    Segment-aware onboarding – Detect early signals (usage frequency, feature toggle patterns) to route users into the right guidance path and pace their AI journey accordingly.
    </helpul_context_about_user_ai_mindset_types>
    
    ### Instructions
    1. Read the agent idea below.  
    2. Think step-by-step, choosing **one** label from each list that best matches the ideal target user.  
    3. For each chosen label, write ONE sentence explaining why.  
    4. Output exactly the JSON schema shown next.
    
    ### Output JSON format
    {
      "UserType": { "label": "<Student|Knowledge Worker|Both>", "rationale": "<one sentence>" },
      "BehavioralSegment": { "label": "<Accelerator|Operator|Tailor|Architect>", "rationale": "<one sentence>" },
      "UserAIMindset": { "label": "<Capable but Cautious|Engaged and Enabled|Interested but Inexperienced|Disengaged and Doubtful>", "rationale": "<one sentence>" }
    }
    ### Building Dimensions and percentage scales

    1. Scope  
      • 1 = Extremely general - Designed for any task across many domains
      • 2 = Broadly general - Handles a wide range of related tasks
      • 3 = Balanced - Mix of general capabilities with some specialization
      • 4 = Specialized - Focused on a specific domain or type of task
      • 5 = Highly specialized - Optimized for one specific task or workflow
      <helpul_context_about_scope>
      AI tools exist in a spectrum of generality versus specialization. Although all users would find it valuable for an AI tool to have some knowledge about the user and the context of their task, users have different preferences and tolerances for a tool that is general and all-purpose versus one that is single-task and specialized. 

      Students typically value general, all-purpose AI tools. Students often have a greater and more diverse range of tasks for which they’d like AI support, reflecting their broad academic requirements. Students tend to have a greater tolerance for generality and a lesser inclination toward deep specialization. 

      Knowledge workers typically value depth of specialization and integration in AI tools. Knowledge workers desire tools that focus on specific tasks, with a knowledge base that reflects their specific industry, organization, and individual teams and projects. 
      </helpul_context_about_scope>

    2. Anchor  
      • 1 = Strongly user-centric - Deeply personalized to individual user needs and preferences
      • 2 = Moderately user-centric - Balances user focus with task completion
      • 3 = Balanced - Equal emphasis on user needs and task requirements
      • 4 = Moderately task-centric - Prioritizes task completion with some user consideration
      • 5 = Strongly task-centric - Focused entirely on efficient task execution
      <helpul_context_about_anchor>
      Users often conceive of AI tools as being either more user-focused or task-focused. 

      User-focused AI tools offer more holistic support by taking into account the user's individualized needs and preferences. While they perform tasks, they have a deeper understanding of the user compared to the specific task being completed. People who prefer a “user” anchored tool typically also prefer more breadth and human-like dimensions in their agentic experiences. 

      Task-focused AI tools concentrate primarily on fulfilling a specific project or action, with little to no consideration for who is making the request. People who prefer a “task” anchored tool typically also prefer more specialized, tool-like experiences. They also care significantly about AI’s ability to obtain, understand, and act upon context.
      </helpul_context_about_anchor>

    3. Control  
      • 1 = Fully autonomous - AI operates independently with no user oversight
      • 2 = Mostly autonomous - AI acts independently but alerts user of major actions
      • 3 = Balanced control - Equal mix of AI autonomy and user governance
      • 4 = Mostly governed - User maintains primary control with some AI automation
      • 5 = Fully governed - User has complete control over all AI actions
      <helpul_context_about_control>
      Users want the ability to exert control over agent actions. While the degree of desired control varies based on the user and task, the ability to control and manage agent actions is universally essential. 

      Users are more open to leveraging autonomous AI for tasks that are perceived as low-value, low-risk, and tedious, and for which they feel confident that an AI tool can execute correctly. Inversely, they are less open to automating tasks that feel high-value and high-risk, and that are nuanced and complex, as they feel uncertain that an AI tool can execute them correctly. 

      Knowledge workers are specifically more open to AI that automates low-value work tasks and frees them to devote their attention to higher-value, creative, or strategic work that benefits themselves and their organizations.  

      Students typically prefer greater governance over AI tools at all times due to the concerns over how automation can cause them to: 

      * Get a bad grade due to poor AI task execution.  
      * Be penalized for using AI. 
      * Lose learning opportunities from delegating tasks completely to AI. 
      * Lose a sense of ownership and pride from doing their own work. 
      Control goes hand-in-hand with the importance of being able to see and understand AI actions—what an AI tool has done and how it has done it. This type of visibility and explainability is crucial because it fosters security and helps mitigate concerns regarding agent quality. 

      Users can fear the “unknown” of automation, unsure of the mistakes an AI tool can make and what to look out for when completing a task. 
      </helpul_context_about_control>
    4. Humanity  
      • 1 = Strongly person-like - Acts like a human collaborator with personality and social awareness
      • 2 = Moderately person-like - Exhibits some human-like traits while maintaining tool functionality
      • 3 = Balanced - Equal blend of human-like and tool-like characteristics
      • 4 = Moderately tool-like - Focuses on utility with minimal human-like qualities
      • 5 = Strongly tool-like - Pure utility with no human-like characteristics
      <helpul_context_about_humanity>
      AI exhibiting “person-like” qualities enhances user comfort and fosters a sense of familiarity. Core attributes include retaining a memory of the user and past interactions, the ability to engage in a dialogue, and an inviting tone. 

      Most users prefer AI that embodies these qualities to at least a certain degree, although some value it more than others. 
      Even users who lean toward a more tool-like experience value aspects such as memory and dialogue engagement. The distinction lies in the perception: while person-like AI is seen as a collaborator, tool-like AI serves merely as a means to an end.
      </helpul_context_about_humanity>

    5. Mediation  
      • 1 = Strongly hierarchical - User directs and supervises all agent interactions from the top
      • 2 = Moderately hierarchical - User maintains oversight with some agent collaboration
      • 3 = Balanced - Mix of hierarchical control and collaborative interaction
      • 4 = Moderately collaborative - Agents work together with user guidance
      • 5 = Strongly collaborative - User and agents operate as equal participants in a network
      <helpul_context_about_mediation>
      Within a multi-agent experience, users conceived of two models for multi-agent mediation: 

      * A collaborative network where the user is a participant. The user is at the center of the workflow, an active participant, and the experience is conversational and iterative between the user and agents. 
      * A hierarchical structure where the user controls and manages the agents. The user is at the top of the hierarchy, serving as a director, supervisor, and verifier of agent actions and interactions. 

      Users also conceived of working with AI through proactive interaction, where the tool alerts the user to how it can assist them, or through responsive interaction, where the tool surfaces when the user requests it, on demand.

      * Most users are open to a mix of proactive and responsive interactions with AI, although those who strongly prefer responsive interactions tend to have a lower tolerance for distractions and text decorations. 
      * Users who highly value control in their experience with AI often prefer a responsive interaction due to its “separate” nature. Many users associate proactive interaction with integration and responsive interaction with a fully separate app.
      </helpul_context_about_mediation>

    ### Instructions
    1. Read the assistant-experience description below.  
    2. For each dimension, choose an integer percentage from 0 to 100 that best fits the description.  
    3. Write one concise sentence explaining why you chose that percentage.  
    4. Return only the JSON object described in **Output format**—no extra text.

    ### Output format

    {
      "Scope":     { "score": <1-5>, "rationale": "<one sentence>" },
      "Anchor":    { "score": <1-5>, "rationale": "<one sentence>" }, 
      "Control":   { "score": <1-5>, "rationale": "<one sentence>" },
      "Humanity":  { "score": <1-5>, "rationale": "<one sentence>" },
      "Mediation": { "score": <1-5>, "rationale": "<one sentence>" }
    }
      
    #### Executive Report
    1. Review everything you've output so far.  
    2. Write a **Success-Condition Summary** (≈ 150 words) structured under **four headings**:  
      • **Targeted Use Case** – whether users will feel the agent truly solves the stated job.  
      • **AI Readiness & Resonance** – whether the experience matches users’ comfort level with AI.  
      • **Perceived Quality** – likelihood users will see it as accurate, reliable, transparent.  
      • **Perceived Value** – likelihood it becomes indispensable in day-to-day workflows.  
      Weave key evidence from Prioritize, Market, and Build into each heading.  
      Ouput JSON Format
      {
        "SuccessConditionSummary": {
            "TargetedUseCase": "<paragraph>",
            "AIReadinessAndResonance": "<paragraph>",
            "PerceivedQuality": "<paragraph>",
            "PerceivedValue": "<paragraph>"
          }
     }     
          
     #### Final JSON Output
     Output the JSON object described in **Output format**—no extra text.
    {
      "Prioritize": {
        "Relevance":   { "score": "<High|Medium|Low>", "rationale": "<one sentence>" },
        "Capability":  { "score": "<Extra Large|Large|Medium|Small>",    "rationale": "<one sentence>" },
        "StrategicAlignment": { "score": "<High|Medium|Low>", "rationale": "<one sentence>" },
        "BusinessImpact": { "score": "<Right-to-Win|Double-Down|Expand>", "rationale": "<one sentence>" }
      },
      "Market": {
        "UserType": { "label": "<Student|Knowledge Worker|Both>", "rationale": "<one sentence>" },
        "BehavioralSegment": { "label": "<Accelerator|Operator|Tailor|Architect>", "rationale": "<one sentence>" },
        "UserAIMindset": { "label": "<Capable but Cautious|Engaged and Enabled|Interested but Inexperienced|Disengaged and Doubtful>", "rationale": "<one sentence>" }
      },
      "Build": {
        "Scope":     { "score": <1-5>, "rationale": "<one sentence>" },
        "Anchor":    { "score": <1-5>, "rationale": "<one sentence>" }, 
        "Control":   { "score": <1-5>, "rationale": "<one sentence>" },
        "Humanity":  { "score": <1-5>, "rationale": "<one sentence>" },
        "Mediation": { "score": <1-5>, "rationale": "<one sentence>" }
      },
      "Evaluate": {
        "SuccessConditionSummary": {
          "TargetedUseCase": "<paragraph>",
          "AIReadinessAndResonance": "<paragraph>",
          "PerceivedQuality": "<paragraph>",
          "PerceivedValue": "<paragraph>"
        }
      }
    }`;
      
  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Here is my agent idea that I would like to validate: ${description}` }
  ];
}

// Function to get feedback from the API
export async function getAgentMaturity(description: string, model: string = "gpt-4.1"): Promise<string> {
  const messages = classifyAgentMaturity(description);
  const requestBody = { 
    messages,
    model,
    temperature: 0.0,
    response_format: { type: "json_object" }  // Always use JSON format
  };

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  
  if (!res.ok) throw new Error('Failed to get feedback');
  const data = await res.json();
  return data.message;
} 

// Function to get feedback from the API
export async function getAgentFeedback(description: string, model: string = "gpt-4.1"): Promise<string> {
  const messages = createAgentFeedbackPrompt(description);
  const requestBody = { 
    messages,
    model,
    temperature: 0.0,
    response_format: { type: "json_object" }  // Always use JSON format
  };
  
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  
  if (!res.ok) throw new Error('Failed to get feedback');
  const data = await res.json();
  return data.message;
} 