### SFox Insurance Engine v 2.10

![Alt text](http://norwaydict.com/logo/sfoxinsurance.png "Screen")

SFoxInsurance (Non-existing in real brand) it's a Javascript Engine for <br />
Economical, News Portal. <br />
Main plot to show good features of WebComponents and how can those be used <br />
in real website, administration systems.

Libraries: pure Javascript (ES8), CSS3, CSS3 variables, HTML5, WebComponents

## Changelog
v 2.10
  Added Login, Account improvements, ImageViewer Zoom dynamic based on movable contrainer

v 2.09
  Added Salt to login password, added user

v 2.08
  Added Account, Login improvements

v 2.07
  Added styling updates to image, Added decode, encode utils, Added Login Service

v 2.06
  Added separation between article, image in writer

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

