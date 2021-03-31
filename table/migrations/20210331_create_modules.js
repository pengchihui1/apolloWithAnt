exports.up=async (knex)=>{
    return knex.schema.createTable('modules', function (table) {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
        table.increments('seq_id')
        table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('modified_at')
        table.timestamp('deleted_at')
        
        // 模组名称
        table.string('module_name')
    })
}

exports.down=async (knex)=>{
    await knex.schema.dropTableIfExists('modules')
}