console.log('Starting...')

try {
  require('some-esm-module');

  // note the local one below works
  // require('./local-esm-module.mjs');
} catch (e) {
  console.log('Caught excepton')
  console.error(e);
}

console.log('✅');
