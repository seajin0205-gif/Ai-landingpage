import type { Copy } from "./ko";

export const enCopy: Copy = {
  meta: {
    title: "Nexus AI — AI chat, image generation, and workflow automation",
    description:
      "Chat, create images, and automate work in one platform. Talk to your data, make visuals, and run repeat work without switching tools.",
  },
  brand: {
    tagline: "Chat · Image · Automation",
    heroTagline: "AI workspace for team automation",
    pill: "Chat · Image · Automation",
    hub: "Unified hub",
    preparing: "Preparing",
  },
  nav: {
    links: [
      { href: "#workspace-demo", label: "Product" },
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#testimonials", label: "Stories" },
      { href: "#pricing", label: "Pricing" },
    ],
    login: "Log in",
    start: "Get started",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    languages: [
      { code: "en" as const, label: "EN", href: "/en" },
      { code: "ko" as const, label: "KR", href: "/" },
    ],
  },
  hero: {
    lines: [
      { text: "Stay in one place.", accent: false },
      { text: "Chat, images, and automation", accent: false },
      { text: "in a single", accent: true },
      { text: "AI Workspace.", accent: true },
    ],
    impacts: [
      { value: "3 → 1", label: "One shared workspace" },
      { value: "Zero", label: "Context switching" },
      { value: "Live", label: "Try AI instantly" },
    ],
    impactLabel: "What you get",
    lead: "Creating, editing, and repeat work stay connected. Start with one prompt and carry that context through to team automation.",
    socialStrong: "500+ teams",
    socialBefore: " run their work in ",
    socialAfter: " instead of jumping between AI tools",
    primaryCta: "Start for free",
    secondaryCta: "See the product",
    trust: ["No credit card", "14-day free trial", "Full English support"],
    demoTitle: "Nexus Live Demo",
    demoStatus: "Live Simulation",
    demoNote: "Interactive sandbox preview",
  },
  featureCards: [
    { id: "chatbot", num: "01", title: "AI chat", description: "Answers from your docs and data" },
    { id: "image", num: "02", title: "Image generation", description: "On-brand visuals, fast" },
    { id: "automation", num: "03", title: "Workflow automation", description: "Connect the tools you already use" },
  ],
  workspaceIntro: "See the product screen where chat, images, and automation stay connected.",
  featuresIntro: "Chat, images, and automation. Three capabilities, one platform.",
  features: [
    {
      number: "01",
      label: "AI chat",
      title: "An assistant that knows how your team works",
      description: "Connect internal docs, customer data, and the context of the work so answers, summaries, and analysis happen in one place.",
      metrics: [
        { value: "RAG", label: "Answers from your docs" },
        { value: "24/7", label: "Always on" },
      ],
    },
    {
      number: "02",
      label: "Image generation",
      title: "On-brand visuals without the wait",
      description: "Campaign banners, social posts, and product mockups, rendered in high resolution from a text prompt.",
      metrics: [
        { value: "4K", label: "High-resolution output" },
        { value: "3s", label: "Typical generation time" },
      ],
    },
    {
      number: "03",
      label: "Workflow automation",
      title: "Turn repeat work into a reliable workflow",
      description: "Reports, alerts, data processing, and approvals run across your tools without someone pushing them through.",
      metrics: [
        { value: "50+", label: "App connections" },
        { value: "70%", label: "Time saved" },
      ],
    },
  ],
  howIntro: "Start with a conversation, create, then automate. Four steps are enough.",
  steps: [
    {
      step: "01",
      title: "Ask in chat",
      description: "Ask in plain language and get an answer grounded in your company data and documents.",
    },
    {
      step: "02",
      title: "Generate the image",
      description: "Create the visual you need in the same conversation, from a single prompt.",
    },
    {
      step: "03",
      title: "Automate the workflow",
      description: "Connect repeat work so reports and alerts run on their own.",
    },
    {
      step: "04",
      title: "Share it with the team",
      description: "Send the result to Slack, Notion, and the rest of the tools you already use.",
    },
  ],
  testimonialsIntro: "See what changes for real teams, and the results they can measure.",
  ratingSuffix: "out of 5",
  testimonials: [
    {
      quote:
        "AI chat cut our customer response time by 60%. The team now produces marketing visuals in-house instead of waiting on another tool.",
      name: "Seoyeon Kim",
      role: "Marketing Lead, Meridian",
      avatar: "marketing" as const,
      rating: 5,
    },
    {
      quote:
        "We connected the daily report to an automated workflow. The team finally spends that time on the work that needs a person.",
      name: "Junhyuk Park",
      role: "Operations Manager, Lattice Health",
      avatar: "operations" as const,
      rating: 4,
    },
    {
      quote:
        "Chat, images, and automation live on one platform, so we stopped hopping between tools. We felt the difference within two weeks.",
      name: "Chaewon Lee",
      role: "Product Lead, Arcline",
      avatar: "product" as const,
      rating: 3,
    },
  ],
  stats: {
    heading: "Team use of AI shows up in the numbers",
    chat: "Chat conversations handled",
    images: "Images generated",
    saved: "Less time on repeat work",
    savedTrend: "70% average",
    savedProgress: "Team average",
    teams: "Companies and teams",
    teamsTrend: "+86 new",
  },
  team: {
    heading: "Built for the team, and for security",
    learnMore: "Learn more",
    blocks: [
      {
        label: "Teamwork",
        title: "Chat, images, and automation for the whole team",
        description:
          "Roles, a shared workspace, and live collaboration let marketing, operations, and product work in one AI environment. Results go straight to Slack and Notion.",
        highlights: [
          "Workspaces and permissions by team",
          "Shared history for chat, images, and workflows",
          "Slack, Notion, and Google Drive",
          "Live collaboration and comments",
        ],
      },
      {
        label: "Enterprise",
        title: "Security and compliance from the start",
        description:
          "SOC 2 Type II, encryption, and an on-prem option. Connect sensitive company data with a clear audit trail of every action.",
        highlights: [
          "SOC 2 Type II",
          "End-to-end encryption",
          "SSO and SAML",
          "Audit logs and compliance",
        ],
      },
    ],
    workspaceTitle: "Team workspace",
    online: "3 online",
    members: [
      { name: "Seoyeon Kim", role: "Marketing", initial: "S" },
      { name: "Junhyuk Park", role: "Operations", initial: "J" },
      { name: "Chaewon Lee", role: "Product", initial: "C" },
    ],
    sent: "Report ready → sent to Slack #marketing",
    securityTitle: "Security dashboard",
    security: [
      { label: "SOC 2 Type II", status: "Certified" },
      { label: "Data encryption", status: "AES-256" },
      { label: "SSO / SAML", status: "On" },
      { label: "Audit log", status: "Live" },
    ],
    securityFoot: "All systems normal · Last check 2 minutes ago",
  },
  architecture: {
    kicker: "Architecture",
    heading: "Tech stack and architecture",
    intro:
      "The stack remote product teams expect to see before a security review. The interface, the model layer, and the infrastructure sit in one product.",
    groups: [
      {
        label: "Frontend",
        title: "Interface",
        description: "A typed App Router UI, styled with the same system you are looking at on this page.",
        items: ["Next.js", "Tailwind CSS", "TypeScript"],
      },
      {
        label: "Backend & AI",
        title: "Models and APIs",
        description: "Chat, retrieval, and workflow calls pass through a typed API and a retrieval pipeline.",
        items: ["Node.js", "Python FastAPI", "OpenAI API", "LangChain", "RAG Pipeline"],
      },
      {
        label: "Infrastructure & Security",
        title: "Run and review",
        description: "Containers on AWS, with the controls a security review asks for before rollout.",
        items: ["AWS", "Docker", "SOC 2 Compliance ready"],
      },
    ],
  },
  integrations: {
    kicker: "Integrations & partners",
    heading: "Trusted by 500+ teams",
    body: "Connect GitHub, Linear, Vercel, Supabase, Notion, and Slack to the Nexus AI hub.",
    tools: ["GitHub", "Linear", "Vercel", "Supabase", "Notion", "Slack"],
  },
  pricingIntro: "14-day free trial. No credit card. Pick the plan that fits the team.",
  popular: "Most popular",
  plans: [
    {
      name: "Starter",
      subtitle: "Individuals and small teams",
      price: "₩0",
      period: "/mo",
      description: "For people getting started with AI chat and image generation.",
      features: ["500 chat messages / month", "50 images / month", "3 basic automations", "Community support"],
      ctaLabel: "Start free",
      highlighted: false,
    },
    {
      name: "Pro",
      subtitle: "Teams that are growing",
      price: "₩239,000",
      period: "/mo",
      description: "For teams using chat, images, and automation as part of the daily workflow.",
      features: ["Unlimited chat", "5,000 images / month", "Unlimited workflows", "50+ app connections", "Priority support"],
      ctaLabel: "Try Pro free",
      highlighted: true,
    },
    {
      name: "Enterprise",
      subtitle: "Larger organizations",
      price: "Custom",
      period: "",
      description: "For organizations that need security, compliance, and dedicated infrastructure.",
      features: ["Dedicated models and infrastructure", "Unlimited image generation", "Automation consulting", "24/7 dedicated support", "On-prem deployment"],
      ctaLabel: "Talk to sales",
      highlighted: false,
    },
  ],
  faqTitle: "Questions before you start",
  faqs: [
    {
      question: "What data does the AI chat use?",
      answer:
        "It answers with RAG over the docs, wiki, CRM, and knowledge base you connect. Enterprise security options keep that data from being sent to an outside model.",
    },
    {
      question: "What about image quality and rights?",
      answer:
        "Output goes up to 4K. Commercial rights depend on the plan. On Pro and above, you own the images you generate.",
    },
    {
      question: "Can I automate work without writing code?",
      answer:
        "Yes. The visual workflow builder is drag and drop. Webhooks and the API are there when you need them.",
    },
    {
      question: "Can I use all three together?",
      answer:
        "Yes. Generate an image in the middle of a chat, then hand that result to a workflow. Chat, images, and automation stay on one platform.",
    },
    {
      question: "How do the trial and plans work?",
      answer:
        "The 14-day trial includes the core product. After that, choose Starter (free), Pro, or Enterprise. You can start without a credit card.",
    },
  ],
  cta: {
    badge: "500+ teams chose Nexus AI",
    lines: [
      { text: "Take the next step.", accent: false },
      { text: "Start today.", accent: true },
    ],
    body: "Chat, images, and automation on one platform. Setup takes about five minutes, and the whole team can work together right away.",
    primary: "Start the free trial",
    secondary: "Talk to sales",
    trustLabel: "Why teams start",
    trust: ["14-day free trial", "No credit card", "Full English support"],
  },
  footer: {
    blurb: "AI chat, image generation, and workflow automation on one platform. Give the team’s work a higher gear.",
    home: "/en",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Changelog", href: "#" },
          { label: "Docs", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
          { label: "Security", href: "#" },
        ],
      },
    ],
  },
  heroDemo: {
    prompt: "Make a minimal SaaS hero banner",
    generating: "Generating image...",
    result: "Result",
    empty: "Enter a prompt",
    placeholder: "Enter a prompt...",
  },
  preview: {
    file: "weekly_marketing_report.pdf",
    done: "Done",
    week: "Key metrics · week of July 1, 2026",
    metrics: [
      { label: "Conversion", value: "+18%" },
      { label: "CTR", value: "4.2%" },
      { label: "ROAS", value: "3.1x" },
    ],
    bullets: ["Paid social ROAS is up", "Email campaign CTR improved", "Landing page conversion +18%"],
    bannerA: "Automate the work with",
    bannerB: "an AI workspace",
    bannerStart: "Start",
    bannerMore: "Learn more",
    attendees: ["A", "M", "J", "R", "C"],
    meeting: "Weekly team meeting",
    when: "Tomorrow, 10:00–11:00 AM",
    meet: "Google Meet · video call",
    invited: "5 guests · invites sent",
    sent: "✓ Calendar invite sent",
  },
  workspace: {
    tabs: ["Chat", "Image", "Automation"],
    flow: ["Create report", "Send to Slack", "Done"],
    justNow: "Just now · Done",
    thinking: "Generating a result...",
    resultLabel: "Result",
    emptyA: "Type a prompt",
    emptyB: "and the result shows up here",
    placeholder: "Message...",
    previewTitle: "Output preview",
    justGenerated: "Just generated",
    generating: "Generating...",
    preview: "Preview",
    demos: [
      {
        prompt: "Summarize this week’s marketing report",
        response: "The marketing report is ready.",
        detail: "PDF · 3 key metrics · weekly chart",
        type: "report" as const,
      },
      {
        prompt: "Make a minimal SaaS hero banner",
        response: "The hero banner is ready.",
        detail: "PNG 4K · minimal · blue-to-purple gradient",
        type: "image" as const,
      },
      {
        prompt: "Schedule tomorrow’s team meeting",
        response: "The calendar invite is sent.",
        detail: "Google Meet · 5 guests · tomorrow at 10:00",
        type: "calendar" as const,
      },
    ],
  },
};

