var mapModel = kendo.observable({
    isSearchInvisible: true,
    isTitleVisible: true,
    isVisible: false,
    show: function() {
        viewModel.set("isTitleVisible", false);
        kendo.fx($("#search_map")).slideIn('left').play().then(function() {
        viewModel.set("isSearchInvisible", false);
       });
        
    },
    showSubmenu: function(e) {
        if (this.isVisible) { kendo.fx($("#map_submenu")).slideIn("down").reverse().then(function()  {viewModel.set("isVisible", false);})  }
        else {this.set("isVisible", true); kendo.fx($("#map_submenu")).slideIn("down").play();}
    },

    widezoom: function() {
 $('#main_camera').css('height','400px');
   /*  kendo.fx($("#main_camera")).zoom("in").play();*/
}
});

kendo.bind($("#map_searcher"), viewModel);
kendo.bind($("#main_camera"), viewModel);