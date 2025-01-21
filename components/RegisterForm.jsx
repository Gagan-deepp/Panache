"use client"

import { useToast } from '@/hooks/use-toast'
import { registerStudent } from '@/lib/actions/register'
import { eventPrices } from '@/lib/data'
import { registerSchema } from '@/lib/validation'
import { Loader, Send } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { z } from 'zod'
import SelectCategory from './SelectCategory'
import SelectEvent from './SelectEvent'
import { Button } from './ui/button'
import { Input } from './ui/input'

const RegisterForm = () => {

    const { toast } = useToast();
    const [errors, setErrors] = useState({})
    const [totalAmount, setTotalAmount] = useState(0);
    const [events, setEvents] = useState([
        { category: '', eventName: '' },
    ]);
    const eventsInitial = [
        { category: '', eventName: '' },
    ];

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                name: formData.get("name"),
                rollno: formData.get("rollno"),
                course: formData.get("course"),
                branch: formData.get("branch"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                events: events,
            }
            events.forEach((event, i) => {
                formData.append(`category${i}`, event.category);
                formData.append(`eventName${i}`, event.eventName);

                // For Online Game
                if (event.game) {
                    formData.append(`eventGame${i}`, event.game);
                }
            });
            formData.append('amount', totalAmount);

            await registerSchema.parseAsync(formValues);
            const res = await registerStudent({ formData })

            if (res.status === 'SUCCESS') {
                toast({
                    title: 'Success',
                    description: res.message
                })
                setEvents(eventsInitial);
                setErrors({});
            } else {
                toast({
                    variant: "destructive",
                    title: 'Fail',
                    description: res.message
                })
            }
        } catch (error) {

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);

                toast({
                    title: 'Error',
                    description: 'Please check your input and try again..'
                })

                return { ...prevState, error: "Validation Failed", status: "Error" }
            }

            toast({
                variant: "destructive",
                title: 'Error',
                description: "Unsuccessful Registration",
            })
            return {
                ...prevState,
                error: "An unexpected Error Occured",
                status: "Error"
            }
        }
    }

    const calculateTotalAmount = (events) => {
        return events.reduce((total, event) => {
            let eventTotal = 0;

            // Find the event price by searching through categories
            for (const category in eventPrices) {
                const foundEvent = eventPrices[category].find(e => e.name === event.eventName);
                if (foundEvent) {
                    eventTotal = foundEvent.price;
                    break;
                }
            }

            // Add game-specific prices if "Online Gaming" is selected
            if (event.eventName === "Online Gaming" && event.game) {
                for (const category in eventPrices) {
                    const foundGame = eventPrices[category].find(e => e.name === event.game);
                    if (foundGame) {
                        eventTotal += foundGame.price;
                        break;
                    }
                }
            }

            return total + eventTotal;
        }, 0);
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });
    useEffect(() => {
        setTotalAmount(calculateTotalAmount(events));
    }, [events]);
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

            <div className='flex justify-between items-center flex-wrap gap-4' >
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

            {events.map((event, i) => (
                <div key={i} >
                    <label htmlFor="category" className='startup-form_label' > Event Category - {i + 1} </label>
                    <SelectCategory id="category" name="category" value={event.category} events={events} setEvents={setEvents} i={i} />
                    {errors.category && <p className='startup-form_error'> {errors.category} </p>}

                    {event.category && (
                        <>
                            <div className='mt-4' >
                                <label htmlFor="eventName" className='startup-form_label' > Event Name </label>
                                <SelectEvent id={`eventName${i}`} name="category" category={event.category} events={events} setEvents={setEvents} i={i} />
                                {errors.eventName && <p className='startup-form_error'> {errors.eventName} </p>}
                            </div>

                            {event.category && event.eventName === "Online Gaming" && (
                                <div className='mt-4' >
                                    <label htmlFor="onlineGame" className='startup-form_label' > Select Online Game </label>
                                    <SelectEvent id={`onlineGame`} name="game" category={event.category} events={events} setEvents={setEvents} game={true} i={i} />
                                    {errors.eventName && <p className='startup-form_error'> {errors.eventName} </p>}
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}

            <Button type="button" onClick={() => { setEvents([...events, { category: '', eventName: '' }]) }}>
                Add More
            </Button>

            <div className="mt-4">
                <h3 className="font-semibold text-lg">Total Amount: ₹{totalAmount}</h3>
            </div>

            <Button type="submit" className="startup-form_btn text-bg-white" disabled={isPending} >
                {isPending ? 'Registering...' : 'Register'}
                {isPending ? <Loader className='animate-spin size-6 ml-2' /> : <Send className='size-6 ml-2' />}
            </Button>

        </form>
    )
}

export default RegisterForm
