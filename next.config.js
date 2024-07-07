const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  reloadOnOnline: true,
});

const nextConfig = {
  images: {
    domains: ['images.unsplash.com',
      'pldphpgxyiuevonrkpas.supabase.co',
      "images.pexels.com"
    ],
  }
};

module.exports = withPWA(nextConfig);
