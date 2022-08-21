module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Products", [
            {
                name: "Kaos Partai",
                price: 45000,
                stock: 100,
                category_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Kemeja Lengan pendek",
                price: 95000,
                stock: 100,
                category_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Celana jeans",
                price: 125000,
                stock: 100,
                category_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Celana Pendek Army",
                price: 110000,
                stock: 100,
                category_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
           
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Products", null, {})
    }
}