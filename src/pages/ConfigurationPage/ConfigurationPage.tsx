import React, { useEffect, useState } from 'react'
import { TextInput, Label, Button, Spinner } from 'flowbite-react'
import { getConfigurationsApi, updateConfigurationsApi } from '../../api/configurations/configurations' // Adjust the path as necessary

const ConfigurationPage: React.FC = () => {
  const [configurations, setConfigurations] = useState<Configurations | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<boolean>(false)

  // Fetch configurations on mount
  const fetchConfigurations = async () => {
    setLoading(true)
    try {
      const response = await getConfigurationsApi()
      setConfigurations(response.data)
    } catch {
      setError('Failed to fetch configurations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfigurations()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setConfigurations((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleFileTypeChange = (index: number, value: string) => {
    setConfigurations((prev) => {
      if (!prev) return prev
      const updatedFileTypes = [...prev.fileTypes]
      updatedFileTypes[index] = { ...updatedFileTypes[index], type: value }
      return { ...prev, fileTypes: updatedFileTypes }
    })
  }

  const handleAddFileType = () => {
    setConfigurations((prev) => {
      if (!prev) return prev
      const newFileType: FileType = {
        id: '', // Assign a unique ID or leave empty
        type: '',
        configId: prev.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      return { ...prev, fileTypes: [...prev.fileTypes, newFileType] }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!configurations) return

    setUpdating(true)
    setError(null)

    const updatedConfig: ConfigUpdateParams = {
      id: configurations.id,
      defaultPageBalance: configurations.defaultPageBalance,
      semesterStartDate: new Date(configurations.semesterStartDate),
      fileTypes: configurations.fileTypes
        .filter((fileType) => fileType.type !== '') // Filter out blank file types
        .map((fileType) => ({
          type: fileType.type,
          configId: fileType.configId
        }))
    }

    try {
      await updateConfigurationsApi(updatedConfig)
      alert('Configurations updated successfully!')
    } catch {
      setError('Failed to update configurations')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <Spinner size='lg' />

  if (error) return <p>{error}</p>

  if (!configurations) return null

  return (
    <div className='w-full md:w-1/2 mx-auto mt-8'>
      <h1 className='text-2xl font-bold mb-4'>Configuration Settings</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
          <Label htmlFor='defaultPageBalance' value='Default Page Balance' />
          <TextInput
            id='defaultPageBalance'
            name='defaultPageBalance'
            type='number'
            required
            value={configurations.defaultPageBalance}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor='semesterStartDate' value='Semester Start Date' />
          <TextInput
            id='semesterStartDate'
            name='semesterStartDate'
            type='date'
            required
            value={new Date(configurations.semesterStartDate).toISOString().split('T')[0]}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor='fileTypes' value='File Types' />
          {configurations.fileTypes.map((fileType, index) => (
            <div key={index} className='flex gap-2 items-center mb-2'>
              <TextInput
                type='text'
                value={fileType.type}
                onChange={(e) => handleFileTypeChange(index, e.target.value)}
              />
            </div>
          ))}
          <Button onClick={handleAddFileType} type='button'>
            Add New File Type
          </Button>
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <Button type='submit' disabled={updating}>
          {updating ? 'Updating...' : 'Update Configurations'}
        </Button>
      </form>
    </div>
  )
}

export default ConfigurationPage
