import { getWordSatistic } from 'shared/db/models/word_statistics'

export default async (_parent, _args, _context, _info) => {
  const {
    first,
    after,
    filter: {
      status = false
    }
  } = _args

  const dbWordSatistic = await getWordSatistic(_args)

  return dbWordSatistic
}
