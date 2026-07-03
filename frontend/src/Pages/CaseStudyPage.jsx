import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import SectionHeading from "../Common/SectionHeading";
import { ArrowRight, User, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../Components/Common/SEO";

// ── Skeleton card shown while loading ───────────────────────────────────────
const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200" />
        <div className="p-5 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-5 bg-gray-200 rounded w-5/6" />
            <div className="h-5 bg-gray-200 rounded w-4/6" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-green-100 rounded w-1/4 mt-2" />
        </div>
    </div>
);

// ── Case study card ──────────────────────────────────────────────────────────
const CaseCard = ({ image, imageAlt, date, title, snippet, linkTo, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.08 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col group
                   transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
    >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
            <Link to={linkTo} className="block w-full h-full">
                {image ? (
                    <img
                        loading="lazy"
                        src={image}
                        alt={imageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
                        <ImageIcon className="w-12 h-12 text-emerald-300" />
                    </div>
                )}
            </Link>
            {/* Author badge */}
            <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-gray-800
                            font-semibold px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 shadow-sm">
                <User className="w-3 h-3" />
                <span>EHM</span>
            </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
            <span className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{date}</span>
            <h3 className="text-base font-bold text-gray-800 mb-3 flex-grow uppercase leading-snug line-clamp-2">
                <Link to={linkTo} className="hover:text-green-600 transition-colors duration-300">
                    {title}
                </Link>
            </h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-3">{snippet}</p>
            <div className="mt-auto">
                <Link
                    to={linkTo}
                    className="font-semibold text-green-600 inline-flex items-center gap-1.5
                               group-hover:text-green-800 transition-colors duration-300 text-sm"
                >
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    </motion.div>
);

// ── Page ─────────────────────────────────────────────────────────────────────
const CaseStudyPage = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaseStudies = async () => {
            try {
                setLoading(true);
                const response = await API.get("/casestudies");
                if (response.data.success) {
                    setCaseStudies(response.data.data || []);
                }
            } catch (err) {
                // silently fail – skeleton cards just disappear
                console.error("Case studies fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCaseStudies();
    }, []);

    return (
        <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-24 pb-16 min-h-screen">
            <SEO
                title="Environmental Case Studies & Technical Reports | EHM"
                description="Read EHM Consultancy's technical case studies and reports documenting proven solutions in campus sustainability, lake cleanup, and industrial waste treatment."
                keywords="EHM case studies, technical reports, waterbody restoration case study, sustainability reporting case study, industrial wastewater treatment, EHM Consultancy"
                canonical="/resources/casestudies"
                ogImage="https://www.ehmconsultancy.co.in/ehm-homepage-meta.jpg"
            />

            {/* ── Page heading ──────────────────────────────────────────── */}
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <SectionHeading>Case Studies</SectionHeading>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.9, delay: 0.4 }}
                            className="mx-auto h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-2"
                        />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="text-base text-green-700 mt-5 max-w-2xl mx-auto"
                    >
                        Explore our successful projects and impactful results.
                    </motion.p>
                </div>
            </div>

            {/* ── Cards grid ────────────────────────────────────────────── */}
            <div className="w-full max-w-6xl mx-auto mt-12 px-4">

                {/* Loading skeletons – 6 placeholder cards */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* Actual case-study cards from admin uploads */}
                {!loading && caseStudies.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies.map((study, index) => {
                            const formattedDate = new Date(study.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            });

                            const textOnly = study.content
                                ? study.content.replace(/<[^>]*>?/gm, "")
                                : "";
                            const snippet =
                                textOnly.trim().length > 0
                                    ? textOnly.split(" ").slice(0, 20).join(" ") + "…"
                                    : "Click to read the full case study.";

                            return (
                                <CaseCard
                                    key={study._id}
                                    delay={index}
                                    date={formattedDate}
                                    title={study.title}
                                    snippet={snippet}
                                    image={study.image}
                                    imageAlt={study.title}
                                    linkTo={`/casestudies/${study._id}`}
                                />
                            );
                        })}
                    </div>
                )}

                {/* Empty state – shown only after load when DB has no studies yet */}
                {!loading && caseStudies.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                            <ImageIcon className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
                        <p className="text-gray-400 max-w-sm">
                            Our case studies are being prepared. Check back shortly.
                        </p>
                    </motion.div>
                )}

            </div>
        </section>
    );
};

export default CaseStudyPage;