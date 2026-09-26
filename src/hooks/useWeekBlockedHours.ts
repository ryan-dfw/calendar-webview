import { useEffect, useRef, useState } from "react";
import { fetchBlockedHoursForDays } from "../lib/googleCalendar";

function emptyGrid(n: number): boolean[][] {
  return Array.from({ length: n }, () => new Array(24).fill(false));
}

export function useWeekBlockedHours(days: Date[]) {
  const [blocked, setBlocked] = useState<boolean[][]>(() => emptyGrid(days.length));
  const [loading, setLoading] = useState(true);
  const rangeKey =
    days.length === 0
      ? "empty"
      : `${days[0].getTime()}-${days[days.length - 1].getTime()}-${days.length}`;
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;
    setLoading(true);
    fetchBlockedHoursForDays(days)
      .then((grid) => {
        if (requestId.current === id) setBlocked(grid);
      })
      .catch((err) => {
        console.error("calendar-webview: failed to load calendar data", err);
      })
      .finally(() => {
        if (requestId.current === id) setLoading(false);
      });
  }, [rangeKey]);

  return { blocked, loading };
}
