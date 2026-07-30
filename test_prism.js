const Prism = require('prismjs');
require('prismjs/components/prism-c');
Prism.languages.c.string.inside = {
  'format-specifier': {
    pattern: /%[-+ #0]*[\d\*]*(\.\d+)?([hlLzjt])?[diuoxXfFeEgGaAcspn%]/,
    alias: 'variable'
  }
};
console.log(Prism.highlight('printf("%d", 1);', Prism.languages.c, 'c'));
