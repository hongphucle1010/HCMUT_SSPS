import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'
import { getStudentApi } from '../../api/user/student'

const StudentInfoPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value)
  const [fullInfo, setFullInfo] = React.useState<StudentInfo | null>(null)
  useEffect(() => {
    getStudentApi(user.id).then((response) => {
      setFullInfo(response.data)
    })
  }, [])
  return (
    <div>
      <h1>Student Info Page</h1>
      <p>Username: {fullInfo?.username}</p>
      <p>Id: {fullInfo?.id}</p>
      <p>Print Balance: {fullInfo?.printBalance}</p>
    </div>
  )
}

export default StudentInfoPage
