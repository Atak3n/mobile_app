var MapGlobalObject={
    map_center:[52.924017, 87.982158],
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
        	'dwell' : {
                default_view:0,
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_housing.png'})
        	},
            
    		'fun' : {
                default_view:0,
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_entertainment.png'}),
        	}, 
        	'food' : {
                default_view:0,
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_food.png'}),
        	}, 
        	'shops' : {
                default_view:0,
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_products.png'}),
        	}, 
        	'transport' : {
                default_view:0,
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_transport.png'}),
        	}, 
        	'infrastructure' : {
                default_view:0,
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_lift.png'}),
        	},
            /*
        	'baza' : {
                default_view:0,
                icon:new LeafIcon({iconUrl: baseurl+'marker_map_baza.png'}),
        	}
            */
		};
    	$('#map_canvas').height($('#map_role').height()-$('#map_role .km-navbar').height());
    	//$('#map_canvas').height("300px");
    	map = L.map('map_canvas',{markerZoomAnimation:false}).setView(MapGlobalObject.map_center, 14);
    	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {detectRetina:true}).addTo(map);
        for(var i in markerIcons) MapGlobalObject.getCoords(i);
	},
    mapViewLayers:function(layer){
        var l_id=-1;
        var markers_arr=[];
        for(var i in markerIcons){
        	if(layer!=i && layer!="all_layers") continue;
            if(!markerIcons[i]) continue;
            if(markerIcons[i].default_view) { // if this layer is visible -> do invisible
            	markerIcons[i].default_view=0;                
                markerIcons[i].group.clearLayers();                
            } else { // if this layer is invisible -> do visible
                markerIcons[i].default_view=1;
                // app.C_L(i+"__"+markerIcons[i].data.length);
                if(!markerIcons[i].data) continue;
                for(var j=0;j<markerIcons[i].data.length;j++)
                {
                    var lo=markerIcons[i].data[j].coords.split(",");
                    var la=lo[0];
                    lo=lo[1];
                    var name=markerIcons[i].data[j].name;
                    markers_arr[markers_arr.length]=L.marker([la, lo],{icon: markerIcons[i].icon,name:name}).on('click',function()
                    {
                        $(".map_footer").html(this.options.name);
                        if(l_id==this._leaflet_id) $(".map_footer").toggle(100);
                        else $(".map_footer").fadeIn(100);
                        l_id=this._leaflet_id;
                    })
                }
                markerIcons[i].group=L.layerGroup(markers_arr);
                map.addLayer(markerIcons[i].group);
            }
        }
	},
    getCoords: function(layerId){
    	$.ajax({
    		url: app.proxyUrl,
    		success: function(data){
				//app.C_L(data);
                for(var i in data){
                    if(i=="") markerIcons["dwell"].data=data[i];
                    else markerIcons[i].data=data[i];
                }
                MapGlobalObject.mapViewLayers(layerId);
    		},
    		error: function(data){
                app.C_L("ERROR");
				app.C_L(data);
    		},    		
    		data: {id_name:'layerId',layerId:layerId},
    		dataType:"json"
    	});
	},
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
                $(this).css('z-index','0');
            });
		}
		else
		{   
            this.set("isSearchVisible", true);
            this.set("isTitleVisible", false);
            $("#search_map").hide(0);
	    	$("#search_map").show(200);	
  			$("#search_map").css('z-index','100'); 
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
    separator: ", ",
      height: 300,
    //headerTemplate: "<div class='dropdown-header'></div>",
    template: "<div class='dropdown-body'>#: data #</div>"
});