//TODO: Find a way to prevent refreshing the page (Low priority)

//TODO: Move the "waiting" functions into other files to make this file cleaner
//TODO: Make the "waiting" functions more readable
//TODO: Make the "waiting" functions async and await them instead (Use a promise together with an async while loop with a 1000ms timeout?)

/**
 *  Adds the user's subscriptions to the gallery
 * @param {*} Gallery_Body
 */
function AddUserSubsToGallery(Gallery_Body) {
  var miniGuideVisible = false;

  if (IsMiniSidebar()) {
    miniGuideVisible = true;
    OpenHiddenFullSidebar();
  }

  //Wait for menu has loaded
  var exists = setInterval(
    function() {
      if (IsFullSidebarOpen()) {
        clearInterval(exists); //Stop the interval

        ExpandSubList();
        LoadSubImages(Gallery_Body, miniGuideVisible);
      }
    },
    1,
    [Gallery_Body, miniGuideVisible]
  ); // check every 1ms
}

function LoadSubImages(Gallery_Body, miniGuideVisible) {
  var endpoints = Array.from(document.querySelectorAll("#endpoint"));
  var sub_endpoint = endpoints.filter(e => e.href.includes("/channel/"));

  sub_endpoint.forEach(element => {
    console.log(element.title);
    //console.log(element.querySelector("#img").src);
  });
  var lastImageExists = setInterval(
    function() {
      if (sub_endpoint[sub_endpoint.length - 2].querySelector("#img").src) {
        clearInterval(lastImageExists);
        console.log("all images loaded");
        var subs = FetchSubs();
        CollapseSubList();

        for (let i = 0; i < subs.length; i++) {
          //console.log(subs[i]);
          AddSubToGallery(
            Gallery_Body,
            subs[i][0],
            subs[i][1],
            subs[i][2],
            subs[i][3]
          );
        }

        //Close the full size sidebar again
        if (miniGuideVisible) {
          CloseFullSidebar();
        }
      }
    },
    1,
    [sub_endpoint, Gallery_Body, miniGuideVisible]
  );
}

/**
 * Expand sub list
 */
function ExpandSubList() {
  var expanders = document.querySelectorAll("#expander-item");
  expanders[1].click();
  console.log("Expanded sub list");
}

/**
 * Collapse the sub list
 */
function CollapseSubList() {
  var expanders = document.querySelectorAll("#expander-item");
  expanders[1].parentNode.children[1].children[1].click();
}

/**
 * Fetches the subscriptions' info
 */
function FetchSubs() {
  var endpoints = document.querySelectorAll("#endpoint");

  // array : title/name, hrefs, newness,

  //TODO: Make to dictionary
  var subs = [];
  for (let i = 0; i < endpoints.length; i++) {
    if (endpoints[i].href.includes("/channel/")) {
      //Determine if sub
      //Title
      var title = endpoints[i].title;

      //We want to skip the 'live' channel
      if (title == "Live") {
        continue;
      }

      //img href
      var img_url = endpoints[i].querySelector("#img").src;
      //channel href
      var channel_href = endpoints[i].href;

      //newness dot
      var newness = hasNewnessVisible(endpoints[i]);

      subs.push([title, img_url, newness, channel_href]);
    }
  }

  return subs;
}

/**
 * Checks if the newness dot is visible -> Meaning new content available
 */
function hasNewnessVisible(sub_endpoint) {
  if ($(sub_endpoint.querySelector("#newness-dot")).css("display") == "block") {
    return true;
  }

  return false;
}

/**
 *Adds the sub to the sub gallery
 * @param {*} gallery_body - The HTML Element of the gallery body
 * @param {string} _name - The name of the subscription
 * @param {string} sub_img_url - The sub's image url
 * @param {boolean} hasUpdate - Wether or not the sub has an update
 * @param {string} channel_href - Href link to sub channel
 */

function AddSubToGallery(
  gallery_body,
  _name,
  sub_img_url,
  hasUpdate,
  channel_href
) {
  //Sub box

  var sub = document.createElement("a");
  sub.href = channel_href;
  sub.setAttribute("class", "sub");

  //img container
  var img_container = document.createElement("div");
  img_container.setAttribute("class", "image_container");

  //Subscriber image / icon
  var sub_img = document.createElement("img");
  sub_img.setAttribute("class", "image");
  sub_img.setAttribute("src", sub_img_url);

  //Show update border / dot
  if (hasUpdate) {
    //TODO: Check for dot or/and border setting is selected
    var newDot = document.createElement("span");
    newDot.setAttribute("class", "new_dot");
    img_container.appendChild(newDot);

    sub_img.classList.add("border");
  }

  //Add name
  var sub_name = document.createElement("p");
  sub_name.setAttribute("class", "name");
  sub_name.innerHTML = _name;

  //Append everything to the gallery to form the subscriber section
  img_container.appendChild(sub_img);
  sub.appendChild(img_container);
  sub.appendChild(sub_name);
  gallery_body.appendChild(sub);
}
