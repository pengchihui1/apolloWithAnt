const adminData = [
    {name: 'hui',password:'123456', email: 'hui@gmail.com', profile_photo: '' },
    {name: 'ming',password:'123456', email: 'ming@gmail.com', profile_photo: '' }
]

let adminUsers = []
const generateAdminUsers = (uuid) => {
  for (let adminIndex = 0; adminIndex < adminData.length; ++adminIndex) {
    adminUsers.push({
      ...adminData[adminIndex],
      id: uuid(),
      created_at: new Date()
    })
  }
  return adminUsers
}

module.exports = {
  adminData,
  adminUsers,
  generateAdminUsers
}