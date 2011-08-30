	var ReadabilityOptions = {

		handleDOMContentLoaded:function(event){
		
			var mainDocument= document;

            var readabilityrowtextbox = mainDocument.getElementById("readability-key-readability-row").getElementsByTagName("textbox")[0];
			var a = ReadabilityOptions.getPrefValue("extensions.readability.customreadabilitykeyboardshortcut","char");
            if(a) readabilityrowtextbox.setAttribute("value", a.toUpperCase());
            else readabilityrowtextbox.setAttribute("value", "r".toUpperCase());

            var autoscrollrowtextbox = mainDocument.getElementById("readability-key-autoscroll-row").getElementsByTagName("textbox")[0];
			var b = ReadabilityOptions.getPrefValue("extensions.readability.customautoscrollkeyboardshortcut","char");
            if(b) autoscrollrowtextbox.setAttribute("value", b.toUpperCase());
            else autoscrollrowtextbox.setAttribute("value", "a".toUpperCase());
			
			var isMac = ReadabilityOptions.isMac();

			if(isMac) {
		 
				var readabilitydescription = mainDocument.getElementById("readability-key-readability-description");
				var autoscrolldescription = mainDocument.getElementById("readability-key-autoscroll-description");
				readabilitydescription.firstChild.nodeValue="Cmd+Option+"
				autoscrolldescription.firstChild.nodeValue="Cmd+Shift+"
			
			}
			
			else {
			
				var readabilitydescription = mainDocument.getElementById("readability-key-readability-description");
				var autoscrolldescription = mainDocument.getElementById("readability-key-autoscroll-description");
				readabilitydescription.firstChild.nodeValue="Ctrl+Alt+"
				autoscrolldescription.firstChild.nodeValue="Ctrl+Shift+"	
				
			}
			
		},
		
		prefInstance:Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),
		getPrefValue:function(pref,type){
			if(type="char") return ReadabilityOptions.prefInstance.getCharPref(pref);
			else if(type="bool") return ReadabilityOptions.prefInstance.getBoolPref(pref);
			else if(type="int") return ReadabilityOptions.prefInstance.getIntPref(pref);
		},
		setPrefValue:function(pref,type,value){
			if(type="char") ReadabilityOptions.prefInstance.setCharPref(pref,value);
			else if(type="bool") ReadabilityOptions.prefInstance.setBoolPref(pref,value);
			else if(type="int") ReadabilityOptions.prefInstance.setIntPref(pref,value);
		},
		
		saveKeyboardShortcutChanges:function(event){

			var mainDocument= document;	
			
			var readabilityrowtextbox = mainDocument.getElementById("readability-key-readability-row").getElementsByTagName("textbox")[0];
			ReadabilityOptions.setPrefValue("extensions.readability.customreadabilitykeyboardshortcut","char",readabilityrowtextbox.value.toLowerCase());

            var autoscrollrowtextbox = mainDocument.getElementById("readability-key-autoscroll-row").getElementsByTagName("textbox")[0];
			ReadabilityOptions.setPrefValue("extensions.readability.customautoscrollkeyboardshortcut","char",autoscrollrowtextbox.value.toLowerCase());

			ReadabilityOptions.createAlertPrompt("Please restart your browser to make the changes take effect!")
			
			window.close();

		},
			
		createAlertPrompt:function(promptString){
			
			var prompt = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
									.getService(Components.interfaces.nsIPromptService);
									
			prompt.alert(null, "Readability",promptString);

		
		},
		
		createPromptPrompt:function(promptString){
			
			var prompt = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
									.getService(Components.interfaces.nsIPromptService);
			
			var input = {value:""}; 
			
			var check = {value:false};

			var result= prompt.prompt(null,"Readability",promptString,input,null,check);
			
			if(result==false) return null;
			else return input.value;
			
		},
		
		createConfirmPrompt:function(promptString){
			
			var prompt = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
									.getService(Components.interfaces.nsIPromptService);			
			
			return prompt.confirm(null, "Readability",promptString);

		},
		
		isMac : function ()
		{
			var appInfo = Components.classes["@mozilla.org/xre/app-info;1"];

			if(appInfo)
			{
				if(appInfo.getService(Components.interfaces.nsIXULRuntime).OS == "Darwin" || navigator.platform.indexOf("Mac") == 0)
				{
					return true;
				}
			}

			return false;
			
		}

	}
	
	window.addEventListener("DOMContentLoaded",ReadabilityOptions.handleDOMContentLoaded,false);