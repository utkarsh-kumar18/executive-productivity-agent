# Executive Productivity Agent

AI-powered executive productivity agent built for the **AIONOS Agentic AI Factory — Assignment 1**.

Designed for **Arjun Malhotra, VP Sales**, the agent converts information from meetings, emails, calendars and voice notes into a structured daily action brief and provides natural-language Q&A using Google Gemini.

## Assignment Objective

The agent is designed to:

- Identify executive commitments
- Separate My Actions from Waiting on Others
- Detect deadlines and overdue items
- Deduplicate actions across sources
- Flag unclear ownership
- Produce a daily action brief
- Answer questions about commitments and open items

## Current Brief

**Exercise Period:** 21–25 September 2026

**Daily Brief:** Wednesday, 23 September 2026

Current actions:

| Action | Owner | Status |
|---|---|---|
| Send updated vendor list to Raghav | Arjun Malhotra | Due Today |
| Review Q3 Campaign Deck | Arjun Malhotra | Upcoming |
| Meridian Logistics call | Arjun Malhotra | Due Today |
| July expense variance report | Divya Rao | Completed |
| Mumbai office lease renewal | Unclear | Needs Clarification |

## Features

- Daily Action Brief
- My Actions
- Waiting on Others
- Due Today
- Upcoming
- Overdue detection
- Completed actions
- Unclear ownership
- Source evidence
- Action deduplication
- Gemini-powered Q&A

## Architecture

```text
Data Pack
   |
   +-- Meetings
   +-- Emails
   +-- Calendars
   +-- Voice Notes
   |
   v
Structured Action Data
   |
   v
Rule Layer
   |
   +-- Deduplication
   +-- Ownership validation
   +-- Deadline detection
   +-- Status classification
   |
   +------------------+
   |                  |
   v                  v
Daily Action Brief  Ask the Agent
                       |
                       v
                  Google Gemini
                       |
                       v
                   AI Answer
```

## AI Approach

The project uses a hybrid approach.

**Google Gemini** handles natural-language questions and generates answers from the supplied action data.

**Deterministic application logic** handles deadlines, overdue detection, status, ownership and action grouping.

This prevents the system from inventing unsupported information.

For example, the Mumbai office lease renewal remains:

```text
Owner: Unclear
Status: Needs Clarification
```

because the supplied sources do not establish a confirmed owner.

## Data Sources

The prototype uses only the supplied AIONOS Data Pack:

- Leadership Sync meeting transcript
- Email threads
- Calendar information
- Voice-note transcripts

Actions retain their supporting sources and evidence.

## Source Consolidation

Multiple references to the same action are consolidated into one action.

Example:

```text
Leadership Sync
+ Vendor List emails
+ Voice Note 1
        |
        v
Send updated vendor list to Raghav
```

## Ask the Agent

Example questions:

```text
What did I promise Raghav?
What needs action today?
What's waiting on others?
Who owns the Mumbai office lease renewal?
```

The question and structured action data are sent through the Next.js API route to Gemini.

## Technology Stack

- Next.js
- React
- Tailwind CSS
- Next.js API Routes
- Google Gemini
- `@google/genai`
- JavaScript
- GitHub
- Vercel

## Project Structure

```text
executive-productivity-agent/
└── frontend/
    ├── app/
    │   ├── api/ask/route.js
    │   ├── data.js
    │   ├── page.js
    │   ├── globals.css
    │   └── layout.js
    ├── public/
    ├── .env.local
    └── package.json
```

## Local Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```text
GEMINI_API_KEY=your_gemini_api_key
```

Run:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build test:

```bash
npm run build
```

## Security

The Gemini API key is stored in `.env.local` and accessed server-side.

Never commit the API key to GitHub.

## Assignment Mapping

| Requirement | Implementation |
|---|---|
| Commitments | Structured action data |
| My Actions / Waiting on Others | Action categories |
| Deadlines | Normalized dates |
| Overdue | Date-based rule |
| Deduplication | Consolidated source references |
| Unclear ownership | `owner: null` |
| Daily brief | Dashboard sections |
| Natural-language Q&A | Gemini |
| Source grounding | Sources and evidence |

## Assumptions

- The supplied Data Pack is the source of truth.
- Exercise period is 21–25 September 2026.
- Current brief is 23 September 2026.
- Ownership is not invented when unclear.
- Duplicate references are consolidated.
- No unsupported external information is added.

## Limitations

The prototype does not currently connect to live Gmail, Outlook, calendars, CRM systems or enterprise databases.

The supplied Data Pack is used for the assignment demonstration.

## Demo Flow

1. Open the dashboard.
2. Show the executive summary.
3. Show Due Today and Upcoming.
4. Open the Mumbai lease renewal.
5. Show `Owner: Unclear`.
6. Open View Sources.
7. Ask `What did I promise Raghav?`
8. Ask `What needs action today?`
9. Ask `Who owns the Mumbai office lease renewal?`
10. Explain the Gemini + deterministic rule architecture.

## Submission Status

- Prototype: **Working locally**
- Gemini Q&A: **Working**
- GitHub: **In progress**
- Deployment: **Pending**
- 10-slide PPT: **Pending**
- Demo video: **Pending**

## Assignment Deliverables

- Working agent / prototype
- Architecture and process flow
- Inputs, sources and assumptions
- AI tools used
- 15-minute demo and defence
- Demo video
- GitHub repository
- 10-slide PPT

## Author

**Utkarsh Kumar**

Executive Productivity Agent