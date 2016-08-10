/* ************************************************************************
   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.
************************************************************************ */
qx.Class.define("breadcrumb.util.Hoverable", {
    
    statics : {
        
        makeHoverable : function(widget) {
            widget.addListener("mouseover", function(e) {
                e.getCurrentTarget().addState("hovered");
            });
            widget.addListener("mouseout", function(e) {
                e.getCurrentTarget().removeState("hovered");
            });
        }
        
    }
    
});
