/* ************************************************************************
   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.
************************************************************************ */
qx.Class.define("breadcrumb.AbstractChildrenOptionsFactory", {
    
    type : "abstract",
    
    extend : qx.core.Object,
    
    implement : [ breadcrumb.IChildrenOptionsFactory ],
    
    include : [ breadcrumb.MConfigured ],
    
    
    
    construct : function() {
        this.base(arguments);
    }

});
