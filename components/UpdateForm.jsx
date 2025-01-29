'use client'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { findStudent, updateStudent } from '@/lib/actions/register'
import { eventPrices } from '@/lib/data'
import { Loader, Send, Trash } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from 'react'
import SelectCategory from './SelectCategory'
import SelectEvent from './SelectEvent'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { registerSchema } from '@/lib/validation'

const UpdateForm = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState({})
  const [student, setStudent] = useState(null)
  const [totalAmount, setTotalAmount] = useState(0);
  const [events, setEvents] = useState([]);
  const router = useRouter()

// Search Student Function
  const handleFormFind = async (prevState, formData) => {
    try {

      const res = await findStudent({ formData })

      if (res.status === 'SUCCESS') {
        toast({
          title: 'Success',
          description: "Student Data Found"
        })
        setStudent(res.user);
        setEvents(res.user.events.map(event => ({
          category: event.category,
          eventName: event.eventName,
          ...(event.eventGame && { eventGame: event.eventGame }),
        })));
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
        description: "Cannot find user",
      })
      return {
        ...prevState,
        error: "An unexpected Error Occured",
        status: "Error"
      }
    }
  }

  //Update Student Deatils Function
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
      formData.append('events', JSON.stringify(events));
      formData.append('amount', totalAmount);
      formData.append('token', student.token);

      await registerSchema.parseAsync(formValues);

      const res = await updateStudent({ formData })

      if (res.status === 'SUCCESS') {
        toast({
          variant: "success",
          title: 'Success',
          description: res.message
        })
        setStudent(null)
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
      console.log("Error updating : ", error)
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

  useEffect(() => {
    setTotalAmount(calculateTotalAmount(events));
  }, [events]);

  
  // Find Action
  const [findState, formAction, isPending] = useActionState(handleFormFind, { error: "", status: "INITIAL" });

  // Update Event
  const [state, updateAction, updatePending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });
  return (
    <div>
      {!student && <form action={formAction} className='startup-form'  >
        <div>
          <Input id="user_token" name="user_token" required className='startup-form_input' label="Enter Token ID" placeholder="Enter Token ID" />

          <Button type="submit" className="btn px-4 py-6 text-[16px] text-black-2 font-semibold mt-8" disabled={isPending} >
            {isPending ? 'Search...' : 'Search Student'}
            {isPending ? <Loader className='animate-spin size-6 ml-2' /> : <Send className='size-6 ml-2' />}
          </Button>
        </div>
        {findState?.error && <p className="text-red-500 mt-2">{findState?.error}</p>}
      </form>}

      {student &&
        <form action={updateAction} className='startup-form'  >
          <div>
            <label htmlFor="name" className='startup-form_label' > Student Name </label>
            <Input id="name" name="name" defaultValue={student?.name} required className='startup-form_input' placeholder="Enter Student name" />
            {errors.name && <p className='startup-form_error'> {errors.name} </p>}
          </div>

          <div>
            <label htmlFor="rollno" className='startup-form_label' > Student RollNo </label>
            <Input id="rollno" name="rollno" defaultValue={student?.rollno} required className='startup-form_input' placeholder="Enter Student Roll No" />
            {errors.rollno && <p className='startup-form_error'> {errors.rollno} </p>}
          </div>

          <div className='flex justify-between items-center flex-wrap gap-4' >
            <div>
              <label htmlFor="Course" className='startup-form_label' > Student Course </label>
              <Input id="course" defaultValue={student?.course} name="course" required className='startup-form_input' placeholder="Enter course" />
              {errors.course && <p className='startup-form_error'> {errors.course} </p>}
            </div>
            <div>
              <label htmlFor="branch" className='startup-form_label' > Branch </label>
              <Input id="branch" defaultValue={student?.branch} name="branch" required className='startup-form_input' placeholder="Enter branch" />
              {errors.branch && <p className='startup-form_error'> {errors.branch} </p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className='startup-form_label' > Student Email Address </label>
            <Input id="email" name="email" defaultValue={student?.email} required className='startup-form_input' placeholder="Enter email" />
            {errors.email && <p className='startup-form_error'> {errors.email} </p>}
          </div>
          <div>
            <label htmlFor="phone" className='startup-form_label' > Student Phone Number </label>
            <Input id="phone" name="phone" defaultValue={student?.phone} required className='startup-form_input' placeholder="Enter phone" />
            {errors.phone && <p className='startup-form_error'> {errors.phone} </p>}
          </div>

          {events?.map((event, i) => (
            <div key={i} >
              <label htmlFor="category" className='startup-form_label w-full flex justify-between items-center' > Event Category - {i + 1} {<Button
                type="button"
                onClick={() => {
                  setEvents(events.filter((_, index) => index !== i));
                }}
                className="btn"
              >
                <Trash />
              </Button>} </label>
              <SelectCategory id="category" name="category" value={event?.category} events={events} setEvents={setEvents} i={i} />
              {errors.category && <p className='startup-form_error'> {errors.category} </p>}

              {event.category && (
                <>
                  <div className='mt-4' >
                    <label htmlFor="eventName" className='startup-form_label' > Event Name </label>
                    <SelectEvent id={`eventName${i}`} name="category" value={event.eventName?.startsWith("Arm Wrestling") ? "Arm Wrestling" : event?.eventName} category={event.category} events={events} setEvents={setEvents} i={i} />
                    {errors.eventName && <p className='startup-form_error'> {errors.eventName} </p>}
                  </div>

                  {event.category && event.eventName === "Online Gaming" && (
                    <div className='mt-4' >
                      <label htmlFor="onlineGame" className='startup-form_label' > Select Online Game </label>
                      <SelectEvent id={`onlineGame`} name="game" category={event.category} value={event?.eventGame} events={events} setEvents={setEvents} game={true} i={i} />
                      {errors.eventName && <p className='startup-form_error'> {errors.eventName} </p>}
                    </div>
                  )}

                  {event.category && event.eventName?.startsWith("Arm Wrestling") && (
                    <div className='mt-4' >
                      <label htmlFor="arm_wrestle" className='startup-form_label' > Select Weight Category </label>
                      <SelectEvent id={`arm_wrestle`} name="arm_wrestle" value={event.eventName.split(' - ')[1]}
                        category={event.category} events={events} setEvents={setEvents} arm={true} i={i} />
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

          <Button type="submit" className="btn px-4 py-6 text-[16px] text-black-2 font-semibold" disabled={updatePending} >
            {updatePending ? 'Updating...' : 'Update'}
            {updatePending ? <Loader className='animate-spin size-6 ml-2' /> : <Send className='size-6 ml-2' />}
          </Button>

        </form>
      }
    </div>
  )
}

export default UpdateForm