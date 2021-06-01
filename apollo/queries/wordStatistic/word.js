import { getWordById } from 'shared/db/models/words'

export default async (_parent, _args, _context, _info) => {

  const word = await getWordById(_parent.word_id)

  return word
}
