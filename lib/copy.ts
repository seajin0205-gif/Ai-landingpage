export type Locale = "ko" | "en";

const koCopy = {
  meta: {
    title: "Nexus AI — AI 챗봇 · 이미지 생성 · 업무 자동화",
    description:
      "AI 챗봇, 이미지 생성, 업무 자동화를 하나의 플랫폼에서. 대화하고, 시각화하고, 반복 업무를 자동화하세요.",
  },
  brand: {
    tagline: "챗봇 · 이미지 · 자동화",
    heroTagline: "업무 자동화 AI Workspace",
    pill: "챗봇 · 이미지 · 자동화",
    hub: "통합 Hub",
    preparing: "준비 중",
  },
  nav: {
    links: [
      { href: "#workspace-demo", label: "제품" },
      { href: "#features", label: "기능" },
      { href: "#how-it-works", label: "사용법" },
      { href: "#testimonials", label: "후기" },
      { href: "#pricing", label: "시작" },
    ],
    login: "로그인",
    start: "시작하기",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    switchLabel: "EN",
    switchHref: "/en",
  },
  hero: {
    lines: [
      { text: "화면 전환 없이,", accent: false },
      { text: "대화·이미지·자동화를", accent: false },
      { text: "AI Workspace에서", accent: true },
      { text: "한번에", accent: true },
    ],
    impacts: [
      { value: "3 → 1", label: "툴 통합 Workspace" },
      { value: "Zero", label: "맥락 단절" },
      { value: "Live", label: "AI 즉시 체험" },
    ],
    impactLabel: "핵심 가치",
    lead: "생성과 수정, 반복 작업까지 끊기지 않습니다. 프롬프트 한 줄로 시작해 팀 업무 자동화까지 같은 맥락에서 이어집니다.",
    socialStrong: "500+개 팀",
    socialBefore: "이 여러 AI 툴 대신 ",
    socialAfter: " 하나로 작업 흐름을 유지 중",
    primaryCta: "무료로 시작하기",
    secondaryCta: "제품 미리보기",
    trust: ["신용카드 불필요", "14일 무료", "한국어 완벽 지원"],
  },
  featureCards: [
    { id: "chatbot", num: "01", title: "AI 챗봇", description: "문서·데이터 기반 답변" },
    { id: "image", num: "02", title: "이미지 생성", description: "브랜드 비주얼 제작" },
    { id: "automation", num: "03", title: "업무 자동화", description: "도구 간 워크플로 연결" },
  ],
  workspaceIntro: "챗봇 · 이미지 · 자동화가 연결된 제품 화면을 확인하세요.",
  featuresIntro: "챗봇 · 이미지 · 자동화 — 세 가지 핵심 역량이 하나의 플랫폼에 있습니다.",
  features: [
    {
      number: "01",
      label: "AI 챗봇",
      title: "팀 지식을 이해하는 대화형 어시스턴트",
      description: "사내 문서, 고객 데이터, 업무 맥락을 연결해 답변·요약·분석을 한곳에서 처리합니다.",
      metrics: [
        { value: "RAG", label: "문서 기반 답변" },
        { value: "24/7", label: "상시 응답" },
      ],
    },
    {
      number: "02",
      label: "이미지 생성",
      title: "브랜드에 맞는 시각 자료를 빠르게 제작",
      description: "캠페인 배너, SNS 콘텐츠, 제품 목업을 텍스트 프롬프트만으로 고해상도 출력합니다.",
      metrics: [
        { value: "4K", label: "고해상도 출력" },
        { value: "3초", label: "평균 생성 시간" },
      ],
    },
    {
      number: "03",
      label: "업무 자동화",
      title: "반복 업무를 안정적인 워크플로로 전환",
      description: "보고서, 알림, 데이터 처리와 승인 흐름을 도구 간 연결로 자동 실행합니다.",
      metrics: [
        { value: "50+", label: "앱 연동" },
        { value: "70%", label: "시간 절감" },
      ],
    },
  ],
  howIntro: "대화로 시작해, 생성하고, 자동화까지 — 네 단계면 충분합니다.",
  steps: [
    {
      step: "01",
      title: "AI 챗봇으로 질문",
      description: "자연어로 질문하면 사내 데이터와 문서를 기반으로 즉시 답변합니다.",
    },
    {
      step: "02",
      title: "이미지를 바로 생성",
      description: "대화 중 필요한 비주얼을 프롬프트 한 줄로 생성합니다.",
    },
    {
      step: "03",
      title: "워크플로로 자동화",
      description: "반복 업무를 워크플로로 연결해 보고서와 알림을 자동 실행합니다.",
    },
    {
      step: "04",
      title: "결과를 팀과 공유",
      description: "결과를 Slack·Notion 등 연동 도구로 공유하고 협업합니다.",
    },
  ],
  testimonialsIntro: "실제 팀의 생산성 변화와 검증된 성과로 Nexus의 가치를 확인하세요.",
  ratingSuffix: "점 / 5점",
  testimonials: [
    {
      quote:
        "AI 챗봇으로 고객 문의 응대 시간이 60% 줄었습니다. 이미지 생성 기능으로 마케팅 콘텐츠 제작도 팀에서 직접 처리하고 있어요.",
      name: "김서연",
      role: "마케팅 팀장, Meridian",
      avatar: "marketing" as const,
      rating: 5,
    },
    {
      quote:
        "매일 반복되던 보고서 작업을 자동화 워크플로로 연결했더니, 팀원들이 전략 업무에 집중할 수 있게 됐습니다.",
      name: "박준혁",
      role: "운영 매니저, Lattice Health",
      avatar: "operations" as const,
      rating: 4,
    },
    {
      quote:
        "챗봇·이미지·자동화가 하나의 플랫폼에 있어서 도구를 오가며 작업할 필요가 없어졌습니다. 도입 후 2주 만에 효과를 느꼈어요.",
      name: "이채원",
      role: "프로덕트 리드, Arcline",
      avatar: "product" as const,
      rating: 3,
    },
  ],
  stats: {
    heading: "팀의 AI 활용이 실제 성과로 이어집니다",
    chat: "챗봇 대화 처리",
    images: "생성된 이미지",
    saved: "반복 업무 시간 절감",
    savedTrend: "평균 70%",
    savedProgress: "팀 평균",
    teams: "도입 기업·팀",
    teamsTrend: "+86 신규",
  },
  team: {
    heading: "팀과 보안까지 갖춘 이유",
    learnMore: "자세히 알아보기",
    blocks: [
      {
        label: "팀 협업",
        title: "챗봇·이미지·자동화를 팀 전체가 함께",
        description:
          "역할별 권한, 공유 워크스페이스, 실시간 협업으로 마케팅·운영·개발 팀이 하나의 AI 환경에서 일합니다. 생성된 결과물은 Slack·Notion으로 바로 공유됩니다.",
        highlights: [
          "팀별 워크스페이스 & 권한 관리",
          "대화·이미지·워크플로 히스토리 공유",
          "Slack · Notion · Google Drive 연동",
          "실시간 협업 & 댓글",
        ],
      },
      {
        label: "엔터프라이즈",
        title: "보안과 규정 준수를 기본으로",
        description:
          "SOC 2 Type II, 데이터 암호화, 온프레미스 배포 옵션까지. 민감한 사내 데이터를 안전하게 AI에 연결하고, 감사 로그로 모든 활동을 추적합니다.",
        highlights: [
          "SOC 2 Type II 인증",
          "엔드투엔드 데이터 암호화",
          "SSO · SAML 지원",
          "감사 로그 & 컴플라이언스",
        ],
      },
    ],
    workspaceTitle: "팀 워크스페이스",
    online: "3명 활성",
    members: [
      { name: "김서연", role: "마케팅", initial: "김" },
      { name: "박준혁", role: "운영", initial: "박" },
      { name: "이채원", role: "프로덕트", initial: "이" },
    ],
    sent: "보고서 생성 완료 → Slack #marketing 전송됨",
    securityTitle: "보안 대시보드",
    security: [
      { label: "SOC 2 Type II", status: "인증 완료" },
      { label: "데이터 암호화", status: "AES-256" },
      { label: "SSO / SAML", status: "활성화" },
      { label: "감사 로그", status: "실시간" },
    ],
    securityFoot: "모든 시스템 정상 · 마지막 점검 2분 전",
  },
  integrations: {
    kicker: "연동 & 파트너",
    body: "Slack, Notion, GitHub 등 이미 쓰는 도구를 Nexus AI Hub에 연결하세요.",
  },
  pricingIntro: "14일 무료 체험 · 신용카드 불필요. 팀 규모에 맞는 플랜을 선택하세요.",
  popular: "가장 인기",
  plans: [
    {
      name: "Starter",
      subtitle: "개인·소규모 팀",
      price: "₩0",
      period: "/월",
      description: "AI 챗봇과 이미지 생성을 처음 시작하는 분들에게 적합합니다.",
      features: ["월 500회 챗봇 대화", "월 50장 이미지 생성", "기본 자동화 3개", "커뮤니티 지원"],
      ctaLabel: "무료로 시작",
      highlighted: false,
    },
    {
      name: "Pro",
      subtitle: "성장하는 팀",
      price: "₩239,000",
      period: "/월",
      description: "챗봇·이미지·자동화를 본격적으로 활용하는 팀을 위한 플랜입니다.",
      features: ["무제한 챗봇 대화", "월 5,000장 이미지 생성", "무제한 자동화 워크플로", "50+ 앱 연동", "우선 지원"],
      ctaLabel: "Pro 무료 체험",
      highlighted: true,
    },
    {
      name: "Enterprise",
      subtitle: "대규모 조직",
      price: "맞춤 견적",
      period: "",
      description: "보안, 규정 준수, 전용 인프라가 필요한 엔터프라이즈 조직용입니다.",
      features: ["전용 AI 모델·인프라", "무제한 이미지 생성", "맞춤 자동화 컨설팅", "24/7 전담 지원", "온프레미스 배포"],
      ctaLabel: "영업팀 문의",
      highlighted: false,
    },
  ],
  faqTitle: "시작 전 궁금한 점",
  faqs: [
    {
      question: "AI 챗봇은 어떤 데이터를 학습하나요?",
      answer:
        "사내 문서, 위키, CRM, 지식 베이스를 연결해 RAG(검색 증강 생성) 방식으로 답변합니다. 외부 모델에 데이터가 전송되지 않도록 엔터프라이즈 보안 옵션도 제공합니다.",
    },
    {
      question: "이미지 생성 품질과 저작권은 어떻게 되나요?",
      answer:
        "4K 고해상도 출력을 지원하며, 생성된 이미지의 상업적 사용 권한은 플랜에 따라 제공됩니다. Pro 이상 플랜에서는 생성 이미지의 저작권이 사용자에게 귀속됩니다.",
    },
    {
      question: "업무 자동화는 코딩 없이 설정할 수 있나요?",
      answer:
        "네. 비주얼 워크플로 빌더로 드래그 앤 드롭만으로 자동화를 구성할 수 있습니다. 고급 사용자를 위해 Webhook과 API 연동도 지원합니다.",
    },
    {
      question: "세 가지 기능을 함께 사용할 수 있나요?",
      answer:
        "챗봇 대화 중 이미지를 생성하고, 그 결과를 자동화 워크플로에 연결하는 등 세 기능이 하나의 플랫폼에서 자연스럽게 연동됩니다.",
    },
    {
      question: "무료 체험 기간과 요금제는 어떻게 되나요?",
      answer:
        "14일 무료 체험으로 모든 핵심 기능을 사용할 수 있습니다. 체험 후 Starter(무료), Pro, Enterprise 플랜 중 선택할 수 있으며, 신용카드 없이 시작할 수 있습니다.",
    },
  ],
  cta: {
    badge: "500+ 팀이 Nexus AI를 선택했습니다",
    lines: [
      { text: "한 단계 더 높이,", accent: false },
      { text: "지금 도전하세요.", accent: true },
    ],
    body: "챗봇 · 이미지 · 자동화를 한 플랫폼에서. 설정은 5분, 팀 전체가 바로 협업할 수 있습니다.",
    primary: "무료 체험 시작하기",
    secondary: "영업팀 문의",
    trustLabel: "신뢰 배지",
    trust: ["14일 무료", "신용카드 불필요", "한국어 완벽 지원"],
  },
  footer: {
    blurb: "AI 챗봇, 이미지 생성, 업무 자동화를 하나의 플랫폼에서. 팀의 생산성을 한 단계 끌어올리세요.",
    home: "/",
    columns: [
      {
        title: "제품",
        links: [
          { label: "기능", href: "#features" },
          { label: "요금제", href: "#pricing" },
          { label: "변경 로그", href: "#" },
          { label: "문서", href: "#" },
        ],
      },
      {
        title: "회사",
        links: [
          { label: "소개", href: "#" },
          { label: "블로그", href: "#" },
          { label: "채용", href: "#" },
          { label: "문의", href: "#" },
        ],
      },
      {
        title: "법적고지",
        links: [
          { label: "개인정보처리방침", href: "#" },
          { label: "이용약관", href: "#" },
          { label: "보안", href: "#" },
        ],
      },
    ],
  },
  heroDemo: {
    prompt: "미니멀 SaaS 히어로 배너 만들어줘",
    generating: "이미지 생성 중...",
    result: "생성 결과",
    empty: "프롬프트를 입력하세요",
    placeholder: "프롬프트 입력...",
  },
  preview: {
    file: "주간_마케팅_보고서.pdf",
    done: "완료",
    week: "2026년 7월 1주차 핵심 지표",
    metrics: [
      { label: "전환율", value: "+18%" },
      { label: "CTR", value: "4.2%" },
      { label: "ROAS", value: "3.1x" },
    ],
    bullets: ["유료 광고 채널 ROAS 상승", "이메일 캠페인 CTR 개선", "랜딩 페이지 전환율 +18%"],
    bannerA: "업무를 자동화하는",
    bannerB: "AI 워크스페이스",
    bannerStart: "시작하기",
    bannerMore: "더 알아보기",
    attendees: ["김", "이", "박", "최", "정"],
    meeting: "팀 주간 미팅",
    when: "내일 오전 10:00 – 11:00",
    meet: "Google Meet · 화상 회의",
    invited: "참석자 5명 · 초대 발송됨",
    sent: "✓ 캘린더 초대 전송 완료",
  },
  workspace: {
    tabs: ["챗봇", "이미지", "자동화"],
    flow: ["보고서 생성", "슬랙 전송", "완료"],
    justNow: "방금 · 완료",
    thinking: "AI가 결과를 생성하는 중...",
    resultLabel: "생성 결과",
    emptyA: "프롬프트를 입력하면",
    emptyB: "결과가 여기에 표시됩니다",
    placeholder: "메시지 입력...",
    previewTitle: "생성물 미리보기",
    justGenerated: "방금 생성됨",
    generating: "생성 중...",
    preview: "미리보기",
    demos: [
      {
        prompt: "이번 주 마케팅 보고서 요약해줘",
        response: "마케팅 보고서를 생성했습니다.",
        detail: "PDF · 핵심 지표 3종 · 주간 차트 포함",
        type: "report" as const,
      },
      {
        prompt: "미니멀 SaaS 히어로 배너 만들어줘",
        response: "히어로 배너 이미지를 생성했습니다.",
        detail: "PNG 4K · 미니멀 · 블루-퍼플 그라데이션",
        type: "image" as const,
      },
      {
        prompt: "내일 팀 미팅 일정 잡아줘",
        response: "캘린더 초대를 보냈습니다.",
        detail: "Google Meet · 참석자 5명 · 내일 10:00",
        type: "calendar" as const,
      },
    ],
  },
};

const enCopy: typeof koCopy = {
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
    switchLabel: "KO",
    switchHref: "/",
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
  integrations: {
    kicker: "Integrations & partners",
    body: "Connect Slack, Notion, GitHub, and the rest of your stack to the Nexus AI hub.",
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

export const copy = { ko: koCopy, en: enCopy };
export type Copy = typeof koCopy;

export function formatStat(kind: "chat" | "images" | "saved" | "teams", n: number, locale: Locale) {
  if (kind === "saved") return `${Math.round(n)}%`;
  if (kind === "teams") return `${Math.round(n)}+`;
  if (locale === "ko") {
    if (kind === "chat") return `${Math.round(n / 10_000_000) / 10}억+`;
    return `${Math.round(n / 100_000) / 10}만+`;
  }
  return `${Math.round(n / 1_000_000)}M+`;
}
