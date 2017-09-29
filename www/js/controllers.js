var app=angular.module('starter.controllers', []);

//Contrller to used on the dashboard
app.controller('DashCtrl', function($scope,Geolocation,$cordovaCamera,$http,$cordovaPhotoLibrary,$ionicPlatform,$cordovaSocialSharing,$ionicModal) {
        //Message on the front
        $scope.message="Loading GPS";
        
        //Set the base location
        $scope.location='';
        //Wrap the location getting into a function.
        $scope.getLocation= function(){
            //Get the location
            Geolocation.then(function(position) {
                                    //Create the url for googles location api
                                     var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
                                     //Call the url
                                     $http.get(url).success(function(data){
                                           //Basic variable for the location 
                                           var location='';
                                           //If there is a location retrieved
                                           if(data.results != null){
                                               //Loop through the result. Skip the first two index as i dont need full address
                                               for(var i=2; i<7; i++){
                                                    //Check if the next line is available
                                                    if(data.results[0].address_components[i]!=null){
                                                        //Set the line to the temporary variable
                                                        var value=data.results[0].address_components[i].long_name;
                                                        //Duplicate prevention
                                                        var has=false;
                                                        //Break the line.
                                                        angular.forEach(value.split(" "),function(v,k){
                                                            //if any part of the line is in the location already then dont add this line
                                                            if(location.indexOf(v)!=-1) has=true;
                                                        });
                                                        //If the line is not added yet
                                                        if(location.indexOf(value)==-1 && !has){
                                                            //Add the line
                                                            location+=value;
                                                            //Add a comma and a space if the line is not the last line
                                                            if(i<6 && data.results[0].address_components[i+1]!=null) location+=", ";
                                                        }   
                                                    }else{
                                                        //Exit the loop as there is no more lines
                                                        break;
                                                    }
                                                    
                                               }
                                           }
                                           //Set the location variable in the scope
                                           $scope.location=location;
                                           //Set the message to be empty.
                                           $scope.message="";
                                     }).error(function(data){
                                        //Set the message as the url could not be resolved
                                        $scope.message="No internet";
                                     });
                                    
                                }, function(err) {
                                     //Set the location variable in the scope to empty if there was an error
                                     $scope.location='';
                                     //Set the message as the gps could not provide a location
                                     $scope.message="GPS not available";
                                });
       
    }
    
    $scope.takePicture = function(){   
        //Check if the gelocation is needed
        if($scope.settings.enableLocation){
            //Get the location if it is needed.
            //By the time the picture is taken the locations should be loaded as well. 
            $scope.getLocation();
        }
        
        //Set the options for the camera
        var cameraOptions = {
            //Qualityt
            qality: $scope.settings.camQuality,
            //Create base64
            destinationType: Camera.DestinationType.DATA_URL,
            //Use the camera not the gallery as source
            sourceType: Camera.PictureSourceType.CAMERA,
            //Do not edit
            allowEdit: $scope.settings.camEditable,
            //Save in JPEG
            encodingType: Camera.EncodingType.JPEG,
            //Fix the orientation of the picture
            correctOrientation:true,
            //Do not save into the photo album
            saveToPhotoAlbum: $scope.settings.saveToGallery               
         };
        //Action do to on success
        var success = function(data){
            $scope.$apply(function () {
                //Change change the source of the new picture eg show the picture
                $scope.addWatermark(data);
             });
        };
        var failure = function(message){
             //Check if the user cancelled the camera
             if(message!='Camera cancelled.'){
                //show the fail message
                alert('Failed because: ' + message);
             }
        };
        //call the cordova camera plugin to open the device's camera
        navigator.camera.getPicture( success , failure , cameraOptions );            
    };
        
    
    //Function used to save the image
    var save = function(image,$scope){
        
    }
    //Function used to add watermark
    $scope.addWatermark = function(imageData){
        //Create the image from the base64 data
        var img = new Image();
        img.src="data:image/jpeg;base64,"+imageData;
        //Create a new canvas
        var canvas=document.createElement('canvas');
        //Get the context of the canvas
        var ctx=canvas.getContext("2d");
        
        //When the picture is loaded we begin the operations with it
        img.onload = function(){
            //Set the canvas size to the equivalent of the picture
            canvas.width=img.width;
            canvas.height=img.height;
            //Draw the image onto the canvas
            ctx.drawImage(img,0,0);
            
            var textToWrite='';
            //Check if the gelocation is needed
            if($scope.settings.enableLocation){
                //Add location
                textToWrite+=$scope.location;
            }
            //Check if the Date is needed
            if($scope.settings.enableDate){
                //Check if there is already something
                if(textToWrite!=''){
                    //Add a spacer
                    textToWrite+=" - ";
                }
                //Get the date 
                var date = new Date();
                //Get the day
                var day = date.getDate();
                //Get the month
                var month = date.getMonth()+1; 
                //Get the year
                var year = date.getFullYear();
                //Add leading zeros to day
                if(day<10) day='0'+day;
                //Add leading zeros to month
                if(month<10) month='0'+month;
                
                //Add date
                textToWrite+=day+'/'+month+'/'+year;
            }
             //If there is something to write onto the picture
            if(textToWrite!=''){
                //Set base position         
                var horizontal=10;
                var vertical=30;
                var textAlign='left';  
                var textBaseline='top';  
                
                //Get font style
                var style=$scope.settings.fontStyle.toLowerCase();
                var variant=$scope.settings.fontVariant.toLowerCase();
                var weight=$scope.settings.fontWeight.toLowerCase();
                var size=$scope.settings.fontSize+'px';
                var family=$scope.settings.fontFamily;
                //Set font style
                ctx.font=style+" "+variant+" "+weight+" "+size+' '+family;  
                
                //Background box position
                var boxVertical=30;
                
                //Decide horizontal position
                switch($scope.settings.textPositionHorizontal){
                    case 'Left':
                        break;
                    case 'Center':
                        textAlign='center';
                        horizontal=canvas.width/2;
                        break;
                    case 'Right':
                        textAlign='right';
                        horizontal=canvas.width-10;
                        break;
                }    
                //Decide vertical position
                switch($scope.settings.textPositionVertical){
                    case 'Top':
                        break;
                    case 'Middle':
                        textBaseline='middle';
                        vertical=canvas.height/2;
                        boxVertical=vertical -(parseInt($scope.settings.fontSize)/2);
                        break;
                    case 'Bottom':
                        textBaseline='bottom';
                        vertical=canvas.height-10;
                        boxVertical=vertical-parseInt($scope.settings.fontSize)-7.5;
                        break;
                }
                //Set text vertical align
                ctx.textBaseline=textBaseline;
                //Set text horizontal aligning
                ctx.textAlign=textAlign; 
                
                
                //Check the box should be shown
                if($scope.settings.textBoxShow){
                    //Set the font color
                    ctx.fillStyle=$scope.settings.boxColor;
                    //Set the opacity of the box
                    ctx.globalAlpha=0.4;
                    //Create background box
                    ctx.fillRect(0,boxVertical,canvas.width,parseInt($scope.settings.fontSize)+5);
                    //Set alpha back to full
                    ctx.globalAlpha=1;
                }
                //Set the font color
                ctx.fillStyle=$scope.settings.fontColor;             
                //Write onto the image 
                ctx.fillText(textToWrite,horizontal,vertical);
            }
            
            //Show the image
            var image = document.getElementById('takenPicture');
            
            //Show the image
            var image = document.getElementById('takenPicture');
                //image.src = canvas.toDataURL("image/jpeg");
            //Save the image to the album    
            $cordovaPhotoLibrary.saveImage(
                            canvas.toDataURL("image/jpeg"),
                            'LocationCam',
                            function(){
                                //Add the picture to the beggining of the photo album
                                $scope.images.unshift({src: canvas.toDataURL("image/jpeg")});
                                //Update bindings
                                $scope.$apply();
                                
                            }
                            
            );
            
        }
    }
    //Holder for the taken images
    $scope.images = [];
    //Function to load the images
    $scope.getImages=function(){
        $cordovaPhotoLibrary.getLibrary(
                            function (library) {
                                //Go through the items
                                library.forEach(function(libraryItem) {
                                    //If it belongs to location cam
                                    if(libraryItem.id.indexOf('LocationCam')!=-1){
                                        //Add it to the images
                                        $scope.images.push({src: libraryItem.nativeURL});
                                    }
                                });
                                //Force the view to reload. eg to show the pictures
                                $scope.$apply();
                                //Remove the loading gif
                                document.getElementById('galleryLoading').outerHTML='';
                          },
                          function (err) {
                            //Remove the loading gif
                            document.getElementById('galleryLoading').outerHTML='';
                          }
                        );
        
    }
    //Wait until the platform is ready
    $ionicPlatform.ready().then(function() {
        //The load the images
        $scope.getImages();
        //Load the location
        $scope.getLocation();
    });
    
    
    
    $scope.shareImage=function(src){
        //Check if it is base64, if not then add the file protocol
        if(src.indexOf("base64")==-1) src="file://"+src;
        //Share the image
        $cordovaSocialSharing.share("Check this","",src,"from LocationCam");
    }
    
    
    
    //Set the modal template
    $ionicModal.fromTemplateUrl('image-modal.html', {
      //Pass the $scope to the modal
      scope: $scope,
      //Set the showing animation
      animation: 'slide-in-up'
    }).then(function(modal) {
      //Create modal
      $scope.modal = modal;
    });
    //Modal closer
     $scope.closeModal = function() {
        //Hide the modal    
        $scope.modal.hide();
    };
    
    //Current picture selected in modal
    $scope.imageSrc = '';
    //open the images
    $scope.openImage = function(index) {
      //Set the current images  
      $scope.imageSrc = $scope.images[index].src;
      //open modal
      $scope.modal.show();
    }
    
    //Add listener to the back button
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        //If the modal is shown
        if($scope.modal.isShown()) {
            //Dont go back
            event.preventDefault();
            //Close the modal
            $scope.modal.remove();
        }
    });
    
})
/*
app.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})


app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})*/


app.controller('AccountCtrl', function($scope) {
  //Event api for the font color picker
  $scope.fontColorEventApi={
    //Need only the onClose event
    onClose:function(api,color,$event){
        //Save the color to the settings
        $scope.settings.changeSetting('fontColor',color);
    }
  }
  //Event api for the box color picker
  $scope.boxColorEventApi={
    //Need only the onClose event
    onClose:function(api,color,$event){
        //Save the color to the settings
        $scope.settings.changeSetting('boxColor',color);
    }
  }
})


