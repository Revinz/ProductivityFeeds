//TODO: Find a way to prevent refreshing the page (Low priority)

//TODO: Make the "waiting" functions async and await them instead

//Adds all subs to the sub gallery
function AddAllSubsToGal(subs, Gallery_Body) {
  for (let i = 0; i < subs.length; i++) {
    AddSubToGallery(
      Gallery_Body,
      subs[i][0],
      subs[i][1],
      subs[i][2],
      subs[i][3]
    );
  }
}

//TODO: Move into new file sub_list_utility
/**
 * Expand sub list
 * Requires the sidebar to be open
 * TODO: Add exception for sidebar not open
 */
function ExpandSubList() {
  var expanders = document.querySelectorAll("#expander-item");
  expanders[1].click();
}

//TODO: Move into new file sub_list_utility
/**
 * Collapse the sub list
 * Requires the sidebar to be open
 * TODO: Add exception for sidebar not open
 */
function CollapseSubList() {
  var expanders = document.querySelectorAll("#expander-item");
  expanders[1].parentNode.children[1].children[1].click();
}

/**
 * Fetches the subscriptions' info
 * title, url, href, newness
 */
function FetchSubsInfo() {
  // array : title/name, hrefs, newness,

  //TODO: Make to dictionary
  var subs = [];
  let sub_endpoint = GetSubEndpoints();
  for (let i = 0; i < sub_endpoint.length; i++) {
    //Title
    var title = sub_endpoint[i].title;

    //We want to skip the 'live' channel
    if (title == "Live") {
      continue;
    }

    //img href
    var img_url = sub_endpoint[i].querySelector("#img").src;
    //channel href
    var channel_href = sub_endpoint[i].href;

    //newness dot
    var newness = hasNewnessVisible(sub_endpoint[i]);

    subs.push([title, img_url, newness, channel_href]);
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
