import { useEffect, useState, useCallback } from "react";

/**
 * Generic hook for loading data from the API.
 *
 *   const { data, loading, error, reload, setData } = useApi(api.users.list, { initial: [] });
 *
 * • `fetcher` is called once on mount and again whenever `reload()` is invoked.
 * • The fetcher is expected to return the API JSON envelope. We unwrap the
 *   common shapes the SerenityDecoded backend returns: `{ items: [...] }`,
 *   `{ data: ... }`, or the raw value.
 */
export const useApi = (fetcher, { initial = null, deps = [], select } = {}) => {
  const [data,    setData]    = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await fetcher();
      const value = select
        ? select(raw)
        : raw?.items ?? raw?.data ?? raw;
      setData(value);
    } catch (e) {
      setError(e);
      console.error("[useApi] fetch failed:", e);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { reload(); }, [reload]);

  return { data, loading, error, reload, setData };
};

/**
 * Wraps an async API call with simple toast + reload semantics so list pages
 * can do `await mutate(api.users.delete(id), "Deleted")` without boilerplate.
 */
export const useMutation = (showToast, reload) =>
  useCallback(async (promise, successMsg) => {
    try {
      const r = await promise;
      if (successMsg) showToast?.(successMsg);
      if (reload) await reload();
      return r;
    } catch (e) {
      showToast?.(e?.data?.message || e?.message || "Request failed", "error");
      throw e;
    }
  }, [showToast, reload]);
