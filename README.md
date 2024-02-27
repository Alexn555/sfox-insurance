### Insurance Calculator v 1.07

SFoxInsurance (Non-existing in real company) Calculator program to view bank accounts and loans
It's fiction company, that doesn't exists, just to implement and try out WebComponents
and some latest best Javascript tricks.

Libraries: pure Javascript (ES8), CSS3, CSS3 variables, HTML5, WebComponents

## Changelog
v 1.07
  Added Calculation page improvements
  Added fixes Select, Slider handlers

v 1.06
  Added webpack template to build bundle

v 1.05
  Added liveServer support
  Fixed height for header-overlay
  Enabled global modules and global settings 

v 1.03
  Changed to correct initial page
  Changed to correct symantic sections in layout (header, main, footer)

v 1.02
  Added AccountTable huge improve, dynamic content
  Removed unused comments
  Update onresize Footer links
  Added fixes to Payment amount error number check


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

## Tests
  Mainly Chrome and mobile viewport, but also looks good on Firefox latest, Edge latest

