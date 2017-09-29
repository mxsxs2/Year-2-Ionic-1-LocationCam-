## Introduction
The application is made in Ionic 1 for Internet and Mobile Application Development module in Software Development course year 2(2016) at Galway Mayo Institute of Technology, Galway Campus.
The main purpose of the application is to take pictures. It has features like writing the date and the current location onto the picture and finally share the picture with via Facebook, Instagram, Twitter or any other social media application.
##How to run/build
Install Node.js dependecies
``` npm install ```
Install Cordova Plugins
``` ionic state restore ```
Run in browser
``` ionic serve ```
Build app
``` ionic build android ```
## Features
### Album
	The photo album is the main page of the application. In the photo album, the pictures are listed from the devices Photo Gallery/Camera Roll. Only the pictures in the LocationCam album will be shown. Every picture can be tapped on and shown in bigger screen. Once the picture is shown then it can be shared to any social media application on the device or even it can be sent as a text message or e-mail. 
### Camera
	The user can take pictures on the main screen of the application with the Capture button. 
If the “Edit after capture” setting is turned on, then the user will be able to edit the picture before the application writes the current location and current time onto the picture (Only if the setting is turned on).
Once a picture is taken it is going to be shown in the Photo Gallery/Camera Roll of the device and under the capture button in the application as well.

### Settings
	The application has numerous different settings that allows the user to customize the text style, text box and the camera. The settings are going to be stored and the device will remember for the settings set, even after the application is closed. Every setting has a default set to it. This default setting is usually “on” if it is a switch, the first option of every select and the white colour for the colour settings.
#### Content
* Location on pictures
	* Writes the location onto the taken picture
* Date on pictures
	* Writes the date onto the taken picture
#### Position
* Vertical
	* The vertical position of the text on the picture
	* Horizontal
* The horizontal position of the text on the picture
#### Font
* Colour
	* The colour of the text on the picture
* Variant
	* Whether the text is small caps or normal
* Style
	* The style of the text. Normal, Italic or Oblique
* Weight
	* The thickness of the letters. Normal, Bold, Bolder or Lighter.
* Size
	* The size of the letters in pixels. 8-30
* Family
	* The font theme of the text.
#### Text Box
* Show
	* Whether to show the box under the text or not.
* Colour
	* The colour of the box under the text

#### Camera
* Quality
	* The resolution and quality of the picture. Max, Medium or Low.
* Edit after capture
	* If the switch is on, then the picture can be edited with any of the picture editor applications on the phone before save.
* Save plain image
	* If the switch is on, then the picture is going to be saved to the Photo Gallery/Camera Roll before the text is inserted into it. The picture is going to be saved twice with this option as the picture will be saved before and after text insertion as well.
