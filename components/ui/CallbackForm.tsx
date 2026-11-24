"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { callback } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

/** Existing Web3Forms call-back form, now with inline loading / success / error states. */
export default function CallbackForm({ variant = "light", finalLabel = false, idPrefix = "cb" }: { variant?: "light" | "dark"; finalLabel?: boolean; idPrefix?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const dark = variant === "dark";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    setStatus("sending");
    try {
      const res = await fetch(callback.web3forms.endpoint, { method: "POST", headers: { Accept: "application/json" }, body: data });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("Submit failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field = `peer w-full rounded-2xl border px-4 pb-2.5 pt-6 text-[0.95rem] outline-none transition-colors ${
    dark ? "border-ivory/15 bg-ivory/5 text-ivory placeholder-transparent focus:border-gold" : "border-stone-line bg-white text-ink placeholder-transparent focus:border-gold"
  }`;
  const label = `pointer-events-none absolute left-4 top-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.9rem] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.68rem] peer-focus:uppercase peer-focus:tracking-[0.14em] ${dark ? "text-ivory/55" : "text-ink/50"}`;

  const inputs = [
    { name: "name", type: "text", label: callback.fields.name, auto: "name" },
    { name: "email", type: "email", label: callback.fields.email, auto: "email" },
    { name: "phone", type: "tel", label: callback.fields.phone, auto: "tel" },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-3" aria-describedby={`${idPrefix}-privacy`}>
      <input type="hidden" name="access_key" value={callback.web3forms.accessKey} />
      <input type="hidden" name="subject" value={callback.web3forms.subject} />
      <input type="hidden" name="from_name" value={callback.web3forms.fromName} />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      {inputs.map((i) => (
        <div key={i.name} className="relative">
          <input id={`${idPrefix}-${i.name}`} name={i.name} type={i.type} required placeholder={i.label} autoComplete={i.auto} className={field} />
          <label htmlFor={`${idPrefix}-${i.name}`} className={label}>{i.label}</label>
        </div>
      ))}
      <button type="submit" disabled={status === "sending"} className="btn-gold group w-full disabled:opacity-70">
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        <span>{finalLabel ? callback.submitFinal : callback.submit}</span>
        {!finalLabel && status !== "sending" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
      </button>
      <AnimatePresence mode="wait">
        {status === "sent" && (
          <motion.p key="ok" role="status" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex items-center gap-2 text-sm ${dark ? "text-gold-light" : "text-gold-deep"}`}>
            <Check className="h-4 w-4" /> {callback.subtitle}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p key="err" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-red-500">
            Something went wrong — please call or WhatsApp us.
          </motion.p>
        )}
      </AnimatePresence>
      <p id={`${idPrefix}-privacy`} className={`flex items-center justify-center gap-1.5 text-xs ${dark ? "text-ivory/50" : "text-ink/50"}`}>
        <Lock className="h-3 w-3" /> {callback.privacy}
      </p>
    </form>
  );
}
