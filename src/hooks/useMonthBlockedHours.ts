import { useEffect, useRef, useState } from "react";
import { fetchRangeBlockedHours } from "../lib/googleCalendar";

export function useMonthBlockedHours(days: Date[]) {
  const [blocked, setBlocked] = useState<boolean[][]>(() =>
    days.map(() => new Array(24).fill(false)),
  );
  const [loading, setLoading] = useState(true);
  const [resolvedThrough, setResolvedThrough] = useState(-1);
  const requestId = useRef(0);
  const rangeKey = days.length ? `${days[0].getTime()}-${days[days.length - 1].getTime()}` : "";

  useEffect(() => {
    const id = ++requestId.current;
    setLoading(true);
    setResolvedThrough(-1);
    fetchRangeBlockedHours(days, (grid, resolvedThroughIdx) => {
      if (requestId.current === id) {
        setBlocked(grid);
        setResolvedThrough(resolvedThroughIdx);
      }
    })
      .then((grid) => {
        if (requestId.current === id) {
          setBlocked(grid);
          setResolvedThrough(days.length - 1);
        }
      })
      .catch((err) => {
        console.error("calendar-webview: failed to load this month's calendar", err);
      })
      .finally(() => {
        if (requestId.current === id) setLoading(false);
      });
  }, [rangeKey]);

  return { blocked, loading, resolvedThrough };
}
