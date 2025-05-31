"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    name: "Guru 1",
                    email: "guru1@gmail.com",
                    password: "password123",
                    role: "guru",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Siswa 1",
                    email: "siswa1@gmail.com",
                    password: "password123",
                    role: "siswa",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};