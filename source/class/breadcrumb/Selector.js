/**
 * @require(breadcrumb.BreadcrumbTheme)
 */
qx.Class.define("breadcrumb.Selector", {
    
    extend : qx.ui.core.Widget,
    
    include : [ breadcrumb.MConfigured ],
    
    construct : function(head, placeholder, roots, value, config) {
        this.base(arguments);
        this.initConfig( config || breadcrumb.DefaultConfig.getInstance() );
        this.initHead( head || null );
        this.initPlaceholder( placeholder || null );
        this.initRoots(roots);
        this.initValue( value || null );
        this._setLayout(new qx.ui.layout.HBox());
        this._add(this.getChildControl("head"));
        this._add(this.getChildControl("placeholder"));
        this._add(this.getChildControl("clear-button"));
        this._add(this.getChildControl("crumblist"));
        this.getChildControl("rootDropdown");
        this.addListener("blur", this._onBlur, this);
    },
    
    
    properties : {

        showClearButton : {
            init : true,
            apply : "_applyShowClearButton"
        },

        nullValue : {
            init : null,
            apply : "_applyNullValue"
        },
        
        appearance : {
            refine : true,
            init : "bc-selector"
        },
        
        focusable : {
            refine : true,
            init : true
        },
        
        head : {
            deferredInit : true,
            nullable : true,
            apply : "_applyHead"
        },

        placeholder : {
            deferredInit : true,
            nullable : true,
            apply : "_applyPlaceholder"
        },
        
        roots : {
            deferredInit : true,
            apply : "_applyRoots"
        },
                
        value : {
            deferredInit : true,
            nullable : true,
            apply : "_applyValue",
            event : "changeValue"
        }
        
    },



    members : {
        
        promptRoots : function() {
            if(this.getRoots().length>1) {
                var dropdown = this.getChildControl("rootDropdown");
                var list = dropdown.getChildControl("list");
                if(dropdown.isVisible()) {
                    dropdown.close();
                } else {
                    list.setModel(this.getConfig().getChildrenOptions(this.getRoots()));
                    dropdown.open();
                    list.activate();
                }
            } else {
                var crumblist = this.getChildControl("crumblist");
                if(crumblist.isSeeable()) {
                    crumblist.promptFirstOptionable();
                }
            }
        },
        
        
        
        clearValue : function() {
            this.setValue(this.getNullValue());
        },
        
        
        
        _forwardStates : {
            focused : true,
            invalid : true
        },
        
        
        
        _createChildControlImpl: function (id, hash) {
            var control;
            switch (id) {
                case "head" :
                    control = new qx.ui.basic.Label();
                    breadcrumb.util.Hoverable.makeHoverable(control);
                    control.addListener("click", function(e) {
                        new qx.util.DeferredCall(function() {
                            this.promptRoots();
                        }, this).schedule();
                    }, this);
                    if(this.getHead()!==null) {
                        control.setValue(this.getHead());
                    } else {
                        control.addState("nohead");
                        control.setValue(">");
                    }
                    break;

                case "placeholder" :
                    control = new qx.ui.basic.Label();
                    breadcrumb.util.Hoverable.makeHoverable(control);
                    control.addListener("click", function(e) {
                        new qx.util.DeferredCall(function() {
                            this.promptRoots();
                        }, this).schedule();
                    }, this);
                    if(this.getPlaceholder()!==null) {
                        control.setValue(this.getPlaceholder());
                    } else {
                        control.exclude();
                    }
                    break;

                case "clear-button" :
                    control = new qx.ui.basic.Label("#");
                    breadcrumb.util.Hoverable.makeHoverable(control);
                    if( (this.getValue()===this.getNullValue()) && (!this.getShowClearButton()) ) {
                        control.exclude();
                    }
                    control.addListener("click", function(e) {
                        new qx.util.DeferredCall(function() {
                            this.clearValue();
                        }, this).schedule();
                    }, this);
                    break;
                    
                case "crumblist" :
                    var value = (this.getValue()!==this.getNullValue()) ? this.getValue() : null;
                    control = new breadcrumb.CrumbList(value, this.getRoots(), this.getConfig());
                    if(value===null) {
                        control.exclude();
                    }
                    control.addListener("selected", function(e) {
                        this.setValue(e.getData());
                    }, this);
                    break;
                    
                case "rootDropdown" :
                    control = new breadcrumb.internal.VirtualDropDownList(this.getChildControl("head")).set({
                        position : "right-top",
                        padding : 0
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
                            var value = data.added[0];
                            this.setValue(value);
                        }
                    }, this);
                    break;
                    
                default:
                    break;
            }
            return control || this.base(arguments, id);
        },



        _applyHead : function(value, old) {
            if(value!==null) {
                this.getChildControl("head").removeState("nohead");
                this.getChildControl("head").setValue(value);
            } else {
                this.getChildControl("head").addState("nohead");
                this.getChildControl("head").setValue(">");
            }
        },
        
        
        
        _applyPlaceholder : function(value, old) {
            if(value!==null) {
                this.getChildControl("placeholder").setValue(value);
                if(this.getValue()!==this.getNullValue()) {
                    this.getChildControl("placeholder").exclude();
                } else {
                    this.getChildControl("placeholder").show();
                }
            } else {
                this.getChildControl("placeholder").exclude();
            }
        },
        
        
        
        _applyRoots : function(value, old) {
            
        },
        
        
        
        _applyValue : function(value, old) {
            var crumblist = this.getChildControl("crumblist");
            if(value!==this.getNullValue()) {
                crumblist.setValue(value);
                crumblist.show();
            } else {
                crumblist.setValue(null);
                crumblist.exclude();
            }
            if(value!==this.getNullValue()) {
                this.getChildControl("placeholder").exclude();
            } else {
                if(this.getPlaceholder()!==null) {
                    this.getChildControl("placeholder").show();
                }
            }
            if( (value!==this.getNullValue()) && (this.getShowClearButton()) ) {
                this.getChildControl("clear-button").show();
            } else {
                this.getChildControl("clear-button").exclude();
            }
            if(value===this.getNullValue()) {
                this.getChildControl("rootDropdown").getSelection().removeAll();
                this.getChildControl("rootDropdown").setPreselected(null);
            }
        },
        
        
        
        _applyShowClearButton : function(value, old) {
            if( (this.getValue()!==this.getNullValue()) && (value) ) {
                this.getChildControl("clear-button").show();
            } else {
                this.getChildControl("clear-button").exclude();
            }
        },
        
        
        
        _applyNullValue : function(value, old) {
            var crumblist = this.getChildControl("crumblist");
            if(value!==this.getValue()) {
                crumblist.setValue(this.getValue());
                crumblist.show();
            } else {
                crumblist.setValue(null);
                crumblist.exclude();
            }
            if( (value!==this.getValue()) && (this.getShowClearButton()) ) {
                this.getChildControl("clear-button").show();
            } else {
                this.getChildControl("clear-button").exclude();
            }
            if(value!==this.getValue()) {
                this.getChildControl("placeholder").exclude();
            } else {
                if(this.getPlaceholder()!==null) {
                    this.getChildControl("placeholder").show();
                }
            }
        },
        
        
        
        _onBlur : function(event) {
            var dropdown = this.getChildControl("rootDropdown");
            dropdown.close();
        }

    }

});