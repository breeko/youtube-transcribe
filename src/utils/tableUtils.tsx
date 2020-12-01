import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from "antd"
import React from "react"

export const getColumnSearchProps = (dataIndex: string, handleSearch: (s: string) => void) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >Search</Button>
        <Button onClick={() => handleSearch("")} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
})
