"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { ErrorSummary, FormError, FormSuccess, Honeypot, PrivacyNotice, SubmitButton, type SummaryItem } from "@/components/forms/FormParts";
import { useFormSubmission } from "@/components/forms/useFormSubmission";
import { CheckboxField } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { enquiryForm as copy, shared } from "@/content/forms";
import {
  businessTypes,
  enquirySchema,
  NOT_SURE,
  turnoverBands,
  type EnquiryInput,
  type EnquiryValues,
} from "@/lib/validation";

export type ServiceOption = { slug: string; title: string };

type EnquiryFormProps = {
  services: readonly ServiceOption[];
  whatsapp: string | null;
  idPrefix?: string;
};

/** Field order, used for the error summary */
const FIELDS = ["name", "email", "phone", "businessName", "businessType", "annualTurnover", "serviceNeeded", "message", "consent"] as const;
type FieldName = (typeof FIELDS)[number];

export function EnquiryForm({ services, whatsapp, idPrefix = "enquiry" }: EnquiryFormProps) {
  const slugs = useMemo(() => services.map((service) => service.slug), [services]);
  const schema = useMemo(() => enquirySchema(slugs), [slugs]);
  const { register, handleSubmit, setValue, setError, setFocus, formState } = useForm<EnquiryInput, unknown, EnquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", businessName: "", annualTurnover: "", serviceNeeded: "", message: "" },
    // The error summary takes focus instead (GOV.UK pattern)
    shouldFocusError: false,
  });
  const { errors } = formState;
  const { status, error, submit } = useFormSubmission("/api/enquiry");
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [summaryVersion, setSummaryVersion] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const lastValues = useRef<EnquiryValues | null>(null);
  const id = (field: FieldName) => `${idPrefix}-${field}`;

  // Pre-select the service when arriving from a service page (/contact?service=payroll)
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && slugs.includes(requested)) setValue("serviceNeeded", requested);
  }, [setValue, slugs]);

  // Move focus to the error summary each time it is (re)shown
  useEffect(() => {
    if (summaryVersion > 0) summaryRef.current?.focus();
  }, [summaryVersion]);

  const showSummary = (messages: Partial<Record<FieldName, string>>) => {
    setSummary(FIELDS.flatMap((field) => (messages[field] ? [{ field, id: id(field), message: messages[field] }] : [])));
    setSummaryVersion((version) => version + 1);
  };

  const onInvalid = (fieldErrors: FieldErrors<EnquiryInput>) => {
    showSummary(Object.fromEntries(FIELDS.map((field) => [field, fieldErrors[field]?.message])) as Partial<Record<FieldName, string>>);
  };

  const send = async (values: EnquiryValues) => {
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

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-6">
        <Field id={id("name")} label={copy.fields.name.label} required error={errors.name?.message}>
          {(control) => <Input autoComplete="name" maxLength={100} {...control} {...register("name")} />}
        </Field>
        <Field id={id("email")} label={copy.fields.email.label} required error={errors.email?.message}>
          {(control) => <Input type="email" autoComplete="email" inputMode="email" maxLength={254} {...control} {...register("email")} />}
        </Field>
        <Field id={id("phone")} label={`${copy.fields.phone.label} ${shared.optional}`} error={errors.phone?.message}>
          {(control) => <Input type="tel" autoComplete="tel" inputMode="tel" maxLength={25} {...control} {...register("phone")} />}
        </Field>
        <Field id={id("businessName")} label={`${copy.fields.businessName.label} ${shared.optional}`} error={errors.businessName?.message}>
          {(control) => <Input autoComplete="organization" maxLength={120} {...control} {...register("businessName")} />}
        </Field>
        <Field id={id("businessType")} label={copy.fields.businessType.label} required error={errors.businessType?.message}>
          {(control) => (
            <Select defaultValue="" {...control} {...register("businessType")}>
              <option value="" disabled>
                {shared.chooseOption}
              </option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field id={id("annualTurnover")} label={`${copy.fields.annualTurnover.label} ${shared.optional}`} error={errors.annualTurnover?.message}>
          {(control) => (
            <Select {...control} {...register("annualTurnover")}>
              <option value="">{shared.chooseOption}</option>
              {turnoverBands.map((band) => (
                <option key={band} value={band}>
                  {band}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field id={id("serviceNeeded")} label={copy.fields.serviceNeeded.label} required error={errors.serviceNeeded?.message} className="sm:col-span-2">
          {(control) => (
            <Select {...control} {...register("serviceNeeded")}>
              <option value="" disabled>
                {shared.chooseOption}
              </option>
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
              <option value={NOT_SURE}>{copy.notSure}</option>
            </Select>
          )}
        </Field>
        <Field id={id("message")} label={copy.fields.message.label} hint={copy.fields.message.hint} required error={errors.message?.message} className="sm:col-span-2">
          {(control) => <Textarea rows={6} maxLength={2000} {...control} {...register("message")} />}
        </Field>
      </div>

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
