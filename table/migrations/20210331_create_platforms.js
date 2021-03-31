exports.up=async (knex)=>{
    return knex.schema.createTable('platforms', function (table) {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
        table.increments('seq_id')
        table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('modified_at')
        table.timestamp('deleted_at')
        
        // 平台名称
        table.string('platform_name')
        // 是否用单词模组
        table.boolean('ishas_worldmodule').defaultTo(false)
    })
}

exports.down=async (knex)=>{
    // await knex.schema.dropTableIfExists('platforms')
}