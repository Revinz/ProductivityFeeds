/*
 *
 * Modifies the main page
 *
 * */

//Hide recommended videos, but keeps the primary area for use til later
//When moving the subscriptions

var ImgPath = "test_img.jpg";

var primaryArea = null;

function HideRecommendedVideos() {
  primaryArea = document.getElementById("primary");
  primaryArea.childNodes.forEach(element => {
    element.remove();
  });
  console.log("Removed recommended videos");
}

function GetSettings() {
  chrome.storage.sync.get("settings", function(data) {
    Settings = data.settings;
  });
}

function ModifyHomePage() {
  HideRecommendedVideos();

  AddSubGallery();
}

function AddSubGallery() {
  var SubGallerySection = document.createElement("div");
  SubGallerySection.setAttribute("id", "sub_gallery");

  var Gallery_Header = document.createElement("div");
  Gallery_Header.setAttribute("id", "gallery_header");
  var GalleryHeaderText = document.createElement("span");
  GalleryHeaderText.setAttribute("id", "title_subs");
  GalleryHeaderText.innerHTML = "Subscriptions";

  //Append the header and header text to the gallery
  Gallery_Header.appendChild(GalleryHeaderText);
  SubGallerySection.appendChild(Gallery_Header);

  var Gallery_Body = document.createElement("div");
  Gallery_Body.setAttribute("id", "gallery_body");
  SubGallerySection.appendChild(Gallery_Body);

  //var subs = GetSubscriptions();
  /*
  for (let i = 0; i < subs.length; i++) {
    console.log(subs[i]);
    AddSubToGallery(Gallery_Body, subs[i][0], subs[i][1], subs[i][2]);
  }
*/

  GetSubscriptions(Gallery_Body);
  primaryArea.appendChild(SubGallerySection);
}

function GetSubscriptions(Gallery_Body) {
  //Check if sidebar is pc-sidebar
  // else unhide the pc sidebar to be able to fetch subscribers
  var ytd = document.getElementsByTagName("ytd-app");
  var miniGuideVisible = false;

  if (ytd[0].hasAttribute("mini-guide-visible_")) {
    miniGuideVisible = true;
    var hamburgerBtn = document.querySelectorAll("#guide-button");
    $("#guide").addClass("notransition");
    $("#contentContainer").addClass("notransition");
    $("#guide").addClass("hide");
    $("#contentContainer").addClass("hide");
    //console.log(hamburgerBtn[1].children[0]);
    //$(hamburgerBtn[1].children[0]).attr("aria-pressed", true); //Open menu
    hamburgerBtn[1].click();
    console.log("Opened menu");
  }

  var subs = [];

  //Wait for menu has loaded
  var exists = setInterval(
    function() {
      if (document.querySelectorAll("#expander-item").length > 0) {
        clearInterval(exists);

        var expanders = document.querySelectorAll("#expander-item");
        //console.log(expanders);
        expanders[1].click();

        //Fetch subs
        var endpoints = document.querySelectorAll("#endpoint");

        // array : title/name, hrefs, newness,
        var subs = [];
        for (let i = 0; i < endpoints.length; i++) {
          if (endpoints[i].href.includes("/channel/")) {
            //Title
            var title = endpoints[i].title;

            //We want to skip the 'live' channel
            if (title == "Live") {
              continue;
            }

            //href
            var img_url = endpoints[i].querySelector("#img").src;

            //newness dot
            var newness = false;
            if (
              $(endpoints[i].querySelector("#newness-dot")).css("display") ==
              "block"
            ) {
              newness = true;
            }

            subs.push([title, img_url, newness]);
          }
        }

        //Collapse sub list again
        var collapser = expanders[1].parentNode.children[1].children[1].click();

        for (let i = 0; i < subs.length; i++) {
          //console.log(subs[i]);
          AddSubToGallery(Gallery_Body, subs[i][0], subs[i][1], subs[i][2]);
        }

        //Close the burger menu again
        if (miniGuideVisible) {
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
            document
              .querySelector("#contentContainer")
              .classList.remove("hide");
            document.querySelector("#guide").classList.remove("hide");

            console.log("added transition and visibility again");
          }, 5);
        }
      }
    },
    1,
    [Gallery_Body, miniGuideVisible]
  ); // check every 10ms
}

//TODO: Add link to channel
function AddSubToGallery(
  gallery_body,
  _name,
  sub_img_url,
  hasUpdate,
  channel_url
) {
  //Sub box
  var sub = document.createElement("div");
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
    //TODO: Check for dot or/and border is selected
    var newDot = document.createElement("span");
    newDot.setAttribute("class", "new_dot");
    img_container.appendChild(newDot);

    sub_img.classList.add("border");
  }

  //Add name
  var sub_name = document.createElement("h2");
  sub_name.setAttribute("class", "name");
  sub_name.innerHTML = _name;

  //Append everything to the gallery to form the subscriber section
  img_container.appendChild(sub_img);
  sub.appendChild(img_container);
  sub.appendChild(sub_name);
  gallery_body.appendChild(sub);
}
