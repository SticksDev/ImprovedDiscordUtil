const Discord = require('discord.js');
const client = new Discord.Client();
const IDU = require('./src/index');
const IDUClient = new IDU.ImprovedDiscordUtil(client, true);
require('dotenv').config();


client.once('ready', () => {
    console.log(`Logged In As ${client.user.tag} (${client.user.id})`);
    IDUClient.help();
});

client.on('message', (message) => {
    const command = message.content.split(' ')[0];
    if (command.toLowerCase() == '!test') {
        try {
            const effectUser = message.mentions.members.first() || message.member;
            console.log(effectUser);

            const getAllUserCount = IDUClient.getAllUserCount();
            const getGuildMembers = IDUClient.getGuildMembers(message.guild);
            const getUserInfo = IDUClient.getUserInfo(message.guild, effectUser);
            const getGuildMemberList = IDUClient.getGuildMemberList(message.guild);
            const getGuildRoles = IDUClient.getGuildRoles(message.guild);
            const getGuildChannels = IDUClient.getGuildChannels(message.guild);

            console.log('________________________________');
            console.log('getAllUserCount');
            console.log(getAllUserCount);
            console.log('________________________________');
            console.log('getGuildMembers');
            console.log(`${getGuildMembers.length} User Objects`);
            console.log('________________________________');
            console.log('getUserInfo');
            console.log(getUserInfo);
            console.log('________________________________');
            console.log('getGuildMemberList');
            console.log(getGuildMemberList);
            console.log('________________________________');
            console.log('getGuildRoles');
            console.log(getGuildRoles);
            console.log('________________________________');
            console.log('getGuildChannels');
            console.log(getGuildChannels);
            console.log('________________________________');
        } catch(err) {
            console.trace(err);
        }
    }
});

client.login(process.env.TOKEN);