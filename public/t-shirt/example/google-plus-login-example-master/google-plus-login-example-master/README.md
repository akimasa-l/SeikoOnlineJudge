# Simple Google+ login example.

**index.html** contains an example of using the g-signin2 method to automatically create the button and wire everything up.  But this 
method doesn't work well on pages that dynamically create the content after the page is rendered.

**custom.html** contains an example of using gapi.auth2 to do the login explicitly.  This works much better when used in pages with
more dynamic content like when using Angular.
 
## How do I use this?
Just run it via a local web server.  There are lots of options for this.  Personally I like [this](https://www.npmjs.com/package/local-web-server).
If you're using my unmodified version make sure it's running on port 8000 or you'll get an error from Google.

Enjoy!