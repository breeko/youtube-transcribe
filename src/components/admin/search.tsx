import { AutoComplete } from "antd"
import React from "react"

interface SearchProps {
  setSearch: (s: string) => void
  options?: Array<{value: string}>
}

const Search: React.FunctionComponent<SearchProps> = ({ options, setSearch }) => {
  return(
    <AutoComplete
      autoFocus
      style={{width: "100%"}}
      options={options}
      placeholder="Search"
      filterOption={(inputValue, option) =>
        option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
      }
      onSelect={s => setSearch(s)}
      onSearch={s => setSearch(s)}
    />
  )
}

export default Search
