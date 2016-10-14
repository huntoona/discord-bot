var ToonaBot = require('./ToonaBot'),
    _ = require('lodash'), 
    Util = require('./Util'),
    needle = require('needle'),

    commands = null,

    CommandDriver = function(bot) {
		return {
	    	commands: {
	    		help: function(user, userID, channelID, command, args, rawEvent) {
	    			var helpText =
	    			    'ToonaBot Command List:\n`help` -> A list of all commands (evidently some of you need this...)\n`ping` -> Returns `pong` because why not\n`match <summonerName> <[server|\'na\']>` -> WIP Returns info about specified player\'s current game';

	    			Util.sendToChannel(channelID, helpText, bot);
	    		},

		        ping: function(user, userID, channelID, command, args, rawEvent) {
		        	Util.sendToChannel(channelID, 'pong', bot);
		        },
		        match: function(user, userID, channelID, command, args, rawEvent) {
		        	// https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/Toona?api_key=a3f2c997-bb48-4682-9e6f-3ece4acf9f0a
		        	switch (args.length) {
		        		case 0:
		        		    Util.sendToChannel(channelID, 'Please provide at least a summoner name\nType ;help for more details', bot);
		        		    break;
		        		case 1:
		        		case 2:
		        		    var gameServer = args.length > 1 ? args[1].toLowerCase() : 'na';
		        		    var stdSummName = args[0].toLowerCase().replace(/ /g, '');
		        			var call = Util.riotApiBase + '/api/lol/' + gameServer + Util.summonerNameSearch + stdSummName + '?api_key=' + Util.api_key;
		        			needle.get(call, function(error, response) {
		        				if (!error && response.statusCode === 200) {
		        					call = Util.riotApiBase + Util.currentGameSearch + Util.getCurrentGameSearchServerID(gameServer) + '/' + _.get(response, 'body[' + stdSummName + '].id') + '?api_key=' + Util.api_key;
		        					needle.get(call, function(error, gameData) {
		        						if (!error && gameData.statusCode == 200) {
		        							//console.log(response);
		        							Util.sendToChannel(channelID, Util.extractMatchData(_.get(gameData, 'body')), bot);
		        							//console.log('Game Data:\n', _.get(gameData, 'body'));
		        						} else if (gameData.statusCode === 404) {
		        							Util.sendToChannel(channelID, 'The user you entered (`' + args[0] + '`) is not in a game', bot);
		        						} else {
		        							Util.sendToChannel(channelID, 'Something got screwed up. You might want to contact @Toona ', bot);
		        						}
		        					});
		        				} else {
		        					Util.sendToChannel(channelID, 'This summoner does not appear to exist.', bot);
		        				}
		        			});
		        			break;
		        		default:
		        			Util.sendToChannel(channelID, 'Too many arguments provided!\nType ;help for more details', bot);
		        	}
		        }
	        }
	    }
    };

module.exports = CommandDriver;