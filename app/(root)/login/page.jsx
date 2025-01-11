import LoginForm from '@/components/LoginForm'
import { auth } from '@/lib/actions/auth'
const page = async () => {
    const session = await auth()

    console.log("Session user : ", session?.username)
    return (
        <div className='section_container' >
            <LoginForm />
        </div>
    )
}

export default page