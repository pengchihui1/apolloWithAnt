exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  if (process.env.NODE_ENV === 'development') {
    await knex.raw(`
        DO
        $do$
        BEGIN
          IF NOT EXISTS (
              SELECT
              FROM   pg_catalog.pg_roles
              WHERE  rolname = 'admin') THEN
              CREATE ROLE admin LOGIN CREATEDB CREATEROLE REPLICATION SUPERUSER;
          END IF;
        END
        $do$;
      `)
  }

  await knex.schema.createTable('users', function (table) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('provider_id')
    table.string('fb_provider_id')
    table.string('google_provider_id')
    table.string('github_provider_id')
    table.string('github_username')
    table.string('username')
    table.string('name')
    table.string('description')
    table.string('website')
    table.string('email')
    table.string('profile_photo')
    table.boolean('is_admin')
    table.specificType('groups', 'text[]')
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
    table.timestamp('modified_at')
    table.timestamp('deleted_at')
  })
}

exports.down = async function (knex, Promise) {
  if (process.env.NODE_ENV === 'development') {
    await knex.raw('DROP ROLE admin')
  }

  await knex.schema.dropTableIfExists('users')
}
