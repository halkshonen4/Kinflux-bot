let { MessageType } = require('@adiwajshing/baileys')
let qrcode = require('qrcode')

if (global.conns instanceof Array) console.log()// for (let i of global.conns) global.conns[i] && global.conns[i].user ? global.conns[i].close().then(() => delete global.conns[id] && global.conns.splice(i, 1)).catch(global.conn.logger.error) : delete global.conns[i] && global.conns.splice(i, 1)
else global.conns = []

let handler  = async (m, { conn, args, usedPrefix, command }) => {
  let parent = args[0] && args[0] == 'plz' ? conn : global.conn
  let auth = false
  if ((args[0] && args[0] == 'plz') || global.conn.user.jid == conn.user.jid) {
    let id = global.conns.length
    let conn = new global.conn.constructor()
    conn.version = global.conn.version
    if (args[0] && args[0].length > 200) {
      let json = Buffer.from(args[0], 'base64').toString('utf-8')
      // global.conn.reply(m.isGroup ? m.sender : m.chat, json, m)
      let obj = JSON.parse(json)
      await conn.loadAuthInfo(obj)
      auth = true
    }
    conn.on('qr', async qr => {
      let scan = await parent.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), 'qrcode.png', '*🔰 Kinflux - Bot 🔰*\nㅤㅤㅤㅤ*Being a sub-bot*\n\n*With another phone or on your PC, scan this QR code to become a sub-bot*\n\n*1. Click on the three dots in the top right corner*\n*2. Tap on WhatsApp Web*\n*3. Scan this QR code*\n*This QR code expires in 20 seconds!*\n\n*⚠️ We are not responsible for any misuse or if the number gets sent to support. You have the duty to strictly follow the terms and conditions and privacy policy (type that, and it will be provided to you)*', m)
      setTimeout(() => {
        parent.deleteMessage(m.chat, scan.key)
      }, 30000)
    })
    conn.welcome = global.conn.welcome + ''
    conn.bye = global.conn.bye + ''
    conn.spromote = global.conn.spromote + ''
    conn.sdemote = global.conn.sdemote + ''
    conn.handler = global.conn.handler.bind(conn)
    conn.onDelete = global.conn.onDelete.bind(conn)
    conn.onParticipantsUpdate = global.conn.onParticipantsUpdate.bind(conn)
    conn.on('chat-update', conn.handler)
    conn.on('message-delete', conn.onDelete)
    conn.on('group-participants-update', conn.onParticipantsUpdate)
    conn.regenerateQRIntervalMs = null
    conn.connect().then(async ({user}) => {
      parent.reply(m.chat, '*Successfully connected with WhatsApp*\n*Note :This is temporary*\n*if the main Bot restarts or gets deactivated, all sub-bots will do the same*\n\n' + JSON.stringify(user, null, 2), m)
      if (auth) return
      await parent.sendMessage(user.jid, `*You can log in without the QR code using the following message. Send it when the bot is not functioning and/or whether there's a lost connection or not..*\n\n*You can get the QR code again by using the command #getcode. You must continue to be a sub-bot in order to receive it.*`, MessageType.extendedText)
      parent.sendMessage(user.jid, `${usedPrefix + command} ${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString('base64')}`, MessageType.extendedText)
    })
    setTimeout(() => {
      if (conn.user) return
      conn.close()
      let i = global.conns.indexOf(conn)
      if (i < 0) return
      delete global.conns[i]
      global.conns.splice(i, 1)
    }, 60000)
    conn.on('close', () => {
      setTimeout(async () => {
        try {
          if (conn.state != 'close') return
          if (conn.user && conn.user.jid)
            parent.sendMessage(conn.user.jid, `*⚠️ Lost connection.. please send the message that was sent to the number where the QR code was scanned.*`, MessageType.extendedText)
          let i = global.conns.indexOf(conn)
          if (i < 0) return
          delete global.conns[i]
          global.conns.splice(i, 1)
        } catch (e) { conn.logger.error(e) }
      }, 30000)
    })
    global.conns.push(conn)
  } else throw '*「🤖 𝙏͚͜͝͠𝙝͚͜͝͠𝙚͚͜͝͠ ͚͜͝͠𝙎͚͜͝͠𝙝͚͜͝͠𝙖͚͜͝͠𝙙͚͜͝͠𝙤͚͜͝͠𝙬͚͜͝͠ ͚͜͝͠𝘽͚͜͝͠𝙧͚͜͝͠𝙤͚͜͝͠𝙠͚͜͝͠𝙚͚͜͝͠𝙧͚͜͝͠𝙨͚͜͝͠ ͚͜͝͠-͚͜͝͠ ͚͜͝͠𝘽͚͜͝͠𝙤͚͜͝͠𝙩͚͜͝͠ ͚͜͝͠ 🤖」*\n\n*⚠️ It is not possible to create a bot within a sub-bot!*\n*✳️ Send the command #kinfluxbot to the official/main number of the Bot.*\n\n*👉🏻 https://wa.me/' + global.conn.user.jid.split`@`[0] + '?text=#kinfluxbot*\n\n*「🤖 𝙏͚͜͝͠𝙝͚͜͝͠𝙚͚͜͝͠ ͚͜͝͠𝙎͚͜͝͠𝙝͚͜͝͠𝙖͚͜͝͠𝙙͚͜͝͠𝙤͚͜͝͠𝙬͚͜͝͠ ͚͜͝͠𝘽͚͜͝͠𝙧͚͜͝͠𝙤͚͜͝͠𝙠͚͜͝͠𝙚͚͜͝͠𝙧͚͜͝͠𝙨͚͜͝͠ ͚͜͝͠-͚͜͝͠ ͚͜͝͠𝘽͚͜͝͠𝙤͚͜͝͠𝙩͚͜͝͠ ͚͜͝͠  🤖」*'
}
handler.help = ['kinfluxbot']
handler.tags = ['kinfluxbot']

handler.command = /^subbot|kinfluxbot|sersubbot|sersubot$/i
handler.prems = false
handler.private = false

handler.limit = false

module.exports = handler
