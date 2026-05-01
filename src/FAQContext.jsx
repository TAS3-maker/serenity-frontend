import { createContext, useContext, useEffect, useState } from "react";
import { FAQS } from "./data/index";
import { api } from "./lib/api";

const FAQContext = createContext(null);

// Map raw API FAQ doc → UI shape used by <FAQItem q a/>.
const toUi = (row, idx) => ({
  id:        row._id || row.id || idx,
  q:         row.question ?? row.q ?? "",
  a:         row.answer   ?? row.a ?? "",
  category:  row.category || "General",
  order:     row.order ?? idx,
  published: row.published !== false,
});

export const FAQProvider = ({ children }) => {
  // Hydrate from local fallback so the page renders instantly while we fetch.
  const [faqs, setFaqs] = useState(FAQS);

  useEffect(() => {
    let cancelled = false;
    api.content.faqList()
      .then(({ items = [] }) => { if (!cancelled && items.length) setFaqs(items.map(toUi)); })
      .catch(() => { /* keep static fallback */ });
    return () => { cancelled = true; };
  }, []);

  return <FAQContext.Provider value={{ faqs, setFaqs }}>{children}</FAQContext.Provider>;
};

export const useFAQs = () => useContext(FAQContext);
