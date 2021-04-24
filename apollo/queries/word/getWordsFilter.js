import { getLimitWords } from 'shared/db/models/words'

export default async (_parent, _args, _context, _info) => {
  const {
    filter = {},
    first = 20,
    after = 0
  } = _args

  const wordList = await getLimitWords({ first, after, filter })

  if (!wordList || !wordList.length) {
    return {
      pageInfo: {
        count: 0,
        hasNextPage: false
      },
      edges: []
    }
  }

  return {
    pageInfo: {
      hasNextPage: wordList && wordList.length >= first
    },
    edges: wordList.map(async (word, i) => {
      return {
        node: {
          ...word
        },
        // offset
        cursor: i + after + 1
      }
    })
  }
}
