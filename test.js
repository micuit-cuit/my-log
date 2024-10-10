const LogTest = typeof process !== 'undefined' ? require('./log.js') : miLog;
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
        log.l("cas particulier de la console web")
        log.l(document.body)
        log.l(document.getElementById("test"))
    }

    // if (typeof process === 'undefined') {
    //     await delay(100);
    //     log.show.l('Hello, World!');
    //     await delay(100);
    //     log.show.w('Hello, World!');
    //     await delay(100);
    //     log.show.e('Hello, World!');
    //     await delay(100);
    //     log.show.d('Hello, World!');
    //     await delay(100);
    //     log.show.s('Hello, World!');
    //     await delay(100);
    //     log.show.i('Hello, World!');
    // }
}

runLogging();
// function rgbToAnsi(r, g, b) {
//     // S'assure que les valeurs de couleur sont dans la plage de 0 à 255
//     r = Math.max(0, Math.min(255, r));
//     g = Math.max(0, Math.min(255, g));
//     b = Math.max(0, Math.min(255, b));

//     // Génère la séquence d'échappement ANSI pour les couleurs RGB
//     return `\x1b[38;2;${r};${g};${b}m`;
// }

// function resetColor() {
//     return '\x1b[0m'; // Réinitialise les couleurs
// }

// // Exemple d'utilisation
// const redText = rgbToAnsi(255, 0, 0) + "Ceci est du texte rouge !" + resetColor();
// const greenText = rgbToAnsi(0, 255, 0) + "Ceci est du texte vert !" + resetColor();
// const blueText = rgbToAnsi(0, 0, 255) + "Ceci est du texte bleu !" + resetColor();

// console.log(redText);
// console.log(greenText);
// console.log(blueText);

// //fais une annimation qui sicle sur tout les couleurs
// for (let i = 0; i < 256; i++) {
//     const color = rgbToAnsi(i, 0, 0) + "Ceci est du texte !" + resetColor()
//     + " " + rgbToAnsi(0, i, 0) + "Ceci est du texte !" + resetColor()
//     + " " + rgbToAnsi(0, 0, i) + "Ceci est du texte !" + resetColor()
//     + " " + rgbToAnsi(i, i, 0) + "Ceci est du texte !" + resetColor()
//     + " " + rgbToAnsi(0, i, i) + "Ceci est du texte !" + resetColor()
//     + " " + rgbToAnsi(i, 0, i) + "Ceci est du texte !" + resetColor()
//     + " " + rgbToAnsi(i, i, i) + "Ceci est du texte !" + resetColor()
//     console.log(color);
// }

