"use client"

import { logInUser } from '@/lib/actions/auth'
import useAuthStore from '@/lib/store/auth_store'
import { loginSchema } from '@/lib/validation'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'

const LoginForm = () => {
    const [errors, setErrors] = useState({})
    const router = useRouter();
    const setUsername = useAuthStore((state) => state.setUsername)

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                username: formData.get("username"),
                password: formData.get("password"),
            }
            await loginSchema.parseAsync(formValues);
            const res = await logInUser(formData)

            if (res.status === 'SUCCESS') {
                setUsername(formValues.username)
                toast.success('User Logged In Successfully');

                router.push(`/`)
            }
        } catch (error) {

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);
                toast.error("Please Check your input")
                return { ...prevState, error: "Validation Failed", status: "Error" }
            }
            toast.error(error.message)

            return {
                ...prevState,
                error: "An unexpected Error Occured",
                status: "Error"
            }
        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });

    return (
        <form action={formAction} className='startup-form'  >
            <div>
                <label htmlFor="username" className='startup-form_label' > Username </label>
                <Input id="username" name="username" required className='startup-form_input' placeholder="Enter User name" />
                {errors.username && <p className='startup-form_error'> {errors.username} </p>}
            </div>

            <div>
                <label htmlFor="password" className='startup-form_label' > password </label>
                <Input id="password" type="password" name="password" required className='startup-form_input' placeholder="Enter Password" />
                {errors.password && <p className='startup-form_error'> {errors.password} </p>}
            </div>


            <Button type="submit" className="startup-form_btn text-bg-white" disbaled={isPending.toString()} >
                {isPending ? 'Signing in...' : 'Sign In'}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    )
}

export default LoginForm