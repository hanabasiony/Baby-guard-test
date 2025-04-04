import { useFormik } from 'formik'
import React, { useState, useContext } from 'react'
import values from './../../../node_modules/lodash-es/values';
import includes from './../../../node_modules/lodash-es/includes';
import * as yup from 'yup';
import { phone } from 'fontawesome';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner'
import { Circles } from 'react-loader-spinner'
import { authContext } from '../../context/AuthContext';


export default function Login() {

    const { setuserToken } = useContext(authContext)


    const [erorrMsg, setErorrMsg] = useState(null)
    const [succMsg, setSuccMsg] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    const navigate = useNavigate()



    let user = {

        email: '',
        password: '',


    }


    async function loginUser(values) {
        // console.log(values);
        setIsClicked(true)
        const data = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(function (succ) {

            console.log(succ);
            // congratulations msg
            setSuccMsg(true)
            setuserToken(succ.data.token)
            localStorage.setItem('tkn', succ.data.token)


            setTimeout(() => {
                // navigate('./login')
            }, 2000)

            setIsClicked(false)


        }).catch(function (err) {
            console.log(err.response.data.message);
            // err.response.data.message
            setErorrMsg(err.response.data.message)

            setTimeout(() => {
                setErorrMsg(null)
            }, 2000)

            setIsClicked(false)

        })

        // try {
        //     const data = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values )
        //     console.log(data);

        // } catch (error) {
        //     console.log(error.response.data.message);


        // }







    }

    const regFormik = useFormik({


        initialValues: user,


        onSubmit: loginUser,
        // function (values) {
        //     // console.log('Form submitted')
        //     console.log(values);

        // },
        // validate: function (values) {
        //     const errors = {}

        //     const nameRegex = /  [a-z]{4,} /
        //     const phoneRegex = / [0-9]{1,}/


        //     // if(!nameRegex.test(values.name)){
        //     //     errors.name = "Name should be 3 characters long"
        //     // }



        //     if (!values.email.includes('@')) {
        //         errors.email = 'email have @'
        //     }





        //     if (values.password.length < 8) {
        //         errors.password = 'Password should be 6-12 characters long'
        //     }

        //     if (values.rePassword !== values.password) {
        //         errors.rePassword = 'Password should be same as password'
        //     }

        //     if (!phoneRegex.test(values.phone)) {
        //         errors.phone = 'Phone should be 10 digits long'
        //     }


        //     // console.log("validation"); // submit and change
        //     console.log(errors);

        //     return errors; //by3abr 3n ek errors law msh m return = no error w la feh error msh hy3ml submit
        // }

        validationSchema:
            yup.object().shape(
                {
                    email: yup.string().email('invalid email'),
                    password: yup.string().required('password is required').min(6).max(12),


                }
            )
        ,


    })
    return (
        <div className="wrapper py-7 pt-30">

            {succMsg ?
                <div className="p-4 mb-4 text-green-800 rounded-lg text-center bg-gree-50 ">
                    welcome back
                </div>
                : null}

            {erorrMsg ?
                <div className="p-4 mb-4 text-red-800 rounded-lg text-center bg-red-50 ">
                    {erorrMsg}
                </div>
                : null}




            <form className="max-w-md mx-auto" onSubmit={regFormik.handleSubmit}>

                {/* <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.name} onChange={regFormik.handleChange} onBlur={regFormik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transdiv -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
                    {regFormik.errors.name && regFormik.touched.name ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.name}
                    </div> : ''}



                </div> */}


                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.email} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    {regFormik.errors.email && regFormik.touched.email ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.email}
                    </div> : ''}

                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.password} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="text" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> password</label>
                    {regFormik.errors.password && regFormik.touched.password ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.password}
                    </div> : ''}
                </div>
                {/* <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.rePassword} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="text" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    {regFormik.errors.rePassword && regFormik.touched.rePassword ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.rePassword}
                    </div> : ''}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.phone} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="text" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm phone</label>
                    {regFormik.errors.phone && regFormik.touched.phone ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.phone}
                    </div> : ''}
                </div> */}


                {isClicked ? <Circles
                    height="40"
                    width="40"
                    color="#0000FF"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /> :
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>

                }

                <Link to='/PassSend' className='text-sm'> Forget password? </Link>


            </form>
        </div>

    )
}
