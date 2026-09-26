# Abhilash B N V S — Software Engineer

An immersive, responsive portfolio for software engineering, data systems, and applied AI work. Built with Next.js App Router, TypeScript, React Three Fiber, Three.js, and Motion.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Optional personal assets

- Profile portrait: add your image at `public/images/profile.jpg`. A styled fallback is shown if it is absent.
- Resume: add your PDF at `public/resume/Abhilash-B-N-V-S-Resume.pdf`. The download link appears only when this file is available.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy to Vercel

Import the repository into Vercel and use the default Next.js build configuration. No environment variables or backend services are required. The project can also be built locally with `npm run build`.

## Architecture

- `app/`: App Router entry, metadata, and global styles.
- `components/portfolio-experience.tsx`: accessible content, section navigation, and scroll journey controller.
- `components/three/`: client-only, low-cost procedural WebGL scene and fallback visuals.
- `data/`: structured profile, experience, project, skill, education, and navigation content.
- `lib/motion/`: shared section navigation and normalized scroll progress utilities.

The 3D scene is an ambient visual layer; all portfolio content remains semantic HTML and available without it. Reduced-motion preferences disable continuous scene motion and smooth scrolling.
