// Util Class
var ToonaBot = require('./ToonaBot'),
    _ = require('lodash'),

    Util = {
		// The prefix to be used when executing a command with ToonaBot
		PREFIX: ';',

		dimDuddlies: '129067982587428864',

		riotApiBase: 'https://na.api.pvp.net',

		summonerNameSearch: '/v1.4/summoner/by-name/',

		currentGameSearch: '/observer-mode/rest/consumer/getSpectatorGameInfo/',

		api_key: 'a3f2c997-bb48-4682-9e6f-3ece4acf9f0a',

		sendToChannels: function(channelIDs, message, bot) {
		    _.forEach(channelIDs, function(currentValue, index, array) {
		        Util.sendToChannel(currentValue, message, bot);
		    });
		},

		sendToChannel: function(channelID, message, bot) {
			bot.sendMessage({
				to: channelID,
		        message: message
		    });
		},

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
			return message;
		},

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
					console.log(tmp0 + " -> " + tmp1);
					console.log(str.substring(tmp0, tmp1));
					console.log(str.substring(tmp0, tmp1).replace(/ /g, '%20'))
					finalStr = finalStr.replace(str.substring(tmp0, tmp1), str.substring(tmp0, tmp1 + 1).replace(/ /g, '%20').replace(/"/g, ''));
				}
				console.log(finalStr);
				return finalStr;
			} else {
				throw new Error("WTF are you doing with your quotes, sir? (Uneven Number of Quotes)")
			}
		}
    }

module.exports = Util;