import { editWordStatistic } from 'shared/db/models/word_statistics'

export default async (_parent, _args, _context, _info) => {
  const dbeditWordStatistic = await editWordStatistic(_args)
  return dbeditWordStatistic
}
