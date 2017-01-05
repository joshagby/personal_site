// html string builder function, takes in html tag, html text, and tag attributes
// attrs is a JSON (dictionary) of attributes of the form:
// { id : someElement, class : someClass }
// returns new html tag element in string format
function buildHTML(tag, html, attrs){
    // you can skip html param
    if (typeof(html) != 'string') {
        attrs = html;
        html = null;
    }
    var h = '<' + tag;
    for (var attr in attrs) {
        if(attrs[attr] === false) continue;
        h += ' ' + attr + '="' + attrs[attr] + '"';
    }
    return h += html ? ">" + html + "</" + tag + ">" : "/>";
}
// ----------------------------------------