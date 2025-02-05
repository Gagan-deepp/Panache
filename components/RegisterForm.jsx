"use client"

import { registerStudent } from '@/lib/actions/register'
import { eventPrices } from '@/lib/data'
import { registerSchema } from '@/lib/validation'
import { Loader, Send, Trash } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import SelectCategory from './SelectCategory'
import SelectEvent from './SelectEvent'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { SelectCourse } from './SelectCourse'
import { SelectBranch } from './SelectBranch'

const RegisterForm = () => {

    const [errors, setErrors] = useState({})
    const [totalAmount, setTotalAmount] = useState(0);
    const [events, setEvents] = useState([
        { category: '', eventName: '' },
    ]);
    const [course, setCourse] = useState("");
    const [branch, setBranch] = useState("");
    const eventsInitial = [
        { category: '', eventName: '' },
    ];

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                name: formData.get("name"),
                rollno: formData.get("rollno"),
                course,
                branch,
                email: formData.get("email"),
                phone: formData.get("phone"),
                events: events,
            }
            formData.append('events', JSON.stringify(events));
            formData.append('amount', totalAmount);
            formData.append('course', course);
            formData.append('branch', branch);
            await registerSchema.parseAsync(formValues);
            const res = await registerStudent({ formData })

            if (res.status === 'SUCCESS') {
                toast.success(res.message);
                setEvents(eventsInitial);
                setCourse("");
                setBranch("")
                setErrors({});
            } else {
                toast.error(res.message)
            }
        } catch (error) {

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);
                toast.error('Please check your input and try again')

                return { ...prevState, error: "Validation Failed", status: "Error" }
            }
            toast.error('Unsuccessful Registration')
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
                const foundEvent = eventPrices[category].find((e) => e.name === event.eventName);
                if (foundEvent) {
                    eventTotal = foundEvent.price;
                    break;
                }

                // Handle arm wrestling dynamic naming
                if (event.eventName.startsWith("Arm Wrestling - ")) {
                    const foundArmEvent = eventPrices[category].find((e) => e.name === "Arm Wrestling");
                    if (foundArmEvent) {
                        eventTotal = foundArmEvent.price;
                        break;
                    }
                }
            }

            //"Online Gaming" is selected
            if (event.eventName === "Online Gaming" && event.eventGame) {
                for (const category in eventPrices) {
                    const foundGame = eventPrices[category].find((e) => e.name === event.eventGame);
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
                <Input id="name" name="name" required className='startup-form_input' label="Enter Student Name" placeholder="Enter Student name" />
                {errors.name && <p className='startup-form_error'> {errors.name} </p>}
            </div>

            <div>
                <Input id="rollno" name="rollno" required label="Student RollNo" className='startup-form_input' placeholder="2101450100044" />
                {errors.rollno && <p className='startup-form_error'> {errors.rollno} </p>}
            </div>

            <div className='flex justify-between items-center flex-wrap gap-4' >
                <div>
                    <SelectCourse value={course} setCourse={setCourse} />
                    {errors.course && <p className='startup-form_error'> {errors.course} </p>}
                </div>
                <div>
                    <SelectBranch value={branch} selectedCourse={course} setBranch={setBranch} />
                    {errors.branch && <p className='startup-form_error'> {errors.branch} </p>}
                </div>
            </div>

            <div>
                <Input id="email" name="email" required label="Student Email" className='startup-form_input' placeholder="abc@gmail.com" />
                {errors.email && <p className='startup-form_error'> {errors.email} </p>}
            </div>
            <div>
                <Input id="phone" name="phone" required label="Student Phone Number" className='startup-form_input' placeholder="9865*******" />
                {errors.phone && <p className='startup-form_error'> {errors.phone} </p>}
            </div>

            {events.map((event, i) => (
                <div key={i} >
                    <label htmlFor="category" className='startup-form_label w-full flex justify-between items-center ' > Event Category - {i + 1} {<Button
                        type="button"
                        onClick={() => {
                            setEvents(events.filter((_, index) => index !== i));
                        }}
                        className="btn"
                    >
                        <Trash />
                    </Button>}</label>
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
                            {event.category && event.eventName?.startsWith("Arm Wrestling") && (
                                <div className='mt-4' >
                                    <label htmlFor="arm_wrestle" className='startup-form_label' > Select Weight Category </label>
                                    <SelectEvent id={`arm_wrestle`} name="arm_wrestle" category={event.category} events={events} setEvents={setEvents} arm={true} i={i} />
                                    {errors.eventName && <p className='startup-form_error'> {errors.eventName} </p>}
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}

            <Button type="button" className="btn w-fit" onClick={() => { setEvents([...events, { category: '', eventName: '' }]) }}>
                Add More
            </Button>

            <div className="mt-4">
                <h3 className="font-semibold text-lg">Total Amount: ₹{totalAmount}</h3>
            </div>

            <Button type="submit" className="btn px-4 py-6 text-[16px] text-black-2 font-semibold" disabled={isPending} >
                {isPending ? 'Registering...' : 'Register'}
                {isPending ? <Loader className='animate-spin size-6 ml-2' /> : <Send className='size-6 ml-2' />}
            </Button>

        </form>
    )
}

export default RegisterForm