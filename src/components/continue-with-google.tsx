import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"

interface ContinueWithGoogleProps extends React.ComponentProps<typeof Button> {
  className?: string
}

export function ContinueWithGoogle({
  className,
  ...props
}: ContinueWithGoogleProps) {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setError("")
    setIsLoading(true)

    try {
      const { error: signInError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      })

      if (signInError) {
        setError(signInError.message || "Failed to sign in with Google")
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Button
        type="button"
        variant="outline"
        className={cn("w-full", className)}
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        {...props}
      >
        <Image
          src="/google-color.svg"
          alt="Google"
          width={20}
          height={20}
          className="mr-2 shrink-0"
        />
        {isLoading ? "Signing in..." : "Continue with Google"}
      </Button>
      {error && (
        <div className="mt-2 text-sm text-red-500">{error}</div>
      )}
    </div>
  )
}

