let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) return conn.sendButton(m.chat, `There is no voting in this chat.`, '© Kinflux bot', 'Mulai', `${usedPrefix}+vote`, m)
    let [reason, upvote, devote] = conn.vote[id]
    conn.sendButton(m.chat, `
「 Voting 」

Alasan: ${reason}

╭─「 Upvote 」
│ _Total: ${upvote.length}_
│ ${upvote.map(u => '@' + u.split('@')[0]).join('\n')}
╰────
╭─「 Devote 」
│ _Total: ${devote.length}_
│ ${devote.map(u => '@' + u.split('@')[0]).join('\n')}
╰────
`.trim(), '© Kinflux bot', 'Hapus', `${usedPrefix}-vote`, m)
}
handler.help = ['cekvote']
handler.tags = ['vote']
handler.command = /^cekvote$/i

handler.group = true

module.exports = handler
