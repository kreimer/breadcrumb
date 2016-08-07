/**
 * @require(qx.lang.normalize.Array)
 */
qx.Class.define("breadcrumb.CrumbList", {
    
    extend : qx.ui.core.Widget,
    
    include : [ breadcrumb.MConfigured ],

    construct : function(value, roots, config) {
        this.base(arguments);
        this.initConfig(config);
        this.initRoots(roots);
        this.initValue( value || null );
        this._setLayout(new qx.ui.layout.HBox().set({ alignY : "middle" }));
    },



    events : {
        
        "selected" : "qx.event.type.Data"

    },
    
    
    
    properties : {
        
        appearance : {
            refine : true,
            init : "bc-crumblist"
        },
        
        focusable : {
            refine : true,
            init : true
        },
        
        roots : {
            deferredInit : true
        },

        value : {
            deferredInit : true,
            nullable : true,
            apply : "_applyValue",
            event : "changeValue"
        }

    },
    
    
    
    members : {
        
        promptFirstOptionable : function() {
            var crumbs = this._getChildren();
            if(crumbs!==null) {
                crumbs.some(function(crumb) {
                    var children = this.getConfig().getChildren(crumb.getNode());
                    if( (children!==null) && (children.length>1) ) {
                        crumb.focus();
                        crumb.activate();
                        crumb.promptChildren();
                        return true;
                    }
                }, this);
            }
        },



        _applyValue : function(value, old) {
            this._removeAll();
            var nodes = new qx.data.Array();
            var node = value;
            while(node!=null) {
                nodes.push(node);
                if(this.getRoots().contains(node)) {
                    node = null;
                } else {
                    node = this.getConfig().getParent(node);
                }
            }
            nodes.reverse();
            var theValue = value;
            nodes.forEach(function(node, index, arr) {
                var crumb = new breadcrumb.Crumb(node, this.getConfig());
                if(node===theValue) {
                    crumb.addState("selected");
                }
                crumb.addListener("selected", function(e) {
                    this.fireDataEvent("selected", e.getData());
                }, this);
                crumb.addListener("childSelected", function(e) {
                    this.fireDataEvent("selected", e.getData());
                }, this);
                this._add(crumb, { alignY : "middle" });
            }, this);
        }

    }
    
});