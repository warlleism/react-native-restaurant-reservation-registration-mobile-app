const { Model, DataTypes } = require('sequelize')

class Mesas extends Model {
    static init(sequelize) {
        super.init({
            numero: DataTypes.INTEGER,
            capacidade: DataTypes.INTEGER,
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING,
            id_restaurante: DataTypes.INTEGER,
        }, {
            sequelize,
            timestamps: false
        })
    }
}

module.exports = Mesas;