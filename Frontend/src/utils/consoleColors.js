const msgStyle = {
  error: 'color: red; font-weight: bold',
  info: 'color: royalblue; font-weight: bold',
  warn: 'color: orange; font-weight: bold',
  event: 'color: magenta; font-weight: bold',
  reRender: 'color: dimgray; font-weight: bold; font-size:1.5rem',
  useEffectIn: 'color: blueviolet; font-weight: bold',
  funcIn: 'color: indianred; font-weight: bold',
  setCalled: 'color: tomato; font-weight: bold',
  brown: 'color: sienna',
}

const CONSOLE = {
  error: function (msg) {
    coloredMsg(msgStyle.error, msg)
  },
  info: function (msg) {
    coloredMsg(msgStyle.info, msg)
  },
  warn: function (msg) {
    coloredMsg(msgStyle.warn, msg)
  },
  event: function (msg) {
    coloredMsg(msgStyle.event, msg)
  },
  reRender: function (msg) {
    coloredMsg(msgStyle.reRender, msg)
  },
  brown: function (msg) {
    coloredMsg(msgStyle.brown, msg)
  },
  useEffectIn: function (msg) {
    coloredMsg(msgStyle.useEffectIn, `useEffectIn -> ${msg}`)
  },
  funcIn: function (msg) {
    coloredMsg(msgStyle.funcIn, `function In -> ${msg}`)
  },
  setCalled: function (msg) {
    coloredMsg(msgStyle.setCalled, `set **$${msg}** called!`)
  },
}

function coloredMsg(style, ...msg) {
  console.log(`%c${msg}`, style)
}

export default CONSOLE
