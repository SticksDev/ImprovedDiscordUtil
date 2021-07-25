class getGuildMemberList {
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
     * @returns {{ users:Array, bots:Array, all:Array }} A List Of Users And Bots.
     * @requires intents
     */
    Main(guild) {
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
}

module.exports = {
    getGuildMemberList,
};