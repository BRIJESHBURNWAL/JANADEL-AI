export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Product",
      links: ["Features", "Dashboard", "Threat Detection", "Pricing"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Contact"],
    },
    {
      title: "Resources",
      links: ["Documentation", "API Reference", "Support", "Community"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Security"],
    },
  ];

  const socials = [
    { name: "LinkedIn", icon: "in" },
    { name: "Twitter", icon: "X" },
    { name: "GitHub", icon: "GH" },
  ];

  return (
    <footer className="relative w-full bg-gray-950 border-t border-white/10 text-gray-400 px-6 md:px-16 pt-16 pb-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-20 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Section */}
      <div className="relative grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
        {/* Logo */}
        <div className="col-span-2">
          <h2 className="text-2xl font-bold text-white mb-3">
            Janadel <span className="text-cyan-400">AI</span>
          </h2>

          <p className="text-sm text-gray-500 mb-5 max-w-xs leading-7">
            The intelligent cybersecurity layer that unifies your security
            telemetry into one explainable AI-powered platform.
          </p>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href="#"
                title={s.name}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-sm font-semibold hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-400 transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-white font-semibold mb-4">
              {col.title}
            </h3>

            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-cyan-400 transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8 pb-8">
        <div>
          <h3 className="text-white text-xl font-semibold">
            Stay ahead of cyber threats
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Subscribe to receive AI security insights and product updates.
          </p>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 md:w-72 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400"
          />

          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:scale-105 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {year} Janadel AI. All rights reserved.</p>

        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span>All systems operational</span>
        </div>
      </div>
    </footer>
  );
}