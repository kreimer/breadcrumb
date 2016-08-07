qx.Class.define("breadcrumb.AbstractChildrenOptionsFactory", {
    
    type : "abstract",
    
    extend : qx.core.Object,
    
    implement : [ breadcrumb.IChildrenOptionsFactory ],
    
    include : [ breadcrumb.MConfigured ],
    
    
    
    construct : function() {
        this.base(arguments);
    }

});
