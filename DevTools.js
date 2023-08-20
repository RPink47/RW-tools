function makeItemList() {
    var out = []
    crafts.forEach(e => {
        out.push(e.a)
        out.push(e.b)
        out.push(e.out)
    });
    out = (uniq(out))
    out = out.map(e => e.split(" ").map(e => e.charAt(0).toUpperCase() + e.slice(1)))
    out = out.map(e => {
        return { name: e.join(" "), wiki: "https://rainworld.miraheze.org/wiki/" + (e.join("_")) }
    })
    console.log(out.map(e => JSON.stringify(e)).join(",\n"));
}
function JSONtoCrafts(input) {
    out = input.map(e => { return { a: e[0], b: e[1], out: e[2] } });
    out = out.map()
    console.log(out.map(e => JSON.stringify(e)).join(",\n"));
}

function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}