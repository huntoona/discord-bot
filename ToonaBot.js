var Discord = require('discord.io'),
    _ = require('lodash'), 
    Util = require('./Util'),
    ActionDriver = require('./ActionDriver'),
    CommandDriver = require('./CommandDriver'),

    bot = null,

    ToonaBot = function() {
        bot = new Discord.Client({
            autorun: true,
            token: 'MjMyOTE4NTcxNjc4ODI2NDk2.CtWBEA.TuNFUthDuIUd588o8lIBnKfSYE4'
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