# Calendar

**Live:** https://raincal.netlify.app

I know everyone vibecodes calendar apps but i couldn't find any that solves one particular problem i had: there's no way to convey free hours across a meaningful sort of time without extremely information-dense screenshots (often requiring scrolling on a phone) or lengthy text explainers.
So i made a simple site that shows, for any D/W/M/Y resolution you need to know, where are the free spots.

## How it works

Calendar uses Google Calendar's free/busy data rather than retrieving full calendar events and removing their details afterward.

That distinction is intentional. Event names, descriptions, and locations aren't necessary to answer when I'm available, so the application doesn't request them in the first place.

The resulting availability data is transformed into increasingly detailed views:

1. **Year** — shows the overall shape of availability across months.
2. **Month** — narrows the decision to a particular part of the month.
3. **Week** — exposes hour-level availability for actually choosing a time.
4. **Day** — provides a single-day view for completeness.

The goal is to preserve useful visual information as the calendar zooms outward without turning the interface into a long scrolling list.

## Stack

- TypeScript
- Google Calendar API
- Netlify

## Design goals

### Share availability, not events

The application is designed around the information another person actually needs to schedule something with me.

It exposes free/busy state without exposing:

- event names
- event descriptions
- event locations
- what I am doing during unavailable time

This privacy boundary exists at the data source rather than as a presentation-layer redaction.

### One-screen communication

A major use case is taking a screenshot and sending it to someone.

The interface therefore prioritizes keeping decision-relevant availability visible at once rather than requiring someone to navigate through a conventional calendar application.

### Preserve shape across scales

Most calendar interfaces become less useful when zoomed far out. Calendar instead tries to retain the visual shape of my available time as the view moves from weeks to months and a full year.

The broad views aren't intended to identify an exact meeting time. They're intended to help narrow the search until the detailed week view becomes useful.

## Why build it?

I originally looked at adapting an existing scheduling project, but its scope was much larger than the problem I wanted to solve.

I didn't need another calendar platform. I wanted a focused way to answer one question:

**When am I free?**

Building a smaller application also let the interaction model revolve around that question rather than adapting it to the assumptions of a general-purpose calendar.

## Status

The application is functional and includes day, week, month, and year views.

The multiscale month/year-to-week interaction is the main idea of the project. The day view exists primarily for completeness.

## AI assistance

Claude handled the visual design and CSS.

I implemented the calendar behavior, availability logic, Google Calendar integration, and the multiscale interaction model.

ChatGPT wrote this readme save for this note. If you see this, i'm currently batch-cleaning my github aiming for a 'good enough' first pass, and have not yet been back for a real rewrite.
