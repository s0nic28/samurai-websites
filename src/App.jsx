import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCode,
  FaCrown,
  FaDiscord,
  FaEnvelope,
  FaFire,
  FaInstagram,
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
  const [loaded, setLoaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const glowScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.35]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });

  const sparks = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 4,
        duration: 2.5 + Math.random() * 5,
        size: 2 + Math.random() * 5,
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

  const slashLines = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        top: `${6 + i * 6}%`,
        delay: i * 0.16,
        width: 100 + Math.random() * 200,
      })),
    []
  );

  const floatingWords = ["PREMIUM", "CINEMATIC", "SAMURAI", "MODERN", "BRAND"];

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1600);

    const move = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", move);
    };
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

  const fadeUp = {
    hidden: { opacity: 0, y: 55, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.11,
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
            exit={{ opacity: 0, scale: 1.1, filter: "blur(16px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.42),transparent_34%)]" />

            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{ backgroundPosition: ["0px 0px", "120px 120px"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <motion.div
              initial={{ scale: 0.65, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative text-center"
            >
              <motion.img
                src={logo}
                alt="Samurai Logo"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-auto mb-6 sm:mb-8 drop-shadow-[0_0_45px_rgba(239,68,68,1)]"
                animate={{
                  y: [0, -16, 0],
                  rotate: [0, 4, -4, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.h1
                className="text-3xl sm:text-4xl md:text-7xl font-black tracking-[0.18em] sm:tracking-[0.35em] text-red-500"
                initial={{ opacity: 0, letterSpacing: "0.05em" }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                SAMURAI
              </motion.h1>

              <motion.div
                className="mt-6 h-1 w-56 sm:w-80 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full shadow-[0_0_30px_rgba(239,68,68,1)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.4 }}
              />

              <motion.p
                className="mt-5 text-gray-300 tracking-[0.14em] sm:tracking-[0.28em] text-xs sm:text-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                FORGING PREMIUM DIGITAL EXPERIENCES
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed z-[998] hidden lg:block w-8 h-8 rounded-full pointer-events-none border border-red-500/60 mix-blend-difference"
        animate={{
          x: cursor.x - 16,
          y: cursor.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />

      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          style={{ scale: glowScale }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.34),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(127,29,29,0.35),transparent_36%)]"
        />

        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.88))]" />

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
              duration: 2.4,
              repeat: Infinity,
              delay: line.delay,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {floatingWords.map((word, index) => (
          <motion.div
            key={word}
            className="absolute hidden sm:block text-white/[0.035] font-black tracking-[0.35em] text-4xl md:text-6xl"
            style={{
              top: `${18 + index * 16}%`,
              left: index % 2 === 0 ? "6%" : "62%",
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.025, 0.08, 0.025],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {word}
          </motion.div>
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
        transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl rounded-full border border-white/10 bg-black/60 backdrop-blur-2xl px-4 sm:px-7 py-3 sm:py-4 flex items-center justify-between shadow-[0_0_45px_rgba(239,68,68,0.25)]"
      >
        <a href="#" className="flex items-center gap-2 sm:gap-3">
          <motion.img
            src={logo}
            alt="Samurai Websites Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_18px_rgba(239,68,68,0.9)]"
            whileHover={{ rotate: 360, scale: 1.18 }}
            transition={{ duration: 0.7 }}
          />
          <span className="font-black tracking-[0.2em] sm:tracking-[0.35em] text-red-500 text-[10px] sm:text-sm">
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

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-full bg-red-600 px-4 sm:px-5 py-2 text-xs sm:text-sm font-black hover:bg-red-700 transition shadow-lg shadow-red-600/30"
        >
          Start <FaArrowRight className="hidden sm:block" />
        </motion.a>
      </motion.nav>

      <main className="relative z-10">
        <section className="min-h-screen flex items-center pt-28 sm:pt-36 px-4 sm:px-6">
          <motion.div
            style={{ y: heroY }}
            className="absolute top-28 left-1/2 -translate-x-1/2 text-[18vw] font-black text-white/[0.025] tracking-tighter pointer-events-none whitespace-nowrap"
          >
            SAMURAI
          </motion.div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-4 sm:px-5 py-2 text-red-400 text-[11px] sm:text-sm font-black tracking-[0.16em] sm:tracking-[0.24em] shadow-[0_0_25px_rgba(239,68,68,0.18)]"
              >
                <FaFire /> FUTURISTIC WEB DESIGN
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95]"
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
                className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Cinematic websites. Luxury interfaces. Samurai precision.
                Designed to make your brand look powerful, trusted, and
                unforgettable.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.a
                  whileHover={{ scale: 1.07, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  href="#contact"
                  className="group px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 transition font-black shadow-[0_0_42px_rgba(239,68,68,0.55)] flex items-center justify-center gap-3"
                >
                  Build My Website
                  <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.07, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  href="#services"
                  className="px-8 py-4 rounded-full border border-white/15 bg-white/5 hover:border-red-500 hover:bg-red-500/10 transition font-bold flex items-center justify-center"
                >
                  See The Power
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="relative mx-auto lg:mx-0 max-w-xl rounded-[2rem] border border-red-500/20 bg-black/40 p-4 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/15 to-transparent"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
                />

                <div className="relative flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-[0_0_28px_rgba(239,68,68,0.8)]"
                    animate={{
                      rotate: [0, 8, -8, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚔️
                  </motion.div>

                  <div className="text-left">
                    <p className="font-black text-white">
                      Live cinematic brand system
                    </p>
                    <p className="text-gray-500 text-sm">
                      Built to make your website feel expensive instantly.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 pt-4 sm:pt-6"
              >
                {[
                  ["Premium", "Brand Feel"],
                  ["Cinematic", "Motion UI"],
                  ["Lead", "Focused Design"],
                ].map(([num, label]) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -8, scale: 1.04 }}
                    className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl hover:border-red-500/50 transition"
                  >
                    <p className="text-2xl sm:text-xl md:text-3xl font-black text-red-500">
                      {num}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: 4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.9, duration: 1, ease: "easeOut" }}
              className="relative min-h-[420px] sm:min-h-[620px] flex items-center justify-center"
            >
              <motion.div
                className="absolute -inset-10 bg-red-600/25 blur-3xl rounded-full"
                animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0.85, 0.45] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[620px] h-[390px] sm:h-[560px] rounded-[2rem] sm:rounded-[2.8rem] border border-red-500/35 bg-white/[0.06] backdrop-blur-xl shadow-[0_0_95px_rgba(239,68,68,0.32)] overflow-hidden flex items-center justify-center"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none"
                  animate={{ x: ["-140%", "140%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                />

                <motion.div
                  className="absolute inset-5 sm:inset-8 rounded-[1.6rem] sm:rounded-[2.2rem] border border-red-500/25"
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
                  className="absolute w-[240px] h-[240px] sm:w-[390px] sm:h-[390px] rounded-full border border-red-500/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                  className="absolute w-[310px] h-[310px] sm:w-[490px] sm:h-[490px] rounded-full border border-white/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />

                {orbitDots.map((dot) => (
                  <motion.div
                    key={dot.id}
                    className="absolute w-[280px] h-[280px] sm:w-[430px] sm:h-[430px]"
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
                  className="relative z-30 text-center px-6 sm:px-8"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                >
                  <motion.img
                    src={logo}
                    alt="Samurai Websites Brand Logo"
                    className="w-20 h-20 sm:w-32 sm:h-32 object-contain mx-auto mb-5 sm:mb-8 drop-shadow-[0_0_42px_rgba(239,68,68,1)]"
                    animate={{
                      y: [0, -14, 0],
                      rotate: [0, 3, -3, 0],
                      scale: [1, 1.08, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <motion.h2
                    className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight"
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

                  <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-lg leading-relaxed">
                    Premium digital experiences forged with cinematic motion,
                    modern UI, and samurai precision.
                  </p>

                  <motion.div
                    className="mt-6 sm:mt-8 inline-flex items-center gap-3 rounded-full border border-red-500/35 bg-red-500/10 px-4 sm:px-6 py-3 text-red-300 font-black tracking-[0.12em] sm:tracking-[0.18em] text-[10px] sm:text-xs"
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    <FaBolt /> CRAFTED TO IMPRESS
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-6xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-xl p-6 sm:p-8 md:p-14 relative overflow-hidden shadow-[0_0_70px_rgba(239,68,68,0.12)]"
          >
            <div className="absolute -right-32 -top-32 w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />

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
                  title: "Insane Motion",
                  text: "Smooth animations that make the website feel alive.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Trust Builder",
                  text: "Clean design that makes clients feel confident to contact you.",
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -12, scale: 1.035 }}
                  className="rounded-3xl border border-white/10 bg-black/35 p-6 hover:border-red-500/50 transition group"
                >
                  <div className="text-red-500 text-3xl mb-5 group-hover:scale-125 transition">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-black">{card.title}</h3>
                  <p className="text-gray-500 mt-3 leading-relaxed">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="founder" className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -70, rotate: -3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-red-600/20 blur-3xl rounded-full" />
              <motion.img
                whileHover={{ scale: 1.025, rotate: 1 }}
                src={founder}
                alt="Founder"
                className="relative w-full h-[380px] sm:h-[520px] object-cover object-top rounded-[2rem] sm:rounded-[2.5rem] border border-red-500/30 shadow-[0_0_80px_rgba(239,68,68,0.2)]"
              />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-6 text-center lg:text-left"
            >
              <motion.p
                variants={fadeUp}
                className="text-red-500 tracking-[0.25em] sm:tracking-[0.35em] font-black text-xs sm:text-sm"
              >
                THE FOUNDER
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-6xl font-black"
              >
                Mithun Krrishnan D
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-gray-400 text-base sm:text-lg leading-relaxed"
              >
                Founder & CEO of Samurai Websites. Building futuristic websites
                for brands that want to look premium, powerful, and
                unforgettable.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
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

              <motion.div
                variants={fadeUp}
                className="rounded-[2rem] border border-red-500/30 bg-red-500/10 p-6"
              >
                <p className="text-2xl md:text-3xl font-black text-white">
                  Wanna make your website look premium?
                </p>
                <p className="text-gray-400 mt-3 leading-relaxed">
                  Send a message below and let Samurai Websites build your
                  brand’s digital first impression.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
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
                  text: "Smooth animations, futuristic layouts, luxury visuals, and clean user experience.",
                },
                {
                  icon: <FaCode />,
                  title: "Lead Forms",
                  text: "Contact forms connected to backend email so every client message reaches you.",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 60, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.12, duration: 0.7 }}
                  whileHover={{
                    y: -16,
                    scale: 1.04,
                    rotate: index === 1 ? 0 : index === 0 ? -1 : 1,
                  }}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.045] backdrop-blur-xl p-7 sm:p-8 hover:border-red-500/60 transition duration-300 relative overflow-hidden text-center sm:text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition duration-300" />

                  <motion.div
                    className="relative text-4xl mb-6 text-red-500 flex justify-center sm:block"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {service.icon}
                  </motion.div>

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

        <section className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-[2rem] sm:rounded-[2.5rem] border border-red-500/25 bg-red-950/20 p-6 sm:p-8 md:p-14 backdrop-blur-xl relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              />

              <div className="relative grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[
                  "Looks premium",
                  "Loads clean",
                  "Mobile responsive",
                  "Gets real leads",
                ].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05, y: -6 }}
                    className="rounded-3xl bg-black/35 border border-white/10 p-6 flex items-center gap-4"
                  >
                    <span className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_24px_rgba(239,68,68,0.8)] shrink-0">
                      <FaCheck />
                    </span>
                    <p className="font-black">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-red-600/20 blur-3xl" />

              <p className="relative text-red-500 tracking-[0.25em] sm:tracking-[0.35em] font-black text-xs sm:text-sm">
                CONTACT
              </p>

              <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-black mt-4 mb-8">
                Ready to look premium?
              </h2>

              <div className="relative space-y-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/40 transition text-sm sm:text-base hover:scale-[1.015] focus:scale-[1.015]"
                />

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/40 transition text-sm sm:text-base hover:scale-[1.015] focus:scale-[1.015]"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/40 transition text-sm sm:text-base hover:scale-[1.015] focus:scale-[1.015]"
                />

                <input
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Budget"
                  className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none focus:ring-4 focus:ring-red-600/40 transition text-sm sm:text-base hover:scale-[1.015] focus:scale-[1.015]"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us what website you want..."
                  rows="5"
                  className="w-full rounded-2xl bg-black/70 border border-white/10 text-white px-5 py-4 outline-none resize-none focus:border-red-500 focus:ring-4 focus:ring-red-600/25 transition text-sm sm:text-base hover:scale-[1.015] focus:scale-[1.015]"
                />

                <motion.button
                  whileHover={{ scale: 1.035 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-full bg-red-600 hover:bg-red-700 transition py-4 font-black shadow-[0_0_42px_rgba(239,68,68,0.55)] disabled:opacity-60 flex items-center justify-center gap-3"
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
                      className="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-300 font-bold text-sm sm:text-base"
                    >
                      Message delivered to Samurai Websites 🔥
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="rounded-[2rem] sm:rounded-[2.5rem] border border-red-500/30 bg-red-950/20 backdrop-blur-xl p-6 sm:p-8 md:p-10 flex flex-col justify-center relative overflow-hidden text-center lg:text-left"
            >
              <motion.div
                className="absolute -right-24 top-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              <div className="relative">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
                  SAMURAI WEBSITES
                </h2>

                <p className="text-gray-400 mt-5 leading-relaxed text-base sm:text-lg">
                  A premium website is not just design. It is trust, attention,
                  and a reason for customers to contact you before someone else.
                </p>

                <div className="flex justify-center lg:justify-start gap-5 text-3xl mt-8 text-red-500">
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

                <div className="mt-10 space-y-4 text-left">
                  {[
                    "Premium animated website design",
                    "Founder and business portfolio sections",
                    "Lead form connected to email backend",
                    "Modern responsive layout",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)] shrink-0" />
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
      </main>
    </div>
  );
}