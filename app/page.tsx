"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bike,
  CircleDot,
  Dumbbell,
  Flag,
  Footprints,
  Heart,
  Mountain,
  PersonStanding,
  Shell,
  Sparkles,
  UsersRound,
  Waves
} from "lucide-react";

const activities = [
  { name: "Running", hook: "Easy loops, steady starts.", icon: "run" },
  { name: "Walking", hook: "Fresh air without the pressure.", icon: "walk" },
  { name: "Golf", hook: "Friendly rounds and beginner energy.", icon: "golf" },
  { name: "Padel", hook: "Find a partner before you book.", icon: "padel" },
  { name: "Tennis", hook: "Rallies, lessons, weekend hits.", icon: "tennis" },
  { name: "Pilates", hook: "Try a class with someone new.", icon: "pilates" },
  { name: "Yoga", hook: "Slow mornings and strong resets.", icon: "yoga" },
  { name: "Strength", hook: "Gym confidence, shared.", icon: "strength" },
  { name: "Cycling", hook: "Coffee spins and city routes.", icon: "cycling" },
  { name: "Swimming", hook: "Lanes, dips, and sea mornings.", icon: "swimming" },
  { name: "Ballet & Dance", hook: "Move for joy, not perfection.", icon: "dance" },
  { name: "Hiking", hook: "Trail days with women nearby.", icon: "hiking" }
];

const areas = [
  "D1",
  "D2",
  "D4",
  "D6",
  "D7",
  "D8",
  "D9",
  "D12",
  "Rathmines",
  "Ranelagh",
  "Drumcondra",
  "Clontarf",
  "Sandymount",
  "Blackrock",
  "other"
];

const stats = [
  {
    value: "90%",
    text: "of women at Dublin's biggest women's social club arrive alone",
    source: "Source: community onboarding survey"
  },
  {
    value: "28,000",
    text: "women sold out the 2025 Women's Mini Marathon",
    source: "Source: Vhi Women's Mini Marathon 2025"
  },
  {
    value: "59%",
    text: "of women who tried Golf Ireland's beginner program came back",
    source: "Source: Golf Ireland beginner participation reporting"
  }
];

const steps = [
  { icon: "heart", text: "Tell us what you love (or want to try)" },
  { icon: "match", text: "We match you with women near you" },
  { icon: "show", text: "Show up together" }
];

type SubmissionState = "idle" | "loading" | "success" | "error";

function Icon({ type }: { type: string }) {
  const icons = {
    run: Footprints,
    walk: PersonStanding,
    golf: Flag,
    padel: CircleDot,
    tennis: CircleDot,
    pilates: Shell,
    yoga: Sparkles,
    strength: Dumbbell,
    cycling: Bike,
    swimming: Waves,
    dance: Sparkles,
    hiking: Mountain,
    heart: Heart,
    match: UsersRound,
    show: Mountain
  };
  const LucideIcon = icons[type as keyof typeof icons] ?? Sparkles;

  return <LucideIcon aria-hidden="true" className="h-8 w-8" strokeWidth={1.7} />;
}

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full border-2 border-clay bg-cream text-clay ${
        small ? "h-12 w-12" : "h-24 w-24"
      }`}
      aria-hidden="true"
    >
      <svg
        className={small ? "h-7 w-7" : "h-14 w-14"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
        viewBox="0 0 48 48"
      >
        <circle cx="12" cy="21" r="4" />
        <circle cx="36" cy="21" r="4" />
        <circle cx="24" cy="12" r="4" />
        <path d="M12 27c4 8 20 8 24 0" />
        <path d="M24 29c-4-5-9-4-9 1 0 4 5 6 9 10 4-4 9-6 9-10 0-5-5-6-9-1Z" />
      </svg>
    </div>
  );
}

export default function Home() {
  const activityScrollRef = useRef<HTMLDivElement>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");
  const { scrollYProgress: activityProgress } = useScroll({
    target: activityScrollRef,
    offset: ["start start", "end end"]
  });
  const activityX = useTransform(activityProgress, [0, 1], ["0%", "-68%"]);

  const selectedText = useMemo(() => {
    if (selectedActivities.length === 0) return "Pick at least one activity";
    return selectedActivities.join(", ");
  }, [selectedActivities]);

  function toggleActivity(activity: string) {
    setSelectedActivities((current) =>
      current.includes(activity) ? current.filter((item) => item !== activity) : [...current, activity]
    );
  }

  function openJoinModal() {
    setSubmissionState("idle");
    setError("");
    setModalOpen(true);
  }

  async function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmissionState("loading");
    setError("");

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.get("firstName"),
        email: formData.get("email"),
        area: formData.get("area"),
        activities: selectedActivities
      })
    });

    if (!response.ok) {
      setSubmissionState("error");
      setError("Something did not save. Check the fields and try again.");
      return;
    }

    setSubmissionState("success");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-oat text-charcoal">
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-charcoal/10 bg-oat/88 px-4 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a className="flex items-center gap-3 text-charcoal" href="#top" aria-label="Cailíní home">
            <BrandMark small />
            <span className="script-wordmark text-4xl leading-none">Cailíní</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-cocoa md:flex">
            <a href="#activities">Activities</a>
            <a href="#how">How it works</a>
            <a href="#why">Why now</a>
          </div>
          <button
            className="motion-press rounded-full bg-clay px-5 py-2.5 text-sm font-bold text-cream shadow-soft transition hover:bg-coral"
            type="button"
            onClick={openJoinModal}
          >
            Join
          </button>
        </div>
      </nav>

      <section
        id="top"
        className="pinstripe relative flex min-h-screen items-center px-4 pb-16 pt-28 md:px-8"
      >
        <div className="organic-blob absolute -right-24 top-28 h-72 w-72 bg-coral/14 md:h-[34rem] md:w-[34rem]" />
        <div className="organic-blob absolute -bottom-24 left-6 h-56 w-56 bg-clay/8 md:h-80 md:w-80" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            className="max-w-5xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-sangria">Coming to Dublin first</p>
            <h1 className="font-display text-[clamp(4.2rem,12vw,10.5rem)] leading-[0.83] tracking-tight text-charcoal">
              Find your women. Start moving.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-cocoa md:text-2xl">
              Whatever the activity. Whatever your level. Just show up together.
            </p>
            <button
              className="motion-press mt-10 rounded-full bg-clay px-8 py-4 text-base font-bold text-cream shadow-soft transition hover:bg-coral"
              type="button"
              onClick={openJoinModal}
            >
              Join the waitlist
            </button>
          </motion.div>
        </div>
      </section>

      <section id="activities" ref={activityScrollRef} className="relative h-[320vh] bg-oat">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 py-20 md:px-8">
          <div className="absolute left-4 top-24 z-10 max-w-7xl md:left-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-sangria">Activity selector</p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">What moves you?</h2>
            <p className="mt-4 max-w-sm text-cocoa">{selectedText}</p>
          </div>

          <motion.div className="flex gap-5 pt-44 md:pt-36" style={{ x: activityX }}>
            {activities.map((activity) => {
              const selected = selectedActivities.includes(activity.name);
              return (
                <motion.button
                  key={activity.name}
                  className={`motion-press group flex h-[340px] w-[min(78vw,360px)] shrink-0 flex-col justify-between rounded-[1.6rem] border p-6 text-left shadow-soft transition md:h-[390px] md:w-[420px] ${
                    selected
                      ? "border-clay bg-clay text-cream"
                      : "border-charcoal/10 bg-cream text-charcoal hover:border-clay/60"
                  }`}
                  type="button"
                  onClick={() => toggleActivity(activity.name)}
                  whileHover={{ y: -8, rotate: selected ? 0 : -1.5 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div>
                    <div
                      className={`mb-12 inline-flex rounded-full border p-3 ${
                        selected ? "border-cream/50 text-cream" : "border-clay/30 text-clay"
                      }`}
                    >
                      <Icon type={activity.icon} />
                    </div>
                    <h3 className="font-display text-5xl leading-none md:text-6xl">{activity.name}</h3>
                  </div>
                  <p className={`text-lg leading-7 ${selected ? "text-cream/80" : "text-cocoa"}`}>{activity.hook}</p>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <motion.section
        id="how"
        className="border-y border-charcoal/10 bg-cream px-4 py-20 md:px-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 font-display text-5xl leading-none md:text-7xl">How it works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <motion.article
                key={step.text}
                className="rounded-[1.5rem] border border-charcoal/10 bg-oat p-7 shadow-soft"
                whileHover={{ y: -6 }}
              >
                <span className="mb-16 inline-flex h-12 w-12 items-center justify-center rounded-full bg-clay text-cream">
                  <Icon type={step.icon} />
                </span>
                <p className="text-xl font-bold leading-7">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="why"
        className="bg-mist px-4 py-20 md:px-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-sangria">Why it exists</p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">Most people just need a first person.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {stats.map((stat) => (
              <motion.article key={stat.value} className="rounded-[1.5rem] bg-oat p-7 shadow-soft" whileHover={{ y: -6 }}>
                <p className="font-display text-6xl text-clay md:text-7xl">{stat.value}</p>
                <p className="mt-5 text-xl font-bold leading-7">{stat.text}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-cocoa/70">{stat.source}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <footer className="px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-charcoal/10 pt-8 text-sm text-cocoa md:flex-row md:items-center md:justify-between">
          <p className="script-wordmark text-4xl leading-none text-charcoal">Cailíní</p>
          <p>Coming to Dublin first</p>
          <a href="#" aria-label="Instagram placeholder">
            Instagram
          </a>
          <a href="#" aria-label="Privacy notice placeholder">
            Privacy notice
          </a>
        </div>
      </footer>

      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-charcoal/35 px-4 py-8 backdrop-blur-sm">
          <motion.div
            className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-[2rem] bg-cream p-6 shadow-soft md:p-8"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24 }}
          >
            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-sangria">Waitlist</p>
                <h2 className="font-display text-4xl leading-none md:text-5xl">Save your spot</h2>
              </div>
              <button
                className="motion-press rounded-full border border-charcoal/15 px-4 py-2 font-bold text-charcoal"
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>

            {submissionState === "success" ? (
              <div className="rounded-[1.5rem] bg-oat p-7">
                <p className="font-display text-4xl text-sangria">You&apos;re in.</p>
                <p className="mt-4 text-lg text-cocoa">We&apos;ll be in touch when we launch in your area.</p>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={submitWaitlist}>
                <label className="grid gap-2 font-bold">
                  First name
                  <input
                    className="rounded-2xl border border-charcoal/15 bg-oat px-4 py-3 font-normal outline-none transition focus:border-clay"
                    name="firstName"
                    required
                  />
                </label>
                <label className="grid gap-2 font-bold">
                  Email
                  <input
                    className="rounded-2xl border border-charcoal/15 bg-oat px-4 py-3 font-normal outline-none transition focus:border-clay"
                    name="email"
                    required
                    type="email"
                  />
                </label>
                <label className="grid gap-2 font-bold">
                  Neighbourhood / area
                  <select
                    className="rounded-2xl border border-charcoal/15 bg-oat px-4 py-3 font-normal outline-none transition focus:border-clay"
                    name="area"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose area
                    </option>
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <p className="mb-3 font-bold">Activities</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {activities.map((activity) => {
                      const selected = selectedActivities.includes(activity.name);
                      return (
                        <button
                          key={activity.name}
                          className={`motion-press rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                            selected
                              ? "border-clay bg-clay text-cream"
                              : "border-charcoal/15 bg-oat text-charcoal"
                          }`}
                          type="button"
                          onClick={() => toggleActivity(activity.name)}
                        >
                          {activity.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {error && <p className="rounded-2xl bg-clay/10 px-4 py-3 text-sm font-bold text-clay">{error}</p>}

                <button
                  className="motion-press rounded-full bg-clay px-7 py-4 font-bold text-cream shadow-soft transition hover:bg-coral disabled:opacity-60"
                  disabled={submissionState === "loading" || selectedActivities.length === 0}
                  type="submit"
                >
                  {submissionState === "loading" ? "Saving..." : "Save my spot"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
}
