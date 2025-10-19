import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import { socialIcons } from "../../assets/dummydata";

const Footer = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Menu", link: "/Menu" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing! We will send updates to ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-[rgb(31,18,10)] text-gray-300 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* left column */}
        <div>
          <h2 className="text-3xl font-bold mb-3">
  <span className="text-yellow-400">Trio</span>
  <span className="text-orange-400">Order</span>
</h2>

          <p className="text-gray-400 italic mb-6">
            “Bringing Flavor to Your Doorstep.”
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-2 text-yellow-400">
              <FaRegEnvelope />
              <span className="font-medium">Get exclusive offers</span>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-l-lg focus:outline-none text-gray-400 
               placeholder-yellow-500" 
                required
              />
              <button
                type="submit"
                className="flex items-center bg-yellow-500 text-gray-900 px-4 py-2 rounded-r-lg font-semibold hover:bg-yellow-400 transition"
              >
                <span>Join Now</span>
                <BiChevronRight className="ml-1 text-xl" />
              </button>
            </div>
          </form>
        </div>

        {/* middle column */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Navigation</h3>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.name} className="flex items-center gap-2 group">
                <BiChevronRight className="text-yellow-400 group-hover:translate-x-1 transition" />
                <a
                  href={item.link}
                  className="hover:text-yellow-400 transition"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* right column */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Social Connect Of TrioTrick
          </h3>
          <div className="flex flex-wrap gap-4">
            {socialIcons.map(({ icon: Icon, link, color, label }, idx) => (
              <a
                target="_blank"
                href={link}
                key={idx}
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:scale-105 transition"
                style={{ color }}
              >
                <Icon className="text-2xl" />
                <span className="text-gray-300 hover:text-white">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* bottom section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400 space-y-2">
        <p>&copy; 2025 TrioTrick. All Rights Reserved.</p>
        <p className="text-xs text-gray-500">
          Built by : Paras Subedi • Nilesh Karn • Shishir Gautam
        </p>
      </div>
    </footer>
  );
};

export default Footer;
