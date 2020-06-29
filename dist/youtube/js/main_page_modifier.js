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
  var primaryAreas = document.querySelectorAll("#primary");

  //We want to use the primary area that is offset by the ytd-app, if any, otherwise we use the first one
  //which means that it is the one in use
  primaryArea = primaryAreas[0];
  for (let i = 0; i < primaryAreas.length; i++) {
    if (primaryAreas[i].offsetParent == null) {
      continue;
    }

    if (primaryAreas[i].offsetParent.localName == "ytd-app") {
      primaryArea = primaryAreas[i];
    }
  }

  primaryArea.childNodes.forEach((e) => {
    e.remove();
  });
}

function ModifyHomePage() {
  HideRecommendedVideos();

  AddSubGallery();
}

//Adds the sub gallery to the page and populates it
async function AddSubGallery() {
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

  //Wait for all subs have been added to the gallery
  //TODO: Set a timeout to ~1s or something, to prevent infinitely trying add the sub gallery
  // The timeout can be implemented by racing 2 promises (a setTimeout vs the wanted functionality)
  // https://italonascimento.github.io/applying-a-timeout-to-your-promises/

  let r = await MakeSubGallery(Gallery_Body).catch((error) => {
    alert(error);
  });

  //Then add the gallery to the page
  primaryArea.appendChild(SubGallerySection);
}
