/* ************************************************************************
   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.
************************************************************************ */
qx.Class.define("breadcrumb.BreadcrumbTheme", {
    
    defer : function() {
        breadcrumb.ContribTheme.registerContributionTheme({
            decoration : breadcrumb.theme.Decoration,
            appearance : breadcrumb.theme.Appearance,
            color : breadcrumb.theme.Color,
            font : breadcrumb.theme.Font
        });
    }
    
});
