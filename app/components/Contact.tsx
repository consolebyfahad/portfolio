"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "../data/portfolio";
import SectionHeading from "./motion/SectionHeading";
import MagneticButton from "./motion/MagneticButton";
import FadeIn from "./motion/FadeIn";
import ArrowIcon from "./icons/ArrowIcon";
import { fadeUp, staggerContainer, slideInLeft, easeOut, viewportOnce } from "../lib/motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    const linkedInUrl = `https://www.linkedin.com/in/fahad0/`;

    if (personal.email) {
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(
        `[Portfolio] ${subject} — from ${name}`
      )}&body=${body}`;
    } else {
      window.open(linkedInUrl, "_blank", "noopener,noreferrer");
    }
    setSubmitted(true);
  }

  const fields = [
    { id: "name", label: "Name", type: "text", placeholder: "Your name", maxLength: 50, col: true },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com", maxLength: 50, col: true },
    { id: "subject", label: "Subject", type: "text", placeholder: "What's this about?", maxLength: 50, col: false },
  ];

  return (
    <motion.section
      id="contact"
      className="relative border-t border-card-border py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <FadeIn direction="left">
            <SectionHeading label="Reach Out" title="Contact Me" />
            <motion.p
              className="mb-8 max-w-md text-base leading-relaxed text-muted"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ ...easeOut, delay: 0.15 }}
            >
              Don&apos;t hesitate to reach out with any questions or ideas. I&apos;m here to
              listen, offer insights, and have enriching discussions. Your message could spark
              something wonderful — let&apos;s start a dialogue!
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 text-sm text-muted"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {[
                { platform: "LinkedIn", handle: "in/fahad0", href: personal.linkedin, external: true },
                { platform: "GitHub", handle: "consolebyfahad", href: personal.github, external: true },
                ...(personal.email
                  ? [{ platform: "Email", handle: personal.email, href: `mailto:${personal.email}`, external: false }]
                  : []),
              ].map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 text-muted transition-colors hover:text-accent"
                  variants={slideInLeft}
                  transition={easeOut}
                >
                  <span className="font-medium text-foreground group-hover:text-accent">
                    {link.platform}
                  </span>
                  <span className="arrow-link-icon flex h-7 w-7 items-center justify-center rounded-full border border-card-border bg-card text-muted transition-all group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent">
                    <ArrowIcon variant="right" size={14} />
                  </span>
                  <span className="text-muted group-hover:text-foreground">{link.handle}</span>
                </motion.a>
              ))}
            </motion.div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex h-full flex-col items-center justify-center rounded-2xl border border-card-border bg-card/80 p-12 text-center backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.p
                    className="mb-2 text-4xl"
                    aria-hidden="true"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✉️
                  </motion.p>
                  <p className="font-[family-name:var(--font-syne)] text-xl font-bold text-foreground">
                    {personal.email ? "Opening your email client…" : "Thanks for reaching out!"}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {personal.email ? (
                      <>
                        If it didn&apos;t open, email me directly at{" "}
                        <a href={`mailto:${personal.email}`} className="text-accent hover:underline">
                          {personal.email}
                        </a>
                      </>
                    ) : (
                      <>
                        Connect with me on{" "}
                        <a
                          href={personal.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          LinkedIn
                        </a>{" "}
                        to continue the conversation.
                      </>
                    )}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields
                      .filter((f) => f.col)
                      .map((field) => (
                        <motion.div key={field.id} variants={fadeUp} transition={easeOut}>
                          <label
                            htmlFor={field.id}
                            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                          >
                            {field.label}
                          </label>
                          <motion.div
                            animate={{
                              borderColor:
                                focusedField === field.id
                                  ? "rgba(200, 245, 66, 0.6)"
                                  : "rgba(34, 34, 34, 1)",
                            }}
                          >
                            <input
                              id={field.id}
                              name={field.id}
                              type={field.type}
                              required
                              maxLength={field.maxLength}
                              placeholder={field.placeholder}
                              className="form-input"
                              onFocus={() => setFocusedField(field.id)}
                              onBlur={() => setFocusedField(null)}
                            />
                          </motion.div>
                        </motion.div>
                      ))}
                  </div>
                  {fields
                    .filter((f) => !f.col)
                    .map((field) => (
                      <motion.div key={field.id} variants={fadeUp} transition={easeOut}>
                        <label
                          htmlFor={field.id}
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          required
                          maxLength={field.maxLength}
                          placeholder={field.placeholder}
                          className="form-input"
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                        />
                      </motion.div>
                    ))}
                  <motion.div variants={fadeUp} transition={easeOut}>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      maxLength={500}
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      className="form-input resize-none"
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp} transition={easeOut}>
                    <MagneticButton type="submit" className="mt-2">
                      Send Message
                    </MagneticButton>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </motion.section>
  );
}
