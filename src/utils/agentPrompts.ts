// Define types for OpenAI messages
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Agent feedback prompt creation
export function createAgentFeedbackPrompt(description: string): ChatMessage[] {
  const systemPrompt = `### System
    You are an AI Product Framework Assistant.  
    Your job is to evaluate proposed AI or agent ideas against four dimensions—Relevance, Capability, Strategic Alignment, and Business Impact—using the scoring rubric below.
    
    ### Rubric (read carefully)
    
    1. **Relevance** – How important/frequent is this task for users?
    DESCRIPTION: Captures how central a task is to users' goals and daily workflows. It considers task frequency, importance, current user behavior with AI, and whether the task is perceived as tedious, risky, or other factors identified herein.
    LABELS:
       • High  – daily / mission-critical  
       • Medium – weekly / important for a subset  
       • Low   – infrequent or "nice-to-have"
        
    2. **Capability** – Can we build this well with our current abilities?
    DESCRIPTION: Reflects how well current AI systems can perform the task with accuracy, clarity, and user trust. It evaluates technical feasibility, safety, and whether the task has clear input/output boundaries suitable for automation.
    LABELS:
       • XS – trivial prompt-only  
       • S  – straightforward with off-the-shelf models  
       • M  – needs fine-tuning + heuristics  
       • L  – requires custom data pipelines & rigorous evals  
       • XL – research-grade; not possible today
    
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
      "Capability":  { "score": "<XS|S|M|L|XL>",    "rationale": "<one sentence>" },
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
    </context>`;
  
  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Here is my agent idea that I would like to validate: ${description}` }
  ];
}

// Function to get feedback from the API
export async function getAgentFeedback(description: string, model: string = "gpt-3.5-turbo"): Promise<string> {
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