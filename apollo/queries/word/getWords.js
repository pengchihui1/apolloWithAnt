import { getWords } from 'shared/db/models/words'

export default async (_parent, _args, _context, _info) => {
  const words = await getWords()
  return words
}
