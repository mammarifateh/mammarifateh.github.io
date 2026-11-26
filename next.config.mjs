/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site is plain HTML/CSS/JS in ./out, hosted on GitHub Pages.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
