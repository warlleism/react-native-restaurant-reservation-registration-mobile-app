const { Model, DataTypes } = require("sequelize");

class Restaurantes extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        aberto: DataTypes.STRING,
        horarioSem: DataTypes.STRING,
        horarioFimSem: DataTypes.STRING,
        img1: DataTypes.STRING,
        img2: DataTypes.STRING,
        img3: DataTypes.STRING,
        img4: DataTypes.STRING,
        img5: DataTypes.STRING,
        descricao: DataTypes.STRING,
        capacidade_maxima_reservas: DataTypes.INTEGER,
      },
      {
        sequelize,
        timestamps: false,
      }
    );
  }
}

module.exports = Restaurantes;
