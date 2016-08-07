qx.Class.define("breadcrumb.Crumb", {
    
    extend : qx.ui.core.Widget,

    include : [ breadcrumb.MConfigured ],

    construct : function(node, config) {
        this.base(arguments);
        this.initNode(node);
        this.initConfig(config);
        this._setLayout(new qx.ui.layout.HBox().set({ alignY : "middle" }));
        this.getChildControl("item");
        this.getChildControl("detail-control");
        this.getChildControl("dropdown");
        this.addListener("blur", this._onBlur, this);
    },
    
    
    events : {
        
        "selected" : "qx.event.type.Data",

        "childSelected" : "qx.event.type.Data"
    },
    
    
    properties : {
        
        appearance : {
            refine : true,
            init : "bc-crumb"
        },
        
        focusable : {
            refine : true,
            init : true
        },
        
        node : {
            deferredInit : true
        }

    },
    
    
    
    members : {
        
        _forwardStates : {
            leaf : true,
            selected : true
        },



        promptChildren : function() {
            var dropdown = this.getChildControl("dropdown");
            if(dropdown.isVisible()) {
                dropdown.close();
            } else {
                var list = dropdown.getChildControl("list");
                list.setModel(this.getConfig().getChildrenOptions(this.getNode()));
                dropdown.open();
                list.activate();
            }
        },



        _createChildControlImpl: function (id, hash) {
            var control;
            switch (id) {
                case "item" :
                    control = new qx.ui.basic.Label(this.tr(this.getConfig().getName(this.getNode())));
                    breadcrumb.util.Hoverable.makeHoverable(control);
                    control.addListener("click", function(e) {
                        new qx.util.DeferredCall(function() {
                            if(this.hasState("selected") && !this.hasState("leaf")) {
                                this.promptChildren();
                            } else {
                                this.fireDataEvent("selected", this.getNode());
                            }
                        }, this).schedule();
                    }, this);
                    this._add(control, { alignY : "middle" });
                    break;

                case "detail-control" :
                    control = new qx.ui.basic.Label(">");
                    breadcrumb.util.Hoverable.makeHoverable(control);
                    control.addListener("click", function(e) {
                        new qx.util.DeferredCall(function() {
                            this.promptChildren();
                        }, this).schedule();
                    }, this);
                    this._add(control, { alignY : "middle" });
                    var children = this.getConfig().getChildren(this.getNode());
                    if( (!children) || (children.length<1) ) {
                        control.exclude();
                        this.addState("leaf");
                    }
                    break;

                    
                case "dropdown" :
                    control = new breadcrumb.internal.VirtualDropDownList(this).set({
                        position : "right-top"
                    });
                    control.addListener("keydown", function (e) {
                        if ("Escape" == e.getKeyIdentifier()) {
                            e.getCurrentTarget().hide();
                        } else {
                            e.getCurrentTarget()._handleKeyboard(e);
                        }
                    }, this);
                    control.getChildControl("list").setDelegate(this.getConfig());
                    control.getSelection().addListener("change", function(e) {
                        var data = e.getData();
                        if( ( data.type==="add" || data.type==="add/remove") && (data.added) && (data.added.length>0) ) {
                            var value = this.getConfig().unwrapSelection(data.added[0]);
                            this.fireDataEvent("childSelected", value);
                        }
                    }, this);

                    break;
                    
                default:
                    break;
            }
            return control || this.base(arguments, id);
        },
        
        
        
        _onBlur : function(event) {
            var dropdown = this.getChildControl("dropdown");
            dropdown.close();
        }

    }
    
});
