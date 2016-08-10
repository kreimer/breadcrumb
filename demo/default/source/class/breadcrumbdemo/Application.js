/* ************************************************************************
   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.
************************************************************************ */

/**
 * @asset(breadcrumbdemo/*)
 */
qx.Class.define("breadcrumbdemo.Application", {
    
    extend : qx.application.Standalone,

    members : {
        
        _bcSelectionLabel : null,

        
        
        main : function() {
            this.base(arguments);
//            if (qx.core.Environment.get("qx.debug")) {
                qx.log.appender.Native;
                qx.log.appender.Console;
//            }
            var doc = this.getRoot();
            var head = "head";
            var placeholder = "placeholder";
            var roots = this._createBreadcrumbRoots();
            var value = roots.getItem(0);
            var config = null;
            var bc = new breadcrumb.Selector(head, placeholder, roots, value, config);
            doc.add(bc, { top: 50, left : 400 });
            
            var bcSelectionLabel = new qx.ui.basic.Label(value!==null ? value.getName() : "(none)");
            doc.add(bcSelectionLabel, { top: 150, left : 400 });
            bc.addListener("changeValue", function(e) {
                var value = e.getData();
                var name = value!==null ? value.getName() : "(none)";
                bcSelectionLabel.setValue(name)
            }, this);
            
            var showClearButtonCheckbox = new qx.ui.form.CheckBox("show clear button").set({ value : true });
            doc.add(showClearButtonCheckbox, { top: 100, left : 400 });
            showClearButtonCheckbox.bind("value", bc, "showClearButton");
            
            var showHeadCheckbox = new qx.ui.form.CheckBox("show head").set({ value : true });
            doc.add(showHeadCheckbox, { top: 100, left : 600 });
            showHeadCheckbox.bind("value", bc, "head", {
                converter : function(data) {
                    return data ? "head" : null;
                }
            });
            
            var showPlaceholderCheckbox = new qx.ui.form.CheckBox("show placeholder").set({ value : true });
            doc.add(showPlaceholderCheckbox, { top: 100, left : 800 });
            showPlaceholderCheckbox.bind("value", bc, "placeholder", {
                converter : function(data) {
                    return data ? "placeholder" : null;
                }
            });
        },
        
        
        
        _createBreadcrumbRoots : function() {
            var roots = new qx.data.Array();
            for(var i=0; i<3; i++) {
                var root = new breadcrumbdemo.Node("root_"+i, null);
                roots.push(root);
                for(var j=0; j<5; j++) {
                    var child = new breadcrumbdemo.Node("child_"+i+"_"+j, root);
                    if(j%2) {
                        for(var k=0; k<10; k++) {
                            new breadcrumbdemo.Node("grandchild_"+i+"_"+j+"_"+k, child);
                        }
                    }
                }
            }
            return roots;
        }
        
    }
    
});
