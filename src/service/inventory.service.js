const _inventory = require("../model/inventory.model")

const InventoryService = {
    create: async (newInventory) => {
        const data = _inventory.create(newInventory)
        if(!data) return new Error()
        return data
    }
}