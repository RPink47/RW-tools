function setup() {
    setupCrafts()
    setupTable()
    document.getElementById('ItemSearch').value = ""
    input("")
}

// core code
//Handles input and search narrowing down
function input(searched) {
    var filtered = Item.list.map(item => item.name != "Food" && item.searched(searched.toLowerCase())).filter(item => item != false)

    list("FilteredItems", filtered)
};

//on item click event
function clicked(item) {
    if (mode == "ItemInfo") {
        setSelItem(item)
    } else {
        if (!available.some(e => e.item === item)) {
            available.push({ item: item, amount: 1 })
        }
    }
}
//sets selItem to Item and shows item desc and info
function setSelItem(newItem) {
    if (newItem instanceof Item) selItem = newItem
    else selItem = Item.list.find(item => item.name == newItem)
    
    if (selItem == null) {
        document.getElementById("selItemData").innerHTML = ""
    } else {
        document.getElementById("selItemData").innerHTML =
            '<h2>Selected item</h2><p id="Desc"></p><div><div class="half"><h2>How to craft</h2><ul id="CraftFrom"></ul></div><div class="half"><h2>Use it to craft</h2><ul id="CraftTo"></ul></div></div>'
        document.getElementById("Desc").innerHTML = `<a href="${selItem.wiki || ""}"><img src="${selItem.icon || ""}">${selItem.name}</a>`
        listCrafts()
        //scroll it into wiew
        document.getElementById("CraftFrom").scrollIntoView(true, { behavior: "smooth" });
    }
};
//filter the crafts possible with the item+list in html and how to create the item+list them in html
function listCrafts() {
    var filtered = Craft.list.filter(craft => (craft.a == selItem || craft.b == selItem));
    list('CraftTo', filtered.map(craft => 
        craft.display(craft.a.name.toLowerCase() != selItem.name.toLowerCase())
    ))

    var filtered = Craft.list.filter(craft => craft.out == selItem);
    list("CraftFrom", filtered.map(craft => craft.display()))
};

//lists every element of "value" in tag "ElId"
function list(ElId, array) {
    if (array.length > 0) {
        document.getElementById(ElId).innerHTML = "<li>" + array.join("</li><li>") + '</li>'
    } else {
        document.getElementById(ElId).innerHTML = "None :("
    }
}

function craftableFrom(available) {
    //makes var "states" and add default state
    var states = [{ paths: null, availableItems: available }]
    //for loop  loop through every state (even the ones added during looping)
    for (let state = 0; state < states.length; state++) {
        //gets the items of the current state
        var items = states[state].availableItems
        //filtering crafts so only the ones posible on the current state stay
        let filteredCrafts = Craft.list.filter(
            //some complexity in getting the variable "items" inside the lambda
            (function (items) {
                return recipe => items.includes(recipe.a) && items.includes(recipe.b);
            })(items));
        //make a new state for every craft
        filteredCrafts.forEach(recipe => {
            //shalow copy the array "items" to "tmp"
            let tmp = [...items]
            //delete the items used by the craft from the array "tmp"
            tmp.splice((tmp.findIndex(i => i == recipe.a)), 1)
            tmp.splice((tmp.findIndex(i => i == recipe.b)), 1)
            //add the item given by the craft to the array "tmp"
            tmp.push(recipe.out)
            //put the new state in the "states" array
            states.push({ paths: [{ recipe: recipe, from: state }], availableItems: tmp })
        });
    }
    return states
}

//set mode. Not much now
function setMode(newMode) {
    mode = newMode
}

//open and close modals
function modal(modal, show) {
    if (show) {
        document.getElementById(modal).showModal()
    } else {
        document.getElementById(modal).close()
    }
}