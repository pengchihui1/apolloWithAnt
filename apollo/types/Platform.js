const Platform = /* GraphQL */ `
  type Platform{
    # uuid
    id: ID
    # 短id
    seqId: Int
    # 創建時間
    createdAt: Date
    # 修改時間
    modifiedAt: Date
    # 刪除時間
    deletedAt: Date
    #平台名称
    platformName:String
    #单词
    ishas_worldmodule:Boolean
  }

  input CreatePlatformInput{ 
    # 生效開始日期
    startAt: Date
    # 生效結束日期
    endAt: Date
    #平台名称
    platformName:String
  }

  input EditPlatformInput{
    # uuid
    PlatformId: String
    # 生效開始日期
    startAt: Date
    # 生效結束日期
    endAt: Date
  }

  input DeletePlatformInput{
    # uuid
    PlatformId: String
  }

  extend type Query {
    getPlatform(id: ID!): Platform
  }

  extend type Mutation {
    # 建立Platform
    createPlatform(input: CreatePlatformInput): Platform
    # 編輯Platform
    editPlatform(input: EditPlatformInput): Platform
    # 刪除Platform
    deletePlatform(input: DeletePlatformInput): Platform
  }

`
module.exports = Platform
