import { getWordSatistic } from 'shared/db/models/word_statistics'

export default async (_parent, _args, _context, _info) => {
  const {
    first,
    after,
    filter: {
      status = true
    }
  } = _args

  const dbWordSatistic = await getWordSatistic(_args)

  if (!dbWordSatistic || !dbWordSatistic.length) {
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
      hasNextPage: dbWordSatistic && dbWordSatistic.length >= first
    },
    edges: dbWordSatistic.map(async (wordSatistic, i) => {
      return {
        node: {
          ...wordSatistic
        },
        // offset
        cursor: i + after + 1
      }
    })
  }
}
