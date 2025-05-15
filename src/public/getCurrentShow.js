/**
  This JavaScript app is designed to work with Pacifica Streaming Services Confessor API written by Otis. This JavaScript app is written by Drew King https://www.github.com/andrewpking

  Note that Otis will need to update your confessor's PHP to allow this code to run, since the API does not include CORS headers by default.

  This code is provided with the MIT license.
**/

// Replace the link with your own confessor
let confessor = "https://kbcsconf.pacificaservice.org";

let currentShowCommand = "/_nu_do_api.php?req=getcurrent&json=1";

/** When the webpage is loaded, fetch data from the API and display it. **/
document.addEventListener("DOMContentLoaded", function () {
  nowPlaying();
});

/** Function to decode HTML entities as text **/
function decodeHtmlEntities(text) {
  const decoder = document.createElement("div");
  decoder.innerHTML = text;
  return decoder.textContent;
}

// Get currently playing show and manipulate DOM with metadata.
function nowPlaying() {
  fetch(confessor + currentShowCommand)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data && data.current) {
        const show = data.current;

        // Bind values to elements in the DOM if data is there.
        if (show.sh_url && show.sh_name) {
          document
            .getElementById("sh_url")
            .setAttribute("href", show.sh_url || "#");
          document.getElementById("sh_url").innerText =
            decodeHtmlEntities(show.sh_name) || "Unknown Show";
        }
        if (show.cat) {
          document.getElementById("sh_cat").innerText =
            decodeHtmlEntities(show.cat) || "";
        }
        if (show.sh_photo) {
          document
            .getElementById("sh_photo")
            .setAttribute("src", show.sh_photo || "default.jpg");
        }
        if (show.sh_djname) {
          document.getElementById("sh_djname").innerText =
            decodeHtmlEntities(show.sh_djname) || "Anonymous DJ";
        }
        if (show.sh_stime) {
          document.getElementById("sh_stime").innerText =
            decodeHtmlEntities(show.sh_stime) || "";
        }
        if (show.sh_ends) {
          document.getElementById("sh_ends").innerText =
            decodeHtmlEntities(show.sh_ends) || "";
        }
        if (show.sh_desc) {
          document.getElementById("sh_desc").innerText =
            decodeHtmlEntities(show.sh_desc) || "No description available.";
        }
      } else {
        console.error("Invalid data format or missing current_show");
      }
    })
    .catch((error) => console.error("Error processing show data:", error));
}
