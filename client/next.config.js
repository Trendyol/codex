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
    isSignUpAvailable: true,
    baseUrl: process.env.BASE_URL,
    jwksCallbackUrl: process.env.JWKS_CALLBACK_URL,
    peerjsHost: process.env.PEERJS_HOST,
    peerjsPort: process.env.PEERJS_PORT,
    monacoSyncWsUrl: process.env.MONACO_SYNC_WS_URL,
    jwksEnabled: process.env.JWKS_ENABLED,
    jwksName: process.env.JWKS_NAME,
    passwordLoginEnabled: process.env.PASSWORD_LOGIN_ENABLED,
  }
};

module.exports = withTM(nextConfig);
