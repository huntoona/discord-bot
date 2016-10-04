var ToonaBot = require('./ToonaBot'),
    _ = require('lodash'), 
    Util = require('./Util'),
    CommandDriver = require('./CommandDriver'),

    ActionDriver = function (cd, bot) {

        return {
	    	actions: {
		        init: function(rawEvent) {
		            //Util.sendToChannel(Util.dimDuddlies, 'Hello, I\'m ToonaBot! Please Disregard me while I am under development.', bot);
		            console.log("Started bot");
		        },
		        message: function(user, userID, channelID, message, rawEvent) {
		        	if (_.startsWith(message, Util.PREFIX)) {
		        		try {
		        			var numArgs = message.indexOf(' ');
		        			var args = [];
		        			if(numArgs > -1) {
			        			var command = message.substring(Util.PREFIX.length, message.indexOf(' '));
			        			var rawArgs = message.substring(Util.PREFIX.length + command.length + 1);
			        			if(rawArgs.indexOf("\"") > -1) {
			        				var noSpacesInQuotes = Util.fillInQuotes(rawArgs);
			        			} else {
			        				var noSpacesInQuotes = rawArgs;
			        			}
			        			args = noSpacesInQuotes.split(" ").map(function(currVal, index, arr) { return currVal.replace(/%20/g, ' '); });
			        		} else {
			        			var command = message.substring(Util.PREFIX.length);
			        		}
			        		console.log("args = " + args.toString());
			        		console.log('Command found in CommandDriver? ' + _.has(cd.commands, command));
			        		if (_.has(cd.commands, command)) {
			        			cd.commands[command](user, userID, channelID, command, args, rawEvent);
			        		} else {
			        			Util.sendToChannel(channelID, 'Error: entered invalid command name `' + command + '`', bot);
			        		}
			        	} catch(e) {
			        		console.log(e);
			        	}
		        	} else if (message === "Hello, I'm ToonaBot! Please Disregard me while I am under development.") {
		        		Util.sendToChannel(channelID, 'Fuck you!', bot);
		        	}
		        }
	        },


	    }
    }

module.exports = ActionDriver;