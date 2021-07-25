const Discord = require('discord.js');
const client = new Discord.Client();
const IDU = require('./userUtils/index');
const IDUClient = new IDU.ImprovedDiscordUtil(client, true);
require('dotenv').config();


client.once('ready', () => {
    console.log(`Logged In As ${client.user.tag} (${client.user.id})`);
    IDUClient.help();
});

client.on('message', (message) => {
    const command = message.content.split(' ')[0];
    if (command.toLowerCase() == '!getuserinfo') {
        try {
            const getUserInfo = IDUClient.getUserInfo(message.guild, message.mentions.members.first());

            const embed = new Discord.MessageEmbed()
                .setTitle(`__User Info For: ${getUserInfo['username']}__`)
                .setDescription(`**Account Created At:** ${getUserInfo['accountCreationAt']}
                **Joined Guild At:** ${getUserInfo['joinedGuildAt']}
                **Users Username:** ${getUserInfo['username']}
                **Users Nickname:** ${getUserInfo['nickname']}
                **Users Roles:** ${getUserInfo['roles']}
                **Activity Type:** ${getUserInfo['activityType']}
                **Activity Name:** ${getUserInfo['activityName']}
                ${(getUserInfo['songName']) ? `**Song Name:** ${getUserInfo['songName']}` : ''}
                ${(getUserInfo['songAuthor']) ? `**Song Author:** ${getUserInfo['songAuthor']}` : ''}
                ${(getUserInfo['songID']) ? `**Song ID:** ${getUserInfo['songID']}` : ''}`)
                .setTimestamp();
            message.channel.send(embed);
        } catch(err) {
            console.trace(err);
        }
    }
    if (command.toLowerCase() == '!getguildmembercount') {
        try {
            const getGuildMemberList = IDUClient.getGuildMemberList(message.guild);

            const embed = new Discord.MessageEmbed()
                .setTitle(`__Guild Member Count For ${message.guild.name}__`)
                .setDescription(`**Users:** ${getGuildMemberList['users']}

                Bots: ${getGuildMemberList['bots']}
                
                All: ${getGuildMemberList['all']}`)
                .setTimestamp();
            message.channel.send(embed);
        } catch(err) {
            console.trace(err);
        }
    }
    if (command.toLowerCase() == '!getguildroles') {
        try {
            const getguildroles = IDUClient.getGuildRoles(message.guild);

            const embed = new Discord.MessageEmbed()
                .setTitle(`__Guild Roles For ${message.guild.name}__`)
                .setDescription(`**Roles:** ${getguildroles['roles']}`)
                .setTimestamp();
            message.channel.send(embed);
        } catch(err) {
            console.trace(err);
        }
    }
    if (command.toLowerCase() == '!getguildchannels') {
        try {
            const getguildchannels = IDUClient.getGuildChannels(message.guild);

            const embed = new Discord.MessageEmbed()
                .setTitle(`__Guild Channels For ${message.guild.name}__`)
                .setDescription(`**Channels:** ${getguildchannels['channels']}`)
                .setTimestamp();
            message.channel.send(embed);
        } catch(err) {
            console.trace(err);
        }
    }
});

client.login(process.env.TOKEN);