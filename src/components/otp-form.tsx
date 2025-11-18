"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type FormEvent,
} from "react";
import { useRouter } from "next/router";
import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useSessionContext } from "@/contexts/session-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type OTPIntent = "verify-email";

interface OTPFormProps extends ComponentProps<"div"> {
  email?: string;
  intent?: OTPIntent;
  redirectTo?: string;
}

const OTP_LENGTH = 6;

export function OTPForm({
  className,
  email,
  intent = "verify-email",
  redirectTo,
  ...props
}: OTPFormProps) {
  const router = useRouter();
  const { refetch } = useSessionContext();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const targetEmail = email ?? "";

  // Hard-coded default redirect: /dashboard
  const safeRedirect = useMemo(() => {
    if (redirectTo && redirectTo.startsWith("/")) {
      return redirectTo;
    }
    return "/dashboard";
  }, [redirectTo]);

  useEffect(() => {
    setOtp("");
    setError("");
    setSuccess("");
  }, [targetEmail, intent]);

  const disabled = !targetEmail || isSubmitting;

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (disabled) {
        setError("Missing email information. Go back and start again.");
        return;
      }

      if (otp.length !== OTP_LENGTH) {
        setError(`Enter the ${OTP_LENGTH}-digit code.`);
        return;
      }

      setIsSubmitting(true);
      setError("");
      setSuccess("");

      try {
        if (intent !== "verify-email") {
          throw new Error("Unsupported verification flow.");
        }

        const { error: verifyError } = await authClient.emailOtp.verifyEmail({
          email: targetEmail,
          otp,
        });

        if (verifyError) {
          throw verifyError;
        }

      
        refetch();

        setSuccess("Email verified! Redirecting you now...");
        
        router.replace(safeRedirect);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to verify code. Please try again.";
        setError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [disabled, otp, intent, targetEmail, router, safeRedirect, refetch]
  );

  const handleResend = useCallback(async () => {
    if (!targetEmail || isResending) return;
    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      const { error: resendError } =
        await authClient.emailOtp.sendVerificationOtp({
          email: targetEmail,
          type: "email-verification",
        });

      if (resendError) {
        throw resendError;
      }

      setSuccess("Sent a new code to your inbox.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to resend code. Please try again.";
      setError(message);
    } finally {
      setIsResending(false);
    }
  }, [targetEmail, isResending]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex flex-col items-center gap-2 font-medium">
                  <div className="flex size-10 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                  </div>
                </div>
                <h1 className="text-xl font-bold">Enter verification code</h1>
                <FieldDescription>
                  {targetEmail
                    ? `We sent a ${OTP_LENGTH}-digit code to ${targetEmail}`
                    : "Provide your email again to request a new code."}
                </FieldDescription>
              </div>

              {error && (
                <Field>
                  <div className="text-sm text-destructive text-center">
                    {error}
                  </div>
                </Field>
              )}

              {success && (
                <Field>
                  <div className="text-sm text-emerald-600 text-center">
                    {success}
                  </div>
                </Field>
              )}

              <Field>
                <FieldLabel htmlFor="otp" className="sr-only">
                  Verification code
                </FieldLabel>
                <InputOTP
                  maxLength={OTP_LENGTH}
                  id="otp"
                  value={otp}
                  onChange={setOtp}
                  required
                  disabled={disabled}
                  containerClassName="w-full justify-center gap-1 sm:gap-4"
                >
                  <InputOTPGroup className="gap-1 sm:gap-2.5 justify-center *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator className="hidden sm:inline" />
                  <InputOTPGroup className="gap-1 sm:gap-2.5 justify-center *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <FieldDescription className="text-center">
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    className="font-medium underline-offset-2 hover:underline"
                    onClick={handleResend}
                    disabled={!targetEmail || isResending}
                  >
                    {isResending ? "Sending..." : "Resend"}
                  </button>
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit" disabled={disabled} className="w-full">
                  {isSubmitting ? "Verifying..." : "Verify"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By continuing you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
