import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../useContext'

const Dashboard = () => {

  const userContext = useContext(UserContext)

  return (
    <div>
      {userContext.user.currentUserName}
    </div>
  )
}

export default Dashboard