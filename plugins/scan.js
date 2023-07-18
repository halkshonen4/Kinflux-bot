// Thanks to TOXIC-DEVIL
// https://github.com/TOXIC-DEVIL

let handler = async (m, { conn, args }) => {
    if (!args || !args[0] || args.length === 0) throw '*[❗] Please enter a valid number*\n\*Example:*\n*#scan 5219991402134*'
    if (args[0].startsWith('0')) throw '*[❗] Please enter an area code!*'
    let user = await conn.isOnWhatsApp(args[0])
    let exists = user && user.exists ? true : false
    if (exists) {
        let sameGroup = [], isInDatabase = false
        let chat = conn.chats.all().filter(v => v.jid.endsWith('g.us') && !v.read_only)
        for (let gc of chat) {
            let participants = gc && gc.metadata && gc.metadata.participants ? gc.metadata.participants : []
            if (participants.some(v => v.jid === user.jid)) sameGroup.push(gc.jid)
        }
        if (user.jid in global.DATABASE._data.users) isInDatabase = true
        let str = ` 
*Nombre:* ${conn.getName(user.jid)}
*Numero:* ${splitM(user.jid)}
*Mencion:* ${toM(user.jid)}
*Link:* wa.me/${splitM(user.jid)}
*Jid:* ${user.jid}
*Whatsapp Bussines:* ${user.isBusiness ? 'Yes' : 'No'}
*Registered in the database.:* ${isInDatabase ? 'Yes' : 'No'}
*Are you in any group with it:* ${sameGroup.length} *Group*
`.trim()
        m.reply(str, m.chat, { 
            contextInfo: { 
                mentionedJid: conn.parseMention(str)
            }
        })
    } else throw '*[ ⚠️ ] User not found. Please ensure that the entered number is correct. *\n\n*👉To see an example, simply typee #scan*'
}
    
handler.help = ['scan'].map(v => v + ' [nomor]')
handler.tags = ['tools']
handler.command = /^scan$/i

module.exports = handler

function splitM(jid) {
    return jid.split('@')[0]
}

function toM(jid) {
    return '@' + splitM(jid)
}
