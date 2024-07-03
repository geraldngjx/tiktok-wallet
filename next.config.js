const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  }
};

module.exports = withPWA(nextConfig);
