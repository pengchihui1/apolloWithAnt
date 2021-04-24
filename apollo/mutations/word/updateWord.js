import { editWord } from 'shared/db/models/words'

export default async (_parent, _args, _context, _info) => {
  // const {
  //   id,
  //   word,
  //   word_date,
  //   translation,
  //   pronunciation
  // }=_args
  const words = await editWord(_args)
  return words
}
