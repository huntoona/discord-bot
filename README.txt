Installation and Running instructions:

Note: Right now this is pretty janky to install... need to do some QoL changes to make it not so... but I'm lazy.

1. Clone repo:
https://github.com/huntoona/discord-bot.git

2. Next:
npm install needle
(because I've been too lazy to add it to the package.txt file as of yet, and yes i do realize that that takes less effort than typing this out)

3. If running in foreground (debugging, etc.), all you need to do now is run:
node DiscordBotHome.js

Running in background (production, etc.):

1. Install forever:
sudo npm install forever -g

Now you just need to run with the following commands (although if you weren't lazy you'd probably specify a few forever params):
forever start DiscordBotHome.js

Then you can kill via:
forever stop <PID>
or
forever stopall <PID>

Have fun!
