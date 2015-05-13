var kendo_app = new kendo.mobile.Application(document.body,
{
    transition:'slide',
    skin: 'material-light',
    platform: 'android'
});

$("document").ready(function(){
    $("body").on('click', '.get-image', function(){getPicture();});
    $("body").on('click', '.add-to-base', function(){setNewLine();});

    function getPicture(){
	navigator.camera.getPicture(function(imageData){
	     $("#new_img").val(imageData);
	}, function(message){$("#new_img").val();}, { quality: 50,
	    destinationType: Camera.DestinationType.DATA_URL
	});
    }
    function setNewLine(){
	var i_text= $("#new_string").val();
	var i_img= $("#new_img").val();
	$(".fields").append("<li><img src=data:image/jpeg;base64," + i_img + " width=100%> <span>"+i_text+"</span></li>");
	    
	db.transaction(
	    function(t){
		t.executeSql("INSERT INTO fields VALUES (?, ?)", [i_text, i_img]);
	    }
	);
    }
})