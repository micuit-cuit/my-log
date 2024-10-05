const Log = require('./log.js');
const log = new Log([
    { style: 'circle', color: 'brightGreen', text: 'Log' }
])//optional stack
log.l('Hello, World!');
log.w('Hello, World!');
log.e('Hello, World!');
log.d('Hello, World!');
log.s('Hello, World!');