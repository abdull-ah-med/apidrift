"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const TOUR_KEY = "apidrift-tour-v1";

export function ProductTour({ autoStart = true }: { autoStart?: boolean }) {
  useEffect(() => {
    if (!autoStart || typeof window === "undefined") return;
    if (window.localStorage.getItem(TOUR_KEY) === "done") return;

    const tour = driver({
      showProgress: true,
      animate: true,
      overlayOpacity: 0.55,
      steps: [
        {
          element: "#tour-before",
          popover: {
            title: "Paste the before payload",
            description:
              "Drop the previous API response or OpenAPI spec here.",
          },
        },
        {
          element: "#tour-after",
          popover: {
            title: "Paste the after payload",
            description:
              "Add the new version from a bump, environment, or branch.",
          },
        },
        {
          element: "#tour-run",
          popover: {
            title: "Run the semantic diff",
            description:
              "APIDrift classifies each change as Breaking, Non-Breaking, or Deprecation.",
          },
        },
        {
          element: "#tour-results",
          popover: {
            title: "Review classified changes",
            description: "Filter by severity and inspect migration snippets.",
          },
        },
        {
          element: "#tour-export",
          popover: {
            title: "Export a Migration Guide",
            description: "Download a clean markdown guide for your PR or release notes.",
          },
        },
      ],
      onDestroyStarted: () => {
        window.localStorage.setItem(TOUR_KEY, "done");
        tour.destroy();
      },
    });

    const timer = window.setTimeout(() => tour.drive(), 400);
    return () => {
      window.clearTimeout(timer);
      tour.destroy();
    };
  }, [autoStart]);

  return null;
}

export function startProductTour() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOUR_KEY);
  window.dispatchEvent(new Event("apidrift:restart-tour"));
}
