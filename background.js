const REQUEST_TITLE = 'copy-title-url-to-clipboard';
const REQUEST_SELECTION = 'copy-selection-url-to-clipboard';

/* This extension creates two context menu items: one for the default case,
    and one to use when some text is selected on a web page. Only one of the
    two items is shown at a time, otherwise Firefox puts them in a submenu,
    which requires additional clicks to navigate.
*/

browser.contextMenus.create({
    id: REQUEST_TITLE,
    title: "Copy page title and url",
    contexts: ["page"],
});
browser.contextMenus.create({
    id: REQUEST_SELECTION,
    title: "Copy selection and url",
    contexts: ["selection"],
});
browser.contextMenus.onClicked.addListener((info, tab) => {
    let userRequest = false;
    let userRequestSelection = false;

    // see if any of our items was clicked, and if so, which one
    if (info.menuItemId === REQUEST_TITLE) {
        userRequest = true;
    } else if (info.menuItemId === REQUEST_SELECTION) {
        userRequest = true;
        userRequestSelection = true;
    }

    if (userRequest) {
        // not necessary but helps to indicate this is "our" data:
        const tabUrl = tab.url;
        const tabTitle = tab.title;

        // if selection exists and user pressed the Shift key, we set forceTitle to true,
        // meaning that title should be included in the copied text. Withbout Shift,
        // if selection is present, only selection and url are copied.
        const forceTitle = userRequestSelection && info.modifiers.includes('Shift');

        // what follows is Mozilla's dev magic for accessing the clipboard, since
        // as of January 2018 there is no clipboard API available to extensions yet:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1197451

        // clipboard-helper.js defines function copyToClipboard.
        const code = "copyToClipboard(" +
            JSON.stringify(tabUrl) + ", " +
            JSON.stringify(tabTitle) + ", " +
            forceTitle +
            ");";

        browser.tabs.executeScript({
            code: "typeof copyToClipboard === 'function';",
        }).then((results) => {
            // The content script's last expression will be true if the function
            // has been defined. If this is not the case, then we need to run
            // clipboard-helper.js to define function copyToClipboard.
            if (!results || results[0] !== true) {
                return browser.tabs.executeScript(tab.id, {
                    file: "clipboard-helper.js",
                });
            }
        }).then(() => {
            return browser.tabs.executeScript(tab.id, {
                code,
            });
        }).catch((error) => {
            // This could happen if the extension is not allowed to run code in
            // the page, for example if the tab is a privileged page.
            console.error("Failed to copy text: " + error);
        });
    }
});

