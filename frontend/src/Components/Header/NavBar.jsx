import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clipboard,
  Image,
  Video,
  FileText,
  Leaf,
  Building2,
  Globe,
  GraduationCap,
  Layers,
  Recycle,
  CloudRain,
  Droplets,
  Home,
  Info,
  Lightbulb,
  Menu,
  Briefcase,
} from "lucide-react";

// === RESOURCES MENU DATA ===
const resourcesMenu = [
  {
    title: "Discover",
    items: [
      { name: "Blogs", path: "/resources/blogs", icon: BookOpen },
      { name: "Case Studies", path: "/resources/casestudies", icon: Clipboard },
    ],
  },
  {
    title: "Learn",
    items: [
      { name: "Webinars", path: "/resources/webinar", icon: Video },
      { name: "Gallery", path: "/resources/gallery", icon: Image },
      { name: "Videos", path: "/resources/videos", icon: Video },
    ],
  },
  {
    title: "Solutions",
    items: [
      { name: "Waterbody Restoration", path: "/resources/WaterbodyRestoration", icon: Recycle },
      { name: "Decentralized Natural\nTreatment System", path: "/resources/dnts", icon: Droplets },
      { name: "Net-Zero & Water\nPositive Campus", path: "/resources/netzero-campus", icon: Leaf },
    ],
  },
];

// === OFFERINGS MENU DATA ===
const offeringsMenu = [
  {
    title: "Main",
    items: [{ name: "Offerings ", path: "/offerings", icon: Layers }],
  },
  {
    title: "Sustainability Services",
    items: [
      {
        name: "Sustainability Assessment & Reporting",
        path: "/offerings/sustainability-assessment-reporting",
        icon: FileText,
      },
      { name: "Sustainable Environmental Management", path: "/offerings", icon: Leaf },
    ],
  },
  {
    title: "Urban & Research",
    items: [
      {
        name: "Urban Planning & Management",
        path: "/offerings",
        icon: Building2,
      },
      { name: "Geophysical Investigation", path: "/offerings/geophysical-investigation", icon: Globe },
    ],
  },
  {
    title: "Capacity Building",
    items: [
      { name: "Training & Capacity Building", path: "/offerings", icon: GraduationCap },
      { name: "Climate Risk Intelligence", path: "/offerings", icon: CloudRain },
    ],
  },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isTopNavVisible, setIsTopNavVisible] = useState(true);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState(null); // 'offerings' | 'resources' | null

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen || activeBottomTab) return; // Keep static when open

      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

      // Determine scroll direction
      if (currentScrollPos > prevScrollPos) {
        // Scrolling Down: Hide top header, show bottom bar
        setIsTopNavVisible(false);
        setIsBottomNavVisible(true);
      } else {
        // Scrolling Up: Show top header, hide bottom bar
        setIsTopNavVisible(true);
        setIsBottomNavVisible(false);
      }

      // Always show top nav at the very top of the page
      if (currentScrollPos < 50) {
        setIsTopNavVisible(true);
        setIsBottomNavVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, isMenuOpen, activeBottomTab]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsTopNavVisible(true);
      setIsBottomNavVisible(true);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (activeBottomTab) {
      setIsTopNavVisible(false);
      setIsBottomNavVisible(true);
    }
  }, [activeBottomTab]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }

      // Close mobile bottom popover if clicked outside bottom bar area
      const bottomBar = document.getElementById("bottom-mobile-nav");
      if (bottomBar && !bottomBar.contains(event.target)) {
        setActiveBottomTab(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-transform duration-300
        ${isTopNavVisible ? "translate-y-0" : "-translate-y-full"}
      `}>
      <nav className="max-w-6xl mx-auto relative flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" onClick={handleNavClick}>
          <img loading="eager" fetchpriority="high" src="/ehm_logo.webp"
            alt="EHM Logo"
            className="h-12"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-6 font-medium">
          {/* ... (existing links) ... */}
          <li>
            <Link to="/" className="text-green-900 hover:shadow-none hover:text-yellow-400">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-green-900  hover:text-yellow-400 group hover:shadow-none focus:shadow-none focus:outline-none">
              ABOUT
            </Link>
          </li>

          {/* Offerings Dropdown */}
          <li className="relative group">
            <span
              ref={buttonRef}
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "offerings" ? null : "offerings"
                )
              }
              className={`cursor-pointer flex items-center transition-colors duration-200 
                  ${activeDropdown === "offerings"
                  ? "text-yellow-400"
                  : "text-green-900 hover:text-yellow-400"
                }`}
            >
              OFFERINGS
              <span
                className={`ml-2 inline-block p-1 border-b-2 border-r-2 transition-all -translate-y-0.5 duration-300 ease-in-out 
                    ${activeDropdown === "offerings"
                    ? "-rotate-180 border-yellow-400"
                    : "rotate-45 border-green-900 group-hover:-rotate-180 group-hover:border-yellow-400"
                  }`}
              ></span>
            </span>
          </li>

          {/* Resources Dropdown */}
          <li className="relative group">
            <span
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "resources" ? null : "resources"
                )
              }
              className={`cursor-pointer flex items-center transition-colors duration-200 select-none no-bg
                ${activeDropdown === "resources"
                  ? "text-yellow-400"
                  : "text-green-900 hover:text-yellow-400"
                } 
                bg-none hover:bg-none focus:bg-none shadow-none hover:shadow-none focus:shadow-none outline-none`}
            >
              RESOURCES
              <span
                className={`ml-2 inline-block p-1 border-b-2 border-r-2 transition-all -translate-y-0.5 duration-300 ease-in-out 
                  ${activeDropdown === "resources"
                    ? "-rotate-180 border-yellow-400"
                    : "rotate-45 border-green-900 group-hover:-rotate-180 group-hover:border-yellow-400"
                  }`}
              ></span>
            </span>
          </li>

          <li>
            <Link
              to="/projects"
              className="text-green-900 hover:text-yellow-400"
            >
              PROJECTS
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-green-900 hover:text-yellow-400"
            >
              CONTACT
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div
          className="lg:hidden text-green-900 text-3xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>{isMenuOpen ? "✕" : "☰"}</span>
        </div>

        {/* Desktop Dropdown Content - Moved inside nav to use its bounds */}
        {activeDropdown && (
          <div
            ref={dropdownRef}
            className="absolute inset-x-0 mx-auto top-full bg-white animate-fadeIn hidden lg:block shadow-2xl rounded-b-3xl border-t border-slate-100 overflow-hidden z-[100]"
            style={{
              width: activeDropdown === "resources" ? "800px" : "1000px",
              maxWidth: "94vw",
            }}
          >
            <div
              className={`grid gap-10 p-10 ${activeDropdown === "resources" ? "grid-cols-3" : "grid-cols-4"
                }`}
            >
              {(activeDropdown === "resources" ? resourcesMenu : offeringsMenu).map(
                (section) => (
                  <div key={section.title} className="col-span-1">
                    <ul className="space-y-4">
                      {section.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            onClick={handleNavClick}
                            className="flex items-center space-x-2 text-green-900 hover:text-yellow-400 transition group"
                          >
                            <item.icon className="w-12 text-green-900 group-hover:text-yellow-400" />
                            <span className="whitespace-pre-line text-left leading-tight">{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4 space-y-4 animate-fadeIn">
          <Link
            to="/"
            onClick={handleNavClick}
            className="block text-green-900 hover:text-yellow-400"
          >
            HOME
          </Link>
          <Link
            to="/about"
            onClick={handleNavClick}
            className="block text-green-900 hover:text-yellow-400"
          >
            ABOUT
          </Link>

          {/* Mobile Offerings */}
          <details>
            <summary className="cursor-pointer text-green-900 hover:text-yellow-400 font-medium">
              OFFERINGS
            </summary>
            <div className="pl-4 mt-2 space-y-2">
              {offeringsMenu.map((section) => (
                <div key={section.title}>
                  <h4 className="text-green-800 font-semibold">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          onClick={handleNavClick}
                          className="flex items-center space-x-2 text-green-900 hover:text-yellow-400 bg-transparent hover:bg-transparent focus:bg-transparent transition group"
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="whitespace-pre-line text-left leading-tight">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>

          {/* Mobile Resources */}
          <details>
            <summary className="cursor-pointer text-green-900 hover:text-yellow-400 font-medium">
              RESOURCES
            </summary>
            <div className="pl-4 mt-2 space-y-2">
              {resourcesMenu.map((section) => (
                <div key={section.title}>
                  <h4 className="text-green-800 font-semibold">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          onClick={handleNavClick}
                          className="flex items-center space-x-2 text-green-900 hover:text-yellow-400 transition group hover:shadow-none focus:shadow-none focus:outline-none"
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="whitespace-pre-line text-left leading-tight">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>

          <Link
            to="/projects"
            onClick={handleNavClick}
            className="block text-green-900 bg-transparent hover:text-yellow-400"
          >
            PROJECTS
          </Link>
          <Link
            to="/contact"
            onClick={handleNavClick}
            className="block text-green-900 hover:text-yellow-400"
          >
            CONTACT
          </Link>
        </div>
      )}
      </header>

      {/* Bottom Mobile Navigation Bar */}
      <div
        id="bottom-mobile-nav"
        className={`fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md text-green-900 shadow-[0_-4px_12px_-1px_rgba(0,0,0,0.08)] md:hidden transition-transform duration-300 border-t border-slate-200 pb-safe
          ${isBottomNavVisible ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="flex justify-around items-center py-2 text-[9px] sm:text-[10px] font-semibold relative">
          {/* Home */}
          <Link
            to="/"
            onClick={() => {
              setActiveBottomTab(null);
              handleNavClick();
            }}
            className="flex flex-col items-center gap-1 text-green-900 hover:text-yellow-500 transition"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          {/* About */}
          <Link
            to="/about"
            onClick={() => {
              setActiveBottomTab(null);
              handleNavClick();
            }}
            className="flex flex-col items-center gap-1 text-green-900 hover:text-yellow-500 transition"
          >
            <Info className="w-5 h-5" />
            <span>About</span>
          </Link>

          {/* Offerings */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveBottomTab(
                  activeBottomTab === "offerings" ? null : "offerings"
                )
              }
              className={`flex flex-col items-center gap-1 transition bg-transparent border-none p-0 outline-none
                ${activeBottomTab === "offerings" ? "text-yellow-500" : "text-green-900 hover:text-yellow-500"}
              `}
            >
              <Lightbulb className="w-5 h-5" />
              <span>Offerings</span>
            </button>

            {/* Offerings Popover */}
            {activeBottomTab === "offerings" && (
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-emerald-950 text-white rounded-lg shadow-xl py-2 z-50 text-xs font-normal border border-emerald-900/50 animate-fadeIn">
                <div className="flex flex-col max-h-[300px] overflow-y-auto">
                  {offeringsMenu.map((section) =>
                    section.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => {
                          setActiveBottomTab(null);
                          handleNavClick();
                        }}
                        className="px-4 py-2.5 hover:bg-emerald-900 hover:text-yellow-400 text-left transition block border-b border-emerald-900/30 last:border-0"
                      >
                        {item.name}
                      </Link>
                    ))
                  )}
                </div>
                {/* Triangle pointer */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-emerald-950"></div>
              </div>
            )}
          </div>

          {/* Resources */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveBottomTab(
                  activeBottomTab === "resources" ? null : "resources"
                )
              }
              className={`flex flex-col items-center gap-1 transition bg-transparent border-none p-0 outline-none
                ${activeBottomTab === "resources" ? "text-yellow-500" : "text-green-900 hover:text-yellow-500"}
              `}
            >
              <BookOpen className="w-5 h-5" />
              <span>Resources</span>
            </button>

            {/* Resources Popover */}
            {activeBottomTab === "resources" && (
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-emerald-950 text-white rounded-lg shadow-xl py-2 z-50 text-xs font-normal border border-emerald-900/50 animate-fadeIn">
                <div className="flex flex-col max-h-[300px] overflow-y-auto">
                  {resourcesMenu.map((section) =>
                    section.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => {
                          setActiveBottomTab(null);
                          handleNavClick();
                        }}
                        className="px-4 py-2.5 hover:bg-emerald-900 hover:text-yellow-400 text-left transition block border-b border-emerald-900/30 last:border-0"
                      >
                        {item.name}
                      </Link>
                    ))
                  )}
                </div>
                {/* Triangle pointer */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-emerald-950"></div>
              </div>
            )}
          </div>

          {/* Projects */}
          <Link
            to="/projects"
            onClick={() => {
              setActiveBottomTab(null);
              handleNavClick();
            }}
            className="flex flex-col items-center gap-1 text-green-900 hover:text-yellow-500 transition"
          >
            <Briefcase className="w-5 h-5" />
            <span>Projects</span>
          </Link>

          {/* Menu */}
          <button
            onClick={() => {
              setActiveBottomTab(null);
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`flex flex-col items-center gap-1 transition bg-transparent border-none p-0 outline-none
              ${isMenuOpen ? "text-yellow-500" : "text-green-900 hover:text-yellow-500"}
            `}
          >
            <Menu className="w-5 h-5" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
