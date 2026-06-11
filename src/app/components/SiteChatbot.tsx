import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import siteContent from "../data/siteContent.json";

type Message = { from: "user" | "bot"; text: string };

export function SiteChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi — ask me about any page on this site and I'll summarize it." },
  ]);
  const [value, setValue] = useState("");

  function append(msg: Message) {
    setMessages((m) => [...m, msg]);
  }

  function findMatches(q: string) {
    const ql = q.toLowerCase().trim();
    if (!ql) return [];
    const tokens = ql.split(/\s+/).filter(Boolean);
    const results = (siteContent as any[])
      .map((p) => {
        const hay = (p.title + " " + p.summary + " " + (p.keywords || []).join(" ")).toLowerCase();
        let score = 0;
        for (const t of tokens) if (hay.includes(t)) score++;
        return { page: p, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
    return results.map((r) => r.page);
  }

  function handleSubmit(e?: any) {
    if (e) e.preventDefault();
    const q = value.trim();
    if (!q) return;
    append({ from: "user", text: q });
    setValue("");

    const matches = findMatches(q);
    if (matches.length === 0) {
      append({
        from: "bot",
        text: "I couldn't find an exact page match. Try asking about 'Dashboard', 'AI Agents', or 'Settings'.",
      });
      return;
    }

    // Build a concise answer from top match and up to two additional suggestions
    const top = matches[0];
    let reply = `${top.title}: ${top.summary} \n\nOpen: ${top.path}`;
    if (matches.length > 1) {
      const others = matches.slice(1, 3).map((m) => `${m.title} (${m.path})`).join("; ");
      reply += `\n\nOther relevant pages: ${others}`;
    }
    append({ from: "bot", text: reply });
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col items-end">
        {open && (
          <div className="w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-3 mb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-violet-600" />
                <strong>Site Chat</strong>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-44 overflow-y-auto text-sm space-y-2 mb-2">
              {messages.map((m, i) => (
                <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
                  <div className={`inline-block p-2 rounded ${m.from === "user" ? "bg-violet-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"}`}>
                    {m.text.split('\n').map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask about a page..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm outline-none"
              />
              <button type="submit" className="px-3 py-2 rounded-lg bg-violet-600 text-white text-sm">Ask</button>
            </form>
          </div>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="Open site chat"
          className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg"
          title="Site Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default SiteChatbot;
