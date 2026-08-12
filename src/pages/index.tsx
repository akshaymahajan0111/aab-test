import { Helmet } from '@dr.pogodin/react-helmet';
import { RotateCcw, Settings2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { home } from 'virtual:content';

const site = 'https://countdown.example';
const pageUrl = `${site}/`;

export default function HomePage() {
  const [number, setNumber] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || number === 0) return undefined;

    const timer = window.setTimeout(() => {
      setNumber((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [isRunning, number]);

  useEffect(() => {
    if (number === 0) setIsRunning(false);
  }, [number]);

  const startCountdown = () => {
    if (number === 0) setNumber(5);
    setIsRunning(true);
  };

  const resetCountdown = () => {
    setNumber(5);
    setIsRunning(false);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${site}/#website`, name: 'Countdown', url: pageUrl },
      { '@type': 'Organization', '@id': `${site}/#organization`, name: 'Countdown', url: pageUrl },
      { '@type': 'SoftwareApplication', '@id': `${site}/#app`, name: 'Countdown', applicationCategory: 'ProductivityApplication', operatingSystem: 'Web', url: pageUrl },
      { '@type': 'WebPage', '@id': `${site}/#webpage`, name: 'Countdown — Focused Time', url: pageUrl, isPartOf: { '@id': `${site}/#website` }, about: { '@id': `${site}/#organization` }, datePublished: '2026-08-11', dateModified: '2026-08-11' },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Countdown — Focused Time</title>
        <meta name="description" content="A simple five-second countdown." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Countdown — Focused Time" />
        <meta property="og:description" content="A simple five-second countdown." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${site}/airo-assets/images/logo/primary`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Countdown — Focused Time" />
        <meta name="twitter:description" content="A simple five-second countdown." />
        <meta name="twitter:image" content={`${site}/airo-assets/images/logo/primary`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background px-5 py-5 text-foreground sm:px-8 sm:py-8">
        <div className="countdown-horizon pointer-events-none absolute inset-x-0 bottom-0 h-[38vh]" />
        <div className="countdown-orbit countdown-orbit-one pointer-events-none absolute left-1/2 top-1/2 h-[min(112vw,1120px)] w-[min(112vw,1120px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
        <div className="countdown-orbit countdown-orbit-two pointer-events-none absolute left-1/2 top-1/2 h-[min(82vw,820px)] w-[min(82vw,820px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
        <div className="countdown-orbit countdown-orbit-three pointer-events-none absolute left-1/2 top-1/2 h-[min(58vw,580px)] w-[min(58vw,580px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />

        <header className="absolute inset-x-5 top-5 z-10 flex items-center justify-between sm:inset-x-8 sm:top-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background">
              <img src="/airo-assets/images/logo/primary/dark" alt="Countdown" width="40" height="40" className="h-auto max-h-6 w-auto max-w-full object-contain" />
            </div>
            <span className="text-sm font-medium tracking-[0.16em] text-muted-foreground">COUNTDOWN</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full border border-border bg-background text-muted-foreground transition duration-200 hover:bg-muted hover:text-foreground" aria-label="Settings">
            <Settings2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </header>

        <section className="relative z-10 flex flex-col items-center text-center" aria-labelledby="countdown-title">
          <h1 id="countdown-title" className="sr-only">Simple five second countdown</h1>
          <motion.div
            key={number}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="countdown-digit font-heading text-[clamp(13rem,42vw,34rem)] font-medium leading-none tracking-[-0.08em] text-foreground"
            aria-live="polite"
          >
            {number}
          </motion.div>
          <p className="mt-8 text-sm text-muted-foreground">{number === 0 ? 'Complete.' : 'Press start when you are ready.'}</p>
          <div className="mt-8 flex items-center gap-3">
            <Button onClick={startCountdown} size="lg" className="min-w-32 rounded-xl bg-primary px-7 text-primary-foreground transition duration-200 hover:bg-primary" disabled={isRunning}>
              {isRunning ? 'Counting…' : 'Start (GitHub 17:50)'}
            </Button>
            <Button onClick={resetCountdown} variant="ghost" size="icon" className="rounded-xl border border-border bg-card text-muted-foreground transition duration-200 hover:bg-muted hover:text-foreground" aria-label="Reset countdown">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </section>

        <p className="absolute bottom-5 z-10 text-xs text-muted-foreground sm:bottom-8">{home.footer.note}</p>
      </main>
    </>
  );
}
