import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import {
  FaArrowRight,
  FaBars,
  FaBolt,
  FaCode,
  FaDiscord,
  FaEnvelope,
  FaInstagram,
  FaLayerGroup,
  FaMobileAlt,
  FaPaintBrush,
  FaRobot,
  FaRocket,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const services = [
  ["Web Design", FaPaintBrush],
  ["UI/UX Design", FaLayerGroup],
  ["Animated Websites", FaRocket],
  ["Landing Pages", FaBolt],
  ["Business Websites", FaCode],
  ["AI Integration", FaRobot],
];

const why = [
  ["Lightning Fast", FaBolt],
  ["Futuristic Design", FaRocket],
  ["Mobile Optimized", FaMobileAlt],
  ["SEO Ready", FaSearch],
  ["Smooth Animations", FaLayerGroup],
];

const testimonials = [
  "Samurai Websites made our brand feel premium instantly.",
  "The animations, speed, and design quality were unreal.",
  "It looked like an Awwwards site from day one.",
];

function MagneticButton({ children, className = "", type = "button" }) {
  const ref = useRef(null);

  const move = (e) => {
    const rect = ref.current.getBoundingClientRect();

    gsap.to(ref.current, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
      duration: 0.3,
    });
  };

  const leave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1,0.4)",
    });
  };

  return (
    <button
      ref={ref}
      type={type}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`rounded-full px-7 py-4 font-bold transition-all ${className}`}
    >
      {children}
    </button>
  );
}

function App() {
  const [intro, setIntro] = useState(true);
  const [menu, setMenu] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const [sending, setSending] = useState(false);

  const cursor = useRef(null);
  const glow = useRef(null);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -220]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      setIntro(false);
    }, 5200);

    const moveCursor = (e) => {
      if (!cursor.current || !glow.current) return;

      gsap.to(cursor.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
      });

      gsap.to(glow.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", moveCursor);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(t);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;

    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      budget: form.budget.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Backend is not running.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 z-[999] h-1 w-full origin-left bg-red-600"
      />

      <div
        ref={cursor}
        className="pointer-events-none fixed z-[999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 mix-blend-difference"
      />

      <div
        ref={glow}
        className="pointer-events-none fixed z-[1] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[140px]"
      />

      <AnimatePresence>
        {intro && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute h-[700px] w-[700px] rounded-full bg-red-600/20 blur-[180px]"
            />

            <motion.div
              initial={{ scaleX: 0, rotate: -10 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: 0.8,
              }}
              className="absolute h-[4px] w-[120vw] bg-red-500 shadow-[0_0_60px_15px_rgba(220,38,38,0.9)]"
            />

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.3,
                delay: 1.5,
              }}
              className="absolute h-72 w-72 rounded-full border border-red-500/50 shadow-[0_0_90px_rgba(220,38,38,0.5)]"
            />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-96 w-96 rounded-full border border-red-500/20"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 60,
                filter: "blur(20px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 2,
                duration: 1.2,
              }}
              className="relative z-10 text-center"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-[0.25em]">
                SAMURAI
              </h1>

              <motion.h2
                initial={{
                  opacity: 0,
                  letterSpacing: "1em",
                }}
                animate={{
                  opacity: 1,
                  letterSpacing: "0.4em",
                }}
                transition={{
                  delay: 2.5,
                  duration: 1,
                }}
                className="mt-4 text-red-500 text-lg md:text-2xl font-bold"
              >
                WEBSITES
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                className="mt-6 text-white/50 tracking-[0.4em]"
              >
                未来 • PRECISION • DOMINATION
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-5 left-1/2 z-50 flex w-[92%] -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-2xl">
        <div className="font-black tracking-[0.25em]">
          侍 <span className="text-red-500">SAMURAI</span>
        </div>

        <div className="hidden gap-8 text-sm text-white/70 md:flex">
          {["About", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition hover:text-red-400"
            >
              {item}
            </a>
          ))}
        </div>

        <button onClick={() => setMenu(!menu)} className="md:hidden text-xl">
          {menu ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {menu && (
        <div className="fixed top-24 inset-x-6 z-40 rounded-3xl border border-red-500/20 bg-black/90 p-6 backdrop-blur-xl md:hidden">
          {["About", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 text-white/80"
              onClick={() => setMenu(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.12)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />

        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-red-600/20 blur-[150px]" />
        <div className="absolute right-0 bottom-20 h-[500px] w-[500px] rounded-full bg-red-700/20 blur-[180px]" />

        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.1,
              repeat: Infinity,
            }}
            className="absolute h-[2px] w-[2px] rounded-full bg-red-400"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
          />
        ))}

        <motion.div
          style={{ y: heroY }}
          className="relative z-10 mx-auto max-w-6xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-sm font-bold tracking-[0.5em] text-red-500"
          >
            NEXT-GEN DIGITAL EXPERIENCES
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 80,
              filter: "blur(20px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{ duration: 1.2 }}
            className="text-5xl md:text-8xl lg:text-9xl font-black leading-none"
          >
            WE FORGE
            <br />
            <span className="bg-gradient-to-r from-red-500 via-white to-red-600 bg-clip-text text-transparent">
              WEBSITES
            </span>
            <br />
            THAT DOMINATE.
          </motion.h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg md:text-2xl text-white/60">
            Premium futuristic websites crafted with samurai precision.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a href="#contact">
              <MagneticButton className="bg-red-600 shadow-[0_0_50px_rgba(220,38,38,0.7)] hover:bg-red-500">
                Start Project <FaArrowRight className="ml-3 inline" />
              </MagneticButton>
            </a>

            <a href="#services">
              <MagneticButton className="border border-white/10 bg-white/5 hover:border-red-500">
                Explore More
              </MagneticButton>
            </a>
          </div>
        </motion.div>
      </section>

      <Section id="about" title="Built like a blade. Designed like luxury.">
        <div className="grid gap-6 md:grid-cols-3">
          {["10X Visual Impact", "100% Responsive", "Elite Brand Feel"].map(
            (item) => (
              <Card key={item}>
                <h3 className="text-4xl font-black text-red-500">
                  {item.split(" ")[0]}
                </h3>
                <p className="mt-4 text-white/60">{item}</p>
              </Card>
            )
          )}
        </div>
      </Section>

      <Section id="services" title="Services forged for modern brands.">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map(([name, Icon]) => (
            <Card key={name} hover>
              <Icon className="mb-6 text-4xl text-red-500" />
              <h3 className="text-2xl font-black">{name}</h3>
              <p className="mt-4 text-white/55">
                Premium strategy, futuristic UI, cinematic motion, and elite
                execution.
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Why clients choose the blade.">
        <div className="grid gap-5 md:grid-cols-5">
          {why.map(([name, Icon]) => (
            <Card key={name}>
              <Icon className="mx-auto mb-4 text-3xl text-red-500" />
              <p className="text-center font-bold">{name}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="What people say.">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-red-500/20 bg-white/[0.04] p-10 text-center shadow-[0_0_80px_rgba(220,38,38,0.12)]">
          <AnimatePresence mode="wait">
            <motion.p
              key={testimonial}
              initial={{
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -20,
                filter: "blur(10px)",
              }}
              className="text-2xl font-bold text-white/80"
            >
              “{testimonials[testimonial]}”
            </motion.p>
          </AnimatePresence>
        </div>
      </Section>

      <Section id="contact" title="Let’s forge your digital empire.">
        <div className="grid gap-8 md:grid-cols-2">
          <form
            onSubmit={handleContactSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
          >
            <input
              name="name"
              placeholder="Name"
              className="mb-4 w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 outline-none transition focus:border-red-500 focus:shadow-[0_0_30px_rgba(220,38,38,0.25)]"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="mb-4 w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 outline-none transition focus:border-red-500 focus:shadow-[0_0_30px_rgba(220,38,38,0.25)]"
            />

            <input
              name="phone"
              type="tel"
              placeholder="Phone / WhatsApp Number"
              className="mb-4 w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 outline-none transition focus:border-red-500 focus:shadow-[0_0_30px_rgba(220,38,38,0.25)]"
            />

            <input
              name="budget"
              placeholder="Project Budget"
              className="mb-4 w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 outline-none transition focus:border-red-500 focus:shadow-[0_0_30px_rgba(220,38,38,0.25)]"
            />

            <textarea
              name="message"
              placeholder="Tell us about your project..."
              rows="5"
              className="mb-4 w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 outline-none transition focus:border-red-500 focus:shadow-[0_0_30px_rgba(220,38,38,0.25)]"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-red-600 px-7 py-4 font-bold shadow-[0_0_40px_rgba(220,38,38,0.5)] transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="flex flex-col justify-center rounded-[2rem] border border-red-500/20 bg-red-600/5 p-8">
            <h3 className="text-4xl font-black">SAMURAI WEBSITES</h3>

            <p className="mt-5 text-white/60">
              Dark luxury websites, animated interfaces, and futuristic digital
              experiences.
            </p>

            <div className="mt-8 flex gap-5 text-3xl text-red-500">
              <a
                href="https://discord.gg/S4fg23eVE"
                target="_blank"
                rel="noreferrer"
              >
                <FaDiscord className="transition hover:scale-125 hover:text-white" />
              </a>

              <a
                href="https://instagram.com/samurai_websites"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="transition hover:scale-125 hover:text-white" />
              </a>

              <a href="mailto:samurai.websites.dev@gmail.com">
                <FaEnvelope className="transition hover:scale-125 hover:text-white" />
              </a>
            </div>

            <p className="mt-8 text-sm text-white/40">
              Fill the form and your message will go straight to the Samurai
              Websites inbox.
            </p>
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/10 px-6 py-12 text-center">
        <div className="text-3xl font-black tracking-[0.3em]">
          侍 SAMURAI <span className="text-red-500">WEBSITES</span>
        </div>

        <div className="mx-auto my-6 h-px max-w-4xl bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <p className="text-white/40">
          © 2026 Samurai Websites. Built to dominate.
        </p>
      </footer>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="relative px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-7xl"
      >
        <h2 className="mb-14 max-w-4xl text-4xl md:text-6xl font-black leading-tight">
          {title}
        </h2>

        {children}
      </motion.div>
    </section>
  );
}

function Card({ children, hover }) {
  return (
    <motion.div
      whileHover={hover ? { y: -12, scale: 1.03 } : { y: -6 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition hover:border-red-500/60 hover:shadow-[0_0_60px_rgba(220,38,38,0.18)]"
    >
      {children}
    </motion.div>
  );
}

export default App;