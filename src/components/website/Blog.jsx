import { useState, useMemo, useEffect } from "react";
import { Search, ArrowLeft, Clock, User, Tag, ChevronRight, BookOpen } from "../../lib/icons";
import { C } from "../../tokens";
import { api } from "../../lib/api";

// Static fallback so the journal page is never empty if the API errors.
const FALLBACK_POSTS = [
  { id:"f1", tag:"Behavioral Psychology", date:"Mar 14, 2026", title:"The Silence Tax: What Financial Avoidance Really Costs You", excerpt:"Financial avoidance feels protective in the moment. But every bill you don't open has a compounding psychological cost.", body:"Financial avoidance feels protective in the moment. But every bill you don't open, every statement you ignore, has a compounding psychological cost.", readTime:"4 min read", author:"Dr. Aisha Bell", coverColor:C.teal },
];

// Map a server BlogPost document to the UI shape this file already uses.
const toUiPost = (row) => {
  const tag = row.tag || row.category || "Behavioral Psychology";
  const cover = row.accentColor
    || (TAG_COLOR[tag] ?? C.teal);
  return {
    id:         row._id || row.id,
    tag,
    title:      row.title || "",
    excerpt:    row.excerpt || "",
    body:       row.body || row.content || "",
    author:     row.author || "SerenityDecoded Research",
    readTime:   row.readTime || "5 min read",
    coverColor: cover,
    date: row.publishedAt || row.createdAt
      ? new Date(row.publishedAt || row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "",
  };
};

const TAG_COLOR = {
  "Behavioral Psychology": C.teal,
  "Behavioral Science":    C.navy,
  "Stress Profiles":       C.green,
  "Research":              C.gold,
};

const TAG_MAP = {
  "Behavioral Psychology": { bg:"var(--tealBg)",          text:"var(--teal)",    border:"var(--tealBorder)" },
  "Behavioral Science":    { bg:"rgba(26,26,46,0.07)",    text:C.navy,           border:"rgba(26,26,46,0.15)" },
  "Stress Profiles":       { bg:"var(--greenBg)",         text:"var(--green)",   border:"rgba(30,113,69,0.2)" },
  "Research":              { bg:"var(--goldBg)",           text:"var(--gold)",    border:"rgba(183,134,11,0.2)" },
};

const PostTag = ({ label }) => {
  const s = TAG_MAP[label] || TAG_MAP["Behavioral Psychology"];
  return <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold" style={{ background:s.bg, color:s.text, border:`1px solid ${s.border}` }}>{label}</span>;
};

// ─── Reading progress bar ──────────────────────────────────────
const ReadingProgress = ({ scrollEl }) => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = document.querySelector('[data-scroll]');
    if (!el) return;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setPct(Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)));
    };
    el.addEventListener('scroll', update);
    return () => el.removeEventListener('scroll', update);
    // One-shot subscription; locals (el, update, scrollTop/scrollHeight/clientHeight) live entirely inside the effect body.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[300]" style={{ background:"var(--bgMuted)" }}>
      <div className="h-full transition-all duration-100" style={{ width:`${pct}%`, background:`linear-gradient(90deg,${C.teal},${C.green})` }}/>
    </div>
  );
};

// ─── Article view ──────────────────────────────────────────────
const Article = ({ post, allPosts, onBack, onNavigate, showToast }) => {
  const others = allPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div>
      <ReadingProgress />

      {/* Full-screen hero */}
      <div className="relative overflow-hidden" style={{ background: C.navy, minHeight: 480 }}>
        {/* Color wash */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:`radial-gradient(ellipse at 70% 50%, ${post.coverColor}25 0%, transparent 70%)` }}/>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"repeating-linear-gradient(0deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 60px), repeating-linear-gradient(90deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 60px)" }}/>

        <div className="web-container relative z-10 py-16">
          {/* Back */}
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/45 hover:text-white transition-colors mb-10 bg-transparent border-none cursor-pointer font-sans">
            <ArrowLeft size={15}/> Back to Journal
          </button>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <PostTag label={post.tag}/>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <span className="flex items-center gap-1.5"><User size={13}/>{post.author}</span>
              <span className="flex items-center gap-1.5"><Clock size={13}/>{post.readTime}</span>
              <span className="flex items-center gap-1.5"><Tag size={13}/>{post.date}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-white leading-[1.08] tracking-[-1.5px] mb-6 max-w-[760px]"
            style={{ fontSize:"clamp(32px,4vw,52px)" }}>
            {post.title}
          </h1>

          {/* Lead */}
          <p className="text-lg text-white/55 leading-[1.75] max-w-[640px]">{post.excerpt}</p>
        </div>

        {/* Bottom fade into body bg */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background:`linear-gradient(to bottom, transparent, var(--bg))` }}/>
      </div>

      {/* Article body */}
      <div className="bg-[var(--bg)]">
        <div className="web-container">
          <div className="grid grid-cols-[1fr_280px] gap-16 py-16 max-w-[1040px]">

            {/* Main content */}
            <article>
              {/* Pull quote */}
              <div className="relative pl-8 mb-10 py-1 border-l-[4px]" style={{ borderColor:post.coverColor }}>
                <div className="absolute -left-[14px] top-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-lg font-serif italic font-bold"
                  style={{ background:post.coverColor }}>"</div>
                <p className="font-serif italic text-[20px] leading-[1.85] text-[var(--text)]">{post.excerpt}</p>
              </div>

              {/* Body paragraphs */}
              <div className="space-y-6">
                {post.body.split("\n\n").map((para, i) => (
                  <p key={`para-${i}-${para.slice(0, 24)}`} className="text-[17px] text-[var(--textMuted)] leading-[1.95]">{para}</p>
                ))}
              </div>

              {/* Key takeaways */}
              <div className="mt-12 p-7 rounded-2xl" style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
                <div className="font-display font-bold text-sm text-[var(--teal)] uppercase tracking-widest mb-4">Key takeaways</div>
                <div className="space-y-3">
                  {["This is a pattern, not a character flaw — it developed for a reason.","Awareness alone creates meaningful neurological change when sustained over time.","The intervention must match your specific stress profile, not a generic approach."].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                        style={{ background:"var(--teal)" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span className="text-[14px] text-[var(--text)] leading-[1.7]">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author bio */}
              <div className="mt-12 pt-10 border-t border-[var(--border)] flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl text-white flex-shrink-0"
                  style={{ background:`linear-gradient(135deg,${post.coverColor},${post.coverColor}99)` }}>
                  {post.author[0]}
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text)] mb-1">{post.author}</div>
                  <div className="text-sm font-medium mb-2" style={{ color:post.coverColor }}>SerenityDecoded Research Team</div>
                  <p className="text-sm text-[var(--textMuted)] leading-[1.7]">
                    {post.author === "Dr. Aisha Bell"
                      ? "Clinical psychologist with 14 years specialising in financial anxiety, avoidance behaviours, and behavioural interventions."
                      : "Behavioral economist and former research lead at the Behavioural Insights Team, specialising in choice architecture."}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 rounded-3xl overflow-hidden">
                <div className="p-10 relative" style={{ background:`linear-gradient(135deg,${C.teal},${C.green})` }}>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage:"repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 44px)" }}/>
                  <div className="relative z-10 flex items-center gap-8">
                    <div className="flex-1">
                      <div className="font-display font-bold text-white text-xl mb-2">Ready to put this into practice?</div>
                      <p className="text-white/70 text-sm leading-relaxed">Take the free 5-minute Financial Stress Assessment and receive your personalised 7-day program.</p>
                    </div>
                    <button onClick={() => showToast("Redirecting to assessment…")}
                      className="flex-shrink-0 h-12 px-7 rounded-xl font-bold text-[15px] border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl font-sans"
                      style={{ background:"#fff", color:C.teal }}>
                      Start free →
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              {/* Sticky wrapper */}
              <div className="sticky top-24">
                {/* Share */}
                <div className="rounded-2xl p-5 mb-5" style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                  <div className="text-[11px] font-bold text-[var(--textMuted)] uppercase tracking-widest mb-4">Share this article</div>
                  <div className="space-y-2">
                    {[["Copy link","var(--teal)"],["Share on X","#000"],["Share on LinkedIn","#0077b5"]].map(([l,c]) => (
                      <button key={l} onClick={() => showToast(`${l} — copied!`)}
                        className="w-full h-9 rounded-xl text-[12px] font-semibold font-sans cursor-pointer border transition-colors"
                        style={{ background:"var(--bgMuted)", color:"var(--text)", borderColor:"var(--border)" }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="rounded-2xl p-5 mb-5" style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                  <div className="text-[11px] font-bold text-[var(--textMuted)] uppercase tracking-widest mb-4">Filed under</div>
                  <div className="flex flex-wrap gap-2">
                    <PostTag label={post.tag}/>
                    <PostTag label="Research"/>
                  </div>
                </div>

                {/* Progress */}
                <div className="rounded-2xl p-5" style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                  <div className="text-[11px] font-bold text-[var(--textMuted)] uppercase tracking-widest mb-3">Reading time</div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={15} color="var(--teal)"/>
                    <span className="font-semibold text-[14px] text-[var(--text)]">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* More articles */}
          {others.length > 0 && (
            <div className="py-12 border-t border-[var(--border)]">
              <div className="font-display font-bold text-xl text-[var(--text)] mb-7">More from the journal</div>
              <div className="grid grid-cols-2 gap-6">
                {others.map(p => (
                  <div key={p.id} onClick={() => onNavigate(p.id)}
                    className="rounded-2xl p-7 cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-[var(--shadowHover)]"
                    style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                    <PostTag label={p.tag}/>
                    <h3 className="font-display font-bold text-[17px] text-[var(--text)] mt-3 mb-2.5 leading-[1.3] group-hover:text-[var(--teal)] transition-colors">{p.title}</h3>
                    <p className="text-sm text-[var(--textMuted)] leading-[1.65] mb-4 line-clamp-2">{p.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>{p.author[0]}</div>
                        <span className="text-[12px] text-[var(--textMuted)]">{p.date}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[12px] font-semibold text-[var(--teal)]">
                        Read <ChevronRight size={13}/>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Blog index ─────────────────────────────────────────────────
export const WebBlog = ({ showToast }) => {
  const [active, setActive]   = useState(null);
  const [query, setQuery]     = useState("");
  const [tag, setTag]         = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Load posts from the API; fall back to the local seed if the API errors.
  const [posts, setPosts] = useState(FALLBACK_POSTS);
  useEffect(() => {
    let cancelled = false;
    api.content.blogList()
      .then(({ items = [] }) => {
        if (cancelled) return;
        const ui = items.map(toUiPost).filter(p => p.title);
        if (ui.length) setPosts(ui);
      })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);

  const tags = useMemo(() => ["All", ...Array.from(new Set(posts.map(p => p.tag)))], [posts]);

  const filtered = useMemo(() => {
    let list = posts;
    if (tag !== "All") list = list.filter(p => p.tag === tag);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.author.toLowerCase().includes(q));
    }
    return list;
  }, [query, tag, posts]);

  const INITIAL = 4;
  const shown = showAll ? filtered : filtered.slice(0, INITIAL);
  const featured = posts[0];

  if (active !== null) {
    const post = posts.find(p => p.id === active);
    if (!post) { setActive(null); return null; }
    return <Article post={post} allPosts={posts} onBack={() => setActive(null)} onNavigate={setActive} showToast={showToast} />;
  }

  return (
    <div>
      {/* Hero */}
      <section className="web-section" style={{ background:C.navy }}>
        <div className="web-container">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
              style={{ background:"rgba(13,115,119,0.3)", color:C.teal, border:"1px solid rgba(13,115,119,0.4)" }}>
              The Journal
            </div>
            <h1 className="font-display font-bold text-white mb-5 leading-[1.08] tracking-[-1.5px]" style={{ fontSize:54 }}>
              Behavioral science,<br />applied to money.
            </h1>
            <p className="text-lg text-white/50 leading-[1.75] max-w-[480px]">
              Research-backed insights on the psychology of financial stress — for people who want to understand themselves, not just their spreadsheet.
            </p>
          </div>
        </div>
      </section>

      {/* Search + filter */}
      <div className="sticky top-[68px] z-50 border-b" style={{ background:"var(--bgNav)", backdropFilter:"blur(20px)", borderColor:"var(--border)" }}>
        <div className="web-container py-3.5 flex items-center gap-4 flex-wrap">
          <div className="relative min-w-[200px] max-w-[280px] flex-1">
            <Search size={14} color="var(--textMuted)" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
            <input type="text" value={query} onChange={e=>{setQuery(e.target.value);setShowAll(true);}}
              placeholder="Search articles…"
              className="w-full h-10 pl-9 pr-4 rounded-xl text-[13px] font-sans outline-none transition-all"
              style={{ background:"var(--bgCard)", border:"1px solid var(--border)", color:"var(--text)" }}
              onFocus={e=>(e.target.style.borderColor="var(--teal)")}
              onBlur={e=>(e.target.style.borderColor="var(--border)")}/>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tags.map(t => (
              <button key={t} onClick={()=>{setTag(t);setShowAll(false);}}
                className="h-9 px-4 rounded-xl text-[12px] font-semibold font-sans border-none cursor-pointer transition-all"
                style={{ background:tag===t?"var(--teal)":"var(--bgCard)", color:tag===t?"#fff":"var(--textMuted)", border:`1px solid ${tag===t?"var(--teal)":"var(--border)"}` }}>
                {t}
              </button>
            ))}
          </div>
          <span className="text-[12px] text-[var(--textMuted)] ml-auto">{filtered.length} article{filtered.length!==1?"s":""}</span>
        </div>
      </div>

      {/* Articles */}
      <section className="web-section bg-[var(--bgMuted)]">
        <div className="web-container">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                <BookOpen size={24} color="var(--textMuted)"/>
              </div>
              <div className="font-display font-bold text-xl text-[var(--text)] mb-2">No articles found</div>
              <p className="text-[var(--textMuted)] text-sm">Try a different search term or filter.</p>
            </div>
          ) : (
            <>
              {/* Featured hero card */}
              {!query && tag === "All" && (
                <div className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden cursor-pointer group mb-8"
                  style={{ border:"1px solid var(--border)", background:"var(--bgCard)" }}
                  onClick={()=>setActive(featured.id)}>
                  <div className="min-h-[300px] flex items-center justify-center relative overflow-hidden"
                    style={{ background:`linear-gradient(135deg,${featured.coverColor}12,${featured.coverColor}28)`, borderRight:"1px solid var(--border)" }}>
                    <div className="absolute inset-0" style={{ backgroundImage:`radial-gradient(circle at 30% 50%,${featured.coverColor}20 0%,transparent 60%)` }}/>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
                        style={{ background:`${featured.coverColor}20`, border:`1.5px solid ${featured.coverColor}35` }}>
                        <BookOpen size={28} color={featured.coverColor}/>
                      </div>
                      <div className="text-xs font-semibold" style={{ color:`${featured.coverColor}80` }}>Featured article</div>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-5">
                      <PostTag label={featured.tag}/>
                      <span className="text-[11px] font-bold text-[var(--textMuted)] px-2 py-1 rounded-lg border border-[var(--border)] bg-[var(--bgMuted)]">Latest</span>
                    </div>
                    <h2 className="font-display font-bold text-[var(--text)] mb-4 leading-[1.2] group-hover:text-[var(--teal)] transition-colors" style={{ fontSize:26 }}>
                      {featured.title}
                    </h2>
                    <p className="text-[15px] text-[var(--textMuted)] leading-[1.75] mb-6 line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                          style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>{featured.author[0]}</div>
                        <div>
                          <div className="text-[13px] font-semibold text-[var(--text)]">{featured.author}</div>
                          <div className="text-[11px] text-[var(--textMuted)]">{featured.date} · {featured.readTime}</div>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--teal)]">
                        Read article <ChevronRight size={14}/>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-3 gap-6">
                {shown.slice(!query && tag==="All" ? 1 : 0).map(post => (
                  <article key={post.id} onClick={()=>setActive(post.id)}
                    className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadowHover)]"
                    style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                    {/* Cover */}
                    <div className="h-44 flex items-center justify-center relative overflow-hidden"
                      style={{ background:`linear-gradient(135deg,${post.coverColor}10,${post.coverColor}22)` }}>
                      <div className="absolute inset-0" style={{ backgroundImage:`radial-gradient(circle at 50% 50%,${post.coverColor}15 0%,transparent 60%)` }}/>
                      <div className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background:`${post.coverColor}18`, border:`1.5px solid ${post.coverColor}30` }}>
                        <BookOpen size={18} color={post.coverColor}/>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <PostTag label={post.tag}/>
                        <span className="text-[11px] text-[var(--textMuted)]">{post.readTime}</span>
                      </div>
                      <h2 className="font-display font-bold text-[17px] leading-[1.3] mb-2.5 group-hover:text-[var(--teal)] transition-colors text-[var(--text)]">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[var(--textMuted)] leading-[1.65] mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
                            style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>{post.author[0]}</div>
                          <span className="text-[12px] text-[var(--textMuted)]">{post.date}</span>
                        </div>
                        <span className="text-[12px] font-semibold text-[var(--teal)]">Read →</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* See all */}
              {filtered.length > INITIAL && (
                <div className="mt-10 text-center">
                  <button onClick={()=>setShowAll(v=>!v)}
                    className="inline-flex items-center gap-2 h-12 px-8 rounded-xl font-semibold text-[15px] font-sans cursor-pointer transition-all border"
                    style={{ background:"var(--bgCard)", color:"var(--teal)", borderColor:"var(--tealBorder)" }}>
                    {showAll ? "Show fewer articles" : `See all ${filtered.length} articles`}
                    <ChevronRight size={15} style={{ transform:showAll?"rotate(90deg)":"none", transition:"transform .2s" }}/>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
