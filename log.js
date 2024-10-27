//----------------------------
//----creat by micuit-cuit----
//----------------------------
//dectecte l'environnement (nodejs ou navigateur)
//reset le theme de couleur 

function isolateMiLog(){
let supoort256Color = true;
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
if (isNode) {
  supoort256Color = process.env.TERM.includes('256');
}
//dectecte si le terminal supporte les couleurs rgb ou ascii
const colorName = {"black": "#000000","silver": "#c0c0c0","gray": "#808080","white": "#ffffff","maroon": "#800000","red": "#ff0000","purple": "#800080","fuchsia": "#ff00ff","green": "#008000","lime": "#00ff00","olive": "#808000","yellow": "#ffff00","navy": "#000080","blue": "#0000ff","teal": "#008080","aqua": "#00ffff","aliceblue": "#f0f8ff","antiquewhite": "#faebd7","aquamarine": "#7fffd4","azure": "#f0ffff","beige": "#f5f5dc","bisque": "#ffe4c4","blanchedalmond": "#ffebcd","blueviolet": "#8a2be2","brown": "#a52a2a","burlywood": "#deb887","cadetblue": "#5f9ea0","chartreuse": "#7fff00","chocolate": "#d2691e","coral": "#ff7f50","cornflowerblue": "#6495ed","cornsilk": "#fff8dc","crimson": "#dc143c","cyan": "#00ffff","darkblue": "#00008b","darkcyan": "#008b8b","darkgoldenrod": "#b8860b","darkgray": "#a9a9a9","darkgreen": "#006400","darkkhaki": "#bdb76b","darkmagenta": "#8b008b","darkolivegreen": "#556b2f","darkorange": "#ff8c00","darkorchid": "#9932cc","darkred": "#8b0000","darksalmon": "#e9967a","darkseagreen": "#8fbc8f","darkslateblue": "#483d8b","darkslategray": "#2f4f4f","darkturquoise": "#00ced1","darkviolet": "#9400d3","deeppink": "#ff1493","deepskyblue": "#00bfff","dimgray": "#696969","dodgerblue": "#1e90ff","firebrick": "#b22222","floralwhite": "#fffaf0","forestgreen": "#228b22","gainsboro": "#dcdcdc","ghostwhite": "#f8f8ff","gold": "#ffd700","goldenrod": "#daa520","greenyellow": "#adff2f","honeydew": "#f0fff0","hotpink": "#ff69b4","indianred": "#cd5c5c","indigo": "#4b0082","ivory": "#fffff0","khaki": "#f0e68c","lavender": "#e6e6fa","lavenderblush": "#fff0f5","lawngreen": "#7cfc00","lemonchiffon": "#fffacd","lightblue": "#add8e6","lightcoral": "#f08080","lightcyan": "#e0ffff","lightgoldenrodyellow": "#fafad2","lightgray": "#d3d3d3","lightgreen": "#90ee90","lightpink": "#ffb6c1","lightsalmon": "#ffa07a","lightseagreen": "#20b2aa","lightskyblue": "#87cefa","lightslategray": "#778899","lightsteelblue": "#b0c4de","lightyellow": "#ffffe0","limegreen": "#32cd32","linen": "#faf0e6","mediumaquamarine": "#66cdaa","mediumblue": "#0000cd","mediumorchid": "#ba55d3","mediumpurple": "#9370db","mediumseagreen": "#3cb371","mediumslateblue": "#7b68ee","mediumspringgreen": "#00fa9a","mediumturquoise": "#48d1cc","mediumvioletred": "#c71585","midnightblue": "#191970","mintcream": "#f5fffa","mistyrose": "#ffe4e1","moccasin": "#ffe4b5","navajowhite": "#ffdead","oldlace": "#fdf5e6","olivedrab": "#6b8e23","orange": "#ffa500","orangered": "#ff4500","orchid": "#da70d6","palegoldenrod": "#eee8aa","palegreen": "#98fb98","paleturquoise": "#afeeee","palevioletred": "#db7093","papayawhip": "#ffefd5","peachpuff": "#ffdab9","peru": "#cd853f","pink": "#ffc0cb","plum": "#dda0dd","powderblue": "#b0e0e6","rebeccapurple": "#663399","rosybrown": "#bc8f8f","royalblue": "#4169e1","saddlebrown": "#8b4513","salmon": "#fa8072","sandybrown": "#f4a460","seagreen": "#2e8b57","seashell": "#fff5ee","sienna": "#a0522d","skyblue": "#87ceeb","slateblue": "#6a5acd","slategray": "#708090","snow": "#fffafa","springgreen": "#00ff7f","steelblue": "#4682b4","tan": "#d2b48c","thistle": "#d8bfd8","tomato": "#ff6347","turquoise": "#40e0d0","violet": "#ee82ee","wheat": "#f5deb3","whitesmoke": "#f5f5f5","yellowgreen": "#9acd32","brightBlack": "#545454","brightRed": "#FF5555","brightGreen": "#55FF55","brightYellow": "#FFFF55","brightBlue": "#5555FF","brightMagenta": "#FF55FF","brightCyan": "#55FFFF","brightWhite": "#FFFFFF"}
  
function colorToHex(color) {
  if (colorName[color]) {
    return colorName[color];
  }else if (color[0] === '#') {
    return color;
  }else if (color.startsWith("rgb")) {
    let [r, g, b] = color.match(/\d+/g);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }else{
    console.error(`Color ${color} not use, support only hex, rgb, rgba or css color name`);
    return "#ff0000";
  }
}

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
    try {
      // Capturer la stack trace
      const err = new Error();
      const stack = err.stack || '';
      
      // Séparer la stack en lignes
      let lines = stack.split('\n');
      
      // Trouver l'index de la dernière ligne contenant "log.js"
      const logJsIndex = lines.reduce((lastIndex, line, index) => {
        return line.includes('log.js') ? index : lastIndex;
      }, -1);
      
      // Si on trouve log.js, on ne garde que les lignes après
      if (logJsIndex !== -1) {
        lines = lines.slice(logJsIndex + 1);
      }
     
      // Si pas de stack trace après filtrage, retourner les valeurs par défaut
      if (lines.length === 0) {
        return { func: '', file: 'unknown', line: '0' };
      }
  
      // Prendre la première ligne non vide après le filtrage
      const callerLine = lines.find(line => line.trim()) || '';
      
      // Patterns pour Chrome/Node.js
      const chromePatterns = [
        // Format: "at Function (file:line:column)"
        /^\s*at\s+([^\s]+)\s+\(([^:]+):(\d+):\d+\)$/,
        // Format: "at file:line:column"
        /^\s*at\s+([^:]+):(\d+):\d+$/
      ];
      
      // Tester d'abord le pattern avec nom de fonction
      let match = callerLine.match(chromePatterns[0]);
      if (match) {  
        return {
          func: match[1] || '',
          file: match[2].split('/').pop() || 'unknown',
          line: match[3] || '0'
        };
      }
      
      // Tester ensuite le pattern sans nom de fonction
      match = callerLine.match(chromePatterns[1]);
      if (match) {
        return {
          func: '',
          file: match[1].split('/').pop() || 'unknown',
          line: match[2] || '0'
        };
      }
  
      // Si aucun pattern ne correspond
      return {
        func: '',
        file: callerLine.split('/').pop().split(':')[0] || 'unknown',
        line: callerLine.split('/').pop().split(':')[1] || '0'
      };
    } catch (e) {
      console.error('Erreur dans getStackInfo:', e);
      // En cas d'erreur, retourner les valeurs par défaut
      return {
        func: '',
        file: 'unknown',
        line: '0'
      };
    }
  }
  

  
  colorize(color) {
    if (!isNode) {
      return { fg: 'black', bg: color };
    }
    if (supoort256Color) {
      if (color === 'reset') {
        return '\x1b[0m';
      }
      // Convertit les couleurs hexadécimales en RGB
      color = colorToHex(color);
      if (color[0] === '#') {
        color = color.slice(1);
      }
      if (color.length === 3) {
        color = color.split('').map((x) => x + x).join('');
      }
      let r = parseInt(color.slice(0, 2), 16);
      let g = parseInt(color.slice(2, 4), 16);
      let b = parseInt(color.slice(4, 6), 16);

      // Génère la séquence d'échappement ANSI pour les couleurs RGB
      return `\x1b[38;2;${r};${g};${b}m`;
    }
    const colors = {
      reset: '\x1b[0m',
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m' ,
      white: '\x1b[37m',
      brightBlack: '\x1b[90m',
      brightRed: '\x1b[91m',
      brightGreen: '\x1b[92m',
      brightYellow: '\x1b[93m',
      brightBlue: '\x1b[94m',
      brightMagenta: '\x1b[95m',
      brightCyan: '\x1b[96m',
      brightWhite: '\x1b[97m',
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
        color = this.colorize('brightBlue')+":dodgerblue"
        break;
      case 'WARN':
        emoji = '⚠️';
        color = this.colorize('brightYellow')+":orange";
        break;
      case 'ERROR':
        emoji = '🚫';
        color = this.colorize('brightRed')+":red";
        break;
      case 'DEBUG':
        emoji = '🐛';
        color = this.colorize('brightMagenta')+":purple";
        break;
      default:
        emoji = '✅';
        color = this.colorize('brightGreen')+":green";
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
      { style: 'square', color: isNode?this.colorize('yellow'):"yellow", text: `${time}` },
      { style: 'square', color: color, text: `${file}:${line}` },
      ...this.prefixe.map((item) => {
        return { style:"circle", color: isNode?this.colorize(item.color):item.color, text: item.text };
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
        style.push(`background: ${prefixes[i].color}; color: ${darkColor.includes(prefixes[i].color) ? "white" : "black"}; font-weight: bold; border-radius: 2px; padding: 0 5px;`);
        style.push(prefixes[i].text);
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