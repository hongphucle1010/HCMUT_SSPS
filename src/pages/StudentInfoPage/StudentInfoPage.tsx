import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'
import { getStudentApi, updateStudentPageBalanceApi } from '../../api/user/student'
import { Button, Card } from 'flowbite-react'

const StudentInfoPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value)
  const [fullInfo, setFullInfo] = useState<StudentInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getStudentApi(user.id).then((response) => {
      setFullInfo(response.data)
    })
  }, [user.id])

  const handleAddBalance = async () => {
    if (!fullInfo) return

    setLoading(true)
    setError(null)

    try {
      const updatedBalance = fullInfo.printBalance + 30 // Add 30 pages to balance
      const response = await updateStudentPageBalanceApi(fullInfo.id, updatedBalance)
      setFullInfo((prev) => prev && { ...prev, printBalance: response.data.printBalance }) // Update balance in state
    } catch {
      setError('Failed to update print balance.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className='text-center font-bold text-2xl mt-2'>Settings</h1>
      {fullInfo && (
        <div className='text-center'>
          <div className='max-w-sm mx-auto'>
            <Card>
              <p className='text-gray-700'>
                <strong>Name:</strong> {fullInfo.name}
              </p>
              <p className='text-gray-700'>
                <strong>Username:</strong> {fullInfo.username}
              </p>
              <p className='text-gray-700'>
                <strong>Print Balance:</strong> {fullInfo.printBalance}
              </p>
              <div className='flex justify-center'>
                <Button onClick={handleAddBalance} disabled={loading}>
                  {loading ? 'Updating...' : 'Add 30 Pages'}
                </Button>
                {error && <p className='text-red-500'>{error}</p>}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentInfoPage
