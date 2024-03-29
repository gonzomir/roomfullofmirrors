Room Full Of Mirrors
====================

A small utility to help with testing websites on multiple devices.

Installation
------------

1. Copy the files on a webserver that is visible in your WiFi network.
2. Change the baseURL in rfom.js to reflect the URL where you put the files.
3. Point all your devices to the location where you put the files. You can bookmark it or set it as a home page for the devices in your device lab.
4. Add the script to the head of the website you will be testing.
5. Open the website you will test on your laptop and watch all other devices navigating to it automaticaly.
6. When you navigate arround the website on any of the browsers, all others will follow.

How it works
------------

On every page load the script sends the page URL to a PHP file that writes it to a text file.
Every one second the script checks the URL and if it's different from the current page it loads the new URL.

Compatibility
-------------

The server needs PHP to be able to write and read the file.
The script should work on all modern browsers that support CORS via XMLHttpRequest2 or IE's XDomainRequest.
If the script and the site are served from the same domain, it should work in all browsers that support the XMLHttpRequest object.

Tested in:

* Nokia Browser 7.3 on Symbian s60
* Internet Explorer on Windows Phone 7.5
* Android Browser on Android 2.3.1
* Internet Explorer 9 on Windows 7
* Firefox 16 on Ubuntu 12.4
* Chromium 20 on Ubuntu 12.4
* Opera 12.12 on Ubuntu 12.4
