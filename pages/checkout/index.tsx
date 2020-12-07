import { Button, Result, Spin } from "antd"
import { useRouter } from "next/router"
import React from "react"
import AppLayout from "../../src/AppLayout"
import { getStripeCheckoutSesssion } from "../../src/utils/lambdaUtils"

const Checkout: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()

  React.useEffect(() => {
    const sessionId = router.asPath.match(/\?sessionId=([^&]+)/)?.[1]
    if (sessionId !== undefined) {
      window.history.replaceState(null, document.title, "/account")
      getStripeCheckoutSesssion({
        sessionId,
        onSuccess: () => { setIsLoading(false) },
        onError: () => router.push("/account")
      })
    } else {
      router.push("/account")
    }
  })

  return(
    <AppLayout>
      <Spin spinning={isLoading}>
        {!isLoading && <script
              dangerouslySetInnerHTML={{
                __html: `
                  gtag('event', 'conversion', {
                    'send_to': 'AW-956441070/TM06CMyG5OwBEO7DiMgD',
                    'transaction_id': ''
                  });`,
              }}
            />
        }
        <Result
          status="success"
          title="Successfully Purchased Deep-Chats Credits!"
          subTitle={<span>When you go to your accounts page, you should now see your credits applied to your balance</span>}
          extra={[
            <Button type="primary" key="console" onClick={() => router.push("/account")}>
              Go to Account
            </Button>
          ]}
        />,
      </Spin>
    </AppLayout>
  )
}

export default Checkout