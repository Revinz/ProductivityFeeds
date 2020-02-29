/**
 * Utility functions regarding the sidebar
 */

/**
 * Opens the full sidebar as being invisible and removes the transitions to increase speed
 */
function OpenHiddenFullSidebar() {
  var hamburgerBtn = document.querySelectorAll("#guide-button");

  RemoveFullSidebarTransitions();
  HideFullSidebar();
  RemoveSidebarDim();

  hamburgerBtn[1].click();
  console.log("Opened menu");
}

/**
 * Closes the full size sidebar
 */
function CloseFullSidebar() {
  var hamburgerBtn = document.querySelectorAll("#guide-button");
  $(hamburgerBtn[1]).trigger("click");
  //unhide and add transition back
  console.log("Clicked!");

  //Revert back to normal
  setTimeout(function() {
    document
      .querySelector("#contentContainer")
      .classList.remove("notransition");
    document.querySelector("#guide").classList.remove("notransition");
    document.querySelector("#contentContainer").classList.remove("hide");
    document.querySelector("#guide").classList.remove("hide");
    AddSidebarDim();
    console.log("added transition and visibility again");
  }, 5);
}

/**
 * Removes the transitions for opening and closing for the full size sidebar
 * This is done to speed up the opening and closing of the sidebar when retrieving info from it
 */
function RemoveFullSidebarTransitions() {
  $("#guide").addClass("notransition");
  $("#contentContainer").addClass("notransition");
}

/**
 * Hides the full size sidebar
 * We want to hide the sidebar when simply retrieving info from it
 */
function HideFullSidebar() {
  $("#guide").addClass("hide");
  $("#contentContainer").addClass("hide");
}

function RemoveSidebarDim() {
  $("#scrim").addClass("nodim");
}

function AddSidebarDim() {
  $("#scrim").removeClass("nodim");
}

/**
 * Check if sidebar is mini-sidebar
 */
function IsMiniSidebar() {
  //We can simply check if the ytd-app tag contains the 'mini-guide-visible'
  //since it updates when it changes sidebars
  var ytd = document.getElementsByTagName("ytd-app");
  var miniGuideVisible = false;

  if (ytd[0].hasAttribute("mini-guide-visible_")) {
    return true;
  }

  return false;
}

function IsFullSidebarOpen() {
  if (document.querySelectorAll("#expander-item").length > 0) {
    return true;
  }
  return false;
}
