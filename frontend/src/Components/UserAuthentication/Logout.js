import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink,useNavigate} from 'react-router-dom'
import { authActions } from '../Store/AuthStore'
import { appActions } from '../Store/AppStore'
const Logout = () => {
    const login=useSelector((state)=>state.auth.login)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(authActions.userLogOut())
        dispatch(appActions.adminLogout())
        navigate('/login')
    }

    return (
        <>
            <div className='heading mt-24'>
                <h4>Log Out</h4>
            </div>
            <div className='form1'>

                <div className='formBorder  mt-42' style={{ width: '260px', height: '110px', borderRadius: '10px' }}>
                    <form onSubmit={submitHandler}>
                        <NavLink
                            style={{ textDecoration: "None" }}
                           
                        >
                            <div className="flex gap-2 btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                                <button onClick={submitHandler} className="font-medium text-white text-primary-600 rounded-lg bg-red-600 dark:text-primary-500">LogOut</button>

                            </div>



                        </NavLink>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Logout
