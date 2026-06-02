import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../../api/axios"; // Adjust this import path if needed
import { ArrowLeft, Image as ImageIcon, BookOpen, ChevronRight, X } from "lucide-react";

/**
 * A reusable page for displaying a single content item 
 * @param {string} basePath
 * @param {string} contentName 
 */
const SingleContentPage = ({ basePath, contentName }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setCurrentSlide(0);
    }, [id]);

    const otherItems = itemList.filter((study) => study._id !== id);
    const isMobile = width < 768;
    const itemsPerSlide = isMobile ? 1 : 2;

    const slides = [];
    for (let i = 0; i < otherItems.length; i += itemsPerSlide) {
        slides.push(otherItems.slice(i, i + itemsPerSlide));
    }

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await API.get(`/${basePath}`);
                if (response.data.success) {
                    setItemList(response.data.data || []);
                }
            } catch (err) {
                console.error("Error fetching item list:", err);
            }
        };
        fetchList();
    }, [basePath]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await API.get(`/${basePath}/${id}`);
                if (response.data.success) {
                    setItem(response.data.data);
                } else {
                    throw new Error(response.data.message || `${contentName} not found`);
                }
            } catch (err) {
                setError(err.message || `Could not find the ${contentName.toLowerCase()}.`);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id, basePath, contentName]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500 font-semibold">{error}</p></div>;
    if (!item) return null;

    const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const imageUrl = item.image ? item.image : null;

    return (
        <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-24 pb-20 min-h-screen">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <article>
                    <div className="text-center mb-8">
                        <Link
                            to={`/${basePath}/author/${encodeURIComponent(item.author)}`}
                            className="inline-block bg-green-100 text-green-800 font-semibold px-4 py-1 rounded-full text-sm hover:bg-green-200 transition-colors mb-4"
                        >
                            {item.author}
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">{item.title}</h1>
                        <p className="mt-4 text-md text-gray-500">{formattedDate}</p>
                    </div>
                    <div className="w-full aspect-video rounded-2xl shadow-xl my-8 bg-gray-100 flex items-center justify-center overflow-hidden">
                        {imageUrl && !imageError ? (
                            <img loading="lazy" src={imageUrl} alt={item.title} className="w-full h-full object-cover" onError={() => setImageError(true)} />
                        ) : (
                            <div className="flex flex-col items-center text-gray-300">
                                <ImageIcon size={64} />
                                <p className="mt-2 font-semibold text-gray-400">Image Not Available</p>
                            </div>
                        )}
                    </div>
                    <div
                        className="prose prose-lg lg:prose-xl max-w-none mx-auto mt-8 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                    <div className="mt-12 flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-800 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back
                        </button>

                    </div>
                </article>
            </div>

            {/* Divider Line */}
            {otherItems.length > 0 && (
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <hr className="my-8 border-slate-200" />
                </div>
            )}

            {/* Explore More Carousel Section */}
            {otherItems.length > 0 && (
                <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-8">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                            Explore More {basePath === "casestudies" ? "Case Studies" : "Blogs"}
                        </h3>
                        <div className="mx-auto h-1.5 w-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-3" />
                    </div>

                    {/* Carousel Slider */}
                    <div className="relative overflow-hidden pt-2 pb-3 px-1">
                        {/* Slides Track */}
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {slides.map((slideItems, slideIdx) => (
                                <div
                                    key={slideIdx}
                                    className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {slideItems.map((item) => (
                                        <div key={item._id} className="h-full">
                                            <Link
                                                to={`/${basePath}/${item._id}`}
                                                className="flex items-start gap-4 p-3 rounded-xl border border-slate-100 bg-white hover:border-teal-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                                            >
                                                <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://placehold.co/100x80/a0aec0/ffffff?text=EHM";
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-500">
                                                            <BookOpen className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                    {/* Number Badge */}
                                                    {basePath !== "casestudies" && (
                                                        <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-sm bg-white/90 text-green-700 backdrop-blur-xs">
                                                            {itemList.findIndex((x) => x._id === item._id) + 1}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0 py-0.5">
                                                    <div className="text-[10px] font-bold text-green-600/80 tracking-wider uppercase">
                                                        {new Date(item.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
                                                    </div>
                                                    <div className="font-bold text-slate-800 text-[13px] sm:text-[14px] mt-1.5 leading-snug line-clamp-2 group-hover:text-teal-600 transition-colors uppercase">
                                                        {item.title}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                    {/* If a slide has only 1 item on desktop, add a blank placeholder */}
                                    {!isMobile && slideItems.length === 1 && (
                                        <div className="invisible" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SingleContentPage;