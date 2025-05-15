# Confessor Widgets (Vanilla)

This web-player is designed to work with Pacifica Streaming Services Confessor API written by Otis. All code in src/public is written by [Drew King](https://www.github.com/andrewpking)

You can try an [example web-player widget](https://andrewpking.github.io/confessor-widgets-vanilla/) made for the KBCS website, the audio playback does not work at the moment due to Otis's IceCast instance for KBCS not supporting SSL. GitHub Pages requires SSL for all resources to run in its domain.

## How to add player widget

This player can be embedded into an existing webpage or linked to as a pop-out player (recommended). Since most radio websites are not built as Single Page Apps (SPA's), I recommend using this as a pop-out player.

Alternatively, you can use github pages to host this player from a fork.

### Pop-Out player for your confessor

1. Fork this repository to your github
1. Clone your forked repository to your computer for editing.

#### Change variables for your radio station

Once you have your workspace setup, the following changes need to be made to files in `src/public` directory:

1. Edit index.html so that the \<audio\> tag points to the URL of your IceCast stream this demo uses an [IceCast stream for KBCS](http://stream.pacificaservice.org:8000/kbcs).
1. Edit getCurrentShow.js so that the variable confessor is set to the URL for your confessor instance.
1. Edit getCurrentShow.js so that the variable timeZone is set to the [IANA timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for your radio station.

Once you have prepared your player, you can test it by opening `index.html` in your browser. Now you will need to host this player.

### Hosting

You can use the deployment pipeline built into this repo to host the player on your github pages website or self-host by uploading the code to your own server.

#### GitHub Pages (Recommended)

Save your changes and push them to your fork, this will automatically generate a site on github pages with your player at `your-github-username.github.io/confessor-widgets-vanilla`, you can use this page for your player.

**Note**: This page will not load the audio unless you contact Otis to setup SSL on your IceCast server (see "Current Limitations" section)

#### Self hosting

If you prefer to self host, you will simply copy the files to your webpage.

- Edit the name of `src/public/index.html` to reflect the name of the page you desire.
- Upload the contents of src/public folder to your webpage into a subfolder for your pop-out player.

### Add player to your homepage

You now have a web player for your radio station that includes metadata from Confessor. This is great, however your listeners will need to be able to find it.

Add a link to the pop-out player to your homescreen by using the following code on your homepage, using either the path to your player or link to github sites deployment of your player:

`<a href="/path/to/your/player.html"
target="popup"
onclick="window.open('/path/to/your/player.html','popup','width=600,height=600'); return false;">
Now Playing
</a>`

## Current Limitations

The player requires JavaScript and an HTML-5 compliant browser to run, no Internet Explorer support is planned.

This player app assumes you are using Pacifica Streaming Services - Confessor software for your radio station's metadata. It also assumes that you have an IceCast server that is accessible publicly and secured with SSL.

To use this contact Ots for help with:

- Updating your confessor's PHP to allow this code to run, since his API does not include CORS headers by default.
- Upgrading your IceCast server to support SSL/https. This player will likely fail your hosts domain requirements if that is not enabled.

This code is provided with the MIT license.
