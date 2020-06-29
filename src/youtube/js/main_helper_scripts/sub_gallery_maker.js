async function MakeSubGallery(Gallery_Body) {
  return new Promise(async resolve => {
    //Make sure the full sidebar is open, otherwise open it
    console.log("0");
    let miniGuideVisible = false;
    if (IsMiniSidebar()) {
      miniGuideVisible = true;
      OpenHiddenFullSidebar();
    }
    console.log("1");
    //Make sure the full sidebar is open
    await WaitForFullSidebarOpen();
    console.log("2");
    //Open the sub list to be able to get all the user's subs
    ExpandSubList();
    console.log("3");
    await WaitForSubListExpanded();
    console.log("4");
    var subsInfo = FetchSubsInfo();
    console.log("5");
    //close sidebar again if it was open
    if (miniGuideVisible) {
      CloseFullSidebar();
    }
    console.log("6");
    //Lastly, add all the subs to the gallery
    AddAllSubsToGal(subsInfo, Gallery_Body);
    console.log("7");
    resolve("Resolved");
  });
}
