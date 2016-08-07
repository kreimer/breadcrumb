qx.Class.define("breadcrumb.BasicListDelegate", {
    
    extend : qx.core.Object,
    
    include : [ qx.locale.MTranslation ],
    
    construct : function(labelProperty) {
        this.base(arguments);
        this.initLabelProperty(labelProperty);
    },
    
    
    properties : {
        
        labelProperty : {
            deferredInit : true
        }

    },
    
    
    
    members : {
        
        createItem : function() {
            return new qx.ui.form.ListItem();
        },


        bindItem : function(controller, item, id) {
            controller.bindProperty("", "model", null, item, id);
            controller.bindProperty("", "label", {
                converter : qx.lang.Function.bind(function(data, model, source, target) {
                    return ( (data!==undefined && data!==null) ? this.tr(data.get(this.getLabelProperty())) : null );
                }, this)
            }, item, id);
        }
        
    }
    
});
