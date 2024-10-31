import { Table } from 'flowbite-react'
import SingleFileList from './singleFileList'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'


const RecentFile: React.FC = () => {
  // Get history from redux
  const history = useSelector((state: RootState) => state.printingState.value.history)

  return (
    <div
      style={{
        width: '100%',
        margin: 'auto'
      }}
    >
      <div className='relative overflow-x-auto'>
        <Table>
          <Table.Body className={`divide-y`}>
            {history.map((item) => (
              <SingleFileList
                fileName={item.fileName}
                updatedAt={item.updatedAt}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default RecentFile