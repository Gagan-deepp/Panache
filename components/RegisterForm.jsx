"use client"

import { useToast } from '@/hooks/use-toast'
import { logInUser } from '@/lib/actions/auth'
import { loginSchema } from '@/lib/validation'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'

const RegisterForm = () => {
    const [errors, setErrors] = useState({})
    const { toast } = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                username: formData.get("username"),
                password: formData.get("password"),
            }
            await loginSchema.parseAsync(formValues);
            const res = await logInUser(formData)

            console.log("Responseeee : ", res)
            if (res.status === 'SUCCESS') {
                toast({
                    title: 'Success',
                    message: 'User Logged In Successfully'
                })

                router.push(`/`)
            }
        } catch (error) {

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);

                toast({
                    title: 'Error',
                    password: 'Please check your input and try again..'
                })

                return { ...prevState, error: "Validation Failed", status: "Error" }
            }

            toast({
                title: 'Error',
                password: 'An unexpected Error Occured'
            })
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
                <label htmlFor="name" className='startup-form_label' > Student Name </label>
                <Input id="name" name="name" required className='startup-form_input' placeholder="Enter Student name" />
                {errors.name && <p className='startup-form_error'> {errors.name} </p>}
            </div>

            <div>
                <label htmlFor="rollno" className='startup-form_label' > Student RollNo </label>
                <Input id="rollno" name="rollno" required className='startup-form_input' placeholder="Enter Student Roll No" />
                {errors.rollno && <p className='startup-form_error'> {errors.rollno} </p>}
            </div>

            <div className='flex justify-between items-center' >
                <div>
                    <label htmlFor="Course" className='startup-form_label' > Student Course </label>
                    <Input id="course" name="course" required className='startup-form_input' placeholder="Enter course" />
                    {errors.course && <p className='startup-form_error'> {errors.course} </p>}
                </div>
                <div>
                    <label htmlFor="branch" className='startup-form_label' > Branch </label>
                    <Input id="branch" name="branch" required className='startup-form_input' placeholder="Enter branch" />
                    {errors.branch && <p className='startup-form_error'> {errors.branch} </p>}
                </div>
            </div>
            
            <div>
                <label htmlFor="email" className='startup-form_label' > Student Email Address </label>
                <Input id="email" name="email" required className='startup-form_input' placeholder="Enter email" />
                {errors.email && <p className='startup-form_error'> {errors.email} </p>}
            </div>
            <div>
                <label htmlFor="phone" className='startup-form_label' > Student Phone Number </label>
                <Input id="phone" name="phone" required className='startup-form_input' placeholder="Enter phone" />
                {errors.phone && <p className='startup-form_error'> {errors.phone} </p>}
            </div>


            <Button type="submit" className="startup-form_btn text-bg-white" disbaled={isPending.toString()} >
                {isPending ? 'Signing in...' : 'Sign In'}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    )
}

export default RegisterForm
