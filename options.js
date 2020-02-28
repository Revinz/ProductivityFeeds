var default_Settings = {
  SideBar_HideSubs: true
};


function SaveSetting(checkbox) {
    console.log(
      checkbox.attr("id") + ":" + $("#" + checkbox.attr("id")).is(":checked")
    );
  }
  
  function RestoreSettings() {
    var keys = Object.keys(default_Settings);
    keys.forEach(key => {
      document.getElementById(key).checked = default_Settings[key];
      console.log("Loaded setting for :" + key);
    });
  }
  
  $(document).ready(function() {
    RestoreSettings();
  
    $("input[type='checkbox']").change(function() {
      SaveSetting($(this));
    });
  
  