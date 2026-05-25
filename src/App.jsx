import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCode,
  FaCrown,
  FaEnvelope,
  FaFire,
  FaLaptopCode,
  FaPaperPlane,
  FaRocket,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import logo from "./assets/logo.png";
import founder from "./assets/founder.jpg";
import "./index.css";

const BACKEND_URL = "https://samurai-websites.onrender.com/register";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileUI /> : <DesktopUI />;
}

function useContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSent(false);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          budget: "",
          message: "",
        });

        setTimeout(() => setSent(false), 3500);
      } else {
        alert("Message failed. Try again.");
      }
    } catch (error) {
      console.error("Backend error:", error);
      alert("Backend is not working");
    } finally {
      setSending(false);
    }
  };

  return {
    formData,
    sending,
    sent,
    handleChange,
    handleSubmit,
  };
}

/* ================= MOBILE UI ================= */

function MobileUI() {
  const [loaded, setLoaded] = useState(false);
  const { formData, sending, sent, handleChange, handleSubmit } = useContactForm();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 850);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-red-600 selection:text-white">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black flex items-center justify-center px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.32),transparent_45%)]" />

            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="relative text-center"
            >
              <img
                src={logo}
                alt="Samurai Logo"
                className="w-24 h-24 object-contain mx-auto drop-shadow-[0_0_30px_rgba(239,68,68,0.9)]"
              />
              <h1 className="mt-6 text-3xl font-black tracking-[0.2em] text-red-500">
                SAMURAI
              </h1>
              <p className="mt-3 text-xs tracking-[0.22em] text-gray-400">
                MOBILE EXPERIENCE
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.28),transparent_34%),radial-gradient(circle_at_bottom,rgba(127,29,29,0.22),transparent_42%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
      </div>

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] rounded-full border border-white/10 bg-black/75 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          <span className="text-red-500 text-xs font-black tracking-[0.22em]">
            SAMURAI
          </span>
        </a>

        <a
          href="#contact"
          className="rounded-full bg-red-600 px-4 py-2 text-xs font-black shadow-[0_0_22px_rgba(239,68,68,0.45)]"
        >
          Start
        </a>
      </nav>

      <main className="relative z-10">
        <section className="min-h-screen px-4 pt-28 pb-16 flex items-center">
          <div className="w-full">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400 text-[11px] font-black tracking-[0.16em]"
            >
              <FaFire /> FUTURISTIC WEB DESIGN
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mt-6 text-5xl font-black leading-[0.95]"
            >
              Samurai Websites{" "}
              <span className="block text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.65)]">
                builds premium.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-6 text-gray-400 text-base leading-relaxed"
            >
              Smooth mobile-first websites with cinematic sections, premium
              branding, and lead forms that actually reach your email.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-7 flex flex-col gap-3"
            >
              <a
                href="#contact"
                className="w-full rounded-full bg-red-600 py-4 text-center font-black shadow-[0_0_34px_rgba(239,68,68,0.45)]"
              >
                Build My Website
              </a>

              <a
                href="#services"
                className="w-full rounded-full border border-white/15 bg-white/5 py-4 text-center font-bold"
              >
                See Services
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="mt-8 rounded-[2rem] border border-red-500/25 bg-white/[0.05] backdrop-blur-xl p-5 overflow-hidden relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/12 to-transparent"
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />

              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-2xl shadow-[0_0_24px_rgba(239,68,68,0.75)]">
                  ⚔️
                </div>

                <div>
                  <p className="font-black">Mobile optimized UI</p>
                  <p className="text-sm text-gray-500">
                    Smooth, fast, premium, not laggy.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="mt-8 grid grid-cols-1 gap-4"
            >
              {[
                ["Premium", "Brand feel that looks expensive."],
                ["Smooth", "Animations made for phones."],
                ["Leads", "Contact form connected to email."],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5"
                >
                  <p className="text-red-500 text-2xl font-black">{title}</p>
                  <p className="text-gray-500 text-sm mt-1">{text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-14">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-red-500/25 bg-red-950/20 p-6 backdrop-blur-xl"
          >
            <div className="text-center">
              <img
                src={logo}
                alt="Samurai"
                className="w-20 h-20 object-contain mx-auto drop-shadow-[0_0_28px_rgba(239,68,68,0.8)]"
              />
              <h2 className="mt-5 text-4xl font-black">
                SAMURAI
                <span className="block text-red-500">WEBSITES</span>
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Premium digital experiences forged with modern UI, cinematic
                motion, and samurai precision.
              </p>
            </div>
          </motion.div>
        </section>

        <section id="about" className="px-4 py-14">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
          >
            <p className="text-red-500 tracking-[0.25em] font-black text-xs">
              ABOUT
            </p>
            <h2 className="mt-4 text-3xl font-black">
              Wanna make your website look premium?
            </h2>
            <p className="mt-5 text-gray-400 leading-relaxed">
              Samurai Websites helps businesses look serious online with clean
              design, smooth sections, and a form that turns visitors into real
              client messages.
            </p>
          </motion.div>
        </section>

        <section id="founder" className="px-4 py-14">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-red-500/25 bg-black/45 p-4 backdrop-blur-xl"
          >
            <div className="rounded-[1.5rem] bg-black/70 overflow-hidden border border-white/10">
              <img
                src={founder}
                alt="Founder"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="p-3 pt-6">
              <p className="text-red-500 tracking-[0.25em] font-black text-xs">
                FOUNDER & CEO
              </p>
              <h2 className="mt-3 text-3xl font-black">Mithun Krrishnan D</h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Founder of Samurai Websites, building futuristic websites for
                brands that want to look premium and unforgettable.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Founder", "CEO", "Web Designer", "Digital Builder"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-300 text-xs font-bold"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="services" className="px-4 py-14">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-red-500 tracking-[0.25em] font-black text-xs">
              SERVICES
            </p>
            <h2 className="mt-4 text-3xl font-black">
              What your clients will see
            </h2>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: <FaLaptopCode />,
                  title: "Premium Websites",
                  text: "Landing pages, portfolios, and business websites.",
                },
                {
                  icon: <FaStar />,
                  title: "Smooth UI",
                  text: "Mobile-friendly animations that feel clean.",
                },
                {
                  icon: <FaCode />,
                  title: "Lead Forms",
                  text: "Client messages sent directly to your email.",
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
                >
                  <div className="text-red-500 text-3xl">{service.icon}</div>
                  <h3 className="mt-4 text-xl font-black">{service.title}</h3>
                  <p className="mt-2 text-gray-500 leading-relaxed">
                    {service.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="px-4 py-14">
          <div className="grid grid-cols-1 gap-4">
            {["Looks premium", "Loads clean", "Mobile smooth", "Gets leads"].map(
              (item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45 }}
                  className="rounded-[1.5rem] border border-red-500/20 bg-red-950/20 p-5 flex items-center gap-4"
                >
                  <span className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_18px_rgba(239,68,68,0.65)]">
                    <FaCheck />
                  </span>
                  <p className="font-black">{item}</p>
                </motion.div>
              )
            )}
          </div>
        </section>

        <section id="contact" className="px-4 py-14 pb-20">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
          >
            <p className="text-red-500 tracking-[0.25em] font-black text-xs">
              CONTACT
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Ready to look premium?
            </h2>

            <div className="mt-7 space-y-4">
              {[
                ["name", "Your name", "text"],
                ["email", "Your email", "email"],
                ["phone", "Phone number", "text"],
                ["budget", "Budget", "text"],
              ].map(([name, placeholder, type]) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required={name === "name" || name === "email"}
                  placeholder={placeholder}
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/30 text-sm"
                />
              ))}

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us what website you want..."
                rows="5"
                className="w-full rounded-2xl bg-black/70 border border-white/10 text-white px-5 py-4 outline-none resize-none focus:border-red-500 focus:ring-4 focus:ring-red-600/25 text-sm"
              />

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-red-600 py-4 font-black shadow-[0_0_28px_rgba(239,68,68,0.5)] disabled:opacity-60 flex items-center justify-center gap-3"
              >
                {sending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ⚔️
                    </motion.span>
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    Sent Successfully <FaStar />
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    className="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-300 font-bold text-sm"
                  >
                    Message delivered to Samurai Websites 🔥
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </section>

        <footer className="px-4 py-8 border-t border-white/10 text-center text-gray-500 text-sm">
          © 2026 Samurai Websites. Built with precision.
        </footer>
      </main>
    </div>
  );
}

/* ================= DESKTOP UI ================= */

function DesktopUI() {
  const [loaded, setLoaded] = useState(false);
  const { formData, sending, sent, handleChange, handleSubmit } = useContactForm();

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -260]);

  const sparks = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 5,
        size: 2 + Math.random() * 4,
      })),
    []
  );

  const slashLines = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: `${8 + i * 6}%`,
        delay: i * 0.18,
        width: 100 + Math.random() * 210,
      })),
    []
  );

  const orbitDots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        rotate: i * 20,
        delay: i * 0.08,
      })),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1300);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 45, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-red-600 selection:text-white">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black px-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(16px)" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.42),transparent_34%)]" />

            <motion.div
              initial={{ scale: 0.65, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative text-center"
            >
              <motion.img
                src={logo}
                alt="Samurai Logo"
                className="w-32 h-32 object-contain mx-auto mb-8 drop-shadow-[0_0_45px_rgba(239,68,68,1)]"
                animate={{
                  y: [0, -14, 0],
                  rotate: [0, 4, -4, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <h1 className="text-7xl font-black tracking-[0.35em] text-red-500">
                SAMURAI
              </h1>

              <motion.div
                className="mt-6 h-1 w-80 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full shadow-[0_0_30px_rgba(239,68,68,1)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.4 }}
              />

              <p className="mt-5 text-gray-300 tracking-[0.28em] text-sm">
                FORGING PREMIUM DIGITAL EXPERIENCES
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.32),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(127,29,29,0.34),transparent_36%)]" />

        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.9))]" />

        {sparks.map((spark) => (
          <motion.span
            key={spark.id}
            className="absolute rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,1)]"
            style={{
              left: spark.left,
              top: spark.top,
              width: spark.size,
              height: spark.size,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 1, 0],
              scale: [0.4, 1.4, 0.4],
            }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              delay: spark.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {slashLines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-red-500/70 to-transparent rotate-[-18deg]"
            style={{
              top: line.top,
              left: "-30%",
              width: line.width,
            }}
            animate={{
              x: ["0vw", "160vw"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: line.delay,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute -top-44 -right-44 w-[620px] h-[620px] rounded-full bg-red-600/24 blur-[140px]"
          animate={{ scale: [1, 1.28, 1], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-0 -left-44 w-[520px] h-[520px] rounded-full bg-red-900/35 blur-[140px]"
          animate={{ scale: [1.18, 1, 1.18], opacity: [0.3, 0.72, 0.3] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl rounded-full border border-white/10 bg-black/65 backdrop-blur-2xl px-7 py-4 flex items-center justify-between shadow-[0_0_45px_rgba(239,68,68,0.25)]"
      >
        <a href="#" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Samurai Websites Logo"
            className="w-10 h-10 object-contain drop-shadow-[0_0_18px_rgba(239,68,68,0.9)]"
          />
          <span className="font-black tracking-[0.35em] text-red-500 text-sm">
            SAMURAI
          </span>
        </a>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          {["About", "Founder", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-red-500 transition relative group"
            >
              {item}
              <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300 shadow-[0_0_12px_rgba(239,68,68,1)]" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-sm font-black hover:bg-red-700 transition shadow-lg shadow-red-600/30"
        >
          Start <FaArrowRight />
        </a>
      </motion.nav>

      <main className="relative z-10">
        <section className="min-h-screen flex items-center pt-36 px-6">
          <motion.div
            style={{ y: heroY }}
            className="absolute top-28 left-1/2 -translate-x-1/2 text-[18vw] font-black text-white/[0.025] tracking-tighter pointer-events-none whitespace-nowrap"
          >
            SAMURAI
          </motion.div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-red-400 text-sm font-black tracking-[0.24em]"
              >
                <FaFire /> FUTURISTIC WEB DESIGN
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-7xl xl:text-8xl font-black leading-[0.92]"
              >
                Samurai Websites{" "}
                <motion.span
                  className="relative inline-block text-red-500 drop-shadow-[0_0_34px_rgba(239,68,68,0.7)]"
                  animate={{
                    textShadow: [
                      "0 0 18px rgba(239,68,68,0.5)",
                      "0 0 38px rgba(239,68,68,1)",
                      "0 0 18px rgba(239,68,68,0.5)",
                    ],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  builds premium.
                  <span className="absolute left-0 -bottom-2 w-full h-2 bg-red-600/40 blur-md" />
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-gray-400 text-xl max-w-xl leading-relaxed"
              >
                Cinematic websites. Luxury interfaces. Samurai precision.
                Designed to make your brand look powerful, trusted, and
                unforgettable.
              </motion.p>

              <motion.div variants={fadeUp} className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.07, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  href="#contact"
                  className="group px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 transition font-black shadow-[0_0_42px_rgba(239,68,68,0.55)] flex items-center justify-center gap-3"
                >
                  Build My Website
                  <FaRocket />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.07, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  href="#services"
                  className="px-8 py-4 rounded-full border border-white/15 bg-white/5 hover:border-red-500 hover:bg-red-500/10 transition font-bold"
                >
                  See The Power
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="relative max-w-xl rounded-[2rem] border border-red-500/20 bg-black/40 p-4 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/15 to-transparent"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                  }}
                />

                <div className="relative flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-[0_0_28px_rgba(239,68,68,0.8)]"
                    animate={{
                      rotate: [0, 8, -8, 0],
                      scale: [1, 1.08, 1],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  >
                    ⚔️
                  </motion.div>

                  <div>
                    <p className="font-black text-white">
                      Cinematic brand system
                    </p>
                    <p className="text-gray-500 text-sm">
                      Built to make your website feel expensive instantly.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: 4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.7, duration: 1, ease: "easeOut" }}
              className="relative min-h-[620px] flex items-center justify-center"
            >
              <motion.div
                className="absolute -inset-10 bg-red-600/25 blur-3xl rounded-full"
                animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0.85, 0.45] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[620px] h-[560px] rounded-[2.8rem] border border-red-500/35 bg-white/[0.06] backdrop-blur-xl shadow-[0_0_95px_rgba(239,68,68,0.32)] overflow-hidden flex items-center justify-center"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none"
                  animate={{ x: ["-140%", "140%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                />

                <motion.div
                  className="absolute inset-8 rounded-[2.2rem] border border-red-500/25"
                  animate={{
                    boxShadow: [
                      "0 0 25px rgba(239,68,68,0.25)",
                      "0 0 70px rgba(239,68,68,0.55)",
                      "0 0 25px rgba(239,68,68,0.25)",
                    ],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                />

                <motion.div
                  className="absolute w-[390px] h-[390px] rounded-full border border-red-500/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                  className="absolute w-[490px] h-[490px] rounded-full border border-white/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />

                {orbitDots.map((dot) => (
                  <motion.div
                    key={dot.id}
                    className="absolute w-[430px] h-[430px]"
                    style={{ rotate: dot.rotate }}
                    animate={{ rotate: dot.rotate + 360 }}
                    transition={{
                      duration: 22,
                      repeat: Infinity,
                      ease: "linear",
                      delay: dot.delay,
                    }}
                  >
                    <span className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,1)]" />
                  </motion.div>
                ))}

                <motion.div
                  className="relative z-30 text-center px-8"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  <motion.img
                    src={logo}
                    alt="Samurai Websites Brand Logo"
                    className="w-32 h-32 object-contain mx-auto mb-8 drop-shadow-[0_0_42px_rgba(239,68,68,1)]"
                    animate={{
                      y: [0, -14, 0],
                      rotate: [0, 3, -3, 0],
                      scale: [1, 1.08, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <motion.h2
                    className="text-6xl font-black tracking-tight"
                    animate={{
                      textShadow: [
                        "0 0 18px rgba(255,255,255,0.15)",
                        "0 0 32px rgba(239,68,68,0.55)",
                        "0 0 18px rgba(255,255,255,0.15)",
                      ],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                  >
                    SAMURAI
                    <span className="block text-red-500">WEBSITES</span>
                  </motion.h2>

                  <p className="mt-6 text-gray-300 text-lg leading-relaxed">
                    Premium digital experiences forged with cinematic motion,
                    modern UI, and samurai precision.
                  </p>

                  <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-red-500/35 bg-red-500/10 px-6 py-3 text-red-300 font-black tracking-[0.18em] text-xs">
                    <FaBolt /> CRAFTED TO IMPRESS
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <SharedSections
          formData={formData}
          sending={sending}
          sent={sent}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          desktop
        />
      </main>
    </div>
  );
}

/* ================= SHARED DESKTOP SECTIONS ================= */

function SharedSections({
  formData,
  sending,
  sent,
  handleChange,
  handleSubmit,
  desktop = false,
}) {
  const sectionClass = desktop
    ? "px-6 py-24"
    : "px-4 sm:px-6 py-16 sm:py-24";

  const cardRadius = desktop ? "rounded-[2.5rem]" : "rounded-[2rem] sm:rounded-[2.5rem]";

  return (
    <>
      <section id="about" className={sectionClass}>
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.7 }}
          className={`max-w-6xl mx-auto ${cardRadius} border border-white/10 bg-white/[0.045] backdrop-blur-xl p-6 sm:p-8 md:p-14 relative overflow-hidden`}
        >
          <p className="text-red-500 tracking-[0.25em] sm:tracking-[0.35em] font-black text-xs sm:text-sm">
            ABOUT
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4">
            Wanna make your website look premium?
          </h2>

          <p className="text-gray-400 mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl">
            Samurai Websites helps businesses look premium online with bold
            visuals, cinematic motion, smooth sections, and forms that turn
            visitors into real client conversations.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {[
              {
                icon: <FaCrown />,
                title: "Premium Look",
                text: "Luxury layouts that instantly make brands feel more valuable.",
              },
              {
                icon: <FaBolt />,
                title: "Smooth Motion",
                text: "Cinematic animations that feel clean and modern.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Trust Builder",
                text: "Clean design that makes clients feel confident to contact you.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -10, scale: 1.025 }}
                className="rounded-3xl border border-white/10 bg-black/35 p-6 hover:border-red-500/45 transition group"
              >
                <div className="text-red-500 text-3xl mb-5 group-hover:scale-110 transition">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black">{card.title}</h3>
                <p className="text-gray-500 mt-3 leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="founder" className={sectionClass}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: desktop ? -60 : 0, y: desktop ? 0 : 26 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-red-600/18 blur-3xl rounded-full" />

            <div className="relative w-full h-[500px] sm:h-[540px] rounded-[2rem] sm:rounded-[2.5rem] border border-red-500/30 shadow-[0_0_70px_rgba(239,68,68,0.18)] overflow-hidden bg-black/70 flex items-center justify-center p-3">
              <img
                src={founder}
                alt="Founder"
                className="relative z-0 w-full h-full object-contain rounded-[1.5rem]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: desktop ? 60 : 0, y: desktop ? 0 : 26 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.75 }}
            className="space-y-6 text-center lg:text-left"
          >
            <p className="text-red-500 tracking-[0.25em] sm:tracking-[0.35em] font-black text-xs sm:text-sm">
              THE FOUNDER
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
              Mithun Krrishnan D
            </h2>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              Founder & CEO of Samurai Websites. Building futuristic websites
              for brands that want to look premium, powerful, and unforgettable.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {["Founder", "CEO", "Web Designer", "Digital Builder"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-red-300 text-sm font-bold"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="rounded-[2rem] border border-red-500/30 bg-red-500/10 p-6">
              <p className="text-2xl md:text-3xl font-black text-white">
                Wanna make your website look premium?
              </p>
              <p className="text-gray-400 mt-3 leading-relaxed">
                Send a message below and let Samurai Websites build your brand’s
                digital first impression.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className={sectionClass}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.65 }}
            className="text-center lg:text-left"
          >
            <p className="text-red-500 tracking-[0.25em] sm:tracking-[0.35em] font-black text-xs sm:text-sm">
              SERVICES
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4 mb-10 sm:mb-12">
              What your clients will see
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaLaptopCode />,
                title: "Premium Websites",
                text: "Modern landing pages, portfolios, business sites, and high-end brand pages.",
              },
              {
                icon: <FaStar />,
                title: "Cinematic UI",
                text: "Luxury visuals, smooth motion, and clean user experience.",
              },
              {
                icon: <FaCode />,
                title: "Lead Forms",
                text: "Contact forms connected to backend email so every client message reaches you.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 45, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ delay: index * 0.08, duration: 0.65 }}
                whileHover={{
                  y: -12,
                  scale: 1.025,
                  rotate: index === 1 ? 0 : index === 0 ? -0.6 : 0.6,
                }}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.045] backdrop-blur-xl p-7 sm:p-8 hover:border-red-500/50 transition duration-300 relative overflow-hidden text-center sm:text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/18 opacity-0 group-hover:opacity-100 transition duration-300" />

                <div className="relative text-4xl mb-6 text-red-500 flex justify-center sm:block">
                  {service.icon}
                </div>

                <h3 className="relative text-2xl font-black">
                  {service.title}
                </h3>

                <p className="relative text-gray-400 mt-4 leading-relaxed">
                  {service.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="max-w-7xl mx-auto">
          <div className={`${cardRadius} border border-red-500/25 bg-red-950/20 p-6 sm:p-8 md:p-14 backdrop-blur-xl relative overflow-hidden`}>
            <div className="relative grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {["Looks premium", "Loads clean", "Mobile responsive", "Gets real leads"].map(
                (item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.035, y: -5 }}
                    className="rounded-3xl bg-black/35 border border-white/10 p-6 flex items-center gap-4"
                  >
                    <span className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_22px_rgba(239,68,68,0.75)] shrink-0">
                      <FaCheck />
                    </span>
                    <p className="font-black">{item}</p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={sectionClass}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: desktop ? -45 : 0, y: desktop ? 0 : 26 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className={`${cardRadius} border border-white/10 bg-white/[0.045] backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden`}
          >
            <p className="relative text-red-500 tracking-[0.25em] sm:tracking-[0.35em] font-black text-xs sm:text-sm">
              CONTACT
            </p>

            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-black mt-4 mb-8">
              Ready to look premium?
            </h2>

            <div className="relative space-y-4">
              {[
                ["name", "Your name", "text"],
                ["email", "Your email", "email"],
                ["phone", "Phone number", "text"],
                ["budget", "Budget", "text"],
              ].map(([name, placeholder, type]) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required={name === "name" || name === "email"}
                  placeholder={placeholder}
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/35 transition text-sm sm:text-base focus:scale-[1.005]"
                />
              ))}

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us what website you want..."
                rows="5"
                className="w-full rounded-2xl bg-black/70 border border-white/10 text-white px-5 py-4 outline-none resize-none focus:border-red-500 focus:ring-4 focus:ring-red-600/25 transition text-sm sm:text-base focus:scale-[1.005]"
              />

              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-red-600 hover:bg-red-700 transition py-4 font-black shadow-[0_0_36px_rgba(239,68,68,0.5)] disabled:opacity-60 flex items-center justify-center gap-3"
              >
                {sending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block"
                    >
                      ⚔️
                    </motion.span>
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    Sent Successfully <FaStar />
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 0.95 }}
                    className="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-300 font-bold text-sm sm:text-base"
                  >
                    Message delivered to Samurai Websites 🔥
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: desktop ? 45 : 0, y: desktop ? 0 : 26 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className={`${cardRadius} border border-red-500/30 bg-red-950/20 backdrop-blur-xl p-6 sm:p-8 md:p-10 flex flex-col justify-center relative overflow-hidden text-center lg:text-left`}
          >
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
                SAMURAI WEBSITES
              </h2>

              <p className="text-gray-400 mt-5 leading-relaxed text-base sm:text-lg">
                A premium website is not just design. It is trust, attention,
                and a reason for customers to contact you before someone else.
              </p>

              <div className="mt-10 space-y-4 text-left">
                {[
                  "Premium animated website design",
                  "Founder and business portfolio sections",
                  "Lead form connected to email backend",
                  "Modern responsive layout",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-300">
                    <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_14px_rgba(239,68,68,1)] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="px-4 sm:px-6 py-10 border-t border-white/10 text-center text-gray-500 relative text-sm">
        <p>© 2026 Samurai Websites. Built with precision.</p>
      </footer>
    </>
  );
}