### SFox Insurance Engine v 2.30

![Alt text](http://norwaydict.com/logo/sfoxinsurance.png "Screen")

SFoxInsurance (Non-existing in real brand) it's a Javascript Engine for <br />
Economical, News Portal. <br />
Main plot to show good features of WebComponents and how can those be used <br />
in real website, administration systems.

Libraries: pure Javascript (ES8), CSS3, CSS3 variables, HTML5, WebComponents

## Changelog
v 2.30
  Created Gallery First version, added theme GeneralNote, 
  added Pagination for Gallery viewer

v 2.28
  Added Network checker, css mixin arguments improvements, customEventService improvement

v 2.26
  Minor Writer updates, Game updates, copyright notices

v 2.24
  Improved Icon settings, Game Page improvements, ImageViewer (lost focus error) fixes,
  Medium size refactor addEvent to CustomEventService event

v 2.23
  Created IconSelect and icon implementation, Moved event, removeList to CustomEventService,
  Added better properties count ImageViewer

v 2.20
  Show visited string and show function

v 2.19
  Added logical name for variant constant, Huge refactor to use IdService
   and ClassIdServie in all implementations

v 2.17
  Added Account additional icons, added Password Reminder, Added original image opacity fixes

v 2.15
  Services structure improvements

v 2.12
  Readme imporvements, services structure improvements, zoom improved feature

v 2.11
  Added Profile icon

v 2.10
  Added Login, Account improvements, ImageViewer Zoom dynamic based on movable contrainer


## Demo 

![Alt text](http://norwaydict.com/sfoxinsurance/screen.jpg "Screen")

Demo link: [link](http://norwaydict.com/sfoxinsurance)


## Overall structure
 Program is structured in this way: 

    All components, pages, ui elements are HTMLElements in classical WebComponents style.

    ui / (common input elements)

    layout / overall portal structure
     page -> page switcher

      layout consits of 
         header -> header menu (desktop, mobile)
         page -> page switcher
         footer -> footer menu (desktop, mobile)

    pages / -> pages and some components specially designed for them
      home / - home page and components
      insurance / - insurance page and components
    
    index.html -> initial point
    style.css -> initial styling, main offsets and fonts

   
## Chance to support the Project
 Currently Project is supported by this one developer.  <br />
 You have a chance to support the project by  <br />
 ![Alt text](http://norwaydict.com/showcase/paypal_donate.png "Paypal Donate") <br />
 using Paypal Donate link: https://www.paypal.com/donate/?hosted_button_id=DYMC5E2TH8VGN    <br />
 Super Thanks! :)


## First (primary) way to execute 
  Uses Webpack 5
   1. npm install
   this command will install webpack and all required plugins

   2. then use command:
     npm start , runs dev server (with disabled intentionally dev-server error overlay )
     npm run build, builds the appliation in dist folder


## How to execute  
  You need to install simple node HTTP server
  
   1. npm install -g live-server // Install globally via npm
   2. then cd to src folder
       npm run command 
		live-server     

    C:\node_projects\sfox-insruance\src>live-server
    Serving "C:\node_projects\sfox-insruance\src" at http://127.0.0.1:8080

   Should now in browser be: http://127.0.0.1:8080/ as host for the Application

   After that all modules and parts of Application are runnable


## Compatability
  Works well in all modern Desktop resolutions on most browsers. <br />
  Also Mobile-friendly and can be useful on mobile devices.

## Tests
  Mainly Chrome and mobile viewport, but also looks good on Firefox latest, Edge latest

