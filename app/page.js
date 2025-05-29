"use client";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiGlobe } from "react-icons/fi";
import TechBubble from "./components/TechBubble";

export default function Home() {
  const techStack = [
    { name: "Next.js 15", color: "bg-black text-white" },
    { name: "React", color: "bg-blue-600 text-white" },
    { name: "MongoDB", color: "bg-green-600 text-white" },
    { name: "Tailwind CSS", color: "bg-cyan-400 text-black" },
    { name: "Hugging Face AI", color: "bg-yellow-400 text-black" },
    { name: "Framer Motion", color: "bg-purple-600 text-white" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-100 opacity-20"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              scale: Math.random() * 2,
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              transition: {
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              QurbaniCare
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <a
              href="/advice-form"
              className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-400 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Get Started <FiArrowRight className="ml-2" />
            </a>
          </motion.div>
        </nav>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
          >
            Smart Care for <br />
            Sacrificial Animals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            AI-powered guidance to ensure your Qurbani animals are healthy and
            well-cared for according to Islamic principles.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="/advice-form"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-400 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
              Get Personalized Advice
            </a>
            <a
              href="#tech"
              className="px-8 py-4 rounded-full bg-white text-green-600 font-bold text-lg border-2 border-green-400 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
              Our Technology
            </a>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: "🩺",
              title: "Health Monitoring",
              desc: "AI-powered health assessments for your animals",
            },
            {
              icon: "📜",
              title: "Islamic Guidelines",
              desc: "Shariah-compliant care recommendations",
            },
            {
              icon: "🌿",
              title: "Feeding Plans",
              desc: "Personalized diet recommendations",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Our Powerful Technology Stack
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, i) => (
              <TechBubble key={i} tech={tech} index={i} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-500 to-green-400 rounded-3xl p-8 md:p-12 text-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Ensure Proper Care for Your Animal?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Get personalized, AI-powered advice in seconds - available in both
              English and Urdu.
            </p>
            <a
              href="/advice-form"
              className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all"
            >
              Start Now - It's Free
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 bg-white py-8 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} QurbaniCare - All rights reserved</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-green-500 transition-colors">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-500 transition-colors">
              <FiGlobe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
