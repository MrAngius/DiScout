SCSS is a very powerful tool to simplify our work writing CSS code.
Although it is very very very simple... I do not expect you to learn how to use it.

To have an idea about how powerful this tool is, look how clean the HTML files can result. In particular, you can make a comparison about the old template navigation (alessandro_marco.html) and the new version (gauthier_giorgio.html)
Look also the SCSS files I wrote, inside this folder:
- @import allows you to split the CSS code in modules, whose name must start with '_' (ex: _template.scss)
- @extend allows you to extend the code of a CSS class (VERY VERY POWERFUL, if used with the W3CSS library's ready-to-use and responsive bullet-proof classes)
- $ allows you to declare variables. This could be very nice: imagine to have set a color, and then you want to change it... instead of changing hundreds of lines of code, you are able to change only the variable content once
- Nested elements are interpreted as children elements

For the moment, SCSS files will be "frozen": style.css is still valid.
In order to retrieve the CSS output file, you need to compile the SCSS file. You can do it downloading Koala (http://koala-app.com/)
=> Again, very simple to use: press "+" to add the project repository, click on the scss file and compile it (if you set the "automatic compile" check, no will not need to do anything later on)

Anyway, if you don't want to do it you can wait for my action. I will maintain the CSS code periodically. In order to make you able to continue writing your own CSS code, I will link in the headers an extra "foo.css" file, in which you can write code as you could have done before.
Once declared as ready, this code will be moved in the SCSS main file (or its modules)

TIP: make sure our editor is able to highlight the SCSS syntax (ex: use Sublime)