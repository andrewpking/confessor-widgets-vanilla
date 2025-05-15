/**
 * @fileoverview Client for the Pacifica Streaming Services Confessor API that displays
 * current show information and automatically updates when shows change.
 *
 * @requires CORS-enabled Confessor API endpoint
 * @author Drew King {@link https://www.github.com/andrewpking}
 * @author Otis (Confessor API)
 * @license MIT
 *
 * @note The Confessor PHP API must be configured to allow CORS requests for this client to work.
 */

// Configuration is loaded from config.js which must be included before this file

// API call needed to get the current show.
const currentShowCommand = `${config.confessor}/_nu_do_api.php?req=getcurrent&json=1`;

// Fetch configuration for CORS requests
const fetchConfig = {
  mode: 'cors',
  credentials: 'omit',
  headers: {
    'Accept': 'application/json'
  }
};

let nextShowTime = null;

/**
 * Initializes the show information when the DOM is fully loaded.
 *
 * This event listener executes once when the page loads and:
 * 1. Makes the initial API call to get current show data
 * 2. Updates the DOM with show information
 * 3. Sets up the nextShowTime for the automatic refresh cycle
 *
 * Global state affected:
 * - nextShowTime: Set to the next show's start time
 *
 * @listens {Event} DOMContentLoaded
 * @async
 * @fires {Function} nowPlaying
 */
document.addEventListener("DOMContentLoaded", async function () {
  // Initialize audio player with station info
  document.getElementById("title").textContent = config.station + " Web Player";
  document.getElementById("station-name").textContent = config.station;
  document.getElementById("audio-player").src = config.stream;

  // Initialize show information
  nextShowTime = await nowPlaying();
  console.log("Next show time:", nextShowTime);
});

/**
 * Timer that checks for show transitions and updates the display.
 *
 * This interval runs every minute to check if we've passed the next show's start time.
 * It includes a one-minute buffer after the scheduled transition time to ensure
 * the API has updated with the new show's information.
 *
 * Global state used:
 * - nextShowTime: Date object representing when the current show ends
 *
 * Side effects:
 * - Calls nowPlaying() which updates the DOM with new show information
 * - Updates nextShowTime with the next show's end time
 * - Logs the next update time to the console
 */
setInterval(async function () {
  if (nextShowTime) {
    const oneMinuteBuffer = new Date(nextShowTime.getTime() + 60000);
    if (new Date() >= oneMinuteBuffer) {
      nextShowTime = await nowPlaying();
      console.log("Next show time:", nextShowTime);
    }
  }
}, 60000); // Check every minute

/**
 * Function that accepts a string time formatted as '5:00 PM' or special keywords
 * Returns the time as a JavaScript Date object.
 * This time will be the nearest time in the future for the user.
 * @param {string} time - Time string in format '5:00 PM', '05:00 PM', 'Noon', or 'Midnight' (case insensitive)
 * @param {string} timezone - IANA timezone string (e.g. 'America/New_York')
 * @returns {Date} JavaScript Date object representing the next occurrence of this time
 */
function parseDate(time, timezone) {
  let hours = 0;
  let minutes = 0;

  // Handle special keywords
  const normalizedTime = time.toLowerCase();
  if (normalizedTime === "noon") {
    hours = 12;
    minutes = 0;
  } else if (normalizedTime === "midnight") {
    hours = 0;
    minutes = 0;
  } else {
    // Parse the time components
    const [timePart, meridiem] = time.split(" ");
    [hours, minutes] = timePart.split(":").map((num) => parseInt(num, 10));

    // Convert to 24-hour format
    if (meridiem === "PM" && hours !== 12) {
      hours += 12;
    } else if (meridiem === "AM" && hours === 12) {
      hours = 0;
    }
  }

  // Create a date object for current time in the specified timezone
  const now = new Date();
  const tzDate = new Date(now.toLocaleString("en-US", { timeZone: timezone }));

  // Create a date object for the target time today
  const targetDate = new Date(tzDate);
  targetDate.setHours(hours, minutes, 0, 0);

  // If the target time has already passed today, set it for tomorrow
  if (targetDate <= tzDate) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  return targetDate;
}

/** Function to decode HTML entities as text **/
function decodeHtmlEntities(text) {
  const decoder = document.createElement("div");
  decoder.innerHTML = text;
  return decoder.textContent;
}

/**
 * Fetches and displays the currently playing show information.
 *
 * This function makes an API call to get the current show data and updates various DOM elements
 * with the show's metadata. It requires specific DOM elements to be present in the HTML:
 *
 * Required DOM elements:
 * - #sh_url: Anchor tag for show URL
 * - #sh_photo: Image tag for show photo
 * - #sh_cat: Element for show category
 * - #sh_djname: Element for DJ name
 * - #sh_stime: Element for show start time
 * - #sh_desc: Element for show description
 * - #sh_ends: Element for show end time
 *
 * @async
 * @returns {Promise<Date|null>} Returns a Date object representing when the show ends
 *                              (for scheduling the next update), or null if no valid
 *                              end time or an error occurs.
 * @throws {Error} The function handles its own errors and returns null rather than throwing
 */
async function nowPlaying() {
  try {
    const response = await fetch(currentShowCommand, fetchConfig);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API response:", data);

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
      if (show.sh_med_photo) {
        document
          .getElementById("sh_photo")
          .setAttribute("src", show.sh_med_photo || "default.jpg");
      }
      if (show.sh_djname) {
        document.getElementById("sh_djname").innerText =
          decodeHtmlEntities(show.sh_djname) || "Anonymous DJ";
      }
      if (show.sh_stime) {
        document.getElementById("sh_stime").innerText =
          decodeHtmlEntities(show.sh_stime) || "";
      }
      if (show.sh_desc) {
        document.getElementById("sh_desc").innerText =
          decodeHtmlEntities(show.sh_desc) || "No description available.";
      }
      if (show.sh_ends) {
        document.getElementById("sh_ends").innerText =
          decodeHtmlEntities(show.sh_ends) || "";
        return parseDate(show.sh_ends, config.timeZone);
      }
      return null;
    } else {
      console.error("Invalid data format or missing current_show");
      return null;
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('CORS')) {
      console.error("CORS Error: The Confessor API must allow requests from this domain.", error);
      console.log("To fix this, ensure your Confessor API has the following headers:");
      console.log("Access-Control-Allow-Origin: *");
      console.log("Access-Control-Allow-Methods: GET, OPTIONS");
      console.log("Access-Control-Allow-Headers: Content-Type");
    } else {
      console.error("Error processing show data:", error);
    }
    return null;
  }
}
