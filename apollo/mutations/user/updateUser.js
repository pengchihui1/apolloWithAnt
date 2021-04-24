import { updateUser } from 'shared/db/models/users'

export default async (_parent, _args, _context, _info) => {
  const words = await updateUser(_args)
  return words
}
