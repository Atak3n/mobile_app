var mapModel = kendo.observable({
   	map_title:"Карта",
    isSearchVisible: false,
    isTitleVisible: true,
    isSubmenuVisible: false,
    showSubmenu: function(e) {
		if (this.isSubmenuVisible)
		{
	    	var that=this;
	    	$(".map_submenu").slideUp(700,function(){that.set("isSubmenuVisible", false)});
		}
		else
		{
	    	this.set("isSubmenuVisible", true);
	    	$(".map_submenu").slideUp(0);
	    	$(".map_submenu").slideDown(700);
		}
    },
    showSearchInput: function() {
        var that=this;
        if (this.isSearchVisible)
		{
	    	$("#search_map").hide(100,function(){
                that.set("isSearchVisible", false);
                that.set("isTitleVisible", true);
            });
		}
		else
		{   
            this.set("isSearchVisible", true);
            this.set("isTitleVisible", false);
            $("#search_map").hide(0);
	    	$("#search_map").show(100);	    	
		}
    }
});

var mapInit = function(){
    $('#map_canvas').height($('#map_role').height()-$('#map_role .km-navbar').height());
    //$('#map_canvas').height("300px");
    var map = L.map('map_canvas').setView([54.733333, 55.966667], 12);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
    var markers = new L.FeatureGroup();
    markers.addLayer(L.marker([54.7386, 55.9633],{id: 1}).addTo(map).on('click',function(e){markers.clearLayers();}));
    markers.addLayer(L.marker([54.7486, 55.9633],{id: 2}).addTo(map).on('click',function(e){markers.clearLayers();}));
    map.addLayer(markers);
};