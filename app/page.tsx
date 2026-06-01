"use client";

import { FormEvent, useMemo, useState } from "react";

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

type SubmissionState = "idle" | "loading" | "success" | "error";

function Icon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    run: (
      <>
        <path d="M13 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
        <path d="m8 23 3-7-3-3-2 3H3l3-6 4-2 4 4 3 1h4v3h-5l-3-1 2 4 4 4h-4l-4-4-2 4H8Z" />
      </>
    ),
    walk: (
      <>
        <path d="M13 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
        <path d="m10 23 2-7-3-3-3 3" />
        <path d="m11 10 4 4 4 1" />
        <path d="m13 16 4 7" />
      </>
    ),
    golf: (
      <>
        <path d="M6 22h12" />
        <path d="M12 22V4" />
        <path d="M12 4h7l-2 3 2 3h-7" />
        <circle cx="17" cy="18" r="1.5" />
      </>
    ),
    padel: (
      <>
        <path d="M15.5 4.5c3 3 3.4 7.5.9 10s-7 2.1-10-.9-3.4-7.5-.9-10 7-2.1 10 .9Z" />
        <path d="m14.5 14.5 6 6" />
        <path d="m19 22 3-3" />
      </>
    ),
    tennis: (
      <>
        <path d="M15.5 4.5c3 3 3.4 7.5.9 10s-7 2.1-10-.9-3.4-7.5-.9-10 7-2.1 10 .9Z" />
        <path d="M5.5 3.5 16.5 14.5" />
        <path d="M4 8h14" />
      </>
    ),
    pilates: (
      <>
        <path d="M4 17c5-4 11-4 16 0" />
        <path d="M6 21h12" />
        <path d="M12 5v8" />
        <path d="M8 9h8" />
      </>
    ),
    yoga: (
      <>
        <path d="M12 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
        <path d="M4 19c4-5 12-5 16 0" />
        <path d="m8 13 4 3 4-3" />
      </>
    ),
    strength: (
      <>
        <path d="M2 10h4v4H2z" />
        <path d="M18 10h4v4h-4z" />
        <path d="M6 8h3v8H6z" />
        <path d="M15 8h3v8h-3z" />
        <path d="M9 12h6" />
      </>
    ),
    cycling: (
      <>
        <circle cx="6" cy="17" r="4" />
        <circle cx="18" cy="17" r="4" />
        <path d="m6 17 5-8 3 8H6l5-8h4" />
      </>
    ),
    swimming: (
      <>
        <path d="M3 17c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1" />
        <path d="M3 21c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1" />
        <path d="m8 13 4-7 5 3" />
      </>
    ),
    dance: (
      <>
        <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
        <path d="M7 22c3-4 4-8 3-12" />
        <path d="M14 10c2 3 3 7 3 12" />
        <path d="m8 13 8-2" />
      </>
    ),
    hiking: (
      <>
        <path d="m3 21 7-12 4 6 3-5 4 11H3Z" />
        <path d="M10 9 8 5" />
        <path d="M8 5h5" />
      </>
    )
  };

  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {paths[type]}
    </svg>
  );
}

export default function Home() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");

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
          <a className="font-display text-2xl text-charcoal" href="#top" aria-label="Tee Party home">
            Tee Party
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-cocoa md:flex">
            <a href="#activities">Activities</a>
            <a href="#how">How it works</a>
            <a href="#why">Why now</a>
          </div>
          <button
            className="rounded-full bg-clay px-5 py-2.5 text-sm font-bold text-cream shadow-soft transition hover:bg-coral"
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
        <div className="organic-blob absolute -right-24 top-28 h-72 w-72 bg-coral/16 md:h-[34rem] md:w-[34rem]" />
        <div className="organic-blob absolute -bottom-24 left-6 h-56 w-56 bg-clay/10 md:h-80 md:w-80" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-sangria">Coming to Dublin first</p>
            <h1 className="font-display text-[clamp(4.2rem,12vw,10.5rem)] leading-[0.83] tracking-tight text-charcoal">
              Find your women. Start moving.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-cocoa md:text-2xl">
              Whatever the activity. Whatever your level. Just show up together.
            </p>
            <button
              className="mt-10 rounded-full bg-clay px-8 py-4 text-base font-bold text-cream shadow-soft transition hover:bg-coral"
              type="button"
              onClick={openJoinModal}
            >
              Join the waitlist
            </button>
          </div>
          <div className="rounded-[2rem] border border-charcoal/10 bg-cream/78 p-6 shadow-soft backdrop-blur">
            <p className="font-display text-5xl leading-none text-clay">Dublin, then everywhere.</p>
            <p className="mt-5 text-cocoa">
              A calm way to find women nearby for the sports and activities you keep meaning to start.
            </p>
          </div>
        </div>
      </section>

      <section id="activities" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-sangria">Activity selector</p>
              <h2 className="font-display text-5xl leading-none md:text-7xl">What moves you?</h2>
            </div>
            <p className="max-w-sm text-cocoa">{selectedText}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity) => {
              const selected = selectedActivities.includes(activity.name);
              return (
                <button
                  key={activity.name}
                  className={`group rounded-[1.4rem] border p-5 text-left shadow-soft transition ${
                    selected
                      ? "border-clay bg-clay text-cream"
                      : "border-charcoal/10 bg-cream text-charcoal hover:border-clay/60"
                  }`}
                  type="button"
                  onClick={() => toggleActivity(activity.name)}
                >
                  <div
                    className={`mb-7 inline-flex rounded-full border p-3 ${
                      selected ? "border-cream/50 text-cream" : "border-clay/30 text-clay"
                    }`}
                  >
                    <Icon type={activity.icon} />
                  </div>
                  <h3 className="text-lg font-bold">{activity.name}</h3>
                  <p className={`mt-2 text-sm ${selected ? "text-cream/80" : "text-cocoa"}`}>{activity.hook}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how" className="border-y border-charcoal/10 bg-cream px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 font-display text-5xl leading-none md:text-7xl">How it works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "Tell us what you love (or want to try)"],
              ["02", "We match you with women near you"],
              ["03", "Show up together"]
            ].map(([number, text]) => (
              <article key={number} className="rounded-[1.5rem] border border-charcoal/10 bg-oat p-7 shadow-soft">
                <span className="mb-16 inline-flex h-12 w-12 items-center justify-center rounded-full bg-clay font-display text-xl text-cream">
                  {number}
                </span>
                <p className="text-xl font-bold leading-7">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="bg-mist px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-sangria">Why it exists</p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">Most people just need a first person.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {stats.map((stat) => (
              <article key={stat.value} className="rounded-[1.5rem] bg-oat p-7 shadow-soft">
                <p className="font-display text-6xl text-clay md:text-7xl">{stat.value}</p>
                <p className="mt-5 text-xl font-bold leading-7">{stat.text}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-cocoa/70">{stat.source}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-charcoal/10 pt-8 text-sm text-cocoa md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl text-charcoal">Tee Party</p>
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
          <div className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-[2rem] bg-cream p-6 shadow-soft md:p-8">
            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-sangria">Waitlist</p>
                <h2 className="font-display text-4xl leading-none md:text-5xl">Save your spot</h2>
              </div>
              <button
                className="rounded-full border border-charcoal/15 px-4 py-2 font-bold text-charcoal"
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
                    className="rounded-2xl border border-charcoal/15 bg-oat px-4 py-3 font-normal outline-none focus:border-clay"
                    name="firstName"
                    required
                  />
                </label>
                <label className="grid gap-2 font-bold">
                  Email
                  <input
                    className="rounded-2xl border border-charcoal/15 bg-oat px-4 py-3 font-normal outline-none focus:border-clay"
                    name="email"
                    required
                    type="email"
                  />
                </label>
                <label className="grid gap-2 font-bold">
                  Neighbourhood / area
                  <select
                    className="rounded-2xl border border-charcoal/15 bg-oat px-4 py-3 font-normal outline-none focus:border-clay"
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
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
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
                  className="rounded-full bg-clay px-7 py-4 font-bold text-cream shadow-soft transition hover:bg-coral disabled:opacity-60"
                  disabled={submissionState === "loading" || selectedActivities.length === 0}
                  type="submit"
                >
                  {submissionState === "loading" ? "Saving..." : "Save my spot"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
