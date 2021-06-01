import { editWord } from 'shared/db/models/words'

export default async (_parent, _args, _context, _info) => {
  // const {
  //   id,
  //   word,
  //   word_date,
  //   translation,
  //   pronunciation
  // }=_args
  
  const word = await editWord(_args)
  return word
}
