"use client";

import { FormEvent, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Dumbbell, Flag, Footprints, Goal, Mail, Shell, Sparkles, Waves } from "lucide-react";

const moments = [
  {
    eyebrow: "First tee",
    line: "Golf without the awkward first tee.",
    detail: "Find women who want the same pace, pressure, and post-round chat.",
    object: "golf"
  },
  {
    eyebrow: "Actual plans",
    line: "Pilates plans that make it out of the group chat.",
    detail: "Turn the class you keep meaning to book into something you show up for.",
    object: "pilates"
  },
  {
    eyebrow: "Nearby",
    line: "Walks, runs and socials with women nearby.",
    detail: "Small starts. Familiar streets. No waiting for someone else to organise it.",
    object: "run"
  },
  {
    eyebrow: "Beginner energy",
    line: "No pressure. No showing up alone.",
    detail: "Try the sport, class, or route without needing to already be good at it.",
    object: "thread"
  },
  {
    eyebrow: "Real life",
    line: "Built for real routines, real energy, and how you actually feel.",
    detail: "For the girlies who want movement to feel social, safe, and possible.",
    object: "strength"
  }
];

type SubmitState = "idle" | "loading" | "success" | "error";

function BrandMark() {
  return (
    <a className="flex items-center gap-3 text-charcoal" href="#top" aria-label="Cailíní home">
      <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-clay bg-cream text-clay">
        <Sparkles aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span className="script-wordmark text-4xl leading-none">Cailíní</span>
    </a>
  );
}

function TopNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-clay/15 bg-cream/82 px-4 py-3 shadow-soft backdrop-blur">
        <BrandMark />
        <WaitlistCTA compact />
      </div>
    </nav>
  );
}

function WaitlistCTA({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`motion-press rounded-full bg-clay font-bold text-cream shadow-soft transition hover:bg-coral ${
        compact ? "px-5 py-2.5 text-sm" : "inline-flex px-8 py-4 text-base"
      }`}
      href="#join"
    >
      Join waitlist
    </a>
  );
}

function MovingSportsObject({ type }: { type: string }) {
  const shared = "h-8 w-8";

  if (type === "golf") {
    return (
      <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-clay bg-cream text-clay shadow-soft">
        <Flag aria-hidden="true" className={shared} strokeWidth={1.8} />
      </div>
    );
  }

  if (type === "pilates") {
    return <div className="h-16 w-16 rounded-full border-2 border-clay bg-coral shadow-soft" />;
  }

  if (type === "run") {
    return (
      <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-clay bg-cream text-clay shadow-soft">
        <Footprints aria-hidden="true" className={shared} strokeWidth={1.8} />
      </div>
    );
  }

  if (type === "strength") {
    return (
      <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-clay bg-cream text-clay shadow-soft">
        <Dumbbell aria-hidden="true" className={shared} strokeWidth={1.8} />
      </div>
    );
  }

  return (
    <div className="relative h-16 w-16 rounded-full border-2 border-sangria bg-cream shadow-soft">
      <div className="absolute inset-3 rounded-full border-2 border-sangria" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-sangria" />
    </div>
  );
}

function RedThreadPath({ progress, objectType }: { progress: MotionValue<number>; objectType: string }) {
  const ballX = useTransform(progress, [0, 1], ["8vw", "82vw"]);
  const threadWidth = useTransform(progress, [0, 1], ["8vw", "84vw"]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 md:block">
      <div className="absolute left-[8vw] top-1/2 h-[3px] w-[84vw] -translate-y-1/2 rounded-full bg-sangria/18" />
      <motion.div
        className="absolute left-[8vw] top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-sangria"
        style={{ width: threadWidth }}
      />
      <motion.div className="absolute top-1/2 -translate-y-1/2" style={{ left: ballX }}>
        <MovingSportsObject type={objectType} />
      </motion.div>
    </div>
  );
}

function JourneyMoment({ moment, index }: { moment: (typeof moments)[number]; index: number }) {
  return (
    <section className="flex h-screen w-screen shrink-0 items-center px-6 md:px-16">
      <div className="max-w-[760px] rounded-[2rem] bg-cream/82 p-7 shadow-soft backdrop-blur md:ml-[12vw] md:p-10">
        <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-sangria">
          {String(index + 1).padStart(2, "0")} · {moment.eyebrow}
        </p>
        <h2 className="font-display text-[clamp(4rem,8vw,8.5rem)] leading-[0.84] tracking-tight text-charcoal">
          {moment.line}
        </h2>
        <p className="mt-7 max-w-xl text-xl leading-8 text-cocoa">{moment.detail}</p>
      </div>
    </section>
  );
}

function OpeningPanel() {
  return (
    <section id="top" className="flex h-screen w-screen shrink-0 items-center px-6 md:px-16">
      <motion.div
        className="max-w-[980px] rounded-[2rem] bg-cream/86 p-7 shadow-soft backdrop-blur md:ml-[6vw] md:p-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-sangria">Women-first movement</p>
        <h1 className="font-display text-[clamp(4.6rem,11vw,11rem)] leading-[0.82] tracking-tight text-charcoal">
          Never play on your own again.
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-8 text-cocoa md:text-2xl">
          Find women nearby for golf, pilates, walks, runs and beginner-friendly sport.
        </p>
        <div className="mt-10">
          <WaitlistCTA />
        </div>
      </motion.div>
    </section>
  );
}

function FinalCTA({ email, setEmail, submitState, error, onSubmit }: {
  email: string;
  setEmail: (value: string) => void;
  submitState: SubmitState;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section id="join" className="flex h-screen w-screen shrink-0 items-center justify-center px-6 md:px-16">
      <div className="w-full max-w-4xl rounded-[2rem] border border-clay/15 bg-cream/90 p-7 text-center shadow-soft backdrop-blur md:p-12">
        <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-sangria">Launching in Dublin first</p>
        <h2 className="font-display text-[clamp(4rem,9vw,9rem)] leading-[0.82] tracking-tight text-charcoal">
          Never play on your own again.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-cocoa md:text-xl">
          Cailíní is a women&apos;s sports community app for finding people nearby to play, move, and show up with.
          Starting in Dublin, it helps women connect for golf, pilates, tennis, sea swims, walks, runs, wellness
          socials, and beginner-friendly activities. Whether your friends have moved away, are too busy, or just
          aren&apos;t interested, Cailíní helps you find women near you who are up for the same things, so you never
          have to go on your own.
        </p>

        {submitState === "success" ? (
          <p className="mx-auto mt-10 max-w-xl rounded-full bg-clay px-6 py-4 font-bold text-cream">
            You&apos;re in. We&apos;ll be in touch when we launch in your area.
          </p>
        ) : (
          <form className="mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-full bg-oat p-2 shadow-soft md:flex-row" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="min-h-14 flex-1 rounded-full border border-transparent bg-cream px-5 text-charcoal outline-none transition focus:border-clay"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              className="motion-press min-h-14 rounded-full bg-clay px-7 font-bold text-cream transition hover:bg-coral disabled:opacity-60"
              disabled={submitState === "loading"}
              type="submit"
            >
              {submitState === "loading" ? "Joining..." : "Join waitlist"}
            </button>
          </form>
        )}

        {error && <p className="mt-4 font-bold text-sangria">{error}</p>}
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-cocoa/70">Launching in Dublin first.</p>
      </div>
    </section>
  );
}

function MobileJourney({ email, setEmail, submitState, error, onSubmit }: {
  email: string;
  setEmail: (value: string) => void;
  submitState: SubmitState;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="md:hidden">
      <OpeningPanel />
      <div className="relative px-6 py-12">
        <div className="absolute bottom-0 left-10 top-0 w-[3px] rounded-full bg-sangria" />
        {moments.map((moment, index) => (
          <section key={moment.line} className="relative min-h-[68vh] py-12 pl-12">
            <div className="absolute left-0 top-16">
              <MovingSportsObject type={moment.object} />
            </div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-sangria">
              {String(index + 1).padStart(2, "0")} · {moment.eyebrow}
            </p>
            <h2 className="font-display text-6xl leading-[0.85] text-charcoal">{moment.line}</h2>
            <p className="mt-5 text-lg leading-7 text-cocoa">{moment.detail}</p>
          </section>
        ))}
      </div>
      <FinalCTA email={email} setEmail={setEmail} submitState={submitState} error={error} onSubmit={onSubmit} />
    </div>
  );
}

export default function Home() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const [objectType, setObjectType] = useState("golf");
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"]
  });
  const journeyX = useTransform(scrollYProgress, [0, 1], ["0vw", "-600vw"]);
  const threadProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(moments.length - 1, Math.max(0, Math.floor(latest * moments.length)));
    setObjectType(moments[index]?.object ?? "golf");
  });

  async function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("loading");
    setError("");

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        firstName: "Cailíní friend",
        area: "other",
        activities: ["General interest"]
      })
    });

    if (!response.ok) {
      setSubmitState("error");
      setError("Something did not save. Try again in a minute.");
      return;
    }

    setSubmitState("success");
  }

  return (
    <main className="min-h-screen overflow-hidden text-charcoal">
      <TopNav />

      <div ref={journeyRef} className="relative hidden h-[720vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-cream/28" />
          <RedThreadPath progress={threadProgress} objectType={objectType} />
          <motion.div className="relative z-20 flex h-screen w-[700vw]" style={{ x: journeyX }}>
            <OpeningPanel />
            {moments.map((moment, index) => (
              <JourneyMoment key={moment.line} moment={moment} index={index} />
            ))}
            <FinalCTA email={email} setEmail={setEmail} submitState={submitState} error={error} onSubmit={submitWaitlist} />
          </motion.div>
        </div>
      </div>

      <MobileJourney email={email} setEmail={setEmail} submitState={submitState} error={error} onSubmit={submitWaitlist} />
    </main>
  );
}
