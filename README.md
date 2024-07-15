### SFox Engine v 3.01

![Alt text](http://norwaydict.com/logo/sfoxinsurance.png "Screen")

SFox Engine (Non-existing in real brand) it's a Javascript Engine for <br />
Economical, News Portal. <br />
Main plot to show good features of WebComponents and how can those be used <br />
in real website, administration systems.

Libraries: pure Javascript (ES8), CSS3, CSS3 variables, HTML5, WebComponents

## Changelog
v 3.01
  Added GameService to the Game, Safe Game pages
  Improved TextEditor, Games viewer design, left, right sides
  
v 3.00
  Created numeraction for FAQ component
  Fixed IconSelect (missed in components include) :)

v 2.99
  Added better Readme, added improved index.html header
  Introduced Reviewer multiple answers

v 2.98
  Added Reviewer question numeration

v 2.97 
  Added better Readme description
  Introduced Reviews required field, to navigate only if required answered

v 2.96 
  Added Reviewer theme improvements
  Added Reviewer Advanced significant improvements

v 2.95
  Created Reviewer Advanced version

v 2.94
  Added Reviewer improvements

v 2.93
  Renamed ui to io for better semantics
  Created Reviewer first version
 
v 2.92
  Added Gallery random default search

v 2.90
  Added Reviewer changes

## Demo 

![Alt text](http://norwaydict.com/sfoxinsurance/screen.jpg "Screen")

Demo link: [link](http://norwaydict.com/sfoxinsurance)


## Features 
 This Engine helps build domestic websites. Yeah, sound kinda old fashioned,  <br />
 but the engine does the trick, providing you with tons of good plugins (modules). <br />
 Those plugins works with the "user" Page and IO components and service that create <br />
 great relanshionship in order to create good website. <br />

 So for now, there are about good bunch of plugins: <br />
 Theme, network, ImageViewer, GalleryViewer, Contact form, <br />
 Reviewer (Questionnaire), Economic forms, Game example, TextEditor, Simple Login <br />
 and plenty to come.  <br />


## Overall structure
 Program is structured in this way: 

    All components, pages, ui elements are HTMLElements in classical WebComponents style.

    plugins - most tasty section 
    io / (common input and output elements)

    layout / overall portal structure
     page -> page switcher

      layout consits of 
         header -> header menu (desktop, mobile)
         page -> page switcher
         footer -> footer menu (desktop, mobile)

    services - to help plugins doing something with pages

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
     npm start , runs dev server (with disabled intentionally dev-server error overlay)
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

