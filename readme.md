# Confessor Widgets (Vanilla)

This web-player is designed to work with Pacifica Streaming Services Confessor API written by Otis. All code in src/public is written by [Drew King](https://www.github.com/andrewpking)

You can try an [example web-player widget](https://andrewpking.github.io/confessor-widgets-vanilla/) made for the KBCS website. Please note that GitHub Pages requires SSL for all resources to run in its domain, meaning your IceCast stream URL should start with `https://`.

**Note**: If you do not have an IceCast stream URL with `https://`, you will need to contact Otis for one.

## How to add player widget

This tutorial assumes you know the following:

- The call sign of your radio station.
- The URL of your confessor instance from pacifica.
- The URL of your web stream from pacifica.
- The timezone of your radio station.

This tutorial requires that you:

- Have a GitHub account
- Know how to [fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
- Are able to locate a config file and edit several variables.

The player can be embedded into an existing webpage or linked to as a pop-out player (recommended). Since most radio websites are not built as Single Page Apps (SPA's), I recommend using this as a pop-out player.

The steps described are for using github pages to host this player from a fork or self host a popout for advanced users.

### Pop-Out player for your confessor

- Fork this repository to your github account using the fork button.

#### Change variables for your radio station

Once you have your workspace setup, the following changes need to be made to the config file in `src/public/config.js`. You can do this directly on github in your fork.

1. Put your stations call sign in quotes for the `station` variable, the default is KBCS.
1. Put your stations confessor instance link in quotes for the `confessor`, we are using KBCS's confessor as a default.
1. Put your stations's IceCast Stream with https in the `stream` variable in quotes. This demo uses an [IceCast stream for KBCS](https://kbcsconf.pacificaservice.org).
1. Edit the variable for `timeZone` to match your radio station's timezone, formatted as an [IANA timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

**Note**: Don't forget to save the file when you are finished editing.

### Hosting

You can use the deployment pipeline built into this repository to host the player on your github pages website or self-host by uploading the code to your own server.

#### GitHub Pages (Recommended)

When you save the config file, it will automatically generate a site on github pages with your player at `your-github-username.github.io/confessor-widgets-vanilla`, you can use this page for your player.

**Note**: Be sure to replace your-github-username in the above link with your actual github username.

#### Self hosting

If you prefer to self host, you will simply copy the files to your webpage.

1. Download the code as a zip from your GitHub fork.
1. Edit the name of `src/public/index.html` to reflect the name of the page you desire.
1. Upload the contents of `src/public` folder to your webpage into a subfolder for your pop-out player.

### Add player to your homepage

You now have a web player for your radio station that includes metadata from Confessor. This is great, however your listeners will need to be able to find it.

Add a link to the pop-out player to your homescreen by using the following code on your homepage, using either the _path to your player_ or _link to github sites_ deployment of your player:

`<a href="/path/to/your/player.html"
target="popup"
onclick="window.open('/path/to/your/player.html','popup','width=600,height=600'); return false;">
Now Playing
</a>`

## Current Limitations

The player requires JavaScript and an HTML-5 compliant browser to run, no Internet Explorer support is planned.

This player app assumes you are using Pacifica Streaming Services - Confessor software for your radio station's metadata. It also assumes that you have an IceCast server that is accessible publicly and secured with SSL.

To use this contact Otis for help with:

- Updating your confessor's PHP to allow this code to run, since his API does not include CORS headers by default.
- Upgrading your IceCast server to support SSL/https. This player will likely fail your hosts domain requirements if that is not enabled.

This code is provided with the MIT license.
