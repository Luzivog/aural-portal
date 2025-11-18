import type { NextPageWithAuth } from "@/types/page-with-auth"

import ResetPasswordForm from "@/components/reset-password-form"

const ResetPasswordPage: NextPageWithAuth = () => {
  return <ResetPasswordForm />
}

ResetPasswordPage.auth = "unprotected"

export default ResetPasswordPage
