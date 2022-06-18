import path from 'path';
import {fileURLToPath} from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = {
  entry: './src/index.js',
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      util: false,
      buffer: false,
      url: false,
      vm: false,
      querystring: false,
      os: false,
      constants: false,
      assert: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  output: {
    filename: 'output.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: './dist',
    port: 9000,
  },
  mode: 'development',
};
export default config;