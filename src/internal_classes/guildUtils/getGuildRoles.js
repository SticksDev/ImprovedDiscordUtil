class getGuildRoles {
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
     * @returns {{ roles:Array }} A List Of Roles.
     * @requires intents
     */
    Main(guild) {
        if (this.intents) {
            if (!guild) throw new TypeError('Missing A Required Parameter. You Must Pass A Guild Object');
            const roles = [];

            guild.roles.cache.forEach(role => {
                roles.push(`<@&${role.id}>`);
            });

            return { roles: roles };
        }
    }
}

module.exports = {
    getGuildRoles,
};