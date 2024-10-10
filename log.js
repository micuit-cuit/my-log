//----------------------------
//----creat by micuit-cuit----
//----------------------------
//dectecte l'environnement (nodejs ou navigateur)
function isolateMiLog(){
let supoort256Color = true;
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
if (isNode) {
  supoort256Color = process.env.TERM.includes('256');
}
//dectecte si le terminal supporte les couleurs rgb ou ascii

const darkColor = [
  "blue"
]
class Log {
  constructor(stack = [color, text], textColor = true) {
    // stack est un tableau de string à afficher avant le message
    this.prefixe = stack;
    this.textColor = textColor;
  }

  getStackInfo() {
    const stack = new Error().stack.split('\n')[2]; // On change l'index à 2 car le contexte Node est différent
    const match = stack.match(/at (.+) \((.+):(\d+):\d+\)/);
    return match ? { func: match[1], file: match[2].split('/').pop(), line: match[3] } : { func: '', file: 'unknown', line: '0' };
  }
  colorize(color) {
    if (!isNode) {
      return { fg: 'black', bg: color };
    }
    if (supoort256Color) {
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));

      // Génère la séquence d'échappement ANSI pour les couleurs RGB
      return { fg: `\x1b[38;2;${r};${g};${b}m`, bg: `\x1b[40m` };
    }
    const colors = {
      reset: '\x1b[0m\x1b[40m',
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
      console.error(`Color ${color} not found in your terminal use different color or install a terminal that support it`);
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
        color = this.colorize('brightBlue').fg+this.colorize('black').bg+":dodgerblue"
        break;
      case 'WARN':
        emoji = '⚠️';
        color = this.colorize('brightYellow').fg+this.colorize('black').bg+":orange";
        break;
      case 'ERROR':
        emoji = '🚫';
        color = this.colorize('brightRed').fg+this.colorize('black').bg+":red";
        break;
      case 'DEBUG':
        emoji = '🐛';
        color = this.colorize('brightMagenta').fg+this.colorize('black').bg+":purple";
        break;
      default:
        emoji = '✅';
        color = this.colorize('brightGreen').fg+this.colorize('black').bg+":green";
    }
    if (!isNode) {
      color = color.split(':')[1];
    }else{
      color = color.split(':')[0];
    }

    let style = [];
    let message = '';
    let prefixes = [
      { style: 'circle', color: color, text: `${emoji} ${level}` },
      { style: 'square', color: isNode?this.colorize('yellow').fg+this.colorize('black').bg:"yellow", text: `${time}` },
      { style: 'square', color: color, text: `${file}:${line}` },
      ...this.prefixe.map((item) => {
        return { style:"circle", color: isNode?this.colorize(item.color).fg+this.colorize('black').bg:item.color, text: item.text };
      })
    ];
    if (isNode){ 
      for (let i = 0; i < prefixes.length; i++) {
        if (prefixes[i].style === 'circle') {
          style.push(prefixes[i].color +'(' + prefixes[i].text + ')' + this.colorize('reset'));
        } else {
          style.push(prefixes[i].color +"["+ prefixes[i].text +"]"+ this.colorize('reset'));
        }
      }
      let args2 = [];
      if (this.textColor) {
        for (let i = 0; i < args.length; i++) {
          let str = ""
          if (typeof args[i] == "object") {
              str = args[i]
              args2.push(str);
              continue;
          }
          str = color + args[i] + this.colorize('reset');
          args2.push(str);
        }
      }else{args2 = [...args]}     
      console.log(style.join(' '), ...args2, this.colorize('reset'));
    }else{
      for (let i = 0; i < prefixes.length; i++) {
        if (!prefixes[i].style == "square") {
          style.push(`background: ${prefixes[i].color}; color: ${darkColor.includes(prefixes[i].color) ? "white" : "black"}; font-weight: bold; border-radius: 5px;`);
          style.push("["+prefixes[i].text+"]");
        }else{
          style.push(`background: ${prefixes[i].color};  color: ${darkColor.includes(prefixes[i].color) ? "white" : "black"}; font-weight: bold; border-radius: 3px;`);
          style.push("("+prefixes[i].text+")");
        }
        style.push("");
        if (typeof prefixes[i].text == "object") {
          message += "%c%O%c ";
        }else{
          message += "%c%s%c ";
        }
      }
      message += " ";
      if (this.textColor) {
        //ajout de la couleur du texte à la fin du tableau
        for (let i = 0; i < args.length; i++) {

          
          if (typeof args[i] == "object") {
            style.push(`color: ${color}; font-weight: bold;`);
            message += "%c%o ";
          }else{
            style.push(`color: ${color}; font-weight: bold;`);
            message += "%c%s ";
          }
          style.push(args[i]);
        }
      }
      let args2 = [];
      if (!this.textColor)args2 = [...args]

      let messages = [message,...style, ...args2];
      console.log(
        ...messages
      );
    }
  }
  createPopup(level, message) {
    const randId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "-MI-LOG";
    let emoji, backgroundColor;
    switch (level) {
      case 'INFO':
        emoji = 'ℹ️'; backgroundColor = 'dodgerblue'; break;
      case 'WARN':
        emoji = '⚠️'; backgroundColor = 'orange'; break;
      case 'ERROR':
        emoji = '🚫'; backgroundColor = 'red'; break;
      case 'DEBUG':
        emoji = '🐛'; backgroundColor = 'purple'; break;
      case 'SUCCESS':
        emoji = '✅'; backgroundColor = 'green'; break;
      default:
        emoji = '✅'; backgroundColor = 'green';
    }

    let popupContainer = document.getElementById('popup-container-MI-LOG');
    if (!popupContainer) {
      const container = document.createElement('div');
      container.id = 'popup-container-MI-LOG';
      container.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        flex-direction: column;
        padding: 20px;
        box-sizing: border-box;
        z-index: 9999;
        transition: all 0.2s cubic-bezier(0, 0, 0.08108108108108109, 0.95625);
      `;
      document.body.appendChild(container);
      popupContainer = container;
    }
    const popup = document.createElement('div');
    popup.style.cssText = `
      margin-top: 10px;
      padding: 10px 20px;
      background-color: #333;
      color: white;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;



    popup.style.backgroundColor = backgroundColor;
    popup.innerHTML = `${emoji} ${level}: ${message}`;
    popup.id = randId;
    popupContainer.appendChild(popup);
    const event = popup.addEventListener('click', () => {
      if (!popup) {
        removeEventListener('click', event);
        return
      }
      popup.style.transition = 'transform 0.1s cubic-bezier(0, 0, 0.08108108108108109, 0.95625)';
      popup.style.transform = 'translateX(105%) rotate(15deg)';
      setTimeout(() => popupContainer.removeChild(popup), 200);
      removeEventListener('click', event);
    })
    setTimeout(() => {
      let popup = document.getElementById(randId);
      if (!popup) return
      popup.style.transition = 'transform 0.1s cubic-bezier(0, 0, 0.08108108108108109, 0.95625)';
      popup.style.transform = 'translatey(-205%)';
      setTimeout(() => popupContainer.removeChild(popup), 200);
      removeEventListener('click', event);
    }, 3000);
  }

  showPopupLog(level, message) {
    this.formatLog(level, message);
    this.createPopup(level, message);
  }
  l(...args) {this.formatLog('INFO', ...args);}
  w(...args) {this.formatLog('WARN', ...args);}
  e(...args) {this.formatLog('ERROR', ...args);}
  d(...args) {this.formatLog('DEBUG', ...args);}
  s(...args) {this.formatLog('SUCCESS', ...args);}
  i(...args) {this.formatLog('INFO', ...args);}
  c(...args) {console.log(...args);}
  get show() {
    if (isNode) return console;
    return {
      l: (...args) => this.showPopupLog('INFO', ...args),
      w: (...args) => this.showPopupLog('WARN', ...args),
      e: (...args) => this.showPopupLog('ERROR', ...args),
      d: (...args) => this.showPopupLog('DEBUG', ...args),
      s: (...args) => this.showPopupLog('SUCCESS', ...args),
      i: (...args) => this.showPopupLog('INFO', ...args),
    }
  }
    
}
return Log;
}

if (typeof require !== 'undefined') {
  module.exports = isolateMiLog();
}
if (typeof window !== 'undefined') {
  window.miLog = isolateMiLog();
}