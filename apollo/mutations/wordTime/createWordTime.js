import { creatWordTime } from 'shared/db/models/word_time'

export default async (_parent, _args, _context, _info) => {
  const wordTime = await creatWordTime(_args)
  return wordTime
}
