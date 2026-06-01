/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve AVIF when the browser supports it (≈20–40% smaller than WebP for
    // photos), falling back to WebP. Cuts LCP image bytes on slow connections.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      // Demo placeholder images — replaced by the school's real uploads later.
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "ui-avatars.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
