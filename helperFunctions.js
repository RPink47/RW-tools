// helper function
function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true);
    });
}

function getCssStyle(selector) {
    const len = rules.length;
    for (let i = 0; i < len; i++) {
        if (rules[i].selectorText === selector) {
            return rules[i];
        }
    }
    return null;
}

function tableHower(highlight, css) {
    styleRule = getCssStyle(css)
    styleRule.style.backgroundColor = highlight ? 'rgb(117, 117, 117)' : ""
}

function insertHower(ruleName){
    return " onpointerenter='tableHower(true, \"" + ruleName + "\")' onpointerleave='tableHower(false, \"" + ruleName + "\")'"
}