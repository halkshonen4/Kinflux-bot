function handler(m) {
this.sendContact(m.chat, global.owner[0], this.getName(global.owner[0] + '@s.whatsapp.net'), m)
this.sendContact(m.chat, '254110077535', 'zamzack254-kunflux - digital', m)
this.sendContact(m.chat, '254110377776', 'kinflux - digital', m)}
handler.command = /^(contacto|owner|creator|creador|propietario|dueño)$/i
module.exports = handler
