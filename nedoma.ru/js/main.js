var kendo_app = new kendo.mobile.Application(document.body,
{
    transition:'slide',
    skin: 'material-light',
    platform: 'android'
});

var mainModel = kendo.observable({
    appTitle:"NEDOMA.RU", // title of application in <title> tag
});

$("document").ready(function(){
    kendo.bind($("#app_title"), mainModel);
})