import { getLimitWordTime } from 'shared/db/models/word_time'

export default async (_parent, _args, _context, _info) => {
  const {
    first = 20,
    after = 0
  } = _args
  const wordTimeList = await getLimitWordTime({ first, after })
  return wordTimeList
}
