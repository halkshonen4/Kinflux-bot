let fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw `Example Usage\n${usedPrefix}spamcall 628xxxxxxxx`
  let nomor = text.replace(/[^0-9]/gi, '').slice(2)
  if (!nomor.startsWith('8')) throw `Example Usage\n${usedPrefix}spamcall 628xxxxxxxx`
  m.reply('_*Please wait, your request is being processed.....*_')
  let anu = await fetch(`https://id.jagreward.com/member/verify-mobile/${nomor}`).then(a => a.json())
  let spcall = `*Kinflux bot* : _${anu.phone_prefix}_\n\n_The bot successfully made a phone call.!_`
  conn.reply(m.chat, `${spcall}`.trim(), m)
  m.reply(anu)
}
// by Aine
handler.help = ['spamcall <nomor>']
handler.tags = ['tools']
handler.command = /^(spamcall)$/i
handler.limit = true
module.exports = handler
