README
======

This is a simple boilerplate for sass + jade + typescript(maybe) development


Setup
-----
After cloning this repository, you should run the following commands.

    npm install


Build Your Site
---------------
The folder `public` is supposed to be the document root of your site.
The structure goes like this:

 - public/    (folder to put HTML)
   - styles/  (folder to put .css)
   - scripts/ (folder to put javascripts assets)
 - src/       (folder to put .jade files)
   - styles/  (folder to put .sass, .scss)
   - scripts/ (folder to put .js, .jsx, .ts scripts)

You can create your own files inside `public`. This bolierplate is to
help those who wants to develop their site in sass, jade or other language
instead of plain HTML and CSS. So apparently you can develop scripts and
styles in the `src` folder and have `gulp` to build the files for you.


Development
-----------
You may start a development server with this:

    npm run dev

The development site should be on [http://localhost:8080](localhost:8080).
