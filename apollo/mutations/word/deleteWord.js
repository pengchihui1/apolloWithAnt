import { deleteWord } from 'shared/db/models/words'

export default async (_parent, _args, _context, _info) => {
  const word = await deleteWord(_args.input.id)
  console.log(word)
  return word
}
