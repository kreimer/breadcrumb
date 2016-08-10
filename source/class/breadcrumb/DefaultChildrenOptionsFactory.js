/* ************************************************************************
   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.
************************************************************************ */
qx.Class.define("breadcrumb.DefaultChildrenOptionsFactory", {
    
    type : "singleton",
    
    extend : breadcrumb.AbstractChildrenOptionsFactory,
    
    implement : [ breadcrumb.IChildrenOptionsFactory ],
    
    construct : function() {
        this.base(arguments);
    },
    
    
    
    members : {
        
        getChildrenOptions : function(node) {
            var children;
            if(qx.lang.Type.isArray(node)) {
                children = node;
            } else {
                children = this.getConfig().getChildren(node);
            }
            return children;
        },
        
        unwrapSelection : function(node) {
            return node;
        }


    }
});
