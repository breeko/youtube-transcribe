import { Card, Col, Divider, Row, Typography, Space, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import React from "react"
import { render } from "react-dom"
import { FiCheckCircle, FiCircle } from "react-icons/fi"


const { Title, Paragraph } = Typography
interface FeatureColumn {
  key: string
  feature: string
  free: boolean | string | JSX.Element
  standard: boolean | string | JSX.Element
  professional: boolean | string | JSX.Element
}

const Pricing: React.FunctionComponent = () => {
  const prices = [
    {
      key: "1",
      feature: "No credit card required",
      free: true,
      standard: false,
      professional: false
    },
    {
      key: "2",
      feature: "Support most video and audio formats",
      free: true,
      standard: true,
      professional: true
    },
    {
      key: "3",
      feature: "Support YouTube",
      free: true,
      standard: true,
      professional: true
    },
    {
      key: "4",
      feature: "First minute free",
      free: true,
      standard: true,
      professional: true
    },
    {
      key: "5",
      feature: "Partial audio transcription",
      free: true,
      standard: true,
      professional: true
    },
    {
      key: "6",
      feature: "Edit transcripts",
      free: true,
      standard: true,
      professional: true
    },
    {
      key: "7",
      feature: "Export transcripts to text or html",
      free: true,
      standard: true,
      professional: true
    },
    {
      key: "8",
      feature: "Unlimited audio length",
      free: false,
      standard: true,
      professional: true
    },
    {
      key: "9",
      feature: "Email support",
      free: false,
      standard: true,
      professional: true,
    },
    {
      key: "10",
      feature: "Phone Support",
      free: false,
      standard: true,
      professional: true
    },

    {
      key: "11",
      feature: "Languages supported",
      free: "30+",
      standard: "30+",
      professional: "30+",
    },
    {
      key: "12",
      feature: "File size limit",
      free: "250 MB",
      standard: "250 MB",
      professional: "250+ MB",
    },
    {
      key: "13",
      feature: "Billing",
      free: "-",
      standard: "Prepaid, charged by fraction of a minute",
      professional: "Custom",
    },
    {
      key: "14",
      feature: "Price",
      free: "Free",
      standard: "$10 per hour (first minute free)",
      professional: <a href="mailto:sales@deep-chats.com">Contact</a>
    },
  
  ]

  const columns: ColumnsType<FeatureColumn> = [
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: "Free",
      dataIndex: "free",
      key: "free",
      render: val => typeof val === "boolean" ?
        val ? <FiCheckCircle color={"green"} /> : <FiCircle /> : val,
      align: "center"
    },
    {
      title: "Standard",
      dataIndex: "standard",
      key: "standard",
      render: val => typeof val === "boolean" ?
        val ? <FiCheckCircle color={"green"} /> : <FiCircle /> : val,
      align: "center"
    },
    {
      title: "Professional",
      dataIndex: "professional",
      key: "professional",
      render: val => typeof val === "boolean" ?
        val ? <FiCheckCircle color={"green"} /> : <FiCircle /> : val,
      align: "center"
    },
  ]

  return(
    <Space direction="vertical">
      <Title level={2}>Pricing</Title>
      <Table dataSource={prices} columns={columns} pagination={false}/>
    </Space>
  )
}

export default Pricing
