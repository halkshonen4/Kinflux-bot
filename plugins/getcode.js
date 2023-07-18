let handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, '*This command is only for kinflux sub-bots.*', m)
  else global.conn.reply(conn.user.jid, `${usedPrefix}serbot ${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString('base64')}`, m)
}
handler.help = ['getcode']
handler.tags = ['kinfluxbot']
handler.command = /^(getcode)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
