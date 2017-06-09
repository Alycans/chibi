const Discord = require('discord.js');
const bot = new Discord.Client();
var token = require('./token.json');
const jimp = require('jimp');


// Ready Stuff
bot.on('ready', () => {
    console.log('Connected, the bot should be working now!');

 });
 
bot.on('disconnect', () => { console.log('Disconnected, should be reconnecting soon.'); });

bot.on('reconnecting', () => { console.log('Reconnecting.'); });

bot.on('guildMemberAdd', member => {
	try{
	jimp.read(member.user.avatarURL).then(function(avatar){
		if(member.user.avatarURL !== null){
		
	jimp.read('./welcomewithoutprinting.png').then(function(image){
		jimp.loadFont('./Monotype Corsiva.fnt').then(function(font){
			image.print(font, 830, 257, member.user.username)
			.composite(avatar.resize(186, 175), 737, 66)
			.write('./welcomewithout_name' + member.user.id + '.png', function(){
			member.guild.channels.find('id', token.channelid).sendFile('./welcomewithout_name' + member.user.id + '.png')
		})
		})
		}).catch(function(err){
		member.guild.channels.find('id', '309781301899296779').sendMessage('`' + err + '`')
	})
		}
	})
	
	jimp.read(member.user.avatarURL).then(function(avatar){
		if(member.user.avatarURL === null){
		jimp.read('./noimage.png').then(function(noimage){
	jimp.read('./welcomewithoutprinting.png').then(function(image){
		jimp.loadFont('./Monotype Corsiva.fnt').then(function(font){
			image.print(font, 830, 257, member.user.username)
			.composite(noimage.resize(186, 175), 737, 66)
			.write('./welcomewithout_name' + member.user.id + '.png', function(){
			member.guild.channels.find('id', token.channelid).sendFile('./welcomewithout_name' + member.user.id + '.png')
		})
		})
	})
		}).catch(function(err){
		member.guild.channels.find('id', '309781301899296779').sendMessage('`' + err + '`')
	})
		}
		})

	}catch(err){
		member.guild.channels.find('id', '309781301899296779').sendMessage('`' + err + '`')
	}
})

bot.login(token.token);