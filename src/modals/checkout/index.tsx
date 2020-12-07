import { loadStripe, Stripe } from "@stripe/stripe-js"
import { Col, InputNumber, message, Modal, Row, Skeleton, Spin, Typography } from "antd"
import React from "react"
import { createStripeCheckoutSesssion, fetchStripeConfig, StripeConfig } from "../../utils/lambdaUtils"


interface CheckoutModalProps {
  onSuccess: () => void
  onCancel: () => void
}

const { Title, Paragraph } = Typography

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency = true
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100
  const total = Number.parseFloat((quantity * amount).toFixed(2))
  return numberFormat.format(total)
}


const CheckoutModal: React.FunctionComponent<CheckoutModalProps> = ({onSuccess, onCancel}) => {
  const [config, setConfig] = React.useState<StripeConfig>()
  const [sessionId, setSessionId] = React.useState<string>()
  const [stripe, setStripe] = React.useState<Stripe>()
  const [quantity, setQuantity] = React.useState(1)
  const [price, setPrice] = React.useState("")

  const handleComplete = () => {
    if (stripe && sessionId) {
      stripe.redirectToCheckout({ sessionId })
    }
  }

  const updateSession = (quantity: number) => {
    createStripeCheckoutSesssion({quantity, onSuccess: (s) => setSessionId(s), onError: (e) => message.error("Error loading session")})
  }

  React.useEffect(() => {
    updateSession(quantity)
  }, [quantity])


  React.useEffect(() => {
    fetchStripeConfig({onSuccess: c => {
      loadStripe(c.publicKey).then(s => setStripe(s) )
      setConfig(c)
    }, onError: () => message.error("Something went wrong")})
  }, [])

  React.useEffect(() => {
    if (config) {
      const p = formatPrice({amount: config.unitAmount, currency: config.currency, quantity})
      setPrice(p)
    }
    
  }, [config, quantity])

  return(
    <Modal visible={true} title="Add credits" onCancel={onCancel} onOk={handleComplete} >
      <Row>
        <Col xs={24}>
          {price === undefined ? <Skeleton/> : <Title level={2}>{price || "$10.00"}</Title>}
        </Col>
        <Col xs={16}>
          <Title level={3}>{(60 * quantity).toLocaleString()} credits</Title>
          <Paragraph type="secondary">({quantity} {quantity === 1 ? "hour" : "hours"} of transcription)</Paragraph>
        </Col>
        <Col xs={8}>
          <InputNumber min={1} step={1} max={100} value={quantity} onChange={(q: number) => setQuantity(q)} />
        </Col>
      </Row>
    </Modal>
  )
}

export default CheckoutModal
