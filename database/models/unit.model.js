const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("unit", {
        unit_id: {
            field: "unit_id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
        },
        unit_name: {
            field: "unit_name",
            type: DataTypes.STRING
        },
        channel_id: {
            field: "channel_id",
            type: DataTypes.INTEGER,
        }
    });
};