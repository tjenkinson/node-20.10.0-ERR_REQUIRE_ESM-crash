# Node crash instead of `ERR_REQUIRE_ESM` error

It seems with node `v20.10.0` if you use the `--abort-on-uncaught-exception` flag and try and `require` a module that is ESM, instead of the `ERR_REQUIRE_ESM` error being thrown the process crashes instead. In the debugger it looks like it fails at the internal `containsModuleSyntax` check and trying to step into it doesn't work, as it crashes.

## Reproduction Steps
1. Install node `v20.10.0`
2. Run `node --abort-on-uncaught-exception ./test.js`

### Expected Output (from node `v20.9.0`)
```
Starting...
Caught excepton
Error [ERR_REQUIRE_ESM]: require() of ES Module <snip>/node_modules/some-esm-module/index.js from <snip>/test.js not supported.
Instead change the require of index.js in <snip>/test.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (<snip>/test.js:4:3) {
  code: 'ERR_REQUIRE_ESM'
}
✅
```

### Actual Output
```
Starting...
Uncaught SyntaxError: Unexpected token 'export'

FROM
Module._extensions..js (node:internal/modules/cjs/loader:1407:23)
Module.load (node:internal/modules/cjs/loader:1207:32)
Module._load (node:internal/modules/cjs/loader:1023:12)
Module.require (node:internal/modules/cjs/loader:1235:19)
require (node:internal/modules/helpers:176:18)
Object.<anonymous> (<snip>/test.js:4:3)
Module._compile (node:internal/modules/cjs/loader:1376:14)
Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
Module.load (node:internal/modules/cjs/loader:1207:32)
Module._load (node:internal/modules/cjs/loader:1023:12)
Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
node:internal/main/run_main_module:28:49[1]    51891 trace trap  /usr/local/bin/node --abort-on-uncaught-exception ./test.js
```
