// Util Class
var ToonaBot = require('./ToonaBot'),
    _ = require('lodash'),

    Util = {
		// The prefix to be used when executing a command with ToonaBot
		PREFIX: ';',

		// ID for default Server Used
		dimDuddlies: '129067982587428864',

		//  Different Parts of the Riot API url to be used in commands
		riotApiBase: 'https://na.api.pvp.net',

		summonerNameSearch: '/v1.4/summoner/by-name/',

		currentGameSearch: '/observer-mode/rest/consumer/getSpectatorGameInfo/',

		// Pretty sure this key is expired but it still works for demonstration
		api_key: 'a3f2c997-bb48-4682-9e6f-3ece4acf9f0a',

		// Sends message to all channels in channelIDs
		sendToChannels: function(channelIDs, message, bot) {
		    _.forEach(channelIDs, function(currentValue, index, array) {
		        Util.sendToChannel(currentValue, message, bot);
		    });
		},

		// Sends message to channel with the specified ChannelID
		sendToChannel: function(channelID, message, bot) {
			bot.sendMessage({
				to: channelID,
		        message: message
		    });
		},

		// converts colloquial names to Riot's clunky server names
		getCurrentGameSearchServerID: function(server) {
			switch (server) {
				case 'na':
					return 'NA1';
				case 'br':
					return 'BR1';
				case 'eun':
					return 'EUN1';
				case 'euw':
					return 'EUW1';
				case 'jp':
					return 'JP1';
				case 'kr':
					return 'KR';
				case 'lan':
					return 'LA1';
				case 'las':
					return 'LA2';
				case 'oce':
					return 'OC';
				case 'pbe':
					return 'PBE1';
				case 'ru':
					return 'RU';
				case 'tr':
					return 'TR1';
				default:
					throw new Error('Error: Server Not Supported');
			}
		},

		// extracts relevant match information from data object returned by API
		extractMatchData: function(data) {
			var bluePlayers = [],
			redPlayers = [];

			var message = '';
			var filteredGameMode;
			var filteredGameType;
			var filteredGameQueueConfigId;
			switch (data.gameType) {
				case 'MATCHED_GAME':
					filteredGameType = 'Matched';
					break;
				case 'CUSTOM_GAME':
					filteredGameType = 'Custom';
					break;
				case 'TUTORIAL_GAME':
					filteredGameType = 'Tutorial'
					break;
			}
			switch (data.gameMode) {
				case 'CLASSIC':
					filteredGameMode = '5v5';
					break;
				default:
					filteredGameMode = 'Other';
					break;
			}
			switch (data.gameQueueConfigId) {
				case 410:
					filteredGameQueueConfigId = 'Dynamic Ranked';
					break;
				case 400:
				default:
					filteredGameQueueConfigId = 'Normal';
					break;
			}
			message += 'Game Information: \n`' + filteredGameType + ' ' + filteredGameMode + ' | ' + filteredGameQueueConfigId + '`';
			_.forEach(data.participants, function(currentValue, index, array) {
				if(currentValue.teamId === 100) {
					bluePlayers.push(currentValue);
				} else if(currentValue.teamId === 200) {
					redPlayers.push(currentValue);
				}
			});
			message += '\nBlue Team:\n'
			_.forEach(bluePlayers, function(currentValue, index, array) {
				message += currentValue.summonerName + '\n';
			});
			message += '\nRed Team:\n'
			_.forEach(redPlayers, function(currentValue, index, array) {
				message += currentValue.summonerName + '\n';
			});
			return message;
		},

		// processing function for command inputs to allow quotes around parameters that need spaces in them
		// this both ensures an even number of quotes and URL encodes the spaces in quotes (to be used in API calls)
		fillInQuotes: function(str) {
			if((str.match(/"/g) || []).length % 2 === 0) {
				var quoteLocs = [str.indexOf("\"")];
				while(str.indexOf("\"", quoteLocs[quoteLocs.length - 1] + 1) > -1) {
					quoteLocs.push(str.indexOf("\"", quoteLocs[quoteLocs.length - 1] + 1));
				}
				var finalStr = str;

				while(quoteLocs.length > 1) {
					var tmp0 = quoteLocs.shift();
					var tmp1 = quoteLocs.shift();
					finalStr = finalStr.replace(str.substring(tmp0, tmp1 + 1), str.substring(tmp0, tmp1 + 1).replace(/ /g, '%20').replace(/"/g, ''));
				}
				return finalStr;
			} else {
				throw new Error("Uneven Number of Quotes");
			}
		}
    }

module.exports = Util;