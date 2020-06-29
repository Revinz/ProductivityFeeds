/**
 *  Handles the page navigation:
 *      * Checking for when navigation has happened incl. first load
 *      * Determining the new page
 *      * and calling respective function for the new page
 *
 */

var Settings = null;

function DeterminePage() {
  console.log("New Page - URL:");
  console.log(location.href);
  /* Determine Youtube page */

  //Home page
  if (
    location.href == "https://www.youtube.com/" ||
    location.href == "http://www.youtube.com/"
  ) {
    console.log("Home Page");
    ModifyHomePage();
  }
  //Video page
  else if (location.href.includes("youtube.com/watch?")) {
    console.log("Video Page");
  }
  //Other Youtube page
  else {
    console.log("Other Youtube page");
  }
}

/*
 * Since Youtube navigation is done by state-changes,
 * we check when the navigation is done and re-run everything
 */
window.addEventListener("spfdone", DeterminePage); // old youtube design, just in case
window.addEventListener("yt-navigate-finish", DeterminePage); // new youtube design

// First page load we run it like normal
DeterminePage();
