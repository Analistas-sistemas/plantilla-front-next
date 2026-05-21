import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Rewrite de /inicio/inicio y /inicio/incio a /inicio (mantiene la URL visible)
      {
        source: '/inicio/inicio',
        destination: '/inicio',
      },
      {
        source: '/inicio/incio',
        destination: '/inicio',
      },
    ];
  },
};

export default nextConfig;
