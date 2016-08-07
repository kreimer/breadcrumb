qx.Class.define("breadcrumbdemo.Node", {
    
    extend : qx.core.Object,
    
    construct : function(name, parent) {
        this.base(arguments);
        this.initName(name);
        this.initParent(parent||null);
        this.initChildren(new qx.data.Array());
        if(parent) {
            parent.getChildren().push(this);
        }
    },
    
    
    properties : {
        
        name : {
            deferredInit : true
        },
        parent : {
            deferredInit : true
        },
        children : {
            deferredInit : true
        }
        
    }
});
