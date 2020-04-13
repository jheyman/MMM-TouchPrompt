"use strict";
/* global Module */

/* Magic Mirror
* Module: MMM-TouchPrompt
*
* By jheyman
* MIT Licensed.
*/

Module.register("MMM-TouchPrompt", {
    defaults: {

    },
    
    notificationReceived: function(notification, payload, sender) {
        console.log("MMM-TouchPrompt received " + notification);
        if (notification === "ALL_MODULES_STARTED") {

        } else if (notification === "PROMPT_YESNO") {
            this.promptText = payload.text;
            this.yesNotification = payload.yesNotification;
            this.noNotification = payload.noNotification;
            this.showPrompt = true;
            this.updateDom();
            console.log("TOUCHPROMPT UPDATED DOM: promptText:" + this.promptText + ", yesNotEvent:" + this.yesNotification.event);
        }
    },
    
    // Override socket notification handler.
    socketNotificationReceived: function(notification, payload) {
        console.log("MMM-TouchPrompt (socket)received " + notification);
        if (notification === "xxxxxx") {
            
        };
    },
    
    start: function() {
        Log.info("Starting module: " + this.name + this.identifier);
        this.promptText = "Uninitialized";
        this.yesNotification = {event: "YES_Unknown", payload: "None"};
        this.noNotification = {event: "NO_Unknown", payload: "None"};
        this.showPrompt = false;
    },
    
    getStyles: function() {
        return ["touchprompt.css"];
    },
   
    getDom: function() {
        var self = this;
        this.container = document.createElement("div");
        this.container.className = this.showPrompt ? "TouchPromptContainer show-prompt": "TouchPromptContainer" ;

        var promptTextDiv = document.createElement("div");
        promptTextDiv.className = "promptTextDiv";

        var promptText = document.createElement("span");
        promptText.className = "promptText";
        promptText.innerHTML = this.promptText;

        promptTextDiv.appendChild(promptText);

        var buttonDiv = document.createElement("div");
        buttonDiv.className = "buttonDiv";

        var YesButton = document.createElement("button");
        YesButton.className = "yesButton";
        YesButton.innerText = "YES";
        YesButton.setAttribute("name", "yesButton");
        YesButton.onclick = () => {
            console.log("YES!");
            if (self.yesNotification.event != '') self.sendNotification(self.yesNotification.event, self.yesNotification.payload);
            self.promptText = "";
            self.showPrompt = false;
            self.updateDom();
        }; 
        
        var NoButton = document.createElement("button");
        NoButton.className = "noButton";
        NoButton.innerText = "NO";
        NoButton.setAttribute("name", "noButton");
        NoButton.onclick = () => {
            console.log("NO!");
            if (self.noNotification.event != '') self.sendNotification(self.noNotification.event, self.noNotification.payload);
            self.promptText = "";
            self.showPrompt = false;
            self.updateDom();
        }; 

        buttonDiv.appendChild(YesButton);
        buttonDiv.appendChild(NoButton);   
        
        this.container.appendChild(promptTextDiv);
        this.container.appendChild(buttonDiv);
        
        return this.container;  
    },

});