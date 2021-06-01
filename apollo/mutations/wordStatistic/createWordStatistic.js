import { createWordStatistic } from 'shared/db/models/word_statistics'

export default async (_parent, _args, _context, _info) => {
  const dbWordStatistic = await createWordStatistic(_args)
  return dbWordStatistic
}
