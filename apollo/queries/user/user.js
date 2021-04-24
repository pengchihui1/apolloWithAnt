import { getUser } from 'shared/db/models/users'

export default async (_parent, _args, _context, _info) => {
  // const {
  //   id = null,
  //   search = {
  //      name,
  //      password,
  //      email,
  //      isAdmin
  //   }
  // } = _args
  const user = getUser(_args)
  return user
}
