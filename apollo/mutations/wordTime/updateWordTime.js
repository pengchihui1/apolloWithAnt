import { updateWordTime } from 'shared/db/models/word_time'

export default async (_parent, _args, _context, _info) => {
  console.log('3545', _args)
  const wordTime = await updateWordTime(_args)
  return wordTime
}
