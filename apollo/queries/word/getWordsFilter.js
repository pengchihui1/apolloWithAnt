import { getLimitWords } from 'shared/db/models/words'

export default async (_parent, _args, _context, _info) => {
  const {
    first = 10,
    after = 0,
    filter = {}
  } = _args
  console.log(filter)

  const dbWords = await getLimitWords(_args)

  if (!dbWords || !dbWords.length) {
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
      hasNextPage: dbWords && dbWords.length >= first
    },
    edges: dbWords.map(async (word, i) => {
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
