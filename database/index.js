const Sequelize = require('sequelize');
const config = require('../config');

class Database {
    constructor() { }

    async connect() {
        const sequelize = await new Sequelize(config.mysql.options);

        await sequelize.authenticate()
        .then(() => {
            console.info("Successfully connected to database " + config.mysql.options.database + ".");
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
        
        this.sync(sequelize);

        return sequelize;
    }

    // https://github.com/sequelize/express-example borrowed structure from here
    async sync(sequelize) {
        const modelDefiners = [
            require('./models/guild.model'),
            require('./models/category_set.model'),
            require('./models/category.model'),
            require('./models/role_channel.model'),
            require('./models/role_menu.model'),
            require('./models/role.model'),
            require('./models/unit.model'),
        ];

        for (const modelDefiner of modelDefiners) {
            modelDefiner(sequelize);
        }

        const { guild, category_set, category, role_channel, role_menu, role, unit } = sequelize.models;

        // Define associations here
        guild.hasMany(category_set);//, { as: "guild_id" });

        category_set.hasMany(category);//, { as: "category_set_id" });

        guild.hasMany(role_channel);//, { as: "guild_id" });

        role_channel.hasMany(role_menu);//, { as: "role_channel_id" });

        role_menu.hasMany(role);//, { as: "role_menu_id" });

        category_set.hasMany(unit);//, { as: "category_set_id" });
        unit.belongsTo(role);//, { as: "role_id" }); // this is not defining correctly, at least i think, it's doing 1:m not 1:1

        sequelize.sync({force: config.mysql.force});
    }
}

module.exports = Database;