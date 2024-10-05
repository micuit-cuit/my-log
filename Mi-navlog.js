//----------------------------
//----creat by micuit-cuit----
//----------------------------

class Log {
    constructor(stack=[]) {
      //stack est un tableau de string a afficher avant le message
      this.stack = stack;
    }
    getStackInfo() {
      const stack = new Error().stack.split('\n')[4];
      const match = stack.match(/at (.+) \((.+):(\d+):\d+\)/);
      return match ? { func: match[1], file: match[2].split('/').pop(), line: match[3] } : { func: '', file: 'unknown', line: '0' };
    }
  
    formatLog(level, ...args) {
      const { file, line } = this.getStackInfo();
      const time = new Date().toLocaleTimeString();
      
      let emoji, color;
      switch (level) {
        case 'INFO':
          emoji = 'ℹ️'; color = 'dodgerblue'; break;
        case 'WARN':
          emoji = '⚠️'; color = 'orange'; break;
        case 'ERROR':
          emoji = '🚫'; color = 'red'; break;
        case 'DEBUG':
          emoji = '🐛'; color = 'purple'; break;
        default:
          emoji = '✅'; color = 'green';
      }
  
      let style = []
      let message = ''
      let stack = [
        {style: "circle", color: color, text: `${emoji} ${level}`},
        {style: "square", color: "pink", text: `${time}`},
        {style: "square", color: color, text: `${file}:${line}`},
        ...this.stack 
      ]
      const darkColor = [
        "blue"
      ]
  
      for (let i = 0; i < stack.length; i++) {
        if (!stack[i].style == "square") {
          style.push(`background: ${stack[i].color}; color: ${darkColor.includes(stack[i].color) ? "white" : "black"}; font-weight: bold; border-radius: 5px;`);
        }else{
          style.push(`background: ${stack[i].color};  color: ${darkColor.includes(stack[i].color) ? "white" : "black"}; font-weight: bold; border-radius: 3px;`);
        }
        style.push(stack[i].text);
        style.push("");
        if (typeof stack[i].text == "object") {
          message += "%c%o%c ";
        }else{
          message += "%c%s%c ";
        }
      }
      let messages = [message,...style, ...args];
      console.log(
        ...messages
      );
    }
  
    createPopup(level, message) {
      const popup = document.createElement('div');
      popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: #333;
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        font-family: Arial, sans-serif;
      `;
  
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
  
      popup.style.backgroundColor = backgroundColor;
      popup.innerHTML = `${emoji} ${level}: ${message}`;
  
      document.body.appendChild(popup);
      const event = popup.addEventListener('click', () => {
        if (!popup) {
          removeEventListener('click', event);
          return
        }
        popup.style.transition = 'transform 0.1s cubic-bezier(0, 0, 0.08108108108108109, 0.95625)';
        popup.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(popup), 200);
        removeEventListener('click', event);
      })
      setTimeout(() => {
        if (!popup) return
        popup.style.transition = 'opacity 0.5s ease-out';
        popup.style.opacity = '0';
        setTimeout(() => document.body.removeChild(popup), 500);
        removeEventListener('click', event);
      }, 3000);
    }
  
    showPopupLog(level, message) {
      this.formatLog(level, message);
      this.createPopup(level, message);
    }
  
    l(...args) {this.formatLog('INFO', ...args)};
    w(...args) {this.formatLog('WARN', ...args)};
    e(...args) {this.formatLog('ERROR', ...args)};
    d(...args) {this.formatLog('DEBUG', ...args)};
    s(...args) {this.formatLog('SUCCESS', ...args)};
    i(...args) {this.formatLog('INFO', ...args)};
    c(...args) {console.log(...args)};
  
  
  
    get show(){return {
      l: (message) => this.showPopupLog('INFO', message),
      i: (message) => this.showPopupLog('INFO', message),
      w: (message) => this.showPopupLog('WARN', message),
      e: (message) => this.showPopupLog('ERROR', message),
      d: (message) => this.showPopupLog('DEBUG', message),
      s: (message) => this.showPopupLog('SUCCESS', message),
    }};
  
  }
  window.Log = Log;