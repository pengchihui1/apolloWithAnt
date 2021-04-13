const Platform = /* GraphQL */ `
  type Word{
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
  }

  input PlatformFilter{ 
    # 開始時間
    startAt: Date
    # 結束時間
    endAt: Date
    # 搜索 日期 or 单词 or 翻译 or 语音
    search: String
  }

  input CreateWordInput{ 
    # 生效開始日期
    startAt: Date
    # 生效結束日期
    endAt: Date
    # 請假的用戶
  }

  input EditWordInput{
    # uuid
    WordId: String
    # 生效開始日期
    startAt: Date
    # 生效結束日期
    endAt: Date
  }

  input DeleteWordInput{
    # uuid
    id: String
  }

  extend type Query {
     getClsWords(clsId: String!, first: Int, after: Int, filter: WordFilter): WordsConnection
  }

  extend type Mutation {
      # 建立Word
      createWord(input: CreateWordInput): Word
      # 編輯Word
      editWord(input: EditWordInput): Word
      # 刪除Word
      deleteWord(input: DeleteWordInput): Word
  }

`
module.exports = Platform
