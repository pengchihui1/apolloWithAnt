import { getWordsByDate } from 'shared/db/models/words'

export default async (_parent, _args, _context, _info) => {
  const words = await getWordsByDate(_args)
  return words
}
