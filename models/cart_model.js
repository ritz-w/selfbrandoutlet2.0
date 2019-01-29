module.exports = function Cart(oldCart) {
    this.items = oldCart.items;
    this.totalQty = oldCart.totalQty;
    this.totalPrice = oldCart.totalPrice;

    this.findExisting = (item, id) => {
        let alreadyStoredItem = this.items[id]
        if (!!alreadyStoredItem) {
            console.log('the item was found')
            return alreadyStoredItem
        } else {
            console.log('the item wasnt found, created new entry')
            alreadyStoredItem = this.items[id] = {item: item, qty: 0, price: 0}
            return alreadyStoredItem
        }
    }
    this.add = (foundItem) => {
        foundItem.qty++;
        foundItem.price = foundItem.item.price * foundItem.qty;
        this.totalQty ++
        this.totalPrice += foundItem.item.price
        console.log('foundItem quantity is ' + foundItem.qty + ', foundItem price is ' + foundItem.price )
        console.log('total quantity is ' + this.totalQty + ', total price is' + this.totalPrice)
    }

    this.updateItem = (foundItem, id, addOrMinus) => {
        if (addOrMinus === "add") {
            foundItem.qty++;
            foundItem.price = foundItem.item.price * foundItem.qty;
            this.totalQty ++;
            this.totalPrice += foundItem.item.price
        } else if (addOrMinus === "minus") {
            foundItem.qty--;
            if (foundItem.qty <= 0) {
                this.removeItem(id)
            } else {
                foundItem.price = foundItem.item.price * foundItem.qty;
                this.totalQty --;
                this.totalPrice -= foundItem.item.price
            }
        } else {
            console.log("command not recoqnized")
        }
        console.log('updated item quantity is ' + foundItem.qty + ', updated price is ' + foundItem.price )
        console.log('updated total quantity is ' + this.totalQty + ', updated total price is' + this.totalPrice)
    }


    this.removeItem = (id) => {
        let foundItem = this.items[id]
        foundItem.price = foundItem.item.price * foundItem.qty;
        this.totalQty --;
        this.totalPrice -= foundItem.item.price
        delete this.items[id]
        console.log('item ' + id + ' deleted from cart')
    }


    this.generateArray = function() {
        let arr = [];
        for(let id in this.items) {
            arr.push(this.items[id])
        }
        return arr;
    }

}