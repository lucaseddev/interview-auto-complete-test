const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app/main/index.tsx",
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "/public/js/",
    filename: "bundle.js",
    clean: true,
  },
  context: __dirname,
  resolve: {
    alias: {
      lib: path.resolve(__dirname, "src/lib/"),
      app: path.resolve(__dirname, "src/app/"),
      utils: path.resolve(__dirname, "src/utils/"),
    },
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      logging: "info",
      overlay: true,
      progress: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
