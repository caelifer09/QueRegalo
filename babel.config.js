module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["nativewind/babel"],
      ['module:react-native-dotenv', {
        moduleName: 'dotenv',
        path: '.env',
        safe: false,
        allowUndefined: true,
      }]
    ]
  };
};
