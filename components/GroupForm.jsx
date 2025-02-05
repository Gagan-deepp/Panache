"use client"

import { registerGroup } from '@/lib/actions/register'
import { GroupeventPrices } from '@/lib/data'
import { groupRegisterSchema } from '@/lib/validation'
import { Loader, Send, Trash } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { z } from 'zod'
import SelectCategory from './SelectCategory'
import SelectEvent from './SelectEvent'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'sonner'

const GroupForm = () => {

    const [errors, setErrors] = useState({})
    const [totalAmount, setTotalAmount] = useState(0);
    const [event, setEvent] = useState([
        { category: '', eventName: '' },
    ]);
    const [members, setMembers] = useState([
        { name: "" },
    ]);

    const handleMemberChange = (e, i) => {
        const updateMembers = [...members];
        updateMembers[i].name = e.target.value
        setMembers([...updateMembers])
    }

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                name: formData.get("name"),
                leader: formData.get("leader"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                members: members,
                event: event
            }

            console.log("FORM VALUESSS : ", formValues)

            await groupRegisterSchema.parseAsync(formValues);
            formData.append('events', JSON.stringify(event));
            formData.append('members', JSON.stringify(members));
            formData.append('amount', totalAmount);
            const res = await registerGroup({ formData })

            if (res.status === 'SUCCESS') {
                toast.success(res.message);
                setEvent([
                    { category: '', eventName: '' },
                ]);
                setMembers([
                    { name: "" },
                ])
                setErrors({});
            } else {
                toast.error(res.message)
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

    const calculateTotalAmount = (events) => {
        return events.reduce((total, event) => {
            let eventTotal = 0;

            // Find the event price by searching through categories
            for (const category in GroupeventPrices) {
                const foundEvent = GroupeventPrices[category].find((e) => e.name === event.eventName);
                if (foundEvent) {
                    eventTotal = foundEvent.price;
                    break;
                }
            }
            return total + eventTotal;
        }, 0);
    };

    useEffect(() => {
        console.log("EVENTSS : ", event)
        setTotalAmount(calculateTotalAmount(event));
    }, [event]);

    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });

    return (
        <form action={formAction} className='startup-form'  >
            <div>
                <Input id="name" name="name" required label="Team Name" className='startup-form_input' placeholder="Enter Team name" />
                {errors.name && <p className='startup-form_error'> {errors.name} </p>}
            </div>
            <div>
                <label htmlFor="category" className='startup-form_label' > Event Category </label>
                <SelectCategory id="category" name="category" value={event[0].category} events={event} setEvents={setEvent} />
                {errors.category && <p className='startup-form_error'> {errors.category} </p>}

                {event[0].category && (
                    <div className='mt-4' >
                        <label htmlFor="eventName" className='startup-form_label' > Event Name </label>
                        <SelectEvent id={`eventName`} name="category" category={event[0].category} events={event} setEvents={setEvent} />
                        {errors.eventName && <p className='startup-form_error'> {errors.eventName} </p>}
                    </div>
                )}
            </div>

            <div>
                <Input id="leader" name="leader" label="Group Leader Name" required className='startup-form_input' placeholder="Enter Group Leader Name" />
                {errors.leader && <p className='startup-form_error'> {errors.leader} </p>}
            </div>

            <div>
                <Input id="email" name="email" required label="Group Leader Email Address" className='startup-form_input' placeholder="Enter Leader email" />
                {errors.email && <p className='startup-form_error'> {errors.email} </p>}
            </div>

            <div>
                <Input id="phone" name="phone" required label="Group Leader Phone Number" className='startup-form_input' placeholder="Enter phone" />
                {errors.phone && <p className='startup-form_error'> {errors.phone} </p>}
            </div>

            {members.map((_, i) => (
                <div key={i} className='flex items-center gap-3 w-full' >
                    <Input id={`group-member-${i + 1}`} name={`member_${i + 1}`} label={`Group Member  - ${i + 1}`} value={members[i].name} onChange={e => { handleMemberChange(e, i) }} required className='startup-form_input flex-1 w-full' placeholder="Enter Group member name" />
                    <Button
                        type="button"
                        onClick={() => {
                            setMembers(members.filter((_, index) => index !== i));
                        }}
                        className="btn"
                    >
                        <Trash />
                    </Button>
                </div>
            ))}

            <Button type="button" className="btn w-fit" onClick={() => { setMembers([...members, { name: "" }]) }}>
                Add More Member
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

export default GroupForm