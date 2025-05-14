# Confessor Widgets (Vanilla)

This web-player is designed to work with Pacifica Streaming Services Confessor API written by Otis. All code in src/public is written by [Drew King](https://www.github.com/andrewpking)

## How to use

This player can be embedded into an existing webpage or linked to as a pop-out player (recommended). Since most radio websites are not built as Single Page Apps (SPA's), I recommend using this as a pop-out player.

### Pop-Out player

1. Fork this repository to your github
1. Clone your forked repository to your computer
1. Edit the name of index.html to reflect the name of the page you desire
1. Edit index.html so that the \<audio\> tag points to the URL of your IceCast stream.
1. Edit getCurrentShow.js so that the variable confessor is set to the URL for your confessor instance.
1. Save your changes and push them to your fork.
1. Upload the contents of src folder to your webpage into a subfolder for your pop-out player.
1. Add a link to the pop-out player to your homescreen by using the following code on your homepage:

`<a href="/path/to/your/player.html"
target="popup"
onclick="window.open('/path/to/your/player.html','popup','width=600,height=600'); return false;">
Now Playing
</a>`

## Current Limitations

The player requires JavaScript and an HTML-5 compliant browser to run, no Internet Explorer support is planned.

This player app assumes you are using Pacifica Streaming Services - Confessor software for your radio station's metadata. It also assumes that you have an IceCast server that is accessible publicly.

- Otis will need to update your confessor's PHP to allow this code to run, since his API does not include CORS headers by default.

This code is provided with the MIT license.
