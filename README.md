# Instalyzer

An application to perform basic analysis on Instagram posts with specific tags.

This application was built for a MindSumo challenge hosted by Capital One.

# The challenge

The challenge descrption ([source](https://www.mindsumo.com/contests/meerkat-api))

```
Use the Instagram API to build an application (in Ruby, Python, NodeJS, or another language of your choice) that will find trends about Capital One on social media:

1. Get the 20 latest posts for #CapitalOne, and the like count for each. 
2. Get info about each of the users who posted those 20 latest posts: determine how many posts they have on Instagram, how many followers they have and how many people they follow. 
3. Determine how many posts are positive towards Capital One, how many are negative, and how many are simply neutral.

Bonus Deliverable (optional):

4. Fetch more posts than just 20, and generate some sort of visual that shows whether #CapitalOne is trending positively or negatively. (hint - try out D3 or something similar).
```

# Technologies

This webapp is entirely client-side, with the exception of Instagram API calls. It is implemented in HTML, CSS, and JavaScript.

This application was built with a number of open-source technologies, including

* [jQuery](https://jquery.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Handlebars](http://handlebarsjs.com/)
* [Moment.js](http://momentjs.com/)
* [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
* [Google fonts](https://www.google.com/fonts)
* [SpinKit](https://github.com/tobiasahlin/SpinKit)
* [AFINN](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010)
* 

# Usage

To use Instalyzer, simply type a hashtag into the input box and click "Instalyze". A list of the 20 most recent posts will be displayed below. Each post includes the general sentiment of the post as determined by analyzing the caption text and tags with the AFINN word list. To see details about the user that posted the image, click "User details" in the post header; a variatey of information, including the user's full name, follower count, and followed by count, will be displayed.
