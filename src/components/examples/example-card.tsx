import { Card, Typography } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const { Paragraph } = Typography

interface ExampleCardProps {
  title: string
  image: string
  path: string
}

const ExampleCard: React.FunctionComponent<ExampleCardProps> = ({ title, image, path }) => {
  const router = useRouter()
  return (
      <Card
        hoverable
        cover={<img src={image} />}
        className="media-card"
        size="small"
        onClick={() => router.push(path)}
      >
        <Paragraph>{title}</Paragraph>
      </Card>
  )
}

export default ExampleCard
