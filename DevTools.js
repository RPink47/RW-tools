function makeItemList() {
    var out = []
    crafts.forEach(e => {
        out.push(e.a)
        out.push(e.b)
        out.push(e.out)
    });
    out = (uniq(out))
    out = out.map(e => e.split(" ").map(e => e.charAt(0).toUpperCase() + e.slice(1)))
    out = out.map(e => { return { name: e.join(" "), wiki: "https://rainworld.miraheze.org/wiki/".concat(e.join("_")) } })
    console.log(JSON.stringify(out));
}