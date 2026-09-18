"use client";

import { useMemo, useState } from "react";
import { actions, questions } from "./data";

const dates = [
  {
    value: "2026-09-21",
    label: "Monday, 21 Sep 2026",
  },
  {
    value: "2026-09-22",
    label: "Tuesday, 22 Sep 2026",
  },
  {
    value: "2026-09-23",
    label: "Wednesday, 23 Sep 2026",
  },
  {
    value: "2026-09-24",
    label: "Thursday, 24 Sep 2026",
  },
  {
    value: "2026-09-25",
    label: "Friday, 25 Sep 2026",
  },
];

function ActionCard({ action }) {
  const [showSources, setShowSources] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {action.title}
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            {action.deadline}
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            action.status === "COMPLETED"
              ? "bg-green-50 text-green-700"
              : action.status === "NEEDS_CLARIFICATION"
              ? "bg-amber-50 text-amber-700"
              : action.status === "SCHEDULED"
              ? "bg-blue-50 text-blue-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {action.status.replaceAll("_", " ")}
        </span>
      </div>

      <div className="mt-3 grid gap-2 text-sm">
        <div>
          <span className="font-medium text-slate-700">Owner: </span>
          <span className="text-slate-600">
            {action.owner || "Unclear"}
          </span>
        </div>

        <div>
          <span className="font-medium text-slate-700">People: </span>
          <span className="text-slate-600">
            {action.relatedPeople.join(", ")}
          </span>
        </div>
      </div>

      <button
        onClick={() => setShowSources(!showSources)}
        className="mt-3 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        {showSources ? "Hide sources" : "View sources"}
      </button>

      {showSources && (
        <div className="mt-3 rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Evidence
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-700">
            {action.evidence}
          </p>

          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sources
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            {action.sources.map((source) => (
              <span
                key={source}
                className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600 ring-1 ring-slate-200"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("2026-09-23");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const currentDate = dates.find(
    (date) => date.value === selectedDate
  );

  const myActions = useMemo(
    () =>
      actions.filter(
        (action) =>
          action.category === "MY_ACTION" &&
          action.status !== "COMPLETED"
      ),
    []
  );

  const waitingOnOthers = useMemo(
    () =>
      actions.filter(
        (action) => action.category === "WAITING_ON_OTHERS"
      ),
    []
  );

  const needsAttention = useMemo(
    () =>
      actions.filter(
        (action) => action.category === "UNCLEAR_OWNERSHIP"
      ),
    []
  );

  const completed = useMemo(
    () =>
      actions.filter(
        (action) =>
          action.category === "COMPLETED" ||
          action.status === "COMPLETED"
      ),
    []
  );

  const overdue = useMemo(
    () =>
      actions.filter(
        (action) =>
          action.status !== "COMPLETED" &&
          action.date < selectedDate
      ),
    [selectedDate]
  );

  const dueToday = useMemo(
    () =>
      actions.filter(
        (action) =>
          action.date === selectedDate &&
          action.status !== "COMPLETED"
      ),
    [selectedDate]
  );

  const upcoming = useMemo(
    () =>
      actions.filter(
        (action) =>
          action.date > selectedDate &&
          action.status !== "COMPLETED"
      ),
    [selectedDate]
  );

  async function askAgent(selectedQuestion) {
    const currentQuestion = selectedQuestion || question;

    if (!currentQuestion.trim()) {
      return;
    }

    setQuestion(currentQuestion);
    setAnswer("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
          actions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAnswer(data.error || "Unable to generate an AI response.");
        return;
      }

      const cleanAnswer = (data.answer || "")
      .replace(/\*\*/g, "")
      .replace(/^#+\s*/gm, "")
      .trim();

    setAnswer(cleanAnswer || "Gemini returned an empty response.");
    } catch (error) {
      setAnswer("Unable to connect to the AI service.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    askAgent();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Executive Productivity Agent
              </p>

              <h1 className="mt-1 text-2xl font-semibold text-slate-950">
                Good morning, Arjun
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                VP Sales · Exercise period 21–25 Sep 2026
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Daily Brief Date
              </label>

              <select
                value={selectedDate}
                onChange={(event) =>
                  setSelectedDate(event.target.value)
                }
                className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-slate-500"
              >
                {dates.map((date) => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              My Actions
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {myActions.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Waiting on Others
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {waitingOnOthers.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Needs Attention
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {needsAttention.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Completed
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {completed.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Overdue
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {overdue.length}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Today’s Action Brief
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {currentDate?.label}
            </p>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Due Today
            </h3>

            <div className="mt-3 grid gap-3">
              {dueToday.length > 0 ? (
                dueToday.map((action) => (
                  <ActionCard key={action.id} action={action} />
                ))
              ) : (
                <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                  No actions are due today.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-900">
              Upcoming
            </h3>

            <div className="mt-3 grid gap-3">
              {upcoming.length > 0 ? (
                upcoming.map((action) => (
                  <ActionCard key={action.id} action={action} />
                ))
              ) : (
                <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                  No upcoming actions.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Needs Attention
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Items where the agent cannot safely determine ownership.
          </p>

          <div className="mt-4 grid gap-3">
            {needsAttention.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Ask the Agent
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Ask about commitments and open items.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-4 flex gap-2"
          >
            <input
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              placeholder="Ask a question about the executive's actions..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Asking..." : "Ask"}
            </button>
          </form>

          <div className="mt-3 grid gap-2">
            {questions.map((item) => (
              <button
                key={item}
                onClick={() => askAgent(item)}
                disabled={loading}
                className="rounded-lg bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed"
              >
                {item}
              </button>
            ))}
          </div>

          {answer && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Agent Answer
              </p>

              <div className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                {answer}
              </div>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Source Coverage
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Input sources used by the agent
          </p>

          <div className="mt-4 grid gap-2">
            {[
              {
                name: "Meeting Transcript",
                description:
                  "Used to identify commitments, discussions, and ownership statements made during meetings.",
              },
              {
                name: "Calendars",
                description:
                  "Used to confirm scheduled meetings, dates, and times.",
              },
              {
                name: "Email Threads",
                description:
                  "Used to track deadline changes, confirmations, completed items, and ownership context.",
              },
              {
                name: "Voice Note Transcripts",
                description:
                  "Used to capture additional executive context, reminders, and uncertainty around commitments.",
              },
            ].map((source) => (
              <details
                key={source.name}
                className="group rounded-lg bg-slate-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm text-slate-700">
                  <span>{source.name}</span>
                  <span className="text-slate-400 group-open:hidden">
                    +
                  </span>
                  <span className="hidden text-slate-400 group-open:block">
                    −
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-4 py-3 text-sm leading-6 text-slate-600">
                  {source.description}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Exercise Period
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monday, 21 Sep 2026 to Friday, 25 Sep 2026
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            The agent consolidates executive commitments, deadlines,
            ownership, calendar events, email updates, meeting
            information, and voice note context into one daily action
            brief.
          </p>
        </section>
      </div>
    </main>
  );
}