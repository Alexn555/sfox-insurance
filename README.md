### SFox Insurance Engine v 2.66

![Alt text](http://norwaydict.com/logo/sfoxinsurance.png "Screen")

SFoxInsurance (Non-existing in real brand) it's a Javascript Engine for <br />
Economical, News Portal. <br />
Main plot to show good features of WebComponents and how can those be used <br />
in real website, administration systems.

Libraries: pure Javascript (ES8), CSS3, CSS3 variables, HTML5, WebComponents

## Changelog
v 2.66
  Added ImageViewer Keyboard improvements

v 2.65
  Added ImageViewerArrows improvements

v 2.64 
  Added Effecient method to set TextEditor Menu items

v 2.63
  Added TextEditor toggle tipToggle highlight, mode label,
  Added underline button

v 2.62
  Added TextEditor content limit,
  Added Tooltip toggle

v 2.61
  Added ObjectService to handle object methods,
  Created TextEditor Menu tool

v 2.60
  Added Feature list improvements,
  Added GAmeViewer settings same as in TextEditor settings 

v 2.59 
  Added GameViewerHelper, added TextEditor improvements

v 2.58
  Added Text Editor improvements

v 2.57
  Added Bonus game minor changes, ContentSW naming improvements,
  Created Text Editor first version

v 2.56
  Added Huge Safe game animation improvements

v 2.55
  Added Lifecycle order improvements,
  Created Bonus section to SafeKing game

v 2.54
  Added Game SafeKing settings improvements,
  Restored to use in render method innerHTML for better stability and performance

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

