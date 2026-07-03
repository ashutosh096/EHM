/**
 * Dynamically inserts Cloudinary auto-optimization and resizing parameters into image URLs.
 * If the URL is not a Cloudinary link, it returns the original URL.
 * 
 * @param {string} url - The original image URL
 * @param {number} [width] - Optional target width for responsive resizing
 * @returns {string} The optimized image URL
 */
export const optimizeCloudinaryUrl = (url, width) => {
  if (!url || typeof url !== "string") return url;
  
  if (url.includes("res.cloudinary.com") && url.includes("/image/upload/")) {
    const transformation = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto";
    return url.replace("/image/upload/", `/image/upload/${transformation}/`);
  }
  
  return url;
};
