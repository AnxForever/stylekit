"use client";

import { useState } from "react";
import { InputOTP } from "@/components/ui/input-otp";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function InputOTPSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  return (
    <ComponentSection
      id="input-otp"
      title="Input OTP"
      description={t("components.inputOtp.description")}
    >
      <div className="space-y-6 max-w-md">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{t("components.inputOtp.sixDigit")}</p>
          <InputOTP
            length={6}
            value={value1}
            onChange={setValue1}
          />
          {value1 && (
            <p className="text-xs text-muted-foreground mt-2">
              {t("components.inputOtp.currentInput")}: {value1}
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">{t("components.inputOtp.fourDigit")}</p>
          <InputOTP length={4} value={value2} onChange={setValue2} />
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">{t("components.inputOtp.alphanumeric")}</p>
          <InputOTP
            length={6}
            type="alphanumeric"
            value={value3}
            onChange={setValue3}
          />
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">{t("components.inputOtp.mask")}</p>
          <InputOTP length={4} mask />
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">{t("components.inputOtp.error")}</p>
          <InputOTP length={4} error />
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">{t("components.inputOtp.disabled")}</p>
          <InputOTP length={4} disabled value="1234" />
        </div>
      </div>
      <PropsToggle
        component="InputOTP"
        expanded={!!expandedProps.InputOTP}
        onToggle={toggleProps}
      />
      <PropsPanel component="InputOTP" expanded={!!expandedProps.InputOTP} />
    </ComponentSection>
  );
}
