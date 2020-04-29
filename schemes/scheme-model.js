const db = require('../data/config')

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first()
}
function findSteps(id) {
    return db('schemes as sch')
        .join('steps as s', 'sch.id', 's.scheme_id')
        .where('sch.id', id)
        .select('sch.scheme_name', 's.step_number', 's.instructions').orderBy('step_number')
}
function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then (id => {
            return findById(id[0]);
        });
}
function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
}
function remove(id) {
    return db('schemes')
        .where({ id })
        .del()
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}