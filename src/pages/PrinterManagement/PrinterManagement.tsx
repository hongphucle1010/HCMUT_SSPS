import React, { useEffect, useState } from 'react'
import { createPrinterApi, getAllPrintersApi } from '../../api/printer'
import { Alert, Button, HR, Label, Select, Spinner, Table, Textarea, TextInput } from 'flowbite-react'
import { getAllLocationsApi } from '../../api/location'

const PrinterList: React.FC = () => {
  const [printers, setPrinters] = useState<PrinterWithLocation[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrinters = async () => {
    try {
      const response = await getAllPrintersApi()
      setPrinters(response.data)
      setLoading(false)
    } catch {
      setError('Failed to fetch printers')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrinters()
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <Spinner size='xl' aria-label='Loading printers' />
        <span className='ml-2'>Loading printers...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <Alert color='failure' withBorderAccent={true}>
          {error}
        </Alert>
        <Button onClick={fetchPrinters}>Retry</Button>
      </div>
    )
  }

  return (
    <div className='w-1/2 overflow-x-auto '>
      <h1 className='text-2xl font-bold mb-4'>Printer List</h1>
      {printers.length === 0 ? (
        <p>No printers available</p>
      ) : (
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Brand</Table.HeadCell>
            <Table.HeadCell>Model</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {printers.map((printer) => (
              <Table.Row key={printer.id} className='bg-white'>
                <Table.Cell>{printer.brand}</Table.Cell>
                <Table.Cell>{printer.model}</Table.Cell>
                <Table.Cell>{printer.description}</Table.Cell>
                <Table.Cell>
                  {printer.location.campusName}, {printer.location.buildingName}, Room {printer.location.roomNumber}
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-1 rounded ${
                      printer.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {printer.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  )
}

const AddingPrinter: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [printer, setPrinter] = useState<PrinterCreateParams>({
    brand: '',
    model: '',
    description: '',
    locationId: '',
    enabled: true
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all locations on component mount
  useEffect(() => {
    getAllLocationsApi()
      .then((response) => {
        setLocations(response.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch locations')
        setLoading(false)
      })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPrinter((prev) => ({ ...prev, [name]: value }))
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrinter((prev) => ({ ...prev, description: e.target.value }))
  }
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrinter((prev) => ({ ...prev, locationId: e.target.value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrinter((prev) => ({ ...prev, enabled: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPrinterApi(printer)
      alert('Printer added successfully!')
    } catch (err) {
      alert('Failed to add printer')
      console.error(err)
    }
  }

  if (loading) {
    return <p>Loading form...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <form onSubmit={handleSubmit} className='w-1/2 flex flex-col gap-4'>
      <h1 className='text-xl font-bold'>Add New Printer</h1>

      <div>
        <Label htmlFor='brand' value='Brand' />
        <TextInput
          id='brand'
          name='brand'
          type='text'
          placeholder='Enter printer brand'
          required
          value={printer.brand}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor='model' value='Model' />
        <TextInput
          id='model'
          name='model'
          type='text'
          placeholder='Enter printer model'
          required
          value={printer.model}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor='description' value='Description' />
        <Textarea
          id='description'
          name='description'
          placeholder='Enter printer description'
          required
          value={printer.description}
          rows={4}
          onChange={handleTextareaChange}
        />
      </div>

      <div>
        <Label htmlFor='locationId' value='Location' />
        <Select id='locationId' name='locationId' required value={printer.locationId} onChange={handleSelectChange}>
          <option value=''>Select location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.campusName}, {location.buildingName}, Room {location.roomNumber}
            </option>
          ))}
        </Select>
      </div>

      <div className='flex items-center gap-2'>
        <Label htmlFor='enabled'>Enabled</Label>
        <input
          id='enabled'
          name='enabled'
          type='checkbox'
          checked={printer.enabled}
          onChange={handleCheckboxChange}
          className='form-checkbox'
        />
      </div>

      <Button type='submit'>Add Printer</Button>
    </form>
  )
}

const PrinterManagement: React.FC = () => {
  return (
    <div>
      <h1 className='text-center font-bold text-2xl m-2'>Printer Management</h1>
      <HR className='m-0' />
      <div className='flex w-full p-4 gap-4'>
        <PrinterList />
        <AddingPrinter />
      </div>
    </div>
  )
}

export default PrinterManagement
