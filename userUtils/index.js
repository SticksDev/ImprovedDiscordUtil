class ImprovedDiscordUtil {
    constructor(client, intents = false) {
        this.client = client;
        this.intents = intents;
        this.colors = {
            Reset: '\x1b[0m',
            Bright: '\x1b[1m',
            Dim: '\x1b[2m',
            Blink: '\x1b[5m',
            Reverse: '\x1b[7m',
            Hidden: '\x1b[8m',

            FgBlack: '\x1b[30m',
            FgRed: '\x1b[31m',
            FgGreen: '\x1b[32m',
            FgYellow: '\x1b[33m',
            FgBlue: '\x1b[34m',
            FgMagenta: '\x1b[35m',
            FgWhite: '\x1b[37m',
        };
        if (intents) console.log(this.colors.FgYellow, '[ImprovedDiscordUtil] You Are Using Intents Although This Will Provide More Info.\n It Might Make Your Bot Use More Memory.', this.colors.Reset);
    }

    /**
     * @returns {String} Help Command
     */
    help() {
        return console.log(`${this.colors.FgGreen}${this.colors.Bright}CommandList${this.colors.Reset}
${this.colors.FgMagenta}${this.colors.Bright}getAllUserCount${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} DESC: Get The Count Of All Users In a Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} EX: getAllUserCount() ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} Intents: False

${this.colors.FgMagenta}${this.colors.Bright}getGuildMembers${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} DESC: Get The User Object Of Every User In A Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} EX: getGuildMembers(guildObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} Intents: True

${this.colors.FgMagenta}${this.colors.Bright}getUserInfo${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} DESC: Get Alot Of User Info (Check Returns On Function For More Info) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} EX: getUserInfo(guildObject, userObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} Intents: Optional
        
${this.colors.FgMagenta}${this.colors.Bright}getGuildMemberList${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} DESC: Gives Arrays Of All Users And Bots And Both In A Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} EX: getGuildMemberList(guildObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} Intents: True
        
${this.colors.FgMagenta}${this.colors.Bright}getGuildRoles${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} DESC: Gives An Array Of All Roles In A Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} EX: getGuildRoles(guildObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} Intents: True
        
${this.colors.FgMagenta}${this.colors.Bright}getGuildChannels${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} DESC: Gives An Array Of All Channels In A Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} EX: getGuildChannels(guildObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta} Intents: True
${this.colors.Reset}`);
    }

    /**
     * @returns {Number} The Number Of Users The Bot Is With.
     */
    getAllUserCount() {
        return this.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    }


    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @returns {Object} Return the Object Of Every Discord User In The Server.
     * @requires intents
     */
    getGuildMembers(guild) {
        if (this.intents) return guild.members.cache;
    }

    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @param {Object} message Your Message Object. (EX: message.member)
     * @returns {{ accountCreationAt:String, joinedGuildAt:String, Nickname:String, roles:Array,
     * activityType:String, activityStatus:String, activityData:String, songName:String, songAuthor:String, songID:String}} Array Of Users Info (Check Object Above)
     * @optional You Will Get More Info While Using Intents
     */
    getUserInfo(guild, user) {
        if (!guild || typeof guild != 'object') throw new TypeError('You Are Missing The "Guild" Object.');
        if (!user || typeof user != 'object') throw new TypeError('You Are Missing The "User" Object.');
        const info = {};

        // Account Creation Date
        Object.assign(info, { accountCreationAt: user.user.createdAt.toLocaleDateString() });

        // Account Joined Guild At
        Object.assign(info, { joinedGuildAt: user.joinedAt.toLocaleDateString() });

        // Account Nickname
        Object.assign(info, { nickname: (user.nickname) ? user.nickname : '' });

        // Account Username
        Object.assign(info, { username: (user.user.tag) ? user.user.tag : '' });

        // Account Roles
        const roles = [];
        user.roles.cache.forEach(role => { roles.push(`<@&${role.id}>`); });
        Object.assign(info, { roles: roles });

        if (this.intents) {
            const activities = user.presence.activities[0];
            if (!activities || activities.length < 1) {
                Object.assign(info, { activityType: 'No Type' });
                Object.assign(info, { activityName: 'No Activity' });
                return info;
            }
            Object.assign(info, { activityType: activities.type });
            Object.assign(info, { activityName: activities.name });
            switch (activities.type) {
                case 'LISTENING':
                    Object.assign(info, { songName: `${activities.details}` });
                    Object.assign(info, { songAuthor: `${activities.state}` });
                    Object.assign(info, { songID: `${activities.syncID}` });
                    break;
            }
        } else {
            Object.assign(info, { activityType: 'no_intents' });
            Object.assign(info, { activityName: 'no_intents' });
            Object.assign(info, { songName: 'no_intents' });
            Object.assign(info, { songAuthor: 'no_intents' });
            Object.assign(info, { songID: 'no_intents' });
        }

        return info;
    }

    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @returns {{ users:Array, bots:Array, all:Array }} A List Of Users And Bots.
     * @requires intents
     */
    getGuildMemberList(guild) {
        if (this.intents) {
            if (!guild) throw new TypeError('Missing A Required Parameter. You Must Pass A Guild Object');
            const users = [];
            const bots = [];
            const all = [];

            guild.members.cache.filter(member => !member.user.bot).forEach(member => {
                users.push(`<@${member.user.id}>`);
            });
            guild.members.cache.filter(member => member.user.bot).forEach(member => {
                bots.push(`<@${member.user.id}>`);
            });
            guild.members.cache.forEach(member => {
                all.push(`<@${member.user.id}>`);
            });

            return { users: users, bots: bots, all: all };
        }
    }

    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @returns {{ roles:Array }} A List Of Roles.
     * @requires intents
     */
    getGuildRoles(guild) {
        if (this.intents) {
            if (!guild) throw new TypeError('Missing A Required Parameter. You Must Pass A Guild Object');
            const roles = [];

            guild.roles.cache.forEach(role => {
                roles.push(`<@&${role.id}>`);
            });

            return { roles: roles };
        }
    }

    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @returns {{ channels:Array }} A List Of Channels.
     * @requires intents
     */
    getGuildChannels(guild) {
        if (this.intents) {
            if (!guild) throw new TypeError('Missing A Required Parameter. You Must Pass A Guild Object');
            const channels = [];

            guild.channels.cache.filter(channel => channel.type != 'category').forEach(channel => {
                channels.push(`<#${channel.id}>`);
            });

            return { channels: channels };
        }
    }
}

module.exports = {
    ImprovedDiscordUtil,
};