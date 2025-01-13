"use client"

import { useToast } from '@/hooks/use-toast'
import { registerGroup } from '@/lib/actions/register'
import { groupRegisterSchema } from '@/lib/validation'
import { Loader, Send } from 'lucide-react'
import { useActionState, useState } from 'react'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import SelectCategory from './SelectCategory'
import SelectEvent from './SelectEvent'

const GroupForm = () => {

    const { toast } = useToast();
    const [errors, setErrors] = useState({})
    const [event, setEvent] = useState([
        { category: '', eventName: '' },
    ]);
    const [members, setMembers] = useState([
        { name: "" },
        { name: "" },
        { name: "" }
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
            members.forEach((member, i) => {
                formData.append(`member${i + 1}`, member.name);
            });
            formData.append(`category`, event[0].category);
            formData.append(`eventName`, event[0].eventName);

            await groupRegisterSchema.parseAsync(formValues);
            const res = await registerGroup({ formData })

            if (res.status === 'SUCCESS') {
                toast({
                    title: 'Success',
                    description: res.message
                })
                setErrors({});
                setEvent([{ category: '', eventName: '' }]);
                setMembers([{ name: "" }, { name: "" }, { name: "" }]);
            } else {
                toast({
                    title: 'Fail to register',
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
                title: 'Error',
                description: error.message
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
                <label htmlFor="name" className='startup-form_label' > Group Name </label>
                <Input id="name" name="name" required className='startup-form_input' placeholder="Enter Group name" />
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
                <label htmlFor="leader" className='startup-form_label' > Group Leader Name </label>
                <Input id="leader" name="leader" required className='startup-form_input' placeholder="Enter Group Leader Name" />
                {errors.leader && <p className='startup-form_error'> {errors.leader} </p>}
            </div>

            <div>
                <label htmlFor="email" className='startup-form_label' > Group Leader Email Address </label>
                <Input id="email" name="email" required className='startup-form_input' placeholder="Enter Leader email" />
                {errors.email && <p className='startup-form_error'> {errors.email} </p>}
            </div>

            <div>
                <label htmlFor="phone" className='startup-form_label' > Group Leader Phone Number </label>
                <Input id="phone" name="phone" required className='startup-form_input' placeholder="Enter phone" />
                {errors.phone && <p className='startup-form_error'> {errors.phone} </p>}
            </div>

            {members.map((_, i) => (
                <div key={i} >
                    <label htmlFor="category" className='startup-form_label' > Group Member  - {i + 1} </label>
                    <Input id={`group-member-${i + 1}`} name={`member_${i + 1}`} value={members[i].name} onChange={e => { handleMemberChange(e, i) }} required className='startup-form_input' placeholder="Enter Group member name" />
                </div>
            ))}

            {/* <Button type="button" onClick={() => { setMembers([...members]) }}>
                Add More
            </Button> */}

            <Button type="submit" className="startup-form_btn text-bg-white" disabled={isPending} >
                {isPending ? 'Registering...' : 'Register'}
                {isPending ? <Loader className='animate-spin size-6 ml-2' /> : <Send className='size-6 ml-2' />}
            </Button>
        </form>
    )
}

export default GroupForm
