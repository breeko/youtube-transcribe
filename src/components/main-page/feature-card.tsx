import { Col, Row, Image, Typography, Card, Divider } from "antd"
import React from "react"
import { BiBrain } from "react-icons/bi"

const { Title, Paragraph } = Typography

interface FeatureCardProps {
  image: JSX.Element
  title: string
  description: string | JSX.Element

}
const FeatureCard: React.FunctionComponent<FeatureCardProps> = ({title, description, image}) => {
  return(
    <Col xs={24} sm={12} md={6}>
      <Card className="feature-card" bordered={false}>
        {image}
        <Divider/>
        <Title level={4}>{title}</Title>
        <Paragraph type="secondary">{description}</Paragraph>
      </Card>
    </Col>
  )
}

export default FeatureCard
