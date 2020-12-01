import { withAuthenticator } from "@aws-amplify/ui-react"
import React from "react"
import AppLayout from "../../src/AppLayout"
import AccountPageInner from "../../src/components/account-page"


const AccountPage: React.FunctionComponent = () => {

  return(
    <AppLayout>
      <AccountPageInner />
    </AppLayout>
  )
}

export default withAuthenticator(AccountPage)
