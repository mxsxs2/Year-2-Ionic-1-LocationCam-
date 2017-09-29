var app=angular.module('starter');

//Add the directive for the toggles in the settings
app.directive('setting', function() {
        return {
            //Restrict to classes only
            restrict: 'C',
            link: function(scope, elem, attr, ctrl) {
                //Add chage event listener
                elem.on('change', function(e) {
                    //Get the model of the toggle
                    var ng="scope."+elem.attr("ng-model");
                    //Set the local storage
                    //Cut the last part of the name (dont need the scope.settings)
                    scope.settings.changeSetting(ng.substr(ng.lastIndexOf(".") + 1),eval(ng));
                });
            }
        };
    });
//Add the directive to the shoot button
app.directive('shoot', function(){
  return{
    //Restrict to classes only
    restrict: 'C',
    link: function(scope, elem, attr, ctrl) {
                //Add the click event listener to the button
                elem.on('click', function(e) {
                    //Open the native camera app
                    scope.takePicture();
                });
            }
  };

});