/* This is where actually copy page title and url to clipboard.

    pageUrl: string; the url of the page where the copy command was issued
    pageTitle: string; the title of the page
    forceTitle: if selection is available, copy page title as well as selection and url
        (by default, title is not copied if we have selection).
        This parameter is ignored if selection is not available.
*/

function copyToClipboard(pageUrl, pageTitle, forceTitle) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();

        let clipboardData = pageTitle + '\n' + pageUrl;

        // if we have selection, use it instead of pageTitle
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            clipboardData = selectedText + '\n' + pageUrl;
            if (forceTitle) {
                clipboardData = pageTitle + '\n' + clipboardData;
            }
        }

        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain", clipboardData);
    }
    document.addEventListener("copy", oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
}
