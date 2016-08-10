/* ************************************************************************
   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.
************************************************************************ */
qx.Class.define("breadcrumb.DefaultConfig", {

    type : "singleton",
    
    extend : breadcrumb.Config,
    
    
    construct : function() {
        this.base(arguments, new breadcrumb.BasicListDelegate("name"), breadcrumb.DefaultNodeNavigation.getInstance() );
    }

});
