# numbering
Util for numbering multiple text nodes in a comic


# context
One day my wife got a translation job for a paragraph game. Again. The original arrived in a pdf and the publisher needs to have every single text numbered, to match translation with the original. 

This tool helps fast creation of [ImageMagick](https://www.imagemagick.org/) commands to add annotations with numbers to pages in a pdf. 

# steps
1. Split a pdf into jpgs using `convert -density 300 -quality 70 somepdf.pdf page_%03d.jpg`. The three digit page naming format is important, the script uses it for traversal between pages.
2. Drop `numbering.html`, `numbering.js` and `numbering.css` into the folder with jpgs, open `numbering.html` in a browser.
3. Add numbers as necessary. Clicking on pages adds tags with numbers. Pressing return or page traversal converts tags to ImageMagick commands. Run commands to annotate files.
4. Merge jpgs back into a pdf using `convert *jpg annotated.pdf`.

# commands
`[` move back 10 pages

`w` move back one page

`e` move forward one page

`]` move foreward 10 pages

`c` clear

`r` reset index

`click` add a violet tag

`shift click` add a white tag

`return` convert tags to commands
