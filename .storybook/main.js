const path = require("path");

module.exports = {
  stories: ["../src/lib/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
  ],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../src/lib"),
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx");
    config.resolve.modules.push(path.resolve(__dirname, "../src"));

    return config;
  },
  reactOptions: {
    fastRefresh: true,
  },
  core: {
    builder: 'webpack5',
  },
};
