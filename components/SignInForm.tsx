"use client"
import { signInSchema, SignInSchema } from "@/lib/Schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldContent, FieldError, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Eye, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { useAuth } from "@/contexts/authContext"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const SignInForm = () => {
    const {signIn , isLoading} = useAuth();
    const router = useRouter();
    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })

    async function onSubmit(data:SignInSchema){
        try {
            await signIn(data.email,data.password)
            toast.success("Login Success!");
            router.push('/')
        } catch (error) {
            toast.error("Login Failed Please Try Again Later!")
            console.error(error)
        }
    }

    return (
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email */}
            <Controller 
                name="email"
                control={form.control}
                render={({field , fieldState}) => (
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
                            <Mail className="absolute size-4 right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"/>
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
                render={({field , fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password" className="text-[#E2E8F0] flex items-center justify-between">
                            <p>Password</p>
                            <Link href="/forgot-password" className="text-sm text-[#6366F1] hover:text-[#818CF8]">
                                Forgot password?
                            </Link>
                        </FieldLabel>
                        <FieldContent className="relative">
                            <Input
                            type="password"
                            id="password"
                            {...field}
                            placeholder="name@example.com"
                            className="bg-[#1C1C2E] text-white border border-[#334155] px-[16px] outline-none py-[22px] focus-visible:ring-0"
                            />
                            <Eye className="absolute size-4 right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"/>
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
                {isLoading ? "Signing In...." : "Sign In"}
            </Button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
                <div className="absolute left-0 w-full h-[1px] bg-[#334155]"></div>
                <span className="relative px-4 text-center text-[#94A3B8] bg-[#15152A]">Or contiune with</span>
            </div>

            {/* OAuth Sign In */}
            <div className="flex items-center justify-center gap-4">
                <a href="http://localhost:5500/api/v1/auth/google">
                    <Button type="button" className="bg-[#1C1C2E] text-white text-base cursor-pointer border border-[#334155] px-8 outline-none py-[22px] hover:bg-[#1C1C2E]/80">
                        <Image src="/icons/Google.png" alt="Google" width={24} height={24} />
                        Google
                    </Button>
                </a>
                <Link href="http://localhost:5500/api/v1/auth/github">
                    <Button type="button" className="bg-[#1C1C2E] text-white text-base cursor-pointer border border-[#334155] px-8 outline-none py-[22px] hover:bg-[#1C1C2E]/80">
                        <Image src="/icons/github.png" alt="Github" width={24} height={24} />
                        Github
                    </Button>
                </Link>
            </div>

            <p className="text-center text-[#94A3B8] text-sm">Don't have an account? <Link href="/sign-up" className="text-[#6366F1] hover:text-[#818CF8]">Sign Up</Link></p>
        </form>
    )
}

export default SignInForm