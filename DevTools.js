function makeItemList() {
    var out = []
    crafts.forEach(e => {
        out.push(e.a)
        out.push(e.b)
        out.push(e.out)
    });
    console.log(JSON.stringify((uniq(out)).map(e => { return { Name: e } })));
}

function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function linkItemsList() {
    var out = []
    items.forEach(e => {
        e.wiki = "https://rainworld.miraheze.org/wiki/".concat(e.Name.replace(" ","_"))
        out.push(e)
    })
    console.log(JSON.stringify(out));
}