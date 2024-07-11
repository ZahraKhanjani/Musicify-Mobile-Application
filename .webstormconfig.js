const System = require('eslint');
System.config({
  paths: {
    'api/*': './src/api/*',
    'assets/*': './src/assets/*',
    'components/*': './src/components/*',
    'icons/*': './src/icons/*',
    'models/*': './src/models/*',
    'navigation/*': './src/navigation/*',
    'screens/*': './src/screens/*',
    'theme/*': './src/theme/*',
    'utils/*': './src/utils/*',
  },
});
