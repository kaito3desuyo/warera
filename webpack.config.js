const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          // 下から順に処理される
          { loader: "babel-loader" },
          { loader: "ts-loader" }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    library: "Warera",
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this"
  }
};
