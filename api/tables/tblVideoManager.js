const Sequelize = require('sequelize');

module.exports = function (db) {
    var table = db.define('tblVideoManager', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.STRING,
        ViewVideo: Sequelize.INTEGER,
        Likes: Sequelize.INTEGER,
        Title: Sequelize.STRING,
        CreateDate: Sequelize.DATE,
        EditDate: Sequelize.DATE,
        Type: Sequelize.STRING,
        Duration: Sequelize.FLOAT,
        Status: Sequelize.STRING,
        IDChanel: Sequelize.BIGINT,

    });

    return table;
}