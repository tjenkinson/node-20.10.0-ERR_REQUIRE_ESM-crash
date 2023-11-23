console.log('Starting...')

try {
  require('supports-color');
} catch (e) {
  console.log('Caught excepton')
  console.error(e);
}

console.log('✅');
