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

  var imgurl =
    "https://yt3.ggpht.com/a/AGF-l7_nKzN_UILeQrGZpqtxpGGCG0E0QPD7Bz8xQw=s88-c-k-c0xffffffff-no-rj-mo";

  AddSubToGallery(Gallery_Body, "Test Subscriber", imgurl, true);
  AddSubToGallery(Gallery_Body, "Test Subscriber 2 ", imgurl, false);
  AddSubToGallery(Gallery_Body, "Test Subscriber3 ", imgurl, true);
  AddSubToGallery(Gallery_Body, "Test Subscriber4", imgurl, false);
  AddSubToGallery(Gallery_Body, "Test Subscriber5", imgurl, true);

  primaryArea.appendChild(SubGallerySection);
}

function GetSubscribtions() {}

//TODO: Add link to channel
function AddSubToGallery(gallery_body, _name, sub_img_url, hasUpdate) {
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

function FetchSubThumbnails() {}
