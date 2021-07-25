class getUserInfo {
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
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @param {Object} message Your Message Object. (EX: message.member)
     * @returns {{ accountCreationAt:String, joinedGuildAt:String, Nickname:String, roles:Array,
     * activityType:String, activityStatus:String, activityData:String, songName:String, songAuthor:String, songID:String}} Array Of Users Info (Check Object Above)
     * @optional You Will Get More Info While Using Intents
     */
    Main(guild, user) {
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
}

module.exports = {
    getUserInfo,
};