module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('Siswa', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kelas: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nilai: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        }
}, {
        tableName: 'Siswa',
    });
    return users;
}