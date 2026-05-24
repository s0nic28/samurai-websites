import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import founder from "./assets/founder.jpg";
import "./index.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
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
        alert("Registration successful 🔥");
        setFormData({
          name: "",
          email: "",
          phone: "",
          budget: "",
          message: "",
        });
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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.25),transparent_35%)] pointer-events-none" />

      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="text-5xl font-black tracking-[0.4em] text-red-500 animate-pulse">
              SAMURAI
            </div>
            <p className="mt-4 text-gray-400 tracking-widest">
              Loading digital empire...
            </p>
          </div>
        </div>
      )}

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-6xl rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Samurai Websites Logo"
            className="w-9 h-9 object-contain"
          />
          <span className="font-black tracking-[0.35em] text-red-500 text-sm">
            SAMURAI
          </span>
        </div>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#about" className="hover:text-red-500 transition">
            About
          </a>
          <a href="#founder" className="hover:text-red-500 transition">
            Founder
          </a>
          <a href="#services" className="hover:text-red-500 transition">
            Services
          </a>
          <a href="#contact" className="hover:text-red-500 transition">
            Contact
          </a>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-8">
            <p className="text-red-500 tracking-[0.4em] font-bold text-sm">
              FUTURISTIC WEB DESIGN
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Build your brand like a{" "}
              <span className="text-red-500">digital empire.</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              Samurai Websites creates premium, cinematic, animated websites
              with modern UI, sharp branding, and samurai-level precision.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 transition font-bold shadow-lg shadow-red-600/30"
              >
                Start Project
              </a>

              <a
                href="#services"
                className="px-8 py-4 rounded-full border border-white/15 hover:border-red-500 transition font-bold"
              >
                View Services
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-red-600/20 blur-3xl rounded-full" />

            <div className="relative rounded-[2rem] border border-red-500/30 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
              <img
                src={founder}
                alt="Founder"
                className="w-full h-[480px] object-cover rounded-[1.5rem]"
              />

              <div className="absolute bottom-10 left-10 right-10 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 p-5">
                <p className="text-red-500 font-bold tracking-widest text-sm">
                  FOUNDER & CEO
                </p>
                <h2 className="text-2xl font-black mt-1">
                  Mithun Krrishnan D
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Founder of Samurai Websites, crafting premium digital
                  experiences with cinematic animations and samurai precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative px-6 py-24">
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-14">
          <p className="text-red-500 tracking-[0.35em] font-bold text-sm">
            ABOUT
          </p>

          <h2 className="text-4xl md:text-5xl font-black mt-4">
            Samurai Websites
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-relaxed max-w-4xl">
            Mithun Krrishnan D is the Founder & CEO of Samurai Websites, a
            futuristic web design brand focused on crafting premium digital
            experiences with modern UI, cinematic animations, and samurai
            precision.
          </p>
        </div>
      </section>

      <section id="services" className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500 tracking-[0.35em] font-bold text-sm">
            SERVICES
          </p>

          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-12">
            What we build
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Premium Websites",
                text: "Modern landing pages, portfolios, business sites, and high-end brand pages.",
              },
              {
                title: "Cinematic UI",
                text: "Smooth animations, futuristic layouts, luxury visuals, and clean user experience.",
              },
              {
                title: "Business Growth",
                text: "Websites built to impress clients, collect leads, and make your brand look serious.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-red-500/60 hover:-translate-y-2 transition duration-300"
              >
                <div className="text-4xl mb-6">⚔️</div>
                <h3 className="text-2xl font-black">{service.title}</h3>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
          >
            <p className="text-red-500 tracking-[0.35em] font-bold text-sm">
              CONTACT
            </p>

            <h2 className="text-4xl font-black mt-4 mb-8">
              Start your project
            </h2>

            <div className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none"
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none"
              />

              <input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Budget"
                className="w-full rounded-2xl bg-white text-black px-5 py-4 outline-none"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us what website you want..."
                rows="5"
                className="w-full rounded-2xl bg-black border border-white/10 text-white px-5 py-4 outline-none resize-none"
              />

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-red-600 hover:bg-red-700 transition py-4 font-black shadow-lg shadow-red-600/30 disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          <div className="rounded-[2rem] border border-red-500/30 bg-red-950/20 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-black">SAMURAI WEBSITES</h2>

            <p className="text-gray-400 mt-5 leading-relaxed">
              Dark luxury websites, animated interfaces, and futuristic digital
              experiences.
            </p>

            <div className="flex gap-5 text-3xl mt-8 text-red-500">
              <span>🎮</span>
              <span>📸</span>
              <span>✉️</span>
            </div>

            <p className="text-gray-500 mt-8">
              Fill the form and your message will go straight to the Samurai
              Websites backend.
            </p>
          </div>
        </div>
      </section>

      <footer className="relative px-6 py-10 border-t border-white/10 text-center text-gray-500">
        © 2026 Samurai Websites. Built with precision.
      </footer>
    </div>
  );
}