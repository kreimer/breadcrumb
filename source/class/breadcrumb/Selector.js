/**
 * A breadcrumb selector widget which lets you pick a value from a tree like object model,
 * and presents visually as the path of crumbs of the selected path.
 * Subnodes can be selected by picking them from a dropdown list.
 * 
 * @require(breadcrumb.BreadcrumbTheme)
 */
qx.Class.define("breadcrumb.Selector", {
    
    extend : qx.ui.core.Widget,
    
    include : [ breadcrumb.MConfigured ],
    
    
    
    /**
     * @param head {String?null} the head text. If null, a default head '>' is shown.
     * @param placeholder {String?null}  the placeholder text. If null, no placeholder is shown.
     * @param roots {qx.data.Array} collection of root nodes, if your object model is a single tree, you can add the root node or its children.
     * @param value {var?null} the initial selected node.
     * @param config {breadcrumb.Config?null} the runtime configuration of the selector. If null, an {@link breadcrumb.DefaultConfig} is used.
     */
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
        
        /**
         * Whether the clear button is shown. When set to true the clear button appears between the head and the crumb list whenever some node is selected.
         * When set to false, this button is never shown.
         */
        showClearButton : {
            init : true,
            check : "Boolean",
            apply : "_applyShowClearButton"
        },

        /*
         * This property represents the 'null' value when no node is selected.
         */
        nullValue : {
            init : null,
            apply : "_applyNullValue"
        },
        
        // overriden
        appearance : {
            refine : true,
            init : "bc-selector"
        },
        
        //overriden
        focusable : {
            refine : true,
            init : true
        },
        
        /*
         * The head text. If null, a default head '>' is shown.
         */
        head : {
            deferredInit : true,
            check : "String",
            nullable : true,
            apply : "_applyHead"
        },

        /*
         * The placeholder text. If null, no placeholder is shown.
         */
        placeholder : {
            deferredInit : true,
            check : "String",
            nullable : true,
            apply : "_applyPlaceholder"
        },
        
        /*
         * Collection of root nodes, if your object model is a single tree, you can add the root node or its children.
         */
        roots : {
            deferredInit : true,
            check : "qx.data.Array",
            apply : "_applyRoots"
        },
                
        /*
         * the current selected node, or {@link #nullValue} if none is selected.
         */
        value : {
            deferredInit : true,
            nullable : true,
            apply : "_applyValue",
            event : "changeValue"
        }
        
    },



    members : {
        
        /*
         * It shows the dropdown list at the root nodes level. If {@link #roots} has a single node, then it shows the dropdown at the 
         * first level with more than 1 children, that is, the first optionable level.
         */
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
        
        
        /*
         * Set the {@link #value} to the {@link #nullValue}
         */
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