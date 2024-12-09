import { Table } from 'flowbite-react'
import SingleFileList from './singleFileList'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'

const RecentFile: React.FC = () => {
  // Get history from redux
  const history = useSelector((state: RootState) => state.printingState.value.history).slice(0, 5)

  return (
    <div
      style={{
        width: '100%',
        margin: 'auto'
      }}
    >
      <div className='relative overflow-x-hidden'>
        <Table>
          <Table.Body className={`divide-y`}>
            {history.map((item) => (
              <SingleFileList
                key={item.id} // Use unique ID as key
                fileName={item.fileName}
                updatedAt={item.createdAt.toLocaleString()} // Format Date to string for display
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default RecentFile
