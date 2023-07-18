let handler = async (m, { conn, text }) => {

let [nomor, pesan, jumlah] = text.split('|')
if (!nomor) throw '*[ ⚠️ ] Please enter the number to which you want to send the spam message in the format #spamwa number|texto|quantity*'
if (!pesan) throw '*[ ⚠️ ] Please enter the number to which you want to send the spam message in the format #spamwa number|text|quantity.*'
if (jumlah && isNaN(jumlah)) throw '*[❗] La cantidad debe ser un número!*'

  let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
  let fixedJumlah = jumlah ? jumlah * 1 : 10
  if (fixedJumlah > 50) throw '*[ ⚠ ] Too many messages! Please enter a quantity below 50 messages*️'
  await m.reply(`*[❗] spam message sent to number ${nomor} Successfully completed.*\n*all messages ${fixedJumlah} sen successful!*`)
  for (let i = fixedJumlah; i > 1; i--) {
  if (i !== 0) conn.reply(fixedNumber, pesan.trim(), m)
  }
}
handler.help = ['spamwa <number>|<mesage>|<no of messages>']
handler.tags = ['premium']
handler.command = /^spam(wa)?$/i

handler.group = false
handler.premium = false
handler.private = false

module.exports = handler
