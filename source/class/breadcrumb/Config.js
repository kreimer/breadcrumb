/* ************************************************************************
   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.
************************************************************************ */
qx.Class.define("breadcrumb.Config", {
    
    extend : qx.core.Object,
    
    implement : breadcrumb.INodeNavigation,

    construct : function(popupListDelegate, nodeNavigation, childrenOptionsFactory) {
        this.base(arguments);
        this.initPopupListDelegate(popupListDelegate || new breadcrumb.BasicListDelegate("name"));
        this.initNodeNavigation( nodeNavigation || breadcrumb.DefaultNodeNavigation.getInstance() );
        this.initChildrenOptionsFactory( childrenOptionsFactory || breadcrumb.DefaultChildrenOptionsFactory.getInstance() );
        this.getChildrenOptionsFactory().setConfig(this);
    },
    
    
    properties : {
        
        popupListDelegate : {
            deferredInit : true
        },
        
        nodeNavigation : {
            deferredInit : true
        },
        
        childrenOptionsFactory : {
            deferredInit : true
        }

    },
    
    
    
    members : {
        
// list delegate methods
        createItem : function() {
            return this.getPopupListDelegate().createItem();
        },

        configureItem : function(item) {
            if(this.getPopupListDelegate().configureItem) {
                this.getPopupListDelegate().configureItem(item);
            }
        },

        bindItem : function(controller, item, id) {
            return this.getPopupListDelegate().bindItem(controller, item, id);
        },
        
        
        
// node navigation methods
        getName : function(node) {
            return this.getNodeNavigation().getName(node);
        },
        
        getParent : function(node) {
            return this.getNodeNavigation().getParent(node);
        },
        
        getChildren : function(node) {
            return this.getNodeNavigation().getChildren(node);
        },



// children options factory methods
        getChildrenOptions : function(node) {
            return this.getChildrenOptionsFactory().getChildrenOptions(node);
        },
        
        unwrapSelection : function(node) {
            return this.getChildrenOptionsFactory().unwrapSelection(node);
        }

    }
});
