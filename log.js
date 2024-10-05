//----------------------------
//----creat by micuit-cuit----
//----------------------------

class Log {
  constructor(stack = []) {
    // stack est un tableau de string à afficher avant le message
    this.stack = stack;
  }

  getStackInfo() {
    const stack = new Error().stack.split('\n')[2]; // On change l'index à 2 car le contexte Node est différent
    const match = stack.match(/at (.+) \((.+):(\d+):\d+\)/);
    return match ? { func: match[1], file: match[2].split('/').pop(), line: match[3] } : { func: '', file: 'unknown', line: '0' };
  }
  colorize(color) {
    const colors = {
      reset: '\x1b[0m',
      black: { fg: '\x1b[30m', bg: '\x1b[40m' },
      red: { fg: '\x1b[31m', bg: '\x1b[41m' },
      green: { fg: '\x1b[32m', bg: '\x1b[42m' },
      yellow: { fg: '\x1b[33m', bg: '\x1b[43m' },
      blue: { fg: '\x1b[34m', bg: '\x1b[44m' },
      magenta: { fg: '\x1b[35m', bg: '\x1b[45m' },
      cyan: { fg: '\x1b[36m', bg: '\x1b[46m' },
      white: { fg: '\x1b[37m', bg: '\x1b[47m' },
      brightBlack: { fg: '\x1b[90m', bg: '\x1b[100m' },
      brightRed: { fg: '\x1b[91m', bg: '\x1b[101m' },
      brightGreen: { fg: '\x1b[92m', bg: '\x1b[102m' },
      brightYellow: { fg: '\x1b[93m', bg: '\x1b[103m' },
      brightBlue: { fg: '\x1b[94m', bg: '\x1b[104m' },
      brightMagenta: { fg: '\x1b[95m', bg: '\x1b[105m' },
      brightCyan: { fg: '\x1b[96m', bg: '\x1b[106m' },
      brightWhite: { fg: '\x1b[97m', bg: '\x1b[107m' },
    };
    if (colors[color]) {
      return colors[color];
    }else{
      console.error(`Color ${color} not found`);
      return colors['red'];
    }
  }
  formatLog(level, ...args) {
    const { file, line } = this.getStackInfo();
    const time = new Date().toLocaleTimeString();

    let emoji, color;
    switch (level) {
      case 'INFO':
        emoji = 'ℹ️';
        color = this.colorize( 'brightBlue').fg+this.colorize('black').bg;
        break;
      case 'WARN':
        emoji = '⚠️';
        color = this.colorize( 'brightYellow').fg+this.colorize('black').bg;
        break;
      case 'ERROR':
        emoji = '🚫';
        color = this.colorize( 'brightRed').fg+this.colorize('black').bg;
        break;
      case 'DEBUG':
        emoji = '🐛';
        color = this.colorize( 'brightMagenta').fg+this.colorize('black').bg;
        break;
      default:
        emoji = '✅';
        color = this.colorize( 'brightGreen').fg+this.colorize('black').bg;
    }

    let style = [];
    let message = '';
    let stack = [
      { style: 'circle', color: color, text: `${emoji} ${level}` },
      { style: 'square', color: this.colorize('yellow').fg+this.colorize('black').bg, text: `${time}` },
      { style: 'square', color: color, text: `${file}:${line}` },
      ...this.stack.map((item) => {
        return { style: item.style, color: this.colorize(item.color).fg+this.colorize('black').bg, text: item.text };
      })
    ];

    for (let i = 0; i < stack.length; i++) {
      if (stack[i].style === 'circle') {
        style.push(stack[i].color +'(' + stack[i].text + ')' + this.colorize('reset'));
      } else {
        style.push(stack[i].color +"["+ stack[i].text +"]"+ this.colorize('reset'));
      }
    }
    console.log(style.join(' '), ...args);
  }

  l(...args) {
    this.formatLog('INFO', ...args);
  }
  w(...args) {
    this.formatLog('WARN', ...args);
  }
  e(...args) {
    this.formatLog('ERROR', ...args);
  }
  d(...args) {
    this.formatLog('DEBUG', ...args);
  }
  s(...args) {
    this.formatLog('SUCCESS', ...args);
  }
  i(...args) {
    this.formatLog('INFO', ...args);
  }
  c(...args) {
    console.log(...args);
  }
}

module.exports = Log;
