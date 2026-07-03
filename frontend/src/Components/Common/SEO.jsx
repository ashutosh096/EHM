import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, ogTitle, ogDescription, ogImage, twitterCard, twitterSite, twitterCreator }) => {
  const siteName = "EHM Consultancy";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "EHM offers comprehensive environmental solutions including waterbody restoration, sustainability assessment, geophysical investigation, and expert consulting services.";
  const defaultKeywords = "Solution for HEIs,environmental solutions, waterbody restoration, sustainability assessment, geophysical investigation, hydrology, water management, environmental consulting, green solutions, EHM, EHM Consultancy";
  const baseUrl = "https://www.ehmconsultancy.co.in";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="EHM" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />

      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={`${baseUrl}${canonical}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}${canonical || ''}`} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      <meta property="og:image" content={ogImage || `${baseUrl}/ehm-homepage-meta.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
      <meta name="twitter:url" content={`${baseUrl}${canonical || ''}`} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || `${baseUrl}/ehm-homepage-meta.jpg`} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {/* Structured Data (JSON-LD) - Page Specific */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": fullTitle,
          "description": description || defaultDescription,
          "url": `${baseUrl}${canonical || ''}`,
          "publisher": {
            "@type": "Organization",
            "name": siteName,
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/favicon.png`
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
