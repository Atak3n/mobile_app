var MapGlobalObject={
    map:{},
    markerIcons:{},   
    mapInit: function(){
        var baseurl="libs/leaflet/images/";
        var LeafIcon = L.Icon.extend({
			options: {
				iconSize:     [32, 37],
				shadowSize:   [51, 37],
				iconAnchor:   [16,37],
				shadowAnchor: [16, 37],
				popupAnchor:  [0, -30]
			}
		});
        markerIcons={
        	'housing' : {
                default_view:0,
                group:new L.FeatureGroup(),
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_housing.png'})
        	},
            
    		'funs' : {
                default_view:0,
                group:new L.FeatureGroup(),
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_entertainment.png'}),
        	}, 
        	'food' : {
                default_view:0,
                group:new L.FeatureGroup(),
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_food.png'}),
        	}, 
        	'shop' : {
                default_view:0,
                group:new L.FeatureGroup(),
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_products.png'}),
        	}, 
        	'transport' : {
                default_view:0,
                group:new L.FeatureGroup(),
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_transport.png'}),
        	}, 
        	'lift' : {
                default_view:0,
                group:new L.FeatureGroup(),
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_lift.png'}),
        	}, 
        	'baza' : {
                default_view:0,
                group:new L.FeatureGroup(),
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_baza.png'}),
        	}
		};
    	$('#map_canvas').height($('#map_role').height()-$('#map_role .km-navbar').height());
    	//$('#map_canvas').height("300px");
    	map = L.map('map_canvas').setView([54.733333, 55.966667], 12);
    	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
    	MapGlobalObject.mapViewLayers('all_layers');
	},
    mapViewLayers:function(layer){
        var lo,la;
        for(var i in markerIcons){
            app.C_L(layer);
        	if(layer!=i && layer!="all_layers") continue;
            if(!markerIcons[i]) continue;
            if(markerIcons[i].default_view) { // if this layer is visible -> do invisible
            	markerIcons[i].default_view=0;
                markerIcons[i].group.clearLayers();
            } else { // if this layer is invisible -> do visible
                markerIcons[i].default_view=1;
                for(var j=0;j<5;j++) 
                {
                    la=54.7386+j/10*Math.random();
                    lo=55.9633+j/10*Math.random();
                    markerIcons[i].group.addLayer(L.marker([la, lo],{icon: markerIcons[i].icon}).addTo(map).on('click',function(e){alert(i)}));
                }
    			map.addLayer(markerIcons[i].group);
            }
        }
	}
};
var mapModel = kendo.observable({
   	map_title:"Карта",
    isSearchVisible: false,
    isTitleVisible: true,
    isSubmenuVisible: false,
    showSubmenu: function(e) {
		if (this.isSubmenuVisible)
		{
	    	var that=this;
	    	$(".map_submenu").slideUp(200,function(){that.set("isSubmenuVisible", false)});
		}
		else
		{
	    	this.set("isSubmenuVisible", true);
	    	$(".map_submenu").slideUp(0);
	    	$(".map_submenu").slideDown(200);
		}
    },
    showSearchInput: function() {
        var that=this;
        if (this.isSearchVisible)
		{
	    	$("#search_map").hide(200,function(){
                that.set("isSearchVisible", false);
                that.set("isTitleVisible", true);
            });
		}
		else
		{   
            this.set("isSearchVisible", true);
            this.set("isTitleVisible", false);
            $("#search_map").hide(0);
	    	$("#search_map").show(200);	    	
		}
    },
    showLayers:function(elm){
        MapGlobalObject.mapViewLayers(elm.currentTarget.attributes.name.value);
    }
});

$("#search_map").kendoAutoComplete({
    dataSource: ["a","as","asd","asdf","asdfg","asdfgh","asdfghj"],
    filter: "startswith",
    placeholder: "Поиск...",
    separator: ", "
});