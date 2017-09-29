var app=angular.module('starter.services', [])
/*
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
*/
//Create a new service for the settings container
app.service('settingsService', function(localStorageService) {
            return {
                //The camera quality
                camQuality: localStorageService.get('camQuality')!=null ? localStorageService.get('camQuality') : '100',
                //The picture edit allowance
                camEditable :localStorageService.get('camEditable')!=null ? localStorageService.get('camEditable') : false,
                //The picture edit allowance
                saveToGallery :localStorageService.get('saveToGallery')!=null ? localStorageService.get('saveToGallery') : false,
                //The vertical position of the text
                textPositionVertical: localStorageService.get('textPositionVertical')!=null ? localStorageService.get('textPositionVertical') : 'Top',
                //The horizontal position of the text
                textPositionHorizontal :localStorageService.get('textPositionHorizontal')!=null ? localStorageService.get('textPositionHorizontal') : 'Left',
                //The font Style
                fontStyle: localStorageService.get('fontStyle')!=null ? localStorageService.get('fontStyle') : 'Normal',
                //The font varianl
                fontVariant: localStorageService.get('fontVariant')!=null ? localStorageService.get('fontVariant') : 'Normal',
                //The font Weight
                fontWeight: localStorageService.get('fontWeight')!=null ? localStorageService.get('fontWeight') : 'Normal',
                //The font Size
                fontSize: localStorageService.get('fontSize')!=null ? localStorageService.get('fontSize') : '12',
                //The font Color
                fontColor: localStorageService.get('fontColor')!=null ? localStorageService.get('fontColor') : '#ffffff',
                //The font Family
                fontFamily: localStorageService.get('fontFamily')!=null ? localStorageService.get('fontFamily') : 'Arial,"Helvetica Neue",Helvetica,sans-serif',
                //Enabe text box
                textBoxShow: localStorageService.get('textBoxShow')!=null ? localStorageService.get('textBoxShow') : true,
                //The box color
                boxColor: localStorageService.get('boxColor')!=null ? localStorageService.get('boxColor') : '#ffffff',
                //Enabe location text
                enableLocation: localStorageService.get('enableLocation')!=null ? localStorageService.get('enableLocation') : true,
                //Enable date text
                enableDate: localStorageService.get('enableDate')!=null ? localStorageService.get('enableDate') : true,
                //Function is used for chnaging the settings in the local storage
                changeSetting : function(settingName,value){
                    //Set value in the local storage
                    localStorageService.set(settingName, value,'localStorage');
                }
            };
        });



//Create a factory for the loaction
app.factory('Geolocation',function($ionicPlatform,$cordovaGeolocation){
    //Check if the platform is ready
     return  $ionicPlatform.ready()
                    .then(function() {
                        //Initialize the geolocation plugin
                        return $cordovaGeolocation
                                .getCurrentPosition({
                                    //Set the settings before getting the location
                                    timeout: 10000,
                                    enableHighAccuracy: false
                                });
                    });
                
})
//Warpper for the photo library plugin. This plugin is not included in ngcordova so I had to write the wrapper myself.
app.factory('$cordovaPhotoLibrary', ['$q', '$window', function ($q, $window) {
    
            return {
                //Save image method
                saveImage:function(url,album,success){
                    //Call the plugins save image method
	               return $window.cordova.plugins.photoLibrary.saveImage(url, album, success, function (err) {});
	           },
               //Get the contents of library
               getLibrary: function(success,error,settings){
                   //Call the plugins getLibrary method
                   return $window.cordova.plugins.photoLibrary.getLibrary(success,error,settings);
               },
               getThumbnailURL : function(item,success){
                   return $window.cordova.plugins.photoLibrary.getThumbnailUrl(item,success);
               }
            }
}]);