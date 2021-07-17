const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FontminPlugin = require('fontmin-webpack');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  mode: 'production',
  entry: [
    './src/scss/app.scss',
    './src/js/app.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js'
  },
  devtool: false,
  performance: {
    hints: false
  },
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader',
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'url-loader?limit=10000',
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2
                }),
                require('imagemin-svgo')({
                  plugins: [{
                      removeTitle: true
                    },
                    {
                      convertPathData: false
                    }
                  ]
                })
              ]
            }
          },
          {
            loader: 'lqip-loader',
            options: {
              base64: true,
              palette: false
            }
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8000
            }
          },
          {
            loader: "svg-url-loader",
            options: {
              encoding: "base64",
              iesafe: true,
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {
          compress: {
            dead_code: true,
            drop_console: true,
          },
          output: {
            comments: false
          }
        }
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              },
            }
          ]
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.css',
      chunkFilename: 'css/app.css'
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '70-85'
      },
      optipng: {
        optimizationLevel: 9
      }
    }),
    new FontminPlugin({
      autodetect: true,
      glyphs: ['\uf0c8'],
    })
  ]
}