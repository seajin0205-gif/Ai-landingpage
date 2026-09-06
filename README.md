# Nexus AI Landing Page

Nexus AI 랜딩 페이지입니다. AI 챗봇, 이미지 생성, 업무 자동화를 소개하는 Next.js 사이트입니다.

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 프로젝트 구조

```
app/                 # Next.js App Router (페이지, 레이아웃, 글로벌 스타일)
components/
  sections/          # 랜딩 섹션 (Hero, Features, Pricing 등)
  effects/           # 데모 UI, 배경, 차트
  layout/            # 공통 레이아웃
  motion/            # 스크롤/모션 훅
  ui/                # 버튼, 로고, 아이콘
public/              # 정적 자산 (로고)
portfolio/           # UX 케이스 스터디 (정적 HTML)
```

## 스크립트

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
npm run lint     # ESLint
```
