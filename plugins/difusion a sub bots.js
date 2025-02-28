let handler = async (m, { conn, usedPrefix, text }) => {
  if (conn.user.jid !== global.conn.user.jid) throw false
  let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user.jid)])]
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
  let teks = text ? text : cc.text
  let content = conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : '*〔 DIFUSION A SUB BOTS 〕*\n\n' + teks)
  for (let id of users) {
    await delay(1500)
    await conn.copyNForward(id, content, true)
  }
  conn.reply(m.chat, `*Broadcast successfully sent to ${users.length} sub bots*
  
${users.map(v => '👉🏻 wa.me/' + v.replace(/[^0-9]/g, '') + `?text=${encodeURIComponent(usedPrefix)}estado`).join('\n')}
\n*The sending process was completed in approximately ${users.length * 1.5} seconds*`.trim(), m)
}
handler.command = /^bcbot$/i
handler.rowner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const delay = time => new Promise(res => setTimeout(res, time))
