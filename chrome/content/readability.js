	var Readability = {
		readabilityFirstRun:function (event) {
			gBrowser.removeEventListener('DOMContentLoaded', Readability.readabilityFirstRun, true);
			var readabilityprefsinstance = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
			var readabilityinstalled = readabilityprefsinstance.getCharPref("extensions.readability.currentversion") != "0";
			var readabilityUrl;
			if (!readabilityinstalled) {
				readabilityUrl='http://barisderin.com/?p=66';
				gBrowser.selectedTab = gBrowser.addTab(readabilityUrl);
			}
			else {
				readabilityUrl='http://barisderin.com/?p=70';
				gBrowser.selectedTab = gBrowser.addTab(readabilityUrl);	
			}
			var readabilityversion = readabilityprefsinstance.getCharPref("extensions.readability.currentversion");
			var readabilityetensionmanagerinstance = Components.classes["@mozilla.org/extensions/manager;1"].getService(Components.interfaces.nsIExtensionManager);
			var readabilityextension = readabilityetensionmanagerinstance.getItemForID("{6005d9b1-d115-485a-a92a-3f6453ca3fe2}");
			var readabilitynewversion = readabilityextension.version;
			if (readabilityversion != readabilitynewversion) {
				readabilityprefsinstance.setCharPref("extensions.readability.currentversion", readabilitynewversion);
			}
		},
		instalandupdatecheck:function (event)  {
			var readabilityprefsinstance = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
			var readabilityversion = readabilityprefsinstance.getCharPref("extensions.readability.currentversion");
			var readabilityetensionmanagerinstance = Components.classes["@mozilla.org/extensions/manager;1"].getService(Components.interfaces.nsIExtensionManager);
			var readabilityextension = readabilityetensionmanagerinstance.getItemForID("{6005d9b1-d115-485a-a92a-3f6453ca3fe2}");
			var readabilitynewversion = readabilityextension.version;
			if (readabilityversion != readabilitynewversion) {
				gBrowser.addEventListener('DOMContentLoaded', Readability.readabilityFirstRun, true);
			}
		},
		mainWindowLoadHandler:function(event){
			Readability.instalandupdatecheck(event);
			Readability.synchronizePanelOptions("toolbar","statusbar");
			Readability.changeKeyboardShortcuts();
		},
		changeKeyboardShortcuts:function() {
			var mainDocument= document;
            var keySet = mainDocument.getElementById("mainKeyset");
            key = mainDocument.getElementById("readability-action-key");
			var a = Readability.getPrefValue("extensions.readability.customreadabilitykeyboardshortcut");
            if(a) key.setAttribute("key", a);
            key2 = mainDocument.getElementById("readability-autoscroll-key");
			var b = Readability.getPrefValue("extensions.readability.customautoscrollkeyboardshortcut");
            if(b) key2.setAttribute("key", b);
		},
		prefInstance:Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),
		getPrefValue:function(pref){
			var type=Readability.prefInstance.getPrefType(pref);
			if(type==32) return Readability.prefInstance.getCharPref(pref);
			else if(type==128) return Readability.prefInstance.getBoolPref(pref);
			else if(type==64) return Readability.prefInstance.getIntPref(pref);
		},
		setPrefValue:function(pref,value){
			var type=Readability.prefInstance.getPrefType(pref);
			if(type==32) Readability.prefInstance.setCharPref(pref,value);
			else if(type==128) Readability.prefInstance.setBoolPref(pref,value);
			else if(type==64) Readability.prefInstance.setIntPref(pref,value);
		},
		onReadabilityPanelShowing:function(event){
			var node=event.currentTarget;
			Readability.updatePanelOptions(node);
		},
		synchronizePanelOptions:function(toolbar,statusbar){
			if(toolbar!=null) Readability.updatePanelOptions(document.getElementById("readability-toolbar-menu"));
			if(statusbar!=null) Readability.updatePanelOptions(document.getElementById("readability-statusbar-menu"));
		},
		updatePanelOptions:function(node){
			if(!node) return;
			var readabilityprefsinstance = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
			var readabilitystyleoptionsvalue = readabilityprefsinstance.getCharPref("extensions.readability.styleoptions");
			var readabilitycustomsizevalue = readabilityprefsinstance.getCharPref("extensions.readability.customsize");
			var readabilitystyleoptionsarray=readabilitystyleoptionsvalue.split(",");
			var readabilityStyleValue=parseInt(readabilitystyleoptionsarray[0]);
			var readabilitySizeValue=parseInt(readabilitystyleoptionsarray[1]);
			var readabilityMarginValue=parseInt(readabilitystyleoptionsarray[2]);		
			var readabilityFootNotesValue=parseInt(readabilitystyleoptionsarray[3]);		
			node.getElementsByClassName("readability-style")[0].selectedIndex=readabilityStyleValue;
			node.getElementsByClassName("readability-size")[0].selectedIndex=readabilitySizeValue;
			node.getElementsByClassName("readability-margin")[0].selectedIndex=readabilityMarginValue;
			node.getElementsByClassName("readability-options-footnotes")[0].checked=readabilityFootNotesValue ? true : false;
			Readability.updateCustomSizeMenulist(node,readabilitySizeValue);
		},
		updateCustomSizeMenulist:function(node,readabilitySizeValue){
			if(readabilitySizeValue==5) node.getElementsByClassName("readability-customsize-menulist")[0].disabled=false;
			else node.getElementsByClassName("readability-customsize-menulist")[0].disabled=true;
			var currentcustomsize = Readability.getPrefValue("extensions.readability.customsize");
			var customSizeMenuitems =  node.getElementsByClassName("readability-customsize-menulist")[0].getElementsByTagName("menuitem");
			for (var i=0;i<customSizeMenuitems.length;i++) {
				if(customSizeMenuitems[i].value==currentcustomsize) node.getElementsByClassName("readability-customsize-menulist")[0].selectedIndex=i;
			}
			node.getElementsByClassName("readability-customsize-radio")[0].value=currentcustomsize;
		},		
		updateStylePreferences:function(node){
			if(!node) return;
			var readabilityprefsinstance = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
			var styleoptionspreferencevalue=node.getElementsByClassName("readability-style")[0].selectedIndex+","+node.getElementsByClassName("readability-size")[0].selectedIndex+","+node.getElementsByClassName("readability-margin")[0].selectedIndex+","+(node.getElementsByClassName("readability-options-footnotes")[0].checked ? 1 : 0);			
			readabilityprefsinstance.setCharPref("extensions.readability.styleoptions",styleoptionspreferencevalue);
		},		
		updateCustomSizePreference:function(event){
			Readability.setPrefValue("extensions.readability.customsize",event.target.value);
		},
		enableREADABILITY:function(event){
			if(event.button==1||event.button==2) return;
			var doc = window.content.document;
			var head=doc.getElementsByTagName("head")[0];	
			/*
			var e=doc.createElement("script");
			e.setAttribute("type","text/javascript");
			e.setAttribute("src","chrome://readability/content/scripts/script.js");
			head.appendChild(e);
			*/
			var node;
			if(event.target.id=="readability-statusbar-icon" || event.currentTarget.id=="readability-action-key") {node=document.getElementById("readability-statusbar-menu");}
			else if(event.target.id=="readability-toolbarbutton") {node=document.getElementById("readability-toolbar-menu");}
			else{node=event.currentTarget;}
			if (event.target.className=="customsizemenuitem") {node.getElementsByClassName("readability-size")[0].selectedIndex=5;node.getElementsByClassName("readability-customsize-radio")[0].value=event.target.value;}			
			if (event.target.className=="readability-customsize-radio") {node.getElementsByClassName("readability-customsize-radio")[0].value=node.getElementsByClassName("readability-customsize-menulist")[0].selectedItem.value;}			
			var readConvertLinksToFootnotes=node.getElementsByClassName("readability-options-footnotes")[0].checked;
			var readStyle="style-"+node.getElementsByClassName("readability-style")[0].selectedItem.value;
			var readSize="size-"+node.getElementsByClassName("readability-size")[0].selectedItem.value;
			var readMargin="margin-"+node.getElementsByClassName("readability-margin")[0].selectedItem.value;
			var s=doc.createElement("script");
			s.setAttribute("type","text/javascript");
			var tx=doc.createTextNode((readConvertLinksToFootnotes==true ? "readConvertLinksToFootnotes=true;" : "")+"readStyle='"+readStyle+"';"+"readSize='"+readSize+"';"+"readMargin='"+readMargin+"';");
			s.appendChild(tx);
			head.appendChild(s);
			var t=doc.createElement("script");
			t.setAttribute("type","text/javascript");
			t.setAttribute("src","chrome://readability/content/scripts/readability.js");
			head.appendChild(t);														
			var b=doc.createElement("link");
			b.setAttribute("rel","stylesheet");
			b.setAttribute("type","text/css");
			b.setAttribute("media","screen");
			b.setAttribute("href","chrome://readability/content/style/readability.css");
			head.appendChild(b);														
			var c=doc.createElement("link");
			c.setAttribute("rel","stylesheet");
			c.setAttribute("type","text/css");
			c.setAttribute("media","print");
			c.setAttribute("href","chrome://readability/content/style/readability-print.css");
			head.appendChild(c);
			if(event.target.nodeName=="radio" || event.target.nodeName=="checkbox"){Readability.updateStylePreferences(node);Readability.synchronizePanelOptions("toolbar","statusbar");}
			if (event.target.className=="customsizemenuitem"){Readability.updateCustomSizePreference(event);Readability.synchronizePanelOptions("toolbar","statusbar");}
		},
		updateSizeRadioGroup:function(event){
			var node=event.currentTarget.parentNode.parentNode.parentNode
			if(event.target.className=="customsizemenuitem") return;
			if (event.target.className!="readability-customsize-radio") node.getElementsByClassName("readability-customsize-menulist")[0].disabled=true;
			else node.getElementsByClassName("readability-customsize-menulist")[0].disabled=false;
		},
		autoscroll:function(event){
			var doc = window.content.document;
			var head=doc.getElementsByTagName("head")[0];	
			var e=doc.createElement("script");
			e.setAttribute("type","text/javascript");
			e.setAttribute("src","chrome://readability/content/scripts/autoscroll.js");
			head.appendChild(e);
		}
	}
	window.addEventListener("load",Readability.mainWindowLoadHandler,false);