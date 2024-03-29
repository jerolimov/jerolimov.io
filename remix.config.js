/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"],
  mdx: async () => {
    const rehypePlugins = await Promise.all([
      import("rehype-highlight").then(mod => mod.default),
    ]);
    return {
      rehypePlugins,
    };
  },
};
