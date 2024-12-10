'use client'
import { Button } from './button'
import { Input } from './input'
import { Select } from './select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { useOrders } from './useOrders'
const statusOptions = ['All', 'Pending', 'Completed']
export default function OrderManagement() {
  const { orders, isLoading, search, setSearch, statusFilter, setStatusFilter, updateOrderStatus } = useOrders()

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Quản lý đơn in</h1>
      <div className='flex gap-4 mb-4'>
        <Input
          type='text'
          placeholder='Search by Student ID or File Name'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-grow'
        />
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className='w-48'>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Pages</TableHead>
              <TableHead>Double Sided</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className='text-center'>
                  Loading...
                </TableCell>
              </TableRow>
            ) : orders.length > 0 ? (
              orders.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.studentId}</TableCell>
                  <TableCell>{log.fileName}</TableCell>
                  <TableCell>{log.startTime.toLocaleString()}</TableCell>
                  <TableCell>{log.endTime ? log.endTime.toLocaleString() : 'N/A'}</TableCell>
                  <TableCell>{log.numPages}</TableCell>
                  <TableCell>{log.isDoubleSided ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{log.copies}</TableCell>
                  <TableCell>
                    {!log.endTime && (
                      <Button variant='outline' size='sm' onClick={() => updateOrderStatus(log.id)}>
                        Complete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className='text-center'>
                  No printing logs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
