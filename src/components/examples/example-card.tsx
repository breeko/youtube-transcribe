import { Card, Typography } from "antd"
import Link from "next/link"
import React from "react"

const { Paragraph } = Typography

interface ExampleCardProps {
  title: string
  image: string
  path: string
}

const ExampleCard: React.FunctionComponent<ExampleCardProps> = ({ title, image, path }) => {

  return (
    <Link href={path}>
      <Card
        hoverable
        cover={<img src={image} />}
        className="media-card"
        size="small"
      >
        <Paragraph>{title}</Paragraph>
      </Card>
    </Link>
  )
}

export default ExampleCard
