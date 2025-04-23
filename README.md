Hey OpenAI 🤖

**How constructive was the communication in german parliament?**

This is an experiment to see if AI can help make communication more constructive by analyzing the protocols of the parliament in Germany, highlighting positive & negative examples and giving constructive suggestions for improvements.

[https://constructive-communication.info](https://constructive-communication.info)

# Technical overview

There are four docker compose services:

- **fetch**: Scheduled checks for new protocols published on https://www.bundestag.de/protokolle. If a new one is found, it will perform the analysis using the OpenAI API and store the result in the redis database.
- **redis**: A redis database for storing and persisting the analysis results.
- **nextjs**: A standalone nextjs instance providing the website.
- **nginx** (production only): Reverse proxy to handle HTTPS, certificate, ...

These either run locally for development or on Hetzner Cloud in production.

This project was made possible by these awesome & free tools: TypeScript, Next.js, React, Tailwind CSS, Redis, Docker, io-ts, iconify

... and these awesome paid services: Hetzner Cloud, OpenAI

# Running

Requirements: Docker, NPM

- Clone repository
- Create `.env` file in project root directory containing
  - `REDIS_PASSWORD=<password>`
  - `OPENAI_API_KEY=<...>`
  - `REDIS_ARGS="--requirepass <password>"`
  - `SLEEP_SECONDS=<...>` - Configures how often to check for new protocols
- ...

## ... locally

- `npm run dev`
- Open `localhost:3002` in browser

## ... on server

- `npm run start`
- Go to nginx dashboard under `<ip_address>:81`
- Create proxy host:
  - Domain name: `constructive-communication.info` (Example)
  - Scheme: `http`
  - Forward Hostname / IP: `127.0.0.1`
  - Forward Port: `3001`
  - Force SSL & generate certificate
- Go to `constructive-communication.info` in browser
