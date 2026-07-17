import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../../api/axios"; // Adjust this import path if needed
import { ArrowLeft, Image as ImageIcon, BookOpen, ChevronRight, X, Download } from "lucide-react";
import SEO from "../../Components/Common/SEO";
import { optimizeCloudinaryUrl } from "../utils";

/**
 * Helper function to clean copy-paste anomalies in rich text content
 * (e.g. merging line-broken paragraphs and elevating inline bold headers)
 */
const cleanContent = (html) => {
    if (!html) return "";
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // 0. Extract any nested images inside headings (h1-h6) and place them as sibling paragraphs before the heading
        const headingTags = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headingTags.forEach((heading) => {
            const img = heading.querySelector("img");
            if (img) {
                const imgPara = doc.createElement("p");
                imgPara.appendChild(img.cloneNode(true));
                heading.parentNode.insertBefore(imgPara, heading);
                img.parentNode.removeChild(img);
            }
        });

        // 0b. Split paragraphs that contain both an image and caption text inside the same <p> tag
        const allParagraphs = doc.querySelectorAll("p");
        allParagraphs.forEach((p) => {
            const img = p.querySelector("img");
            if (img) {
                // Get the text content inside the paragraph excluding the image tag itself
                const pClone = p.cloneNode(true);
                const cloneImg = pClone.querySelector("img");
                if (cloneImg) {
                    cloneImg.parentNode.removeChild(cloneImg);
                }
                const captionText = pClone.textContent.trim();

                if (captionText.length > 0) {
                    // Create a new paragraph for the caption
                    const captionPara = doc.createElement("p");
                    captionPara.classList.add("image-caption");
                    captionPara.textContent = captionText; // Strips all bold tags automatically!

                    // Insert the caption paragraph immediately after the image paragraph
                    p.parentNode.insertBefore(captionPara, p.nextSibling);

                    // Clean the original paragraph so it only contains the image tag
                    p.innerHTML = "";
                    p.appendChild(img);
                }
            }
        });

        // 1. Convert bold-only short paragraphs like <p><strong>Heading</strong></p> into <h2>Heading</h2> or <h3>Heading</h3>
        const paragraphs = doc.querySelectorAll("p");
        paragraphs.forEach((p) => {
            const trimmedText = p.textContent.trim();
            const strongText = Array.from(p.querySelectorAll("strong, b")).map(el => el.textContent).join("").trim();
            const hasImg = p.querySelector("img") !== null;

            // Determine if it is a quote author or image caption (below a pure image container)
            let isQuoteAuthor = false;
            let isImageCaption = false;
            let startsWithDash = false;

            if (!hasImg && trimmedText.length > 0) {
                startsWithDash = /^[—\-\–]/.test(trimmedText);

                // Find previous non-empty sibling to check if it's an image
                let prevSibling = p.previousElementSibling;
                while (prevSibling && prevSibling.textContent.trim() === "" && !prevSibling.querySelector("img") && prevSibling.tagName !== "IMG") {
                    prevSibling = prevSibling.previousElementSibling;
                }
                if (prevSibling) {
                    const prevText = prevSibling.textContent.trim();
                    const endsWithQuote = prevText.endsWith('"') || prevText.endsWith('”') || prevText.endsWith('’') || prevText.endsWith("'") || prevText.endsWith("’");
                    if (endsWithQuote || prevSibling.tagName === "BLOCKQUOTE") {
                        isQuoteAuthor = true;
                    }

                    // It is an image caption ONLY if:
                    // (a) it already has the class 'image-caption' (assigned during split step 0b), OR
                    // (b) the previous sibling is an image container AND the paragraph text contains caption keywords (source/credit/photo/attribution)
                    const hasCaptionKeyword = /source:|credit:|photo:|attribution:/i.test(trimmedText);
                    const isPrevImage = prevSibling.tagName === "IMG" || (prevSibling.querySelector("img") && prevText === "");

                    if (p.classList.contains("image-caption") || (isPrevImage && hasCaptionKeyword)) {
                        isImageCaption = true;
                    }
                }
            }

            if (isImageCaption) {
                p.classList.add("image-caption");
            }

            // Only treat as heading if the entire text is bold, length is reasonable, and it has no images
            let isHeadingNode = !hasImg && strongText.length > 0 && strongText.length === trimmedText.length && trimmedText.length < 120;

            if (isHeadingNode) {
                if (startsWithDash || isQuoteAuthor || isImageCaption) {
                    isHeadingNode = false;
                }
            }

            if (isHeadingNode) {
                // If it starts with a number (like "1. ", "2. "), it's a sub-heading (h3)
                const isSubHeading = /^\d+\.\s/.test(trimmedText);
                const tag = isSubHeading ? "h3" : "h2";

                const heading = doc.createElement(tag);
                heading.innerHTML = p.innerHTML;
                p.parentNode.replaceChild(heading, p);
            }
        });

        // 2. Merge adjacent text paragraphs that were split by line-breaks (without sentence ending punctuation)
        const bodyChildren = Array.from(doc.body.childNodes);
        let currentParagraph = null;

        bodyChildren.forEach((node) => {
            if (node.nodeName === "P") {
                // Remove empty paragraphs that contain only line-breaks or whitespace
                const cleanedText = node.textContent.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
                const hasImg = node.querySelector("img") !== null;
                if (cleanedText.length === 0 && !hasImg) {
                    node.parentNode.removeChild(node);
                    return;
                }

                const text = node.textContent.trim();

                // Skip if this is an image-caption paragraph
                if (node.classList.contains("image-caption")) {
                    currentParagraph = null;
                    return;
                }

                // Skip if this paragraph contains an image, but first clean empty strong/span elements with zero-width spaces
                if (node.querySelector("img")) {
                    const emptyElements = node.querySelectorAll("strong, b, span, em, i");
                    emptyElements.forEach((el) => {
                        const trimmedText = el.textContent.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
                        if (trimmedText.length === 0) {
                            el.parentNode.removeChild(el);
                        }
                    });
                    currentParagraph = null;
                    return;
                }

                if (currentParagraph) {
                    // Merge content
                    currentParagraph.innerHTML += " " + node.innerHTML;
                    node.parentNode.removeChild(node);

                    // Check if the merged paragraph now ends with punctuation (including colons and semicolons)
                    const currentText = currentParagraph.textContent.trim();
                    const lastChar = currentText.slice(-1);
                    if (/[.!?:;]/.test(lastChar)) {
                        currentParagraph = null; // Stop merging
                    }
                } else {
                    const lastChar = text.slice(-1);
                    const isSentenceEnd = /[.!?:;]/.test(lastChar);

                    if (!isSentenceEnd && text.length > 0) {
                        currentParagraph = node;
                    } else {
                        currentParagraph = null;
                    }
                }
            } else {
                currentParagraph = null;
            }
        });

        // 3. Format Principle items (paragraphs starting with "Principle 1:", etc.)
        // to have a clean flex layout where the body is aligned to the right of the label
        const mergedParagraphs = doc.querySelectorAll("p");
        mergedParagraphs.forEach((p) => {
            const firstChild = p.firstElementChild;
            if (firstChild && (firstChild.tagName === "STRONG" || firstChild.tagName === "B")) {
                const labelText = firstChild.textContent.trim();
                if (/^Principle\s+\d+/i.test(labelText)) {
                    p.classList.add("principle-item");

                    const labelSpan = doc.createElement("span");
                    labelSpan.className = "principle-label";

                    p.replaceChild(labelSpan, firstChild);
                    labelSpan.appendChild(firstChild);

                    const bodySpan = doc.createElement("span");
                    bodySpan.className = "principle-body";

                    while (labelSpan.nextSibling) {
                        bodySpan.appendChild(labelSpan.nextSibling);
                    }
                    p.appendChild(bodySpan);
                }
            }
        });

        return doc.body.innerHTML;
    } catch (e) {
        console.error("Error cleaning HTML content:", e);
        return html;
    }
};

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
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "", org: "" });
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

    useEffect(() => {
        const checkPdf = async () => {
            if (basePath === "casestudies" && item) {
                const pathsToCheck = [];
                const titleLower = (item.title || "").toLowerCase();

                if (titleLower.includes("csjmu") && (titleLower.includes("annual") || titleLower.includes("report"))) {
                    pathsToCheck.push("/pdfs/ANNUAL SUSTAINABILITY REPORT CSJMU KANPUR 2026_compressed (1)_11zon.pdf");
                    pathsToCheck.push("/pdfs/csjmu_case_study.pdf");
                } else if (titleLower.includes("csjmu")) {
                    pathsToCheck.push("/pdfs/csjmu_case_study.pdf");
                }

                if (titleLower.includes("biodiversity") || titleLower.includes("iitk")) {
                    pathsToCheck.push("/pdfs/IITK Biodiversity case study.pdf");
                }

                if (titleLower.includes("antia")) {
                    pathsToCheck.push("/pdfs/ANTIA TALAB Case Study 2_compressed (1)_11zon.pdf");
                }

                if (titleLower.includes("environmental audit") || titleLower.includes("neeri")) {
                    pathsToCheck.push("/pdfs/ENVIRONMENTAL AUDIT Case Study_compressed (1)_11zon.pdf");
                }

                pathsToCheck.push(`/pdfs/${item._id}.pdf`);

                for (const path of pathsToCheck) {
                    try {
                        const response = await fetch(path, { method: "HEAD" });
                        if (response.ok) {
                            setPdfUrl(path);
                            return;
                        }
                    } catch (e) {
                        console.warn("Could not head check PDF path:", path, e);
                    }
                }

                if (titleLower.includes("csjmu") && (titleLower.includes("annual") || titleLower.includes("report"))) {
                    setPdfUrl("/pdfs/ANNUAL SUSTAINABILITY REPORT CSJMU KANPUR 2026_compressed (1)_11zon.pdf");
                } else if (titleLower.includes("csjmu")) {
                    setPdfUrl("/pdfs/csjmu_case_study.pdf");
                } else if (titleLower.includes("biodiversity") || titleLower.includes("iitk")) {
                    setPdfUrl("/pdfs/IITK Biodiversity case study.pdf");
                } else if (titleLower.includes("antia")) {
                    setPdfUrl("/pdfs/ANTIA TALAB Case Study 2_compressed (1)_11zon.pdf");
                } else if (titleLower.includes("environmental audit") || titleLower.includes("neeri")) {
                    setPdfUrl("/pdfs/ENVIRONMENTAL AUDIT Case Study_compressed (1)_11zon.pdf");
                } else {
                    setPdfUrl(null);
                }
            } else {
                setPdfUrl(null);
            }
        };
        checkPdf();
    }, [item, basePath]);

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
    const imageUrl = item.image ? optimizeCloudinaryUrl(item.image, 1200) : null;

    const handleDownloadSubmit = (e) => {
        e.preventDefault();

        // Strip any spaces from mobile number before sending to pass backend validation regex
        const cleanMobile = (formData.phone || "").replace(/\s+/g, "");
        API.post("/contact", {
            name: formData.name,
            email: formData.email,
            mobile: cleanMobile,
            interestedIn: `[Case Study] Case Study Download: ${item.title}`,
            message: `Downloaded Case Study: "${item.title}". Support Type: ${formData.role}. Organization: ${formData.org || "N/A"}`
        }).catch((err) => {
            console.error("Error submitting lead to contact database:", err);
        });

        if (pdfUrl) {
            // Open PDF in a new tab (full page)
            window.open(pdfUrl, "_blank");

            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_case_study.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            // Fallback to generating word doc if somehow pdfUrl is not set (so we don't break fallback behavior)
            const cleanContent = item.content || "";
            const htmlDoc = `
              <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
              <head>
                <title>${item.title}</title>
                <style>
                  body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333333; padding: 20px; }
                  h1 { color: #047857; font-size: 26px; margin-bottom: 5px; }
                  .meta { color: #666666; font-size: 13px; margin-bottom: 25px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; }
                  .meta-item { margin-right: 15px; }
                  .footer { margin-top: 50px; font-size: 11px; color: #999999; text-align: center; border-top: 1px solid #eeeeee; padding-top: 15px; }
                </style>
              </head>
              <body>
                <h1>${item.title}</h1>
                <div class="meta">
                  <span class="meta-item"><strong>Author:</strong> ${item.author}</span>
                  <span class="meta-item"><strong>Date:</strong> ${formattedDate}</span>
                </div>
                <div class="content">
                  ${cleanContent}
                </div>
                <div class="footer">
                  Generated by EHM Case Study Download Portal. Prepared for ${formData.name} (${formData.email}) - ${formData.org || 'Individual'}.
                </div>
              </body>
              </html>
            `;

            const blob = new Blob(['\ufeff' + htmlDoc], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_case_study.doc`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        setShowDownloadModal(false);
        setIsRoleDropdownOpen(false);
        setFormData({ name: "", email: "", phone: "", role: "", org: "" });
    };

    const textOnly = item.content ? item.content.replace(/<[^>]*>?/gm, "").trim() : "";
    const snippet = textOnly.length > 0
        ? textOnly.split(/\s+/).slice(0, 24).join(" ") + "..."
        : `Read the full ${contentName.toLowerCase()} on EHM Consultancy.`;

    return (
        <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-24 pb-20 min-h-screen">
            <SEO
                title={`${item.title}`}
                description={snippet}
                keywords={`${item.author}, ${contentName}, EHM, EHM Consultancy`}
                canonical={`/${basePath}/${item._id}`}
                ogImage={imageUrl || "https://www.ehmconsultancy.co.in/ehm-homepage-meta.jpg"}
            />
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <article>
                    <div className="text-center mb-8 max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                            <Link
                                to={`/${basePath}/author/${encodeURIComponent(item.author)}`}
                                className="bg-green-100 text-green-800 font-semibold px-4 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
                            >
                                {item.author}
                            </Link>
                            <span className="bg-slate-100 text-slate-600 font-semibold px-4 py-1 rounded-full text-sm">
                                {formattedDate}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-gray-900 leading-tight md:leading-tight uppercase">
                            {item.title}
                        </h1>
                    </div>
                    <div className="w-full aspect-video rounded-2xl shadow-xl my-8 bg-gray-100 flex items-center justify-center overflow-hidden">
                        {imageUrl && !imageError ? (
                            <img loading="eager" fetchpriority="high" src={imageUrl} alt={item.title} className="w-full h-full object-cover" onError={() => setImageError(true)} />
                        ) : (
                            <div className="flex flex-col items-center text-gray-300">
                                <ImageIcon size={64} />
                                <p className="mt-2 font-semibold text-gray-400">Image Not Available</p>
                            </div>
                        )}
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {(() => {
                            const cleanedHtml = cleanContent(item.content);
                            const hasSubheadings = cleanedHtml.includes("<h3");
                            return (
                                <div
                                    className={`prose prose-lg lg:prose-xl max-w-none mt-8 text-gray-700 ${hasSubheadings ? "has-subheadings" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: cleanedHtml }}
                                />
                            );
                        })()}
                        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-800 transition-colors"
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>
                            {basePath === "casestudies" && (
                                <button
                                    onClick={() => setShowDownloadModal(true)}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <Download size={20} />
                                    Download Case Study
                                </button>
                            )}
                        </div>
                    </div>
                </article>
            </div>

            {/* Divider Line */}
            {otherItems.length > 0 && (
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <hr className="my-8 border-slate-200" />
                </div>
            )}

            {/* Explore More Carousel Section */}
            {otherItems.length > 0 && (
                <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-8">
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
                                                            src={optimizeCloudinaryUrl(item.image, 200)}
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

            <style>{`
                @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes modalScaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes bounceSubtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                .animate-fadeIn { animation: modalFadeIn 0.25s ease-out forwards; }
                .animate-scaleUp { animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-bounce-subtle { animation: bounceSubtle 3s ease-in-out infinite; }

                /* Principle items flex list layout styling */
                .prose .principle-item {
                    display: flex !important;
                    align-items: flex-start !important;
                    margin-top: 1.25rem !important;
                    margin-bottom: 1.25rem !important;
                    text-align: left !important;
                }
                .prose .principle-label {
                    flex-shrink: 0 !important;
                    margin-right: 0.75rem !important;
                    font-weight: 700 !important;
                    color: #0f172a !important;
                    white-space: nowrap !important;
                }
                .prose .principle-body {
                    flex-grow: 1 !important;
                    color: #334155 !important;
                    line-height: 1.8 !important;
                }

                /* Common Heading starting bar styles */
                .prose h2, .prose h3 {
                    border-left: 4px solid #059669 !important; /* Restored starting bar */
                    padding-left: 0.75rem !important;
                    line-height: 1.35 !important;
                }

                /* Default typography styling (single-level heading structure) */
                .prose h2, .prose h2 strong {
                    font-weight: 800 !important;
                    color: #025b5f !important; /* Theme green for default headings */
                    margin-top: 3.5rem !important;
                    margin-bottom: 1.5rem !important;
                    font-size: 1.65rem !important;
                }

                /* Dual-heading hierarchy styling (when both h2 and h3 are present) */
                .prose.has-subheadings h2, .prose.has-subheadings h2 strong {
                    color: #025b5f !important; /* Main headings stay theme green */
                }
                .prose.has-subheadings h3, .prose.has-subheadings h3 strong {
                    font-weight: 700 !important;
                    color: #025b5f !important; /* Sub-headings stay theme green */
                    margin-top: 2.5rem !important;
                    margin-bottom: 1rem !important;
                    font-size: 1.35rem !important;
                }
                .prose p {
                    margin-top: 1.25rem !important;
                    margin-bottom: 1.25rem !important;
                    line-height: 1.8 !important;
                    color: #334155 !important;
                    text-align: justify !important;
                    text-justify: inter-word !important;
                }
                .prose ul {
                    list-style-type: disc !important;
                    padding-left: 1.5rem !important;
                    margin-top: 1rem !important;
                    margin-bottom: 1rem !important;
                }
                .prose li {
                    margin-top: 0.5rem !important;
                    margin-bottom: 0.5rem !important;
                    line-height: 1.7 !important;
                    color: #334155 !important;
                }
                .prose li::marker {
                    color: #025b5f !important;
                }
                .prose strong {
                    color: #0f172a !important;
                    font-weight: 700 !important;
                }
                .prose a {
                    color: #047857 !important;
                    font-weight: 600 !important;
                    text-decoration: underline !important;
                    text-underline-offset: 4px !important;
                    transition: color 0.2s ease-in-out !important;
                }
                .prose a:hover {
                    color: #025b5f !important;
                }
                .prose blockquote {
                    font-style: italic !important;
                    border-left: 4px solid #025b5f !important;
                    padding-left: 1.5rem !important;
                    color: #475569 !important;
                    margin: 2rem 0 !important;
                    background-color: #f8fafc !important;
                    padding-top: 1rem !important;
                    padding-bottom: 1rem !important;
                    border-radius: 0 12px 12px 0 !important;
                }

                /* Uniform style for inline images in the article body */
                .prose img {
                    max-width: 100% !important;
                    max-height: 400px !important;
                    width: auto !important;
                    height: auto !important;
                    border: 4px solid #025b5f !important;
                    border-radius: 16px !important;
                    margin-top: 2rem !important;
                    margin-bottom: 2rem !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                    display: block !important;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08) !important;
                }

                /* Styling for image captions/attributions below images */
                .prose .image-caption, 
                .prose .image-caption strong, 
                .prose .image-caption b {
                    font-size: 0.85rem !important;
                    font-weight: 400 !important;
                    color: #64748b !important;
                    text-align: center !important;
                    margin-top: -1.25rem !important;
                    margin-bottom: 2rem !important;
                    display: block !important;
                }
            `}</style>

            {showDownloadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-3xl max-w-lg w-full mx-4 p-6 sm:p-8 shadow-2xl relative border border-emerald-50 animate-scaleUp">
                        <button
                            onClick={() => {
                                setShowDownloadModal(false);
                                setIsRoleDropdownOpen(false);
                            }}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-extrabold text-gray-900 mb-2">Download Case Study</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Enter your details to download the document for <strong>{item.title}</strong>.
                        </p>
                        <form onSubmit={handleDownloadSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Your name <span className="text-red-500 font-bold">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none transition-all text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Phone number (optional)
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        pattern="^\+?[0-9\s]{10,20}$"
                                        title="Please enter a valid phone number (10-15 digits)"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Email address <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none transition-all text-sm"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    I am a <span className="text-red-500 font-bold">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none bg-white transition-all text-sm flex justify-between items-center text-left"
                                >
                                    <span className={formData.role ? "text-gray-900" : "text-gray-400"}>
                                        {formData.role || "Select an option"}
                                    </span>
                                    <span className="text-gray-400 text-xs">▼</span>
                                </button>
                                {/* Hidden input to preserve standard HTML5 validation if needed, but required is satisfied on handleDownloadSubmit by checking state */}
                                <input
                                    type="hidden"
                                    required
                                    value={formData.role}
                                />

                                {isRoleDropdownOpen && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto py-1 overflow-x-hidden">
                                        {[
                                            "Sustainability & ESG Support",
                                            "Water & Wastewater Treatment",
                                            "Geophysical Subsurface Survey",
                                            "Urban Planning & Project Support",
                                            "Climate Risk & Data Advisory",
                                            "Training & Capacity Building",
                                            "General Inquiry"
                                        ].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => {
                                                    setFormData({ ...formData, role: option });
                                                    setIsRoleDropdownOpen(false);
                                                }}
                                                className="w-full px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-950 text-left text-sm text-gray-700 transition-colors border-none whitespace-normal leading-tight"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Organization / Company (optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.org}
                                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none transition-all text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                <Download size={18} />
                                Download Document
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SingleContentPage;