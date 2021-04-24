import { createUser } from 'shared/db/models/users'

export default async (_parent, _args, _context, _info) => {
  // name:String
  // possword:String
  // email:String
  // isAdmin:Boolean
  const User = await createUser(_args)
  return User
}
