import { deleteWordTime } from 'shared/db/models/word_time'

export default async (_parent, _args, _context, _info) => {
  const words = await deleteWordTime(_args)
  return words
}
