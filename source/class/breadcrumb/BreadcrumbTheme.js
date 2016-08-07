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
