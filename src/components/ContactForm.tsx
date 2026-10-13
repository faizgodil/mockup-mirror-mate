import { useState, type FormEvent } from "react";

const ENQUIRIES = ["Product Enquiry", "Partnership & Collaboration", "Startup Programs", "Technical Support", "Other"];
const FORM_NAME = "uniqmanage-contact";
type State = "idle" | "sending" | "success" | "error";

const field =
  "mt-1.5 w-full rounded-lg border border-border bg-background/70 px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!String(data.get("name") ?? "").trim() || !String(data.get("message") ?? "").trim()) {
      setState("error");
      setError("Please fill in your name and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setError("Please enter a valid email address.");
      return;
    }
    setState("sending");
    setError("");
    try {
      const body = new URLSearchParams();
      data.forEach((v, k) => body.append(k, String(v)));
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("success");
    } catch {
      setState("error");
      setError(`Your message couldn't be sent. Please try again, or write to contact@uniqmanage.com. Your text has been kept.`);
    }
  }

  if (state === "success") {
    return (
      <div id="contact-form" role="status" className="mt-8 rounded-xl border border-primary/40 bg-primary/10 p-6">
        <h3 className="font-semibold">Thank you — your message has been sent.</h3>
        <p className="mt-2 text-sm text-muted-foreground">We'll reply to the email address you provided.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-4 text-sm font-semibold text-primary hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      noValidate
      className="mt-8 scroll-mt-24 grid gap-5 rounded-xl border border-border bg-background/60 p-5 sm:grid-cols-2 sm:p-6"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden" aria-hidden="true">
        <label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>
      <label className="block text-sm font-medium">
        Full name <span className="text-primary">*</span>
        <input name="name" type="text" required maxLength={100} autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-medium">
        Email address <span className="text-primary">*</span>
        <input name="email" type="email" required maxLength={255} autoComplete="email" className={field} />
      </label>
      <label className="block text-sm font-medium sm:col-span-2">
        Enquiry type
        <select name="enquiry" defaultValue={ENQUIRIES[0]} className={field}>
          {ENQUIRIES.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium sm:col-span-2">
        Message <span className="text-primary">*</span>
        <textarea name="message" required rows={5} maxLength={5000} className={field} />
      </label>
      {state === "error" && (
        <p role="alert" className="text-sm text-destructive sm:col-span-2">{error}</p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
        >
          {state === "sending" ? "Sending…" : "Submit message"}
        </button>
      </div>
    </form>
  );
}
