import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import { auth } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'

const page = async () => {

    const session = await auth()

    if (!session.role === "admin") redirect('/login')
    return (
        <div className='section_container' >
            <RegisterForm />
        </div>
    )
}

export default page