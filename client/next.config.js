const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withTM = require('next-transpile-modules')([
  // `monaco-editor` isn't published to npm correctly: it includes both CSS
  // imports and non-Node friendly syntax, so it needs to be compiled.
  'monaco-editor',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com', 'i.pravatar.cc', 'api.dicebear.com', 'cdn.dsmcdn.com'],
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['json', 'css', 'typescript', 'html'],
          filename: 'static/[name].worker.js',
        }),
      );
    }
    return config;
  },
  publicRuntimeConfig: {
    isSignUpAvailable: false
  }
};

module.exports = withTM(nextConfig);
