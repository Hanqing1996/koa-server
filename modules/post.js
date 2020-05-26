const {Sequelize, client} = require('../services/sequelize');

const {DataTypes,Op} = Sequelize;

const Model = client.define('post', {
    title: DataTypes.STRING(128),
    content: DataTypes.TEXT,
});

Model.sync();

const list = async ({limit}) => {
    const results = await Model.findAll({
        attributes:['id','title'],
        limit,
    });
    return {
        posts: results.map(r => r.dataValues)
    }
};

const create = async (post) => {
    const created = await Model.create(post);
    return created;
};

const getOneById = async (id) => {
    const found = await Model.findOne({where:{
            id:{
                [Op.eq]:id
            }
        }});
    return found;
};

module.exports = {
    Model,
    list,
    create,
    getOneById
};