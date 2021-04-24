import { deleteUser } from 'shared/db/models/users'

export default async (_parent, _args, _context, _info) => {
  const user = await deleteUser(_args)
  return user
}
