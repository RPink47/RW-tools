class Item {

    static list = []

    static getItem(name) {
        return Item.list.filter( e => e.name == name)[0]
    }

    constructor(name, wiki = null, icon = null, alias = []){
        this.name = name
        this.itemClassName = "item_" + name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")
        this.itemRuleName = "." + this.itemClassName
        this.colClassName = "col_" + name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")
        this.colRuleName = "." + this.colClassName
        this.wiki = wiki
        this.icon = icon
        this.alias = alias
        Item.list.push(this)
    }

    img(){
        return `<span class='clickable' onclick='setSelItem("${this.name}")'><img src="${this.icon}"></span>`
    }

    searched(term){
        // returns null if it doesn't match, and the html to display if does
        var alias = null
        if (term.length < 3) {
            if (this.name.toLowerCase().startsWith(term.toLowerCase())) {
                return this.display()
            }
            alias = this.alias.find(alias => alias.toLowerCase().startsWith(term.toLowerCase()))
            if (alias) {
                return this.display(alias.toLowerCase())
            }
        } else {
            if (this.name.toLowerCase().includes(term.toLowerCase())) {
                return this.display()
            }
            alias = this.alias.find(alias => alias.toLowerCase().includes(term.toLowerCase()))
            if (alias) {
                return this.display(alias.toLowerCase())
            }
        }
        return null
    }

    display(text = null){
        let extra = this == selItem ? "" : ` class='clickable' onclick='setSelItem("${this.name}")'`
        if (text == null)
            return `<span${extra}><img src="${this.icon}">${this.name}</span>`
        else
            return `<span${extra}><img src="${this.icon}">${this.name}(${text})</span>`
    }
}

class Craft {

    static list = []

    constructor(a, b, out){
        this.a = a 
        this.b = b
        this.out = out
        Craft.list.push(this)
    }
}