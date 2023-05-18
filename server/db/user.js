const knex = require('./connection');

module.exports.getOne = async function(id){
    return await knex('users').select().where('id', id);
};

module.exports.getAll = async function(){
    return await knex('users').select();
};

module.exports.getByEmail = async function(email) {
    return await knex('users').select().where('email', email);
},

module.exports.create = async function(user) {
    const ids = await knex('users').insert(user).returning('id');
    return ids[0].id;
}