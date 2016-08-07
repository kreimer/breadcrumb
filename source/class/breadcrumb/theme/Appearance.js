qx.Theme.define("breadcrumb.theme.Appearance", {
    
    extend : qx.theme.indigo.Appearance,

    appearances : {
        
        "bc-selector" : {
            style : function(states) {
                return {
                    decorator : "bc-selector",
                    allowGrowX : false,
                    allowGrowY : false,
                    allowShrinkX: true,
                    allowShrinkY: false
                };
            }
        },
        
        
        "bc-selector/rootDropdown/list/pane" : {
            style : function(states) {
                return {
                    marginTop : 24,
                    marginBottom : 24
                };
            }
        },
        
        "bc-selector/head" : {
            alias : "label",
            include : "label",
            style : function(states) {
                return {
                    minWidth : states.nohead ? 32 : 96,
                    textAlign : "center",
                    backgroundColor : states.disabled ? "#7777ff" : ((states.hovered) ? "#2222ff" : "#3333ff"),
                    padding : 8,
                    font : qx.bom.Font.fromConfig({
                        size:12, bold:true, family: ["montserratbold"]
                    }),
                    textColor : (states.hovered) ? "white" : "#f0f0ff",
                    cursor : states.disabled ? null : "pointer"
                };
            }
        },
        
        "bc-selector/placeholder" : {
            alias : "label",
            include : "label",
            style : function(states) {
                return {
                    minWidth : 96,
                    textAlign : "center",
                    backgroundColor : "white",
                    padding : 8,
                    font : qx.bom.Font.fromConfig({
                        size:10, bold:false, family: ["montserrat"]
                    }),
                    textColor : "#808080",
                    cursor : states.disabled ? null : "pointer"
                };
            }
        },
        

        
        "bc-selector/clear-button" : {
            alias : "label",
            include : "label",
            style : function(states) {
                return {
                    font : qx.bom.Font.fromConfig({
                        size : 14,
                        bold: true,
                        family: ["montserratbold"]
                    }),
                    textColor : "blue",
                    cursor : "pointer",
                    backgroundColor : (states.hovered ? "bc-orange" : "white"),
                    paddingTop : 7,
                    paddingLeft : 4,
                    paddingRight : 6,
                    alignY: "middle",
                    allowGrowY : true
                };
            }
        },



        "bc-crumblist" : {
            style : function(states) {
                return {
                    allowGrowX : false,
                    allowGrowY : true,
                    allowShrinkX: true,
                    allowShrinkY: false
                };
            }
        },
        
        
        
        "bc-crumb" : {
            style : function(states) {
                return {
                    allowGrowY : true
                };
            }
        },
        
        "bc-crumb/item" : {
            alias : "label",
            include : "label",
            style : function(states) {
                var isPointer = !states.leaf;
                return {
                    alignY : "middle",
                    font : qx.bom.Font.fromConfig({
                        size : 12,
                        bold: false,
                        decoration:(((states.hovered)&&(!states.selected)) ? "underline" : null),
                        family: ["montserrat"]
                    }),
                    textColor : "blue",
                    cursor : ( isPointer ? "pointer" : "normal" ),
                    backgroundColor : ( ( states.hovered && !states.selected ) ? "bc-orange" : "white"),
                    paddingLeft : 8,
                    paddingRight : ( (states.selected && states.leaf) ? 8 : 2 ),
                    paddingTop : 8,
                    allowGrowY : true
             };
            }
        },
        
        "bc-crumb/detail-control" : {
            alias : "label",
            include : "label",
            style : function(states) {
                return {
                    font : qx.bom.Font.fromConfig({
                        size : 14,
                        bold: true,
                        family: ["montserratbold"]
                    }),
                    textColor : "blue",
                    cursor : "pointer",
                    backgroundColor : (states.hovered ? "bc-orange" : "white"),
                    paddingTop : 7,
                    paddingLeft : 4,
                    paddingRight : 6,
                    alignY: "middle",
                    allowGrowY : true
                };
            }
        },
        
        "bc-crumb/dropdown/list/pane" : {
            style : function(states) {
                return {
                    marginTop : 24,
                    marginBottom : 24
                };
            }
        }

        
    }
    
});