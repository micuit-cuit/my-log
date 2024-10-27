
# mi-log
mi-log is a simple logger for nodejs and browser.
creat a colorful log in console
support css color name, hex color, rgb color.
## Installation
```bash
    # in npm
    npm i mi-log
    # in yarn
    yarn add mi-log
    # in pnpm
    pnpm add mi-log
    # in deno, use node module system
    import Log from 'https://cdn.jsdelivr.net/npm/mi-log@2';
    # in browser
    <script src="cdn.jsdelivr.net/npm/mi-log@2.0.0"></script>
```

## use in nodejs
```javascript
    const Log = require('mi-log');
    const log = new Log([
        { color: 'brightGreen', text: 'Log' }
    ])//optional
    log.l('Hello, World!');
    log.w('Hello, World!');
    log.e('Hello, World!');
    log.d('Hello, World!');
    log.s('Hello, World!');
```
## use in browser
```html
    <script src="cdn.jsdelivr.net/npm/mi-log@2.0.0"></script>
    <script>
        const navLog = new Log([{ color: 'green', text: 'Log' }]);//optional
        navLog.l('Hello World');
        navLog.w('Hello World');
        navLog.e('Hello World');
        navLog.i('Hello World');
        navLog.d('Hello World');
        navLog.c('Hello World');
        navLog.show.l('Hello World');
        navLog.show.w('Hello World');
        navLog.show.e('Hello World');
        navLog.show.i('Hello World');
        navLog.show.d('Hello World');
    </script>
```