const Discord = require('discord.js');
const moment = require('moment')
const client = new Discord.Client();
const gizli = require('./gizli.json');

var prefix =  gizli.prefix; // On-Ek Ayarlama

var botismi = gizli.botismi;
var version = gizli.version;

client.login(gizli.token); // Token

client.on("message", async msg => {
    if (msg.author.bot) return;
    if(msg.content.indexOf(prefix) !== 0) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const event = msg.content.toLower
    try {
      let commandFile = require(`./kodlar/${command}.js`);
      commandFile.run(client, msg, args);
    } catch (err) {}
  });

client.on('ready', () => {
    client.user.setActivity('Masum Uzay Geldi !')
    console.log('Baglanildi');
    console.log('Ozellikler Aktif Oldu!');
    console.log('Botun Prefix :'  + prefix);
    console.log('Bot Kullanıma Hazırlandı.');
});

client.on('message', msg => {
    if (msg.content === 'sa') {
        msg.reply('AS');
    }
    if (msg.content === 'merhaba') {
        msg.reply('Merhaba')
    }
    if (msg.content === prefix + 'bilgi') {
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(' Uzay Kucuk Kapsamlı Bot Olarak Kuruldu.\n Yapımcısı : Bilinmiyor.\n Kurulma Tarihi : 15.06.2018')
        .setFooter('Uzay Bilgi Sistemi')
        return msg.channel.send(embed)
    }
    if (msg.content === prefix + "sunucubilgi") {
        let sunucu = msg.guild
        let embed = new Discord.RichEmbed()
            .setColor(0x85cfff)
            .setTitle("Sunucu Bilgi")
            .setDescription(":date: Oluşturulma Tarihi -> " + sunucu.createdAt)
            .addField("Sunucu Adı", sunucu.name, )
            .addField("Sunucu ID", sunucu.id, )
            .addField("Sunucu Adı Kısaltımı", sunucu.nameAcronym, )
            .addField("Yazı Kanalları", sunucu.channels.filter(c => c.type === "text").size, )
            .addField("Ses Kanalları", sunucu.channels.filter(c => c.type === "voice").size, )
            .addField("Onay", sunucu.verificationLevel, )
            .addField("Çevrimiçi", sunucu.members.filter(m => m.user.presence.status === "online").size, )
            .addField("Boşta", sunucu.members.filter(m => m.user.presence.status === "idle").size, )
            .addField("Rahatsız Etmeyin", sunucu.members.filter(m => m.user.presence.status === "dnd").size, )
            .addField("Toplam Kişi Sayısı", sunucu.memberCount, )
            .addField("Bot Sayısı", sunucu.members.filter(m => m.user.bot).size, )
        return msg.channel.send(embed)
    }
    if (msg.content === prefix + "rastgelerenk") {
        function get_random(list) {
            return list[Math.floor((Math.random() * list.length))];
        }

        var color1 = "85cfff"
        var color2 = "ffffff"
        var color3 = "ff5199"

        let color = [color1, color2, color3]
        let sonuc = get_random(color)

        let embed = new Discord.RichEmbed()
            .setColor("0x" + sonuc)
            .setTitle("Rastgele Renk")
            .setDescription("#" + sonuc)
        return msg.channel.send(embed)
    }
    if (msg.content === prefix + 'yardım') {
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('» Genel Komutlar')
        .setDescription('**bilgi** : Botla Ilgili Bilgileri Gosterir.\n**sunucubilgi** : Sunucu Bilgisini Gosterir.\n**rastgelerenk** : Rastgele Renk Atar.\n**id** : Kendi ID Ogrenirsin.\n**yaz** : Bota Isdedini Yazdirirsin.\n**ping** : Botun Ping Gosterir.\n**bot-bilgi**: Bot Bilgilerini Gosterir.')
        .setFooter('Uzay Yardım Sistemi')
        return msg.channel.send(embed)
    }
    if (msg.content === prefix + 'bot-bilgi') {
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Bot - Bilgi')
        .setDescription(`Botun Prefix ${prefix}\nBotun Pingi ${msg.client.ping}\nBotun Ismi: ${botismi}\nBotun Version: ${version}`)
        .setFooter('Uzay Bot Bilgi Sistemi')
        return msg.channel.send(embed)
    }
});