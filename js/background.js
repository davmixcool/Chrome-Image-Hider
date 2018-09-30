'use strict';

var component = {
  imageOffState: 'off',
  imageOnState: 'on',
  mount: function() {
    chrome.tabs.onActivated.addListener(function(activeInfo) {
        if (window.localStorage.getItem('images') === component.imageOffState) {
          component.runCommand(component.imageOffState);
        }else{
          component.runCommand(component.imageOnState);
        }
    });  
  },
  runCommand: function(action) {
    switch(action){
      case 'off':
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(
              tabs[0].id,
              {
                code: `var images = document.getElementsByTagName('img');
              for (var i = 0; i < images.length;i++ ) {
                images[i].style.display = "none";
              }` 
          });
          });  
      break;
      case 'on':
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(
              tabs[0].id,
              {
                code: `var images = document.getElementsByTagName('img');
            for (var i = 0; i < images.length;i++ ) {
              images[i].style.display = "block";
            }` 

              });
        });
      break;
    }
  }
}

//mount the mount
component.mount();
