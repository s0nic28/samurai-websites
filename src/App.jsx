import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaBolt,
  FaCrown,
  FaDiscord,
  FaEnvelope,
  FaInstagram,
  FaPaperPlane,
  FaRocket,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import logo from "./assets/logo.png";
import founder from "./assets/founder.jpg";
import "./index.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

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
      const res = await fetch("https://samurai-websites.onrender.com/register", {
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
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Backend error:", error);
      alert("Backend is not working");
    } finally {
      setSending(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-red-600 selection:text-white">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.35),transparent_35%)]" />

            <motion.div
              initial={{ scale: 0.75, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative text-center"
            >
              <motion.img
                src={logo}
                alt="Samurai Logo"
                className="w-28 h-28 object-contain mx-auto mb-8 drop-shadow-[0_0_35px_rgba(239,68,68,0.8)]"
                animate={{
                  y: [0, -14, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.h1
                className="text-4xl md:text-7xl font-black tracking-[0.35em] text-red-500"
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.35em" }}
                transition={{ duration: 1 }}
              >
                SAMURAI
              </motion.h1>

              <motion.div
                className="mt-6 h-1 w-72 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.4 }}
              />

              <motion.p
                className="mt-5 text-gray-400 tracking-[0.25em] text-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                FORGING DIGITAL EMPIRES
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.28),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(185,28,28,0.22),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] opacity-25" />
        <motion.div
          className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-red-600/20 blur-[120px]"
          animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-[460px] h-[460px] rounded-full bg-red-900/30 blur-[130px]"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl rounded-full border border-white/10 bg-black/55 backdrop-blur-2xl px-5 md:px-7 py-4 flex items-center justify-between shadow-[0_0_40px_rgba(239,68,68,0.18)]"
      >
        <a href="#" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Samurai Websites Logo"
            className="w-10 h-10 object-contain drop-shadow-[0_0_18px_rgba(239,68,68,0.8)]"
          />
          <span className="font-black tracking-[0.35em] text-red-500 text-xs md:text-sm">
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
              <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden sm:flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-sm font-bold hover:bg-red-700 transition shadow-lg shadow-red-600/25"
        >
          Start <FaArrowRight />
        </a>
      </motion.nav>

      <main className="relative z-10">
        <section className="min-h-screen flex items-center pt-36 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-red-400 text-sm font-bold tracking-[0.25em]"
              >
                <FaBolt /> FUTURISTIC WEB DESIGN
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95]"
              >
                Build your brand like a{" "}
                <span className="relative inline-block text-red-500 drop-shadow-[0_0_28px_rgba(239,68,68,0.55)]">
                  digital empire.
                  <span className="absolute left-0 -bottom-2 w-full h-2 bg-red-600/30 blur-md" />
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed"
              >
                Samurai Websites creates premium, cinematic, animated websites
                with modern UI, sharp branding, and samurai-level precision.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  href="#contact"
                  className="group px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 transition font-black shadow-[0_0_35px_rgba(239,68,68,0.45)] flex items-center gap-3"
                >
                  Start Project
                  <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  href="#services"
                  className="px-8 py-4 rounded-full border border-white/15 bg-white/5 hover:border-red-500 hover:bg-red-500/10 transition font-bold"
                >
                  View Services
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-3 gap-4 max-w-xl pt-6"
              >
                {[
                  ["10x", "Premium Feel"],
                  ["24/7", "Online Brand"],
                  ["100%", "Custom UI"],
                ].map(([num, label]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                  >
                    <p className="text-2xl md:text-3xl font-black text-red-500">
                      {num}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: 4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 2.05, duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-8 bg-red-600/25 blur-3xl rounded-full"
                animate={{ scale: [1, 1.13, 1], opacity: [0.45, 0.75, 0.45] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[2.5rem] border border-red-500/35 bg-white/[0.06] backdrop-blur-xl p-5 shadow-[0_0_70px_rgba(239,68,68,0.25)]"
              >
                <div className="absolute top-5 left-5 right-5 h-16 bg-gradient-to-b from-white/15 to-transparent rounded-t-[2rem] pointer-events-none" />

                <img
                  src={founder}
                  alt="Founder"
                  className="w-full h-[520px] object-cover rounded-[2rem] border border-white/10"
                />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                  className="absolute bottom-10 left-10 right-10 rounded-3xl bg-black/75 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl"
                >
                  <p className="text-red-500 font-black tracking-[0.25em] text-xs">
                    FOUNDER & CEO
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black mt-2">
                    Mithun Krrishnan D
                  </h2>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                    Founder of Samurai Websites, crafting premium digital
                    experiences with cinematic animations and samurai precision.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="px-6 py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-6xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-xl p-8 md:p-14 relative overflow-hidden"
          >
            <div className="absolute -right-32 -top-32 w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />

            <p className="text-red-500 tracking-[0.35em] font-black text-sm">
              ABOUT
            </p>

            <h2 className="text-4xl md:text-6xl font-black mt-4">
              Samurai Websites
            </h2>

            <p className="text-gray-400 mt-6 text-lg md:text-xl leading-relaxed max-w-4xl">
              Mithun Krrishnan D is the Founder & CEO of Samurai Websites, a
              futuristic web design brand focused on crafting premium digital
              experiences with modern UI, cinematic animations, and samurai
              precision.
            </p>

            <div className="grid md:grid-cols-3 gap-5 mt-10">
              {[
                {
                  icon: <FaCrown />,
                  title: "Premium Look",
                  text: "Luxury layouts that make brands feel expensive.",
                },
                {
                  icon: <FaBolt />,
                  title: "Insane Motion",
                  text: "Smooth cinematic animations and hover effects.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Sharp Precision",
                  text: "Clean sections, strong spacing, and serious polish.",
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="rounded-3xl border border-white/10 bg-black/35 p-6 hover:border-red-500/50 transition"
                >
                  <div className="text-red-500 text-3xl mb-5">{card.icon}</div>
                  <h3 className="text-xl font-black">{card.title}</h3>
                  <p className="text-gray-500 mt-3 leading-relaxed">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="founder" className="px-6 py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-red-600/20 blur-3xl rounded-full" />
              <img
                src={founder}
                alt="Founder"
                className="relative w-full h-[520px] object-cover rounded-[2.5rem] border border-red-500/30 shadow-[0_0_70px_rgba(239,68,68,0.18)]"
              />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-6"
            >
              <motion.p
                variants={fadeUp}
                className="text-red-500 tracking-[0.35em] font-black text-sm"
              >
                THE FOUNDER
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-6xl font-black"
              >
                Mithun Krrishnan D
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-gray-400 text-lg leading-relaxed"
              >
                Founder & CEO of Samurai Websites. Building futuristic websites
                for brands that want to look premium, powerful, and unforgettable.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
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
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <p className="text-red-500 tracking-[0.35em] font-black text-sm">
                SERVICES
              </p>

              <h2 className="text-4xl md:text-6xl font-black mt-4 mb-12">
                What we build
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FaRocket />,
                  title: "Premium Websites",
                  text: "Modern landing pages, portfolios, business sites, and high-end brand pages.",
                },
                {
                  icon: <FaStar />,
                  title: "Cinematic UI",
                  text: "Smooth animations, futuristic layouts, luxury visuals, and clean user experience.",
                },
                {
                  icon: <FaCrown />,
                  title: "Business Growth",
                  text: "Websites built to impress clients, collect leads, and make your brand look serious.",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.12, duration: 0.7 }}
                  whileHover={{
                    y: -14,
                    scale: 1.035,
                    rotate: index === 1 ? 0 : index === 0 ? -1 : 1,
                  }}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.045] backdrop-blur-xl p-8 hover:border-red-500/60 transition duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition duration-300" />

                  <div className="relative text-4xl mb-6 text-red-500 group-hover:scale-125 transition duration-300">
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

        <section id="contact" className="px-6 py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-red-600/20 blur-3xl" />

              <p className="relative text-red-500 tracking-[0.35em] font-black text-sm">
                CONTACT
              </p>

              <h2 className="relative text-4xl md:text-5xl font-black mt-4 mb-8">
                Start your project
              </h2>

              <div className="relative space-y-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/40 transition"
                />

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/40 transition"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/40 transition"
                />

                <input
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Budget"
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/40 transition"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us what website you want..."
                  rows="5"
                  className="w-full rounded-2xl bg-black/70 border border-white/10 text-white px-5 py-4 outline-none resize-none focus:border-red-500 focus:ring-4 focus:ring-red-600/25 transition"
                />

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-full bg-red-600 hover:bg-red-700 transition py-4 font-black shadow-[0_0_35px_rgba(239,68,68,0.45)] disabled:opacity-60 flex items-center justify-center gap-3"
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
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-300 font-bold"
                    >
                      Message delivered to Samurai Websites 🔥
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="rounded-[2.5rem] border border-red-500/30 bg-red-950/20 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden"
            >
              <motion.div
                className="absolute -right-24 top-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              <div className="relative">
                <h2 className="text-4xl md:text-6xl font-black">
                  SAMURAI WEBSITES
                </h2>

                <p className="text-gray-400 mt-5 leading-relaxed text-lg">
                  Dark luxury websites, animated interfaces, futuristic digital
                  experiences, and premium branding that makes people stop
                  scrolling.
                </p>

                <div className="flex gap-5 text-3xl mt-8 text-red-500">
                  <motion.span whileHover={{ y: -8, scale: 1.2 }}>
                    <FaDiscord />
                  </motion.span>
                  <motion.span whileHover={{ y: -8, scale: 1.2 }}>
                    <FaInstagram />
                  </motion.span>
                  <motion.span whileHover={{ y: -8, scale: 1.2 }}>
                    <FaEnvelope />
                  </motion.span>
                </div>

                <div className="mt-10 space-y-4">
                  {[
                    "Premium animated website design",
                    "Founder/brand portfolio sections",
                    "Lead form connected to backend",
                    "Modern responsive layout",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="px-6 py-10 border-t border-white/10 text-center text-gray-500 relative">
          <p>© 2026 Samurai Websites. Built with precision.</p>
        </footer>
      </main>
    </div>
  );
}