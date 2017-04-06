module.exports = {
    port: process.env.PORT || 3000,
    db: {
        connectionUrl: process.env.DATABASE_URL || 'postgres://student:student@localhost/student'
    }
};
