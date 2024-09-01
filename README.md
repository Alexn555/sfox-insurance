### SFox Engine v 3.07

![Alt text](http://norwaydict.com/logo/sfoxinsurance.png "Screen")

SFox Engine (Non-existing in real brand) it's a Javascript Engine for <br />
Economical, News Portal. <br />
Main plot to show good features of WebComponents and how can those be used <br />
in real website, administration systems.

Libraries: pure Javascript (ES8), CSS3, CSS3 variables, HTML5, WebComponents

## Changelog
v 3.08
  Added ArrayService pluck, shuffle methods

v 3.07
  Added Code optimization improvements

v 3.06
  Added BasePageStyleHnadler to improve widths of base and footer

v 3.05
  Added footer adjustments

## Official Site

Made a site, that describes quite better what this engine is about.
Site link: [link](http://norwaydict.com/sfoxsoftware)

## Demo 

![Alt text](http://norwaydict.com/sfoxinsurance/screen.jpg "Screen")

Demo link: [link](http://norwaydict.com/sfoxinsurance)

## Projects, that are using this Engine 
Penny-xp.com <br />
Most proud of example: [penny-xp.com](http://penny-xp.com) <br />
Search and Analyze a Collection of great Racing experiences. <br />
Useful Service to give user ability to check, compare prices around the World  <br />

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

