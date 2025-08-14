import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useEffect, useState } from "react";
const images = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
];

const HeroSection = () => {
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCurrIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-r from-neutral-500 to-neutral-300 text-white py-16 px-6"
    >
     

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Discover Amazing Products <br className="hidden sm:block" />
            Curated Just for You
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-prose mx-auto md:mx-0">
            Your one-stop shop for beauty, lifestyle, and more. Browse trends,
            search instantly, and shop with confidence.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row  justify-center md:justify-start">
            <a
              href="#products"
              className="inline-block bg-white text-neutral-600 font-semibold px-6 py-3 rounded-full shadow hover:shadow-lg transition"
            >
              Shop Now
            </a>
          </div>
        </div>

        <div className="w-full sm:flex sm:flex-1 justify-center md:justify-end ">
          <div className="w-full max-w-lg relative h-80 ">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[currIndex]}
                src={images[currIndex]}
                alt="Hero visual"
                className="w-full h-full object-cover absolute inset-0 rounded-xl shadow-2xl "
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
