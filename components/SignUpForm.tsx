"use client";
import { signUpSchema, SignUpSchema } from "@/lib/Schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldContent, FieldError, FieldLabel } from "./ui/field"
import Image from "next/image"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Eye, Mail, User } from "lucide-react"
import { useAuth } from "@/contexts/authContext"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const SignUpForm = () => {
    const { signUp, isLoading } = useAuth();
    const router = useRouter();
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: SignUpSchema) {
        try {
            await signUp(data.name, data.email, data.password)
            toast.success("Account Created Successfully!")
            router.push('/dashboard')
        } catch (error) {
            toast.error("Sign Up Failed Please Try Again Later!")
            console.error(error)
        }
    }
    return (
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name */}
            <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="name" className="text-[#E2E8F0]">Your Name</FieldLabel>
                        <FieldContent className="relative">
                            <Input
                                type="text"
                                id="name"
                                {...field}
                                placeholder="e.g.Ahmed Fadl"
                                className="bg-[#1C1C2E] text-white border border-[#334155] px-[16px] outline-none py-[22px] focus-visible:ring-0"
                            />
                            <User className="absolute size-4 right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        </FieldContent>
                        {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                        )}
                    </Field>
                )}
            />
            {/* Email */}
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email" className="text-[#E2E8F0]">Email</FieldLabel>
                        <FieldContent className="relative">
                            <Input
                                type="email"
                                id="email"
                                {...field}
                                placeholder="name@example.com"
                                className="bg-[#1C1C2E] text-white border border-[#334155] px-[16px] outline-none py-[22px] focus-visible:ring-0"
                            />
                            <Mail className="absolute size-4 right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        </FieldContent>
                        {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                        )}
                    </Field>
                )}
            />

            {/* Password */}
            <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password" className="text-[#E2E8F0]">
                            Password
                        </FieldLabel>
                        <FieldContent className="relative">
                            <Input
                                type="password"
                                id="password"
                                {...field}
                                placeholder="********"
                                className="bg-[#1C1C2E] text-white border border-[#334155] px-[16px] outline-none py-[22px] focus-visible:ring-0"
                            />
                            <Eye className="absolute size-4 right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        </FieldContent>
                        {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                        )}
                    </Field>
                )}
            />

            {/* Remeber Me */}
            <div className="flex items-center justify-start gap-3">
                <input type="checkbox" name="rememberMe" id="rememberMe" className="accent-[#6366F1] hover:accent-[#818CF8]" />
                <label htmlFor="rememberMe" className="text-[#CBD5E1] text-sm">Remember me</label>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary w-full py-6 rounded-full cursor-pointer shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                {isLoading ? "Signing Up...." : "Sign Up"}
            </Button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
                <div className="absolute left-0 w-full h-[1px] bg-[#334155]"></div>
                <span className="relative px-4 text-center text-[#94A3B8] bg-[#15152A]">Or contiune with</span>
            </div>

            {/* OAuth Sign In */}
            <div className="flex items-center justify-center gap-4">
                <a href="/api/v1/auth/google">
                    <Button type="button" className="bg-[#1C1C2E] text-white text-base cursor-pointer border border-[#334155] px-8 outline-none py-[22px] hover:bg-[#1C1C2E]/80">
                        <Image src="/icons/Google.png" alt="Google" width={24} height={24} />
                        Google
                    </Button>
                </a>
                <Link href="/api/v1/auth/github">
                    <Button type="button" className="bg-[#1C1C2E] text-white text-base cursor-pointer border border-[#334155] px-8 outline-none py-[22px] hover:bg-[#1C1C2E]/80">
                        <Image src="/icons/github.png" alt="Github" width={24} height={24} />
                        Github
                    </Button>
                </Link>
            </div>

            <p className="text-center text-[#94A3B8] text-sm">Already Have an Account? <Link href="/sign-in" className="text-[#6366F1] hover:text-[#818CF8]">Sign In</Link></p>
        </form>
    )
}

export default SignUpForm