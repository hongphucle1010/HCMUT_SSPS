import React from 'react'
import { Input } from 'antd'
import type { GetProps } from 'antd'

const SearchBar: React.FC = () => {
  type SearchProps = GetProps<typeof Input.Search>
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  const { Search } = Input
  return (
    <div>
      <Search placeholder='Search' allowClear onSearch={onSearch} style={{ width: '100%' }} />
    </div>
  )
}

export default SearchBar
