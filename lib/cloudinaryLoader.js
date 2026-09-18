// next/image loader: the browser fetches images straight from Cloudinary, which
// resizes them and picks the format (instead of going through /_next/image).
// Turns .../image/upload/v123/name.jpg into .../image/upload/f_auto,q_auto,c_limit,w_640/v123/name.jpg
export default function cloudinaryLoader({ src, width, quality }) {
  if (!src.includes("res.cloudinary.com")) return src;

  const transforms = ["f_auto", `q_${quality || "auto"}`, "c_limit", `w_${width}`].join(",");
  return src.replace("/image/upload/", `/image/upload/${transforms}/`);
}
