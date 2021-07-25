class ImprovedDiscordUtil {
    constructor(client, intents = false) {
        this.client = client;
        this.intents = intents;
        this.colors = {
            Reset: '\x1b[0m',
            Bright: '\x1b[1m',
            Dim: '\x1b[2m',

            FgGreen: '\x1b[32m',
            FgMagenta: '\x1b[35m',
            FgYellow: '\x1b[33m',
        };
        if (intents) console.log(this.colors.FgYellow, '[ImprovedDiscordUtil] You Are Using Intents Although This Will Provide More Info.\n It Might Make Your Bot Use More Memory.', this.colors.Reset);
    }

    /**
     * @returns {String} Console.logs() The Help Command
     */
    help() {
        return console.log(`${this.colors.FgGreen}${this.colors.Bright}CommandList${this.colors.Reset}
${this.colors.FgMagenta}${this.colors.Bright}getAllUserCount${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} DESC: Get The Count Of All Users In a Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} EX: getAllUserCount() ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} Intents: False

${this.colors.FgMagenta}${this.colors.Bright}getGuildMembers${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} DESC: Get The User Object Of Every User In A Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} EX: getGuildMembers(guildObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} Intents: True

${this.colors.FgMagenta}${this.colors.Bright}getUserInfo${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} DESC: Get Alot Of User Info (Check Returns On Function For More Info) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} EX: getUserInfo(guildObject, userObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} Intents: Optional
        
${this.colors.FgMagenta}${this.colors.Bright}getGuildMemberList${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} DESC: Gives Arrays Of All Users And Bots And Both In A Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} EX: getGuildMemberList(guildObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} Intents: True
        
${this.colors.FgMagenta}${this.colors.Bright}getGuildRoles${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} DESC: Gives An Array Of All Roles In A Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} EX: getGuildRoles(guildObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} Intents: True
        
${this.colors.FgMagenta}${this.colors.Bright}getGuildChannels${this.colors.Reset}${this.colors.FgMagenta} ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} DESC: Gives An Array Of All Channels In A Guild ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} EX: getGuildChannels(guildObject) ${this.colors.Reset}${this.colors.Bright}>${this.colors.FgMagenta}${this.colors.Dim} Intents: True
${this.colors.Reset}`);
    }

    /**
     * @returns {Number} The Number Of Users The Bot Is With.
     */
    getAllUserCount() {
        const file = require('./internal_classes/userUtils/getAllUserCount');
        const client = new file.getAllUserCount(this.client, this.intents);
        const result = client.Main();
        return result;
    }


    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @param {Object} user Your User Object. (EX: message.member)
     * @returns {{ accountCreationAt:String, joinedGuildAt:String, Nickname:String, roles:Array,
     * activityType:String, activityStatus:String, activityData:String, songName:String, songAuthor:String, songID:String}} Array Of Users Info (Check Object Above)
     * @optional You Will Get More Info While Using Intents
     */
    getUserInfo(guild, user) {
        const file = require('./internal_classes/userUtils/getUserInfo');
        const client = new file.getUserInfo(this.client, this.intents);
        const result = client.Main(guild, user);
        return result;
    }


    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @returns {['A_Lot_Of_Objects']} An Array Of User Objects In The Guild
     * @requires intents
     */
    getGuildMembers(guild) {
        const file = require('./internal_classes/guildUtils/getGuildMembers');
        const client = new file.getGuildMembers(this.client, this.intents);
        const result = client.Main(guild);
        return result;
    }

    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @returns {{ users:Array, bots:Array, all:Array }} A List Of Users And Bots.
     * @requires intents
     */
    getGuildMemberList(guild) {
        const file = require('./internal_classes/guildUtils/getGuildMemberList');
        const client = new file.getGuildMemberList(this.client, this.intents);
        const result = client.Main(guild);
        return result;
    }

    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @returns {{ roles:Array }} A List Of Roles.
     * @requires intents
     */
    getGuildRoles(guild) {
        const file = require('./internal_classes/guildUtils/getGuildRoles');
        const client = new file.getGuildRoles(this.client, this.intents);
        const result = client.Main(guild);
        return result;
    }

    /**
     * @param {Object} guild Your Guild Object. (EX: message.guild)
     * @returns {{ channels:Array }} A List Of Channels.
     * @requires intents
     */
    getGuildChannels(guild) {
        const file = require('./internal_classes/guildUtils/getGuildChannels');
        const client = new file.getGuildChannels(this.client, this.intents);
        const result = client.Main(guild);
        return result;
    }
}

module.exports = {
    ImprovedDiscordUtil,
};