qx.Class.define("breadcrumb.DefaultConfig", {

    type : "singleton",
    
    extend : breadcrumb.Config,
    
    
    construct : function() {
        this.base(arguments, new breadcrumb.BasicListDelegate("name"), breadcrumb.DefaultNodeNavigation.getInstance() );
    }

});
