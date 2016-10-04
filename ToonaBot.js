var DiscordClient = require('discord.io'),
    _ = require('lodash'), 
    Util = require('./Util'),
    ActionDriver = require('./ActionDriver'),
    CommandDriver = require('./CommandDriver'),

    bot = null,

    ToonaBot = function() {
        bot = new DiscordClient({
            autorun: true,
            token: 'MTcwNzE3NzUwNDk3NTA5Mzc2.CfNdWA.MmVzbvxw5TfIuO_j_7f7wO1_-TA'
        });
    
        initCommands();
    },

    initCommands = function() {
        var cd = new CommandDriver(bot)
        var acDr = new ActionDriver(cd, bot);

        bot.on('ready', acDr.actions.init);

        bot.on('disconnect', bot.connect);

        bot.on('message', acDr.actions.message);
    };

module.exports = ToonaBot;