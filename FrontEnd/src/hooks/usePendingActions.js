import { useState } from "react";

// Traccia quali azioni (per id) sono attualmente in corso, per mostrare
// stati di loading granulari senza bloccare l'intera UI.
export const usePendingActions = () => {
  const [pendingActions, setPendingActions] = useState(new Set());

  const isPending = (action, id) => pendingActions.has(`${action}-${id}`);

  const runWithPending = async (action, id, fn) => {
    const key = `${action}-${id}`;
    setPendingActions((prev) => new Set(prev).add(key));
    try {
      await fn();
    } finally {
      setPendingActions((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

  return { isPending, runWithPending };
};
