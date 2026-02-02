"use client";

import { useState } from "react";
import { InputOTP } from "@/components/ui/input-otp";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function InputOTPSection({ expandedProps, toggleProps }: Props) {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  return (
    <ComponentSection
      id="input-otp"
      title="Input OTP"
      description="验证码输入组件，支持数字和字母数字模式"
    >
      <div className="space-y-6 max-w-md">
        {/* 基础用法 */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">6 位数字验证码</p>
          <InputOTP
            length={6}
            value={value1}
            onChange={setValue1}
            onComplete={(v) => console.log("Complete:", v)}
          />
          {value1 && (
            <p className="text-xs text-muted-foreground mt-2">
              当前输入: {value1}
            </p>
          )}
        </div>

        {/* 4 位验证码 */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">4 位验证码</p>
          <InputOTP length={4} value={value2} onChange={setValue2} />
        </div>

        {/* 字母数字模式 */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">字母数字混合</p>
          <InputOTP
            length={6}
            type="alphanumeric"
            value={value3}
            onChange={setValue3}
          />
        </div>

        {/* 遮罩模式 */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">密码遮罩</p>
          <InputOTP length={4} mask />
        </div>

        {/* 错误状态 */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">错误状态</p>
          <InputOTP length={4} error />
        </div>

        {/* 禁用状态 */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">禁用状态</p>
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
