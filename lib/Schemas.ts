import z from "zod"
export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

// schema for create new subscription
export const createSubscritionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().min(1, "Price is required"),
    currency: z.string().min(1, "Currency is required"),
    frequency: z.string().min(1, "Frequency is required"),
    sharedWith: z.array(z.string()).optional(),
    startDate: z.string().optional(),
    paymentMethod: z.string().optional(),
    cancelUrl: z.string().optional(),
})

export type SignInSchema = z.infer<typeof signInSchema>
export type CreateSubscritionSchema = z.infer<typeof createSubscritionSchema>