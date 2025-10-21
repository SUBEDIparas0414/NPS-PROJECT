import React from "react";
import { motion } from "framer-motion";
import { features, teamMembers } from "../../assets/dummydata";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const About = () => {

  return (
    <div className="bg-[rgb(31,18,10)] text-gray-200">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-yellow-500 mb-4">
            Culinary Express
          </motion.h1>
          <motion.p className="text-lg text-gray-300 leading-relaxed">
            Crafting unforgettable dining experiences, delivered to your doorstep
          </motion.p>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition"
              >
                <motion.img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="flex items-center gap-3 mb-2">
                  <motion.div whileHover={{ rotate: 15 }}>
                    <Icon className="text-yellow-400 text-2xl" />
                  </motion.div>
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                </div>
                <p className="text-gray-400">{f.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-12"
          >
            Meet Our <span className="text-yellow-500">Artists</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {teamMembers.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: m.delay }}
                className="bg-gray-800/60 rounded-2xl overflow-hidden shadow-lg group hover:shadow-yellow-500/20 transition"
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold text-white">
                    {m.name}
                  </h3>
                  <p className="text-yellow-400 text-sm mb-3">{m.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{m.bio}</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="flex gap-3"
                  >
                    {Object.entries(m.social).map(([p, url]) => (
                      <a
                        key={p}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-yellow-400 transition"
                      >
                        {
                          {
                            twitter: <FaXTwitter className="text-lg" />,
                            instagram: <FaInstagram className="text-lg" />,
                            facebook: <FaFacebook className="text-lg" />,
                            linkedin: <FaLinkedin className="text-lg" />,
                          }[p]
                        }
                      </a>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
