# AI Concept Explainer – JEE / NEET

An AI-powered web application that helps JEE and NEET students understand concepts clearly through **step-by-step explanations, worked examples, misconceptions, and practice MCQs**.

This project demonstrates **AI integration, prompt engineering, clean frontend architecture, and thoughtful UX**.

---

## 🚀 Features

- **Subject-aware explanations**
  - Supports **Physics, Chemistry, and Biology**
- **Difficulty control**
  - Basic (intuitive explanations)
  - Advanced (exam-oriented depth)
- **AI-generated concept breakdown**
  - Clear introduction, key points, and summary
- **Worked numerical examples**
  - Given → Steps → Final Answer
- **Common misconceptions**
  - Explains *why students are wrong* and *what is correct*
- **Interactive MCQs**
  - Instant feedback (correct / wrong)
  - Explanation for each option
- **Re-explain in simpler words**
  - Allows iterative learning
- **LaTeX math rendering**
  - Powered by KaTeX
- **Robust AI handling**
  - Safe JSON parsing
  - Graceful error handling

---

## 🧠 Why This Project?

Many students struggle not because of lack of formulas, but because of:
- Poor conceptual clarity
- Uncorrected misconceptions
- Lack of guided practice

This app behaves like a **digital tutor**, not just a content generator.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **KaTeX** (math rendering)

### Backend / AI
- **Next.js API Routes**
- **OpenRouter (GPT-4o-mini)**  
  *(Gemini compatible architecture)*
- **Prompt engineering with strict JSON contracts**

### Deployment
- **Vercel**
🔗 Live Demo: https://my-en1hoeoh5-latishdev-gmailcoms-projects.vercel.app/




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
