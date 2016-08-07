qx.Class.define("breadcrumb.DefaultNodeNavigation", {

    type : "singleton",
    
    extend : qx.core.Object,
    
    implement : breadcrumb.INodeNavigation,
    
    construct : function() {
        this.base(arguments);
    },
    
    
    
    members : {
        
        getKey : function(node) {
            return node ? node.getName() : null;
        },
        
        
        
        getName : function(node) {
            return node ? node.getName() : null;
        },
        
        
        
        getParent : function(node) {
            return node ? node.getParent() : null;
        },
        
        
        
        getChildren : function(node) {
            return node ? ( node.getChildrenProxied ? node.getChildrenProxied() : node.getChildren() ) : null;
        },
        
        
        
        getNode : function(node) {
            return node;
        }
        
    }

});
