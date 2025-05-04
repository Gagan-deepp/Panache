import { AlertCircle } from 'lucide-react'
import React from 'react'

const ClosedRegistration = () => {
    return (
        <div className=" flex items-center justify-center p-4 py-16 ">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center border border-slate-200">
                <div className="mb-6 flex justify-center">
                    <AlertCircle className="text-slate-700 h-12 w-12" />
                </div>

                <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-900">
                    Registration for Panache 2025 is closed
                </h1>

                <div className="w-16 h-1 bg-slate-400 mx-auto my-4"></div>

                <p className="text-slate-700 mb-6">Please contact <span className='font-bold' > Gagan </span> to reopen the registration.</p>

                <div className="inline-block bg-slate-100 px-6 py-3 rounded-md border border-slate-200">
                    <p className="text-slate-800 font-medium">Contact: +91 9026705339 </p>
                </div>
            </div>
        </div>
    )
}

export default ClosedRegistration
