"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import type { ServiceOption } from "@/components/forms/EnquiryForm";
import { ErrorSummary, FormError, FormSuccess, Honeypot, PrivacyNotice, SubmitButton, type SummaryItem } from "@/components/forms/FormParts";
import { useFormSubmission } from "@/components/forms/useFormSubmission";
import { CheckboxField } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input, Select } from "@/components/ui/Input";
import { callbackForm as copy, shared } from "@/content/forms";
import { callbackSchema, callbackTimes, type CallbackInput, type CallbackValues } from "@/lib/validation";

type CallbackFormProps = {
  whatsapp: string | null;
  idPrefix?: string;
  /** Used to pre-fill the topic when arriving from a service page (?service=slug) */
  services?: readonly ServiceOption[];
};

const FIELDS = ["name", "phone", "preferredTime", "topic", "consent"] as const;
type FieldName = (typeof FIELDS)[number];

export function CallbackForm({ whatsapp, idPrefix = "callback", services = [] }: CallbackFormProps) {
  const { register, handleSubmit, setValue, setError, setFocus, formState } = useForm<CallbackInput, unknown, CallbackValues>({
    resolver: zodResolver(callbackSchema),
    defaultValues: { name: "", phone: "", topic: "" },
    // The error summary takes focus instead (GOV.UK pattern)
    shouldFocusError: false,
  });
  const { errors } = formState;
  const { status, error, submit } = useFormSubmission("/api/callback");
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [summaryVersion, setSummaryVersion] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const lastValues = useRef<CallbackValues | null>(null);
  const id = (field: FieldName) => `${idPrefix}-${field}`;

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    const service = services.find((option) => option.slug === requested);
    if (service) setValue("topic", service.title);
  }, [services, setValue]);

  useEffect(() => {
    if (summaryVersion > 0) summaryRef.current?.focus();
  }, [summaryVersion]);

  const showSummary = (messages: Partial<Record<FieldName, string>>) => {
    setSummary(FIELDS.flatMap((field) => (messages[field] ? [{ field, id: id(field), message: messages[field] }] : [])));
    setSummaryVersion((version) => version + 1);
  };

  const onInvalid = (fieldErrors: FieldErrors<CallbackInput>) => {
    showSummary(Object.fromEntries(FIELDS.map((field) => [field, fieldErrors[field]?.message])) as Partial<Record<FieldName, string>>);
  };

  const send = async (values: CallbackValues) => {
    lastValues.current = values;
    setSummary([]);
    const result = await submit(values, honeypotRef.current?.value ?? "");
    if (!result.ok && result.fieldErrors) {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        if ((FIELDS as readonly string[]).includes(field)) setError(field as FieldName, { type: "server", message });
      }
      showSummary(result.fieldErrors as Partial<Record<FieldName, string>>);
    }
  };

  if (status === "success") {
    return <FormSuccess title={copy.success.title} body={copy.success.body} whatsapp={whatsapp} />;
  }

  return (
    <form
      noValidate
      onSubmit={(event) => void handleSubmit(send, onInvalid)(event)}
      className="relative flex flex-col gap-6"
      aria-describedby={`${idPrefix}-privacy`}
    >
      <ErrorSummary items={summary} summaryRef={summaryRef} onSelect={(field) => setFocus(field as FieldName)} />
      <Honeypot id={`${idPrefix}-website`} inputRef={honeypotRef} />

      <Field id={id("name")} label={copy.fields.name.label} required error={errors.name?.message}>
        {(control) => <Input autoComplete="name" maxLength={100} {...control} {...register("name")} />}
      </Field>
      <Field id={id("phone")} label={copy.fields.phone.label} required error={errors.phone?.message}>
        {(control) => <Input type="tel" autoComplete="tel" inputMode="tel" maxLength={25} {...control} {...register("phone")} />}
      </Field>
      <Field id={id("preferredTime")} label={copy.fields.preferredTime.label} required error={errors.preferredTime?.message}>
        {(control) => (
          <Select defaultValue="" {...control} {...register("preferredTime")}>
            <option value="" disabled>
              {shared.chooseOption}
            </option>
            {callbackTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <Field id={id("topic")} label={`${copy.fields.topic.label} ${shared.optional}`} hint={copy.fields.topic.hint} error={errors.topic?.message}>
        {(control) => <Input maxLength={200} {...control} {...register("topic")} />}
      </Field>

      <CheckboxField
        id={id("consent")}
        label={shared.consentLabel}
        required
        requiredText={shared.required}
        error={errors.consent?.message}
        {...register("consent")}
      />

      {status === "error" && error && (
        <FormError
          message={error}
          whatsapp={whatsapp}
          onRetry={() => {
            if (lastValues.current) void send(lastValues.current);
          }}
        />
      )}

      <div className="flex flex-col gap-4">
        <SubmitButton busy={status === "submitting"} label={copy.submit} />
        <div id={`${idPrefix}-privacy`}>
          <PrivacyNotice />
        </div>
      </div>
    </form>
  );
}
