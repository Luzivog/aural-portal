import type { NextPageWithAuth } from "@/types/page-with-auth"

import ForgotPasswordForm from "@/components/forgot-password"

const ForgotPasswordPage: NextPageWithAuth = () => {
  return <ForgotPasswordForm />
}

ForgotPasswordPage.auth = "unprotected"

export default ForgotPasswordPage
