var ColRuleMap = {}
var ItemRuleMap = {}

function setupTable() {
    //getting all items
    var itemsFrom = []
    var allItems = []
    Craft.list.forEach(craft => {
        itemsFrom.push(craft.a)
        allItems.push(craft.a)
    });
    Craft.list.forEach(craft => {
        itemsFrom.push(craft.b)
        allItems.push(craft.b)
    });
    Craft.list.forEach(craft => {
        allItems.push(craft.out)
    });
    itemsFrom = uniq(itemsFrom)
    allItems = uniq(allItems)
    //make a css class for every column
    itemsFrom.forEach(item => {
        let colRuleName = item.colRuleName
        sheet.insertRule(colRuleName + "{}");
        ColRuleMap[item.name] = { value: getCssStyle(colRuleName) }
    });
    //make a css class for every item
    allItems.forEach(item => {
        let itemRuleName = item.itemRuleName
        sheet.insertRule(itemRuleName + "{}");
        ItemRuleMap[item.name] = { value: getCssStyle(itemRuleName) }
    });
    // create the table
    let tableStructure = []
    let tableHeader = "<tr><td>I</td>" + (itemsFrom.map(item => "<td class='border " + item.colClassName + "'" +
        insertHower(item.itemRuleName, item.colRuleName)+ ">" +
        item.img(false) + "</td>")).join("") + "</tr>"
        
    tableStructure.push(tableHeader) //push table header

    itemsFrom.forEach( itemRow => { 
        let rowContent = []
        //push row header
        rowContent.push("<td class='border' "+insertHower(itemRow.itemRuleName)+">" + itemRow.img(false) + "</td>")
        //push rest of row
        itemsFrom.forEach(itemCell => rowContent.push(
            "<td class='highlight " + itemCell.colClassName + "' id='cell_" + itemCell.name + "_" + itemRow.name +
            "'" + insertHower(itemCell.colRuleName) + ">-</td>"
        ))
        tableStructure.push("<tr class='highlight"+insertHower(itemRow.itemRuleName)+"'>" + rowContent.join("") + "</tr>")
    })
    //finnal joining and insertion
    tableStructure = tableStructure.join("")
    document.getElementById("CraftsTable").innerHTML = tableStructure
    //edits each cell to contain the correct item
    Craft.list.forEach(craft => {
        document.getElementById(`cell_${craft.a.name}_${craft.b.name}`).innerHTML = craft.out.img()
        document.getElementById(`cell_${craft.b.name}_${craft.a.name}`).innerHTML = craft.out.img()
        document.getElementById(`cell_${craft.a.name}_${craft.b.name}`).classList.add(craft.out.itemClassName)
        document.getElementById(`cell_${craft.b.name}_${craft.a.name}`).classList.add(craft.out.itemClassName)
        document.getElementById(`cell_${craft.a.name}_${craft.b.name}`).setAttribute("onClick", "setSelItem('" + craft.out.name + "'); modal('ItemTableM',false)")
        document.getElementById(`cell_${craft.b.name}_${craft.a.name}`).setAttribute("onClick", "setSelItem('" + craft.out.name + "'); modal('ItemTableM',false)")
    })
}


