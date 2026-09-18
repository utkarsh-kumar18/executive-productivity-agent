export const exercisePeriod = {
  start: "2026-09-21",
  end: "2026-09-25",
};

export const briefDates = [
  {
    value: "2026-09-21",
    label: "Monday, 21 Sep",
  },
  {
    value: "2026-09-22",
    label: "Tuesday, 22 Sep",
  },
  {
    value: "2026-09-23",
    label: "Wednesday, 23 Sep",
  },
  {
    value: "2026-09-24",
    label: "Thursday, 24 Sep",
  },
  {
    value: "2026-09-25",
    label: "Friday, 25 Sep",
  },
];

export const defaultBriefDate = "2026-09-23";

export const sourceTypes = [
  "Meeting Transcript",
  "Calendars",
  "Email Threads",
  "Voice Note Transcripts",
];

export const actions = [
  {
    id: "vendor-list",
    title: "Send updated vendor list to Raghav",
    owner: "Arjun Malhotra",
    category: "MY_ACTION",
    status: "PENDING",
    commitment: true,
    deadline: "Wednesday morning",
    date: "2026-09-23",
    relatedPeople: ["Raghav Sethi"],
    sources: [
      "Meeting Transcript — Leadership Sync",
      "Email Threads — Vendor List",
      "Voice Note Transcripts — Voice Note 1",
    ],
    evidence:
      "Arjun said he would send Raghav the updated vendor list. The email thread was subsequently moved to Wednesday morning, and Raghav checked on Wednesday morning whether it was still on track.",
  },
  {
    id: "campaign-deck",
    title: "Review Q3 Campaign Deck",
    owner: "Arjun Malhotra",
    category: "MY_ACTION",
    status: "SCHEDULED",
    commitment: true,
    deadline: "Thursday, 24 Sep · 9:30 AM",
    date: "2026-09-24",
    relatedPeople: ["Neha Kapoor"],
    sources: [
      "Meeting Transcript — Leadership Sync",
      "Email Threads — Q3 Campaign Deck",
      "Calendars — Arjun Malhotra",
      "Calendars — Neha Kapoor",
    ],
    evidence:
      "The review was initially targeted for Wednesday, then moved to Thursday morning. Neha confirmed 9:30 AM Thursday and said the deck was ready ahead of the review.",
  },
  {
    id: "meridian-call",
    title: "Meridian Logistics call",
    owner: "Arjun Malhotra",
    category: "MY_ACTION",
    status: "SCHEDULED",
    commitment: true,
    deadline: "Wednesday, 23 Sep · 3:00 PM",
    date: "2026-09-23",
    relatedPeople: ["Priya Nair"],
    sources: [
      "Meeting Transcript — Leadership Sync",
      "Email Threads — Call Reschedule",
      "Calendars — Arjun Malhotra",
      "Voice Note Transcripts — Voice Note 2",
    ],
    evidence:
      "Arjun said he needed to reconfirm the new time with Priya. Priya confirmed Wednesday at 3 PM, Arjun confirmed again at 2 PM, and his calendar shows the Meridian Logistics call from 3:00–3:30 PM.",
  },
  {
    id: "expense-report",
    title: "July expense variance report",
    owner: "Divya Rao",
    category: "COMPLETED",
    status: "COMPLETED",
    commitment: false,
    deadline: "Wednesday evening",
    date: "2026-09-23",
    relatedPeople: ["Divya Rao"],
    sources: [
      "Meeting Transcript — Leadership Sync",
      "Email Threads — Expense Variance Report",
      "Voice Note Transcripts — Voice Note 2",
    ],
    evidence:
      "Arjun requested the report by Wednesday evening. Divya sent it Wednesday at 6 PM and Arjun acknowledged receiving it at 6:10 PM.",
  },
  {
    id: "lease-renewal",
    title: "Mumbai office lease renewal",
    owner: null,
    category: "UNCLEAR_OWNERSHIP",
    status: "NEEDS_CLARIFICATION",
    commitment: false,
    deadline: "Friday, 25 Sep · End of day",
    date: "2026-09-25",
    relatedPeople: ["Raghav Sethi", "Divya Rao", "Facilities"],
    sources: [
      "Meeting Transcript — Leadership Sync",
      "Email Threads — Mumbai Office Lease Renewal",
      "Voice Note Transcripts — Voice Note 1",
    ],
    evidence:
      "Raghav said it was unclear whose desk the renewal was on. Divya believed it normally sits with Facilities, while Arjun said not to assume and later said he did not think it was his. The latest email also says the item is still unowned.",
  },
];

export const questions = [
  "What did I promise Raghav?",
  "What needs action today?",
  "What's waiting on others?",
];