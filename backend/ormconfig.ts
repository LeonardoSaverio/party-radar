export = {
  "type": "postgres",
  "host": process.env.DB_HOST || 'localhost',
  "port": process.env.DB_PORT || 5432,
  "username": process.env.DB_USERNAME || 'teste',
  "password": process.env.DB_PASS || 'teste',
  "database": process.env.DB_NAME || 'partyradar',
  "logging": false,
  "entities": [
    "src/models/*.ts"
  ],
  "migrations": [
    "src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}