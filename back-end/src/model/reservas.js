const { Model, DataTypes } = require('sequelize')

class Reservas extends Model {
    static init(sequelize) {
        super.init({
            id_usuario: DataTypes.INTEGER,
            id_mesa: DataTypes.INTEGER,
            id_restaurante: DataTypes.INTEGER,
            data: DataTypes.DATE,
            hora: DataTypes.TIME,
            data: DataTypes.STRING,
            quantidade_pessoas: DataTypes.INTEGER,
        }, {
            sequelize,
            timestamps: false
        })
    }
}

module.exports = Reservas;