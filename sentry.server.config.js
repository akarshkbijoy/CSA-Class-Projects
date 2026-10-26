import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://1bbc78d4541695b9380ba8d5621fa532@o4512321880850432.ingest.de.sentry.io/4512321927053392",
  tracesSampleRate: 1.0,
});
