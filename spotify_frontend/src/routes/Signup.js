// import { LogosSpotify } from '../logos/Logo.js';
// import { Icon } from '@iconify-icon/react';
/* <LogosSpotify/> */
/* <iconify-icon icon="logos:spotify"></iconify-icon> */
import { useState } from 'react';
import {Icon} from '@iconify/react';
import {useCookies} from 'react-cookie';
import TextInput from "../components/shared/TextInput.js"
import {useNavigate} from "react-router-dom";
import PasswordInput from "../components/shared/PasswordInput.js"
import {Link } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper.js';
const SignupComponent = ()=>{
    const [email, setEmail]=useState("");
    const [confirmEmail, setconfirmEmail]=useState("");
    const [userName, setuserName]=useState("");
    const [password, setpassword]=useState("");
    const [firstName, setfirstName]=useState("");
    const [lastName, setlastName]=useState("");
    const [cookie , setCookie] = useCookies(["token"]);
    const navigate=useNavigate();
    const signUp = async () => {
        if(email!==confirmEmail){
            alert("Emails do not match");
            return;
        }
    const data = {email, password, userName, firstName, lastName};
    const response = await makeUnauthenticatedPOSTRequest(
        "/auth/register",
        data
    ) ;
    if(response && !response.error){
        const token=response.token;
        const date =new Date();
        date.setDate(date.getDate() + 30)
        setCookie("token" , token , {path : "/" , expires : date});
        alert("Success");
        navigate("/home");
    }
    else{
        alert("Failure");
    }
    };


    return <div className=" w-full h-full flex flex-col items-center" >
        <div className="logo p-5 border-b border-solid border-gray-200 w-full flex justify-center">
        <Icon icon="logos:spotify" color="white" width="150"/>
        </div>
        <div className="inputRegion w-1/3 py-10 flex flex-col items-center justify-center">
            <div className="font-bold mb-4 ">
                Sign up to start listening
            </div>
            <TextInput
                label="What's your email?"
                placeholder="Enter your email."
                className="my-6"
                value={email}
                setValue={setEmail}
            />
            <TextInput
                label="Confirm Email address"
                placeholder="Enter your email again."
                className="mb-6"
                value={confirmEmail}
                setValue={setconfirmEmail}
            />
            <TextInput
                label="Username"
                placeholder="Enter your Username"
                className="mb-6"
                value={userName}
                setValue={setuserName}
            />
            <PasswordInput
                label="Create a password"
                placeholder="Create a password."
                value={password}
                setValue={setpassword}
            />
            <div className='w-full flex justify-between items-center space-x-8'>
                <TextInput
                    label="First Name"
                    placeholder="Enter a First Name."
                    className="my-6"
                    value={firstName}
                    setValue={setfirstName}
                />
                <TextInput
                    label="Last Name"
                    placeholder="Enter a Last Name."
                    className="my-6"
                    value={lastName}
                    setValue={setlastName}
                />
            </div>
            <div className='w-full flex items-center justify-center mt-8'>
            <button className="bg-green-400 font-semibold p-3 px-10 rounded-full"
            onClick={(e)=>{
                e.preventDefault();
                signUp();
            }
        }
            >
                SIGN UP</button>
            </div>

            <div className='mt-6 border border-solid border-gray-300 w-full'></div>
            <div className='my-6 font-semibold text-lg'> Already have an account?</div>
            <div className='border text-gray-500 border-gray-500 font-semibold w-full rounded-full py-3 flex items-center justify-center'>
                <Link to="/login">GO TO LOG IN </Link>
            </div>
        </div>
    </div>

};

export default SignupComponent;