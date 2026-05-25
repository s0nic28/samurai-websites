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
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });

  const desktopParticles = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 4,
        size: 2 + Math.random() * 4,
      })),
    []
  );

  const mobileParticles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 4,
        size: 2 + Math.random() * 3,
      })),
    []
  );

  const slashLines = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        top: `${12 + i * 12}%`,
        delay: i * 0.35,
        width: 120 + Math.random() * 170,
      })),
    []
  );

  const particles = isMobile ? mobileParticles : desktopParticles;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1100);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
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
    hidden: { opacity: 0, y: 34 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const premiumCards = [
    {
      icon: <FaCrown />,
      title: "Premium Look",
      text: "Luxury layouts that instantly make brands feel more valuable.",
    },
    {
      icon: <FaBolt />,
      title: "Smooth Motion",
      text: "Cinematic animations that feel clean, not laggy.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trust Builder",
      text: "Professional sections that make clients ready to contact you.",
    },
  ];

  const services = [
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
      text: "Contact forms connected to backend email so every message reaches you.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-red-600 selection:text-white">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black px-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.35),transparent_42%)]" />

            <motion.div
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative text-center"
            >
              <motion.img
                src={logo}
                alt="Samurai Logo"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-auto mb-6 drop-shadow-[0_0_35px_rgba(239,68,68,0.9)]"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.06, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.h1
                className="text-3xl sm:text-5xl md:text-7xl font-black tracking-[0.16em] sm:tracking-[0.32em] text-red-500"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
              >
                SAMURAI
              </motion.h1>

              <motion.div
                className="mt-5 h-1 w-56 sm:w-80 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full shadow-[0_0_24px_rgba(239,68,68,1)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.25 }}
              />

              <motion.p
                className="mt-5 text-gray-300 tracking-[0.12em] sm:tracking-[0.25em] text-xs sm:text-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                PREMIUM DIGITAL EXPERIENCES
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.28),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(127,29,29,0.3),transparent_42%)]" />

        <div
          className="absolute inset-0 opacity-[0.13] sm:opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.92))]" />

        {particles.map((spark) => (
          <motion.span
            key={spark.id}
            className="absolute rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]"
            style={{
              left: spark.left,
              top: spark.top,
              width: spark.size,
              height: spark.size,
              willChange: "transform, opacity",
            }}
            animate={{
              y: [0, -90, 0],
              opacity: [0, 0.9, 0],
              scale: [0.6, 1.2, 0.6],
            }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              delay: spark.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {!isMobile &&
          slashLines.map((line) => (
            <motion.div
              key={line.id}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent rotate-[-18deg]"
              style={{
                top: line.top,
                left: "-30%",
                width: line.width,
                willChange: "transform, opacity",
              }}
              animate={{
                x: ["0vw", "160vw"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: line.delay,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />
          ))}

        <motion.div
          className="absolute -top-44 -right-44 w-[420px] sm:w-[620px] h-[420px] sm:h-[620px] rounded-full bg-red-600/20 blur-[95px] sm:blur-[140px]"
          animate={{ scale: [1, 1.16, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-0 -left-44 w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full bg-red-900/28 blur-[90px] sm:blur-[140px]"
          animate={{ scale: [1.12, 1, 1.12], opacity: [0.28, 0.55, 0.28] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.65, ease: "easeOut" }}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl rounded-full border border-white/10 bg-black/70 backdrop-blur-xl px-4 sm:px-7 py-3 sm:py-4 flex items-center justify-between shadow-[0_0_35px_rgba(239,68,68,0.22)]"
      >
        <a href="#" className="flex items-center gap-2 sm:gap-3">
          <motion.img
            src={logo}
            alt="Samurai Websites Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_16px_rgba(239,68,68,0.85)]"
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ duration: 0.65 }}
          />
          <span className="font-black tracking-[0.18em] sm:tracking-[0.35em] text-red-500 text-[10px] sm:text-sm">
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

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 rounded-full bg-red-600 px-4 sm:px-5 py-2 text-xs sm:text-sm font-black hover:bg-red-700 transition shadow-lg shadow-red-600/25"
        >
          Start <FaArrowRight className="hidden sm:block" />
        </motion.a>
      </motion.nav>

      <main className="relative z-10">
        <section className="min-h-screen flex items-center pt-28 sm:pt-36 px-4 sm:px-6">
          <motion.div
            style={{ y: heroY }}
            className="absolute top-32 left-1/2 -translate-x-1/2 text-[18vw] font-black text-white/[0.025] tracking-tighter pointer-events-none whitespace-nowrap"
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
                className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-4 sm:px-5 py-2 text-red-400 text-[11px] sm:text-sm font-black tracking-[0.15em] sm:tracking-[0.22em]"
              >
                <FaFire /> FUTURISTIC WEB DESIGN
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95]"
              >
                Samurai Websites{" "}
                <motion.span
                  className="relative inline-block text-red-500"
                  animate={{
                    textShadow: [
                      "0 0 18px rgba(239,68,68,0.45)",
                      "0 0 34px rgba(239,68,68,0.9)",
                      "0 0 18px rgba(239,68,68,0.45)",
                    ],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity }}
                >
                  builds premium.
                  <span className="absolute left-0 -bottom-2 w-full h-2 bg-red-600/35 blur-md" />
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
                  whileHover={{ scale: 1.055, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  href="#contact"
                  className="group px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 transition font-black shadow-[0_0_34px_rgba(239,68,68,0.48)] flex items-center justify-center gap-3"
                >
                  Build My Website
                  <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.055, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  href="#services"
                  className="px-8 py-4 rounded-full border border-white/15 bg-white/5 hover:border-red-500 hover:bg-red-500/10 transition font-bold flex items-center justify-center"
                >
                  See The Power
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="relative mx-auto lg:mx-0 max-w-xl rounded-[2rem] border border-red-500/20 bg-black/45 p-4 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/14 to-transparent"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />

                <div className="relative flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-[0_0_24px_rgba(239,68,68,0.75)] shrink-0"
                    animate={{
                      rotate: [0, 6, -6, 0],
                      scale: [1, 1.06, 1],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    ⚔️
                  </motion.div>

                  <div className="text-left">
                    <p className="font-black text-white">
                      Cinematic brand system
                    </p>
                    <p className="text-gray-500 text-sm">
                      Smooth, premium, mobile-friendly motion.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 pt-4"
              >
                {[
                  ["Premium", "Brand Feel"],
                  ["Smooth", "Mobile UI"],
                  ["Lead", "Focused Design"],
                ].map(([num, label]) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -6, scale: 1.025 }}
                    className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl hover:border-red-500/45 transition"
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.35, duration: 0.8, ease: "easeOut" }}
              className="relative min-h-[390px] sm:min-h-[600px] flex items-center justify-center"
            >
              <motion.div
                className="absolute -inset-8 bg-red-600/20 blur-3xl rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.42, 0.72, 0.42] }}
                transition={{ duration: 5.5, repeat: Infinity }}
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[620px] h-[370px] sm:h-[560px] rounded-[2rem] sm:rounded-[2.8rem] border border-red-500/35 bg-white/[0.06] backdrop-blur-lg shadow-[0_0_72px_rgba(239,68,68,0.28)] overflow-hidden flex items-center justify-center"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent z-20 pointer-events-none"
                  animate={{ x: ["-140%", "140%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2.8 }}
                />

                <motion.div
                  className="absolute inset-5 sm:inset-8 rounded-[1.6rem] sm:rounded-[2.2rem] border border-red-500/25"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(239,68,68,0.24)",
                      "0 0 50px rgba(239,68,68,0.5)",
                      "0 0 20px rgba(239,68,68,0.24)",
                    ],
                  }}
                  transition={{ duration: 3.4, repeat: Infinity }}
                />

                <motion.div
                  className="absolute w-[230px] h-[230px] sm:w-[380px] sm:h-[380px] rounded-full border border-red-500/25"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />

                {!isMobile && (
                  <motion.div
                    className="absolute w-[490px] h-[490px] rounded-full border border-white/10"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 38,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}

                <motion.div
                  className="relative z-30 text-center px-6 sm:px-8"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.75 }}
                >
                  <motion.img
                    src={logo}
                    alt="Samurai Websites Brand Logo"
                    className="w-20 h-20 sm:w-32 sm:h-32 object-contain mx-auto mb-5 sm:mb-8 drop-shadow-[0_0_36px_rgba(239,68,68,0.95)]"
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.06, 1],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  />

                  <motion.h2
                    className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight"
                    animate={{
                      textShadow: [
                        "0 0 14px rgba(255,255,255,0.12)",
                        "0 0 28px rgba(239,68,68,0.48)",
                        "0 0 14px rgba(255,255,255,0.12)",
                      ],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity }}
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
                    animate={{ scale: [1, 1.035, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
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
            viewport={{ once: true, amount: 0.22 }}
            className="max-w-6xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-lg p-6 sm:p-8 md:p-14 relative overflow-hidden shadow-[0_0_60px_rgba(239,68,68,0.1)]"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}
            />

            <div className="relative">
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
                {premiumCards.map((card) => (
                  <motion.div
                    key={card.title}
                    whileHover={{ y: -10, scale: 1.025 }}
                    className="rounded-3xl border border-white/10 bg-black/35 p-6 hover:border-red-500/45 transition group"
                  >
                    <div className="text-red-500 text-3xl mb-5 group-hover:scale-110 transition">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-black">{card.title}</h3>
                    <p className="text-gray-500 mt-3 leading-relaxed">
                      {card.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="founder" className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.75 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-red-600/18 blur-3xl rounded-full" />

              <motion.div
                whileHover={{ scale: 1.015 }}
                className="relative w-full h-[500px] sm:h-[540px] rounded-[2rem] sm:rounded-[2.5rem] border border-red-500/30 shadow-[0_0_70px_rgba(239,68,68,0.18)] overflow-hidden bg-black/70 flex items-center justify-center p-3"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent z-10"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                />

                <img
                  src={founder}
                  alt="Founder"
                  className="relative z-0 w-full h-full object-contain rounded-[1.5rem]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.22 }}
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
                    <motion.span
                      key={tag}
                      whileHover={{ y: -4, scale: 1.04 }}
                      className="rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-red-300 text-sm font-bold"
                    >
                      {tag}
                    </motion.span>
                  )
                )}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-[2rem] border border-red-500/30 bg-red-500/10 p-6 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                />

                <div className="relative">
                  <p className="text-2xl md:text-3xl font-black text-white">
                    Wanna make your website look premium?
                  </p>
                  <p className="text-gray-400 mt-3 leading-relaxed">
                    Send a message below and let Samurai Websites build your
                    brand’s digital first impression.
                  </p>
                </div>
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
              viewport={{ once: true, amount: 0.22 }}
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
              {services.map((service, index) => (
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
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.045] backdrop-blur-lg p-7 sm:p-8 hover:border-red-500/50 transition duration-300 relative overflow-hidden text-center sm:text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/18 opacity-0 group-hover:opacity-100 transition duration-300" />

                  <motion.div
                    className="relative text-4xl mb-6 text-red-500 flex justify-center sm:block"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.75 }}
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
              viewport={{ once: true, amount: 0.22 }}
              className="rounded-[2rem] sm:rounded-[2.5rem] border border-red-500/25 bg-red-950/20 p-6 sm:p-8 md:p-14 backdrop-blur-lg relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
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
                    whileHover={{ scale: 1.035, y: -5 }}
                    className="rounded-3xl bg-black/35 border border-white/10 p-6 flex items-center gap-4"
                  >
                    <span className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_22px_rgba(239,68,68,0.75)] shrink-0">
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
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-lg p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-red-600/18 blur-3xl" />

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
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] sm:rounded-[2.5rem] border border-red-500/30 bg-red-950/20 backdrop-blur-lg p-6 sm:p-8 md:p-10 flex flex-col justify-center relative overflow-hidden text-center lg:text-left"
            >
              <motion.div
                className="absolute -right-24 top-10 w-64 h-64 bg-red-600/18 rounded-full blur-3xl"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
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
                  <motion.span whileHover={{ y: -7, scale: 1.16 }}>
                    <FaDiscord />
                  </motion.span>
                  <motion.span whileHover={{ y: -7, scale: 1.16 }}>
                    <FaInstagram />
                  </motion.span>
                  <motion.span whileHover={{ y: -7, scale: 1.16 }}>
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
      </main>
    </div>
  );
}