/* ************************************************************************
   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.
************************************************************************ */
qx.Theme.define("breadcrumb.theme.Decoration", {
    
    extend: qx.theme.indigo.Decoration,

    decorations : {
        
        "kwidget" : {
            style : {
                width: [1, 0, 1, 0],
                color : "border-main"
            }
        },
        
        "bc-selector" : {
            style : {
                width: [1, 0, 1, 0],
                color : "border-main"
            }
        }


    }
});