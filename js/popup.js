'use strict';

var component = {
	switchButton: document.getElementById('buttonThree'),
	imageOffState: 'off',
	imageOnState: 'on',
	mount: function() {
		if (window.localStorage.getItem('images') === component.imageOffState) {
			component.switchButton.checked = false;
			component.runCommand(component.imageOffState);
		}else{
			component.switchButton.checked = true;
			component.runCommand(component.imageOnState);
		}

		component.switchButton.onchange = function(element) {
		  if (component.switchButton.checked === false) {
		  		component.runCommand(component.imageOffState);
		  		window.localStorage.setItem('images', component.imageOffState);
			}else{
				component.runCommand(component.imageOnState);
				window.localStorage.setItem('images', component.imageOnState);
			}
		};

		window.onscroll = function(element) {
		  if (component.switchButton.checked === false) {
		  		component.runCommand(component.imageOffState);
			}else{
				component.runCommand(component.imageOnState);
			}
		};
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




