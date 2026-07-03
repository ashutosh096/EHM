import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const GALLERY_ITEMS = [
  { image: "/Demo/31th1.webp" },
  { image: "/Demo/31th2.webp" },
  { image: "/Demo/31th3.webp" },
  { image: "/Demo/31th4.webp" },
  { image: "/Demo/31th5.webp" },
  { image: "/Demo/31th6.webp" },
  { image: "/Demo/31th7.webp" },
  { image: "/Demo/31th8.webp" },
  { image: "/Demo/31th9.webp" },
  { image: "/Demo/31th10.webp" },
  { image: "/Demo/31th11.webp" },
  { image: "/Demo/31th12.webp" },
  { image: "/Demo/31th13.webp" },
  { image: "/Demo/31th14.webp" },
  { image: "/Demo/31th15.webp" },
  { image: "/Demo/31th16.webp" },
  { image: "/Demo/31th17.webp" },
  { image: "/Demo/31th19.webp" },
  { image: "/Demo/31th20.webp" },
  { image: "/Demo/31th21.webp" },
  { image: "/Demo/31th22.webp" },
  { image: "/Demo/31th23.webp" },
  { image: "/Demo/31th24.webp" },
  { image: "/Demo/31th25.webp" },
  { image: "/Demo/31th26.webp" },
  { image: "/Demo/31th27.webp" },
  { image: "/Demo/31th28.webp" },
  { image: "/Demo/31th29.webp" },
  { image: "/Demo/31th30.webp" },
  { image: "/Demo/31th31.webp" },
  { image: "/Demo/pic4.webp" },
  { image: "/Demo/pic23.webp" },
  { image: "/Demo/pic2.webp" },
  { image: "/Demo/pic5.webp" },
  { image: "/Demo/pic11.webp" },
  { image: "/Demo/pic3.webp" },
  { image: "/Demo/pic7.webp" },
  { image: "/Demo/pic21.webp" },
  { image: "/Demo/pic12.webp" },
  { image: "/Demo/pic14.webp" },
  { image: "/Demo/pic15.webp" },
  { image: "/Demo/pic16.webp" },
  { image: "/Demo/pic17.webp" },
  { image: "/Demo/pic18.webp" },
  { image: "/Demo/pic19.webp" },
  { image: "/Demo/pic20.webp" },
  { image: "/Demo/pic25.webp" },
  { image: "/Demo/pic6.webp" },
  { image: "/Demo/pic8.webp" },
  { image: "/Demo/pic9.webp" },
  { image: "/Demo/pic10.webp" },
  { image: "/Demo/pic13.webp" },
  { image: "/Demo/pic22.webp" },
  { image: "/Demo/pic1.webp" }
];

const GalleryHero = () => {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visibleData = showAll ? GALLERY_ITEMS : GALLERY_ITEMS.slice(0, 8);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="min-h-screen w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-green-50 to-green-100">

      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4 tracking-tight animate-fade-in">
          Our Gallery
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
          Moments of impact, research, and collaboration at EHM Consultancy
        </p>
      </div>

      {/* Grid of Photos */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleData.map((item, i) => (
            <div
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="rounded-xl overflow-hidden aspect-square shadow-md border border-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative group cursor-pointer bg-white"
            >
              <img
                loading={i < 4 ? "eager" : "lazy"}
                fetchpriority={i < 4 ? "high" : "auto"}
                src={item.image}
                alt={`Gallery photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* View More Button */}
      {!showAll && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3.5 bg-green-600 text-white font-bold rounded-xl shadow-md shadow-green-600/20 hover:bg-green-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            View More
          </button>
        </div>
      )}

      {/* Fullscreen Lightbox Zoom Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (() => {
          const activePhoto = GALLERY_ITEMS[lightboxIndex].image;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/15 transition-all cursor-pointer z-50"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Left */}
              <button
                onClick={handlePrev}
                className="absolute left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full border border-white/15 transition-all cursor-pointer z-50"
                title="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Zoom Image Frame */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-w-5xl max-h-[85vh] mx-4 flex flex-col items-center select-none"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activePhoto}
                  alt="Zoom view"
                  className="max-w-full max-h-[75vh] rounded-2xl object-contain border border-white/15 shadow-2xl"
                />

                {/* Details Bar */}
                <div className="w-full flex items-center justify-between mt-4 px-2 text-white/80">
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/15 px-3.5 py-1 rounded-full">
                    Gallery
                  </span>
                  <span className="text-sm font-semibold">
                    {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                  </span>
                </div>
              </motion.div>

              {/* Navigation Right */}
              <button
                onClick={handleNext}
                className="absolute right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full border border-white/15 transition-all cursor-pointer z-50"
                title="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </section>
  );
};

export default GalleryHero;
