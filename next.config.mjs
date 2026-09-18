/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All site images are hosted on Cloudinary (see lib/siteData.js) and are
    // served directly from there, resized by Cloudinary.
    loader: "custom",
    loaderFile: "./lib/cloudinaryLoader.js",
  },
};

export default nextConfig;
