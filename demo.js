// this is a demo file to show how to use the mi-log module
// works in both node.js and web browser, try it out!

let LogTest = typeof process !== 'undefined' ? require('./mi-log.js') : window.miLog;

const log = new LogTest([
    { style: 'circle', color: 'green', text: 'Log' }
]); // optional stack

async function runLogging() {
    log.l('Hello', 'World!,', { foo: 'bar' } ,"Hello2", "World2");
    log.w('Hello', 'World!,', { foo: 'bar' } ,"Hello2", "World2");
    log.e('Hello', 'World!,', { foo: 'bar' } ,"Hello2", "World2");
    log.d('Hello', 'World!,', { foo: 'bar' } ,"Hello2", "World2");
    log.s('Hello', 'World!,', { foo: 'bar' } ,"Hello2", "World2");
    log.i('Hello', 'World!,', { foo: 'bar' } ,"Hello2", "World2");
    log.c('Hello', 'World!,', { foo: 'bar' } ,"Hello2", "World2");


    if (typeof process == "undefined") {
        log.l("special case for the web console")
        log.l(document.body)
        log.l(document.getElementById("test"))
    }

    if (typeof process === 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 300));
        log.show.l('Hello, World!, click me!');
        await new Promise(resolve => setTimeout(resolve, 300));
        log.show.w('Hello, World!, click me!');
        await new Promise(resolve => setTimeout(resolve, 300));
        log.show.e('Hello, World!, click me!');
        await new Promise(resolve => setTimeout(resolve, 300));
        log.show.d('Hello, World!, click me!');
        await new Promise(resolve => setTimeout(resolve, 300));
        log.show.s('Hello, World!, click me!');
        await new Promise(resolve => setTimeout(resolve, 300));
        log.show.i('Hello, World!, click me!');
    }
}

runLogging();

