import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import qs from 'qs';
import autoprefixerStylus from 'autoprefixer-stylus';
import config from 'config';

const DEV_MODE = process.env.NODE_ENV !== 'production';

const APP = process.env.PAD ? './pad' : './app';
const DEST = process.env.PAD ? './dist/pad' : './dist/mobile';
const MODULES = './modules';

const GLOBALS = {
  process: {
    env: {
      CONFIG: JSON.stringify(config),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  },
};

const getStylusConfig = () => ({
  use: [
    autoprefixerStylus({
      browsers: [
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 2.3',
        'bb >= 10',
      ],
    }),
  ],
  import: ['~modules/styles/index.styl'],
});

const extractCSS = new ExtractTextPlugin('app', '[name]-[hash].css', {
  allChunks: true,
});

const vendorJS = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: '[name]-[hash].js',
});

const indexHTML = new HtmlWebpackPlugin({
  title: 'HU',
  template: './index.html',
});

const createCssLoaderWithStyleLoader = (test, loaders) => {
  if (test) {
    return ['style-loader'].concat(loaders).join('!');
  }
  return extractCSS.extract(loaders);
};

export default {
  context: path.join(__dirname, APP),

  entry: {
    vendor: [
      'react',
      'react-dom',
      'classnames',
    ],
    app: './index.js',
  },

  output: {
    path: path.join(__dirname, DEST),
    filename: '[name]-[hash].js',
  },

  module: {
    loaders: [
      {
        test: /_\.styl/,
        loader: createCssLoaderWithStyleLoader(DEV_MODE, [
          `css-loader?${qs.stringify({
            sourceMap: true,
            modules: true,
            importLoaders: 1,
            localIdentName: DEV_MODE ? '[name]__[local]---[hash:base64:5]' : '[hash:base64:5]',
          })}`,
          'stylus-loader',
        ]),
      },
      {
        test: /[^_]\.styl/,
        loader: createCssLoaderWithStyleLoader(DEV_MODE, [
          `css-loader?${qs.stringify({
            sourceMap: true,
          })}`,
          'stylus-loader',
        ]),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.i\.svg$/,
        loaders: [
          'svg2jsx',
          'simplify-svg/lib/loader',
        ],
      },
      {
        test: /\.(woff2|woff|ttf|otf|eot|mp4)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: DEV_MODE ? 'url-loader' : 'file?name=images/[sha512:hash:base64:7].[ext]',
      },
    ],
  },

  stylus: getStylusConfig(),

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
      __dirname,
    ],
    alias: {
      config: path.join(__dirname, MODULES, 'config/index.js'),
    },
  },

  plugins: [
    extractCSS,
    vendorJS,
    indexHTML,
    new webpack.DefinePlugin(GLOBALS),
    ...(
      DEV_MODE ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ]
    ),
  ],

  stats: {
    colors: true,
    reasons: true,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false,
  },
};
