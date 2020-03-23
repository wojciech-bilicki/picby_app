const {getDefaultConfig} = require('metro-config');
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      blacklistRE: blacklist([
        /node_modules\/.*\/node_modules\/react-native\/.*/,
        /nodejs-assets\/.*/,
        /android\/.*/,
        /ios\/.*/,
      ]),
    },
  };
})();
