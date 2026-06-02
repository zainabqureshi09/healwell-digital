export default {
  preset: "vercel",
  server: {
    entry: "src/server.ts",
  },
  publicAssets: [
    {
      dir: "./dist/client",
      maxAge: 31536000,
    },
  ],
};
