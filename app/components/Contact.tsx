"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "../data/portfolio";
import { fadeUp, staggerContainer, easeOut, viewportOnce } from "../lib/motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    const body = encodeURIComponent(
      `Hi Fahad,\n\nMy name is ${name} (${email}).\n\n${message}`
    );

    if (personal.email) {
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(
        `[Portfolio] ${subject} — from ${name}`
      )}&body=${body}`;
    } else {
      window.open(personal.linkedin, "_blank", "noopener,noreferrer");
    }
    setSubmitted(true);
  }

  return (
    <section id="contact" className="site-section relative bg-[#050505]">
      <div className="site-shell">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={easeOut}
          >
            <p className="section-kicker mb-5">Reach Out</p>
            <h2 className="section-display mb-8">Get In Touch</h2>
            <p className="mb-12 max-w-lg text-lg leading-relaxed text-white/60 sm:text-xl">
              Have a project, idea, or opportunity? I&apos;m open to conversations — let&apos;s
              build something thoughtful together.
            </p>

            <div className="flex flex-col gap-5">
              {[
                {
                  label: "LinkedIn",
                  value: "in/fahad0",
                  href: personal.linkedin,
                  cursor: "View LinkedIn Profile",
                },
                {
                  label: "GitHub",
                  value: "consolebyfahad",
                  href: personal.github,
                  cursor: "View GitHub Profile",
                },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label={item.cursor}
                  className="group flex items-baseline gap-5 border-b border-white/10 pb-4 transition-colors hover:border-white/40"
                >
                  <span className="font-display text-3xl text-[#dedcd3] transition-colors group-hover:text-white sm:text-4xl">
                    {item.label}
                  </span>
                  <span className="text-base text-white/45 group-hover:text-white/70">{item.value}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className="flex min-h-[320px] flex-col justify-center border border-white/10 p-10 sm:p-12"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="font-display text-5xl text-[#dedcd3] sm:text-6xl">Thanks</p>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-white/55 sm:text-lg">
                  {personal.email
                    ? "Opening your email client…"
                    : "Connect with me on LinkedIn to continue the conversation."}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-7"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer}
              >
                <div className="grid gap-7 sm:grid-cols-2">
                  {[
                    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                  ].map((field) => (
                    <motion.div key={field.id} variants={fadeUp} transition={easeOut}>
                      <label
                        htmlFor={field.id}
                        className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/45"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        required
                        maxLength={50}
                        placeholder={field.placeholder}
                        className="form-input"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div variants={fadeUp} transition={easeOut}>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/45"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={50}
                    placeholder="What's this about?"
                    className="form-input"
                  />
                </motion.div>
                <motion.div variants={fadeUp} transition={easeOut}>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/45"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={500}
                    rows={4}
                    placeholder="Tell me about your project or idea..."
                    className="form-input resize-none"
                  />
                </motion.div>
                <motion.div variants={fadeUp} transition={easeOut}>
                  <button type="submit" className="btn-solid-light mt-2">
                    Send Message
                  </button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
