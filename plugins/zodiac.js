let handler = (m, { usedPrefix, command, text }) => {
    if (!text) throw `Example:\n${usedPrefix + command} 2003 02 25`

    const date = new Date(text)
    if (date == 'kinflux bot cant identify this becouse of wrong data input, start with  year then month then date AAAA MM DD Example: 2003 02 07 ') throw date
    const d = new Date()
    const [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    const birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    
    const zodiac = getZodiac(birth[1], birth[2])
    const ageD = new Date(d - date)
    const age = ageD.getFullYear() - new Date(1970, 0, 1).getFullYear()

    const birthday = [tahun + (birth[1] < bulan), ...birth.slice(1)]
    const cekusia = bulan === birth[1] && tanggal === birth[2] ? `${age} - Happy birthday 🥳` : age

    const teks = `
Fecha de nacimiento: : ${birth.join('-')}
Proximo cumpleaños : ${birthday.join('-')}
Edad : ${cekusia}
Signo zodical : ${zodiac}
`.trim()
    m.reply(teks)
}
handler.help = ['zodiac *2002 02 25*']
handler.tags = ['General']

handler.command = /^zodia[kc]$/i

module.exports = handler

const zodiak = [
    ["Capricornio", new Date(1970, 0, 1)],
    ["Acuario", new Date(1970, 0, 20)],
    ["Piscis", new Date(1970, 1, 19)],
    ["Aries", new Date(1970, 2, 21)],
    ["Tauro", new Date(1970, 3, 21)],
    ["Geminis", new Date(1970, 4, 21)],
    ["Cancer", new Date(1970, 5, 22)],
    ["Leo", new Date(1970, 6, 23)],
    ["Virgo", new Date(1970, 7, 23)],
    ["Libra", new Date(1970, 8, 23)],
    ["Scorpion", new Date(1970, 9, 23)],
    ["Sagitario", new Date(1970, 10, 22)],
    ["Capricornio", new Date(1970, 11, 22)]
].reverse()

function getZodiac(month, day) {
    let d = new Date(1970, month - 1, day)
    return zodiak.find(([_,_d]) => d >= _d)[0]
}
