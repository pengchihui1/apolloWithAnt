import { gql } from '@apollo/client'

const WordType = /* GraphQL */gql`
  type Word{
      # uuid
      id: ID
      # 短id
      seqId: Int
      # 創建時間
      createdAt: date
      # 修改時間
      modifiedAt: Date
      # 刪除時間
      deletedAt: Date
      # 单词
      word:String
      # 日期
      word_data:Date
      # 翻译
      translation:String
      # 读音
      pronunciation:String
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

  input FilterTime{
      #開始時間
      startTime:Date
      #結束時間
      endTime:Date
  }

  input WordFilter {
      content: String
  }

  extend type Query {
    viewer: User
  }
  extend type Query {
      getWords:[Word]
      getWordsByTime(filter: FilterTime): [Word]
      getWordsByContent(filter: content): [Word]
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
module.exports = WordType
