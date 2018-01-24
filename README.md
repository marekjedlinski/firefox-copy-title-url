# Context menu: Copy page title (or selection) and url to clipboard

This Firefox extension adds an item to the context menu which allows you to __copy the title and the url__ of the current page to clipboard. If any __text is selected on the page__, the selected text is copied instead of the title of the page (the url is always included).

This is useful when emailing/sharing links or for example collecting citations/quotes from the web.

It should serve as a basic replacement for the fantastic ["QuoteURLText" extension](https://addons.mozilla.org/en-US/firefox/addon/quoteurltext/) by Jay Palat, which had more functionality but is no longer supported by Firefox.

Heavily based on Mozilla example web extension project [context-menu-copy-link-with-types](https://github.com/mdn/webextensions-examples/tree/master/context-menu-copy-link-with-types)

## Reqquirements

Firefox (Quantum) 57 or later. Developed and tested in Firefox 58.

## How to use

* When browsing any web page:

Right-click the page. In the context menu, a new item will be displayed: "Copy page title and url". This command will copy the title of the current page and its URL to clipboard.

* When (some) text on the page is selected:

Right-click the selected text. In the context menu, a new item will be displayed: "Copy selection and url". This command will copy the selected text and the URL (but not the page title) to clipboard.

If you hold down the Shift key while clicking the menu item, the extension will copy the title of the page as well as the selected text and the URL.


## Author

Marek Jedliński
marek.jedlinski@gmail.com

