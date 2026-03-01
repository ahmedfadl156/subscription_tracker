"use client"

import { createSubscritionSchema, CreateSubscritionSchema } from "@/lib/Schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldLabel, FieldError, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
    Calendar,
    CreditCard,
    DollarSign,
    Link2,
    Loader2,
    RefreshCw,
    Tag,
    Users,
    Zap,
} from "lucide-react"
import { toast } from "sonner"
import { addSubscription } from "@/services/subscriptions"
import { useRouter } from "next/navigation"

const CATEGORIES = [
    "entertainment",
    "sports",
    "news",
    "lifestyle",
    "education",
    "technology",
    "finance",
    "politics",
    "other"
]

const CURRENCIES = ["USD", "EUR", "GBP", "EGP"]

const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"]

const PAYMENT_METHODS = [
    "Credit Card",
    "Debit Card",
    "PayPal",
    "Bank Transfer",
    "Apple Pay",
    "Google Pay",
    "Cash",
    "Other",
]

function InputIcon({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{ color: "#94A3B8" }}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-4"
        >
            {children}
        </span>
    )
}

function StyledSelect({
    id,
    value,
    onChange,
    onBlur,
    name,
    invalid,
    children,
    placeholder,
}: {
    id?: string
    value: string
    onChange: (v: string) => void
    onBlur?: () => void
    name?: string
    invalid?: boolean
    children: React.ReactNode
    placeholder: string
}) {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            aria-invalid={invalid}
            style={{ backgroundColor: "#1C1C2E", color: "#CBD5E1" }}
            className={[
                "border-white/10 h-9 w-full min-w-0 rounded-md border",
                "px-9 py-1 text-sm shadow-xs",
                "transition-[color,box-shadow] outline-none",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                invalid
                    ? "ring-destructive/20 border-destructive"
                    : "",
                "appearance-none cursor-pointer",
            ].join(" ")}
        >
            <option value="" disabled hidden style={{ color: "#94A3B8", backgroundColor: "#1C1C2E" }}>
                {placeholder}
            </option>
            {children}
        </select>
    )
}

const AddSubscriptionForm = () => {
    const router = useRouter();
    const form = useForm<CreateSubscritionSchema>({
        resolver: zodResolver(createSubscritionSchema),
        defaultValues: {
            name: "",
            category: "",
            price: 0,
            currency: "",
            frequency: "",
            sharedWith: [],
            startDate: "",
            paymentMethod: "",
            cancelUrl: "",
        },
    })

    async function onSubmit(data: CreateSubscritionSchema) {
        try {
            await addSubscription(data);
            toast.success("Subscription Added Successfully")
            form.reset();
            router.push('/dashboard/subscriptions');
        } catch (error) {
            console.error(error)
            toast.error("Failed To Create Post")
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
        >
            {/* ── Section: Basic Info ── */}
            <div style={{ backgroundColor: "#181825" }} className="rounded-xl border border-white/10 p-6 shadow-sm flex flex-col gap-5">
                <p style={{ color: "#94A3B8" }} className="text-xs font-semibold uppercase tracking-widest">
                    Basic Info
                </p>

                <FieldGroup>
                    {/* Subscription Name */}
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} style={{ color: "#CBD5E1" }}>
                                    Subscription Name
                                    <span className="text-destructive ml-0.5">*</span>
                                </FieldLabel>
                                <div className="relative">
                                    <InputIcon>
                                        <Zap />
                                    </InputIcon>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="text"
                                        placeholder="e.g. Netflix, Spotify…"
                                        aria-invalid={fieldState.invalid}
                                        style={{ backgroundColor: "#1C1C2E", color: "#CBD5E1", borderColor: "rgba(255,255,255,0.1)" }}
                                        className="pl-9 placeholder:text-[#94A3B8]"
                                    />
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Category */}
                    <Controller
                        name="category"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} style={{ color: "#CBD5E1" }}>
                                    Category
                                    <span className="text-destructive ml-0.5">*</span>
                                </FieldLabel>
                                <div className="relative">
                                    <InputIcon>
                                        <Tag />
                                    </InputIcon>
                                    <StyledSelect
                                        id={field.name}
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        invalid={fieldState.invalid}
                                        placeholder="Select a category"
                                    >
                                        {CATEGORIES.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </StyledSelect>
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </div>

            {/* Section: Pricing */}
            <div style={{ backgroundColor: "#181825" }} className="rounded-xl border border-white/10 p-6 shadow-sm flex flex-col gap-5">
                <p style={{ color: "#94A3B8" }} className="text-xs font-semibold uppercase tracking-widest">
                    Pricing
                </p>

                <FieldGroup>
                    {/* Price + Currency – side by side */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Price */}
                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} style={{ color: "#CBD5E1" }}>
                                        Price
                                        <span className="text-destructive ml-0.5">*</span>
                                    </FieldLabel>
                                    <div className="relative">
                                        <InputIcon>
                                            <DollarSign />
                                        </InputIcon>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="number"
                                            min={0}
                                            step={0.01}
                                            placeholder="0.00"
                                            aria-invalid={fieldState.invalid}
                                            style={{ backgroundColor: "#1C1C2E", color: "#CBD5E1", borderColor: "rgba(255,255,255,0.1)" }}
                                            className="pl-9 placeholder:text-[#94A3B8]"
                                            onChange={(e) =>
                                                field.onChange(parseFloat(e.target.value) || 0)
                                            }
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Currency */}
                        <Controller
                            name="currency"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} style={{ color: "#CBD5E1" }}>
                                        Currency
                                        <span className="text-destructive ml-0.5">*</span>
                                    </FieldLabel>
                                    <div className="relative">
                                        <InputIcon>
                                            <DollarSign />
                                        </InputIcon>
                                        <StyledSelect
                                            id={field.name}
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            invalid={fieldState.invalid}
                                            placeholder="Currency"
                                        >
                                            {CURRENCIES.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </StyledSelect>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    {/* Billing Frequency */}
                    <Controller
                        name="frequency"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} style={{ color: "#CBD5E1" }}>
                                    Billing Frequency
                                    <span className="text-destructive ml-0.5">*</span>
                                </FieldLabel>
                                <div className="relative">
                                    <InputIcon>
                                        <RefreshCw />
                                    </InputIcon>
                                    <StyledSelect
                                        id={field.name}
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        invalid={fieldState.invalid}
                                        placeholder="Select frequency"
                                    >
                                        {FREQUENCIES.map((f) => (
                                            <option key={f} value={f}>
                                                {f.charAt(0).toUpperCase() + f.slice(1)}
                                            </option>
                                        ))}
                                    </StyledSelect>
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </div>

            {/* Section: Details */}
            <div style={{ backgroundColor: "#181825" }} className="rounded-xl border border-white/10 p-6 shadow-sm flex flex-col gap-5">
                <p style={{ color: "#94A3B8" }} className="text-xs font-semibold uppercase tracking-widest">
                    Details
                </p>

                <FieldGroup>
                    {/* Start Date */}
                    <Controller
                        name="startDate"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} style={{ color: "#CBD5E1" }}>Start Date</FieldLabel>
                                <div className="relative">
                                    <InputIcon>
                                        <Calendar />
                                    </InputIcon>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="date"
                                        aria-invalid={fieldState.invalid}
                                        style={{ backgroundColor: "#1C1C2E", color: "#CBD5E1", borderColor: "rgba(255,255,255,0.1)", colorScheme: "dark" }}
                                        className="pl-9"
                                    />
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Payment Method */}
                    <Controller
                        name="paymentMethod"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} style={{ color: "#CBD5E1" }}>Payment Method</FieldLabel>
                                <div className="relative">
                                    <InputIcon>
                                        <CreditCard />
                                    </InputIcon>
                                    <StyledSelect
                                        id={field.name}
                                        name={field.name}
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        invalid={fieldState.invalid}
                                        placeholder="Select payment method"
                                    >
                                        {PAYMENT_METHODS.map((m) => (
                                            <option key={m} value={m}>
                                                {m}
                                            </option>
                                        ))}
                                    </StyledSelect>
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Cancel / Manage URL */}
                    <Controller
                        name="cancelUrl"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} style={{ color: "#CBD5E1" }}>
                                    Cancellation URL
                                </FieldLabel>
                                <div className="relative">
                                    <InputIcon>
                                        <Link2 />
                                    </InputIcon>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="url"
                                        placeholder="https://example.com/cancel"
                                        aria-invalid={fieldState.invalid}
                                        style={{ backgroundColor: "#1C1C2E", color: "#CBD5E1", borderColor: "rgba(255,255,255,0.1)" }}
                                        className="pl-9 placeholder:text-[#94A3B8]"
                                    />
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Shared With */}
                    <Controller
                        name="sharedWith"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} style={{ color: "#CBD5E1" }}>
                                    Shared With
                                    <span className="ml-1.5 rounded-full px-2 py-0.5 text-xs font-normal" style={{ backgroundColor: "rgba(148,163,184,0.1)", color: "#94A3B8" }}>
                                        optional
                                    </span>
                                </FieldLabel>
                                <div className="relative">
                                    <InputIcon>
                                        <Users />
                                    </InputIcon>
                                    <Input
                                        id={field.name}
                                        type="text"
                                        placeholder="user@email.com, friend@email.com…"
                                        aria-invalid={fieldState.invalid}
                                        style={{ backgroundColor: "#1C1C2E", color: "#CBD5E1", borderColor: "rgba(255,255,255,0.1)" }}
                                        className="pl-9 placeholder:text-[#94A3B8]"
                                        defaultValue={(field.value ?? []).join(", ")}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value
                                                    .split(",")
                                                    .map((v) => v.trim())
                                                    .filter(Boolean)
                                            )
                                        }
                                    />
                                </div>
                                <p className="text-xs -mt-1" style={{ color: "#94A3B8" }}>
                                    Separate multiple emails with a comma
                                </p>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </div>

            {/*  Actions  */}
            {(() => {
                const { isSubmitting } = form.formState
                return (
                    <div className="flex items-center justify-end gap-3 pt-1">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[160px] shadow-md shadow-primary/25 transition-all"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Adding…
                                </>
                            ) : (
                                "Add Subscription"
                            )}
                        </Button>
                    </div>
                )
            })()}
        </form>
    )
}

export default AddSubscriptionForm