// import { LogosSpotify } from '../logos/Logo.js';
// import { Icon } from '@iconify-icon/react';
/* <LogosSpotify/> */
/* <iconify-icon icon="logos:spotify"></iconify-icon> */
import { useState } from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper.js';
import {Icon} from '@iconify/react';
import TextInput from "../components/shared/TextInput.js"
import PasswordInput from "../components/shared/PasswordInput.js"
import { Link } from 'react-router-dom';
const LoginComponent = ()=>{
    const [email, setEmail]=useState("");
    const [password, setpassword]=useState("");
    const [cookie , setCookie] = useCookies(["token"]);
    const navigate=useNavigate();
    const login = async () => {
    const data = {email, password};
    const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
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
        <Icon icon="logos:spotify" width="150"/>
        </div>
        <div className="inputRegion w-1/3 py-10 flex flex-col items-center justify-center">
            <div className="font-bold mb-4 ">
                To continue, log in to Spotify.
            </div>
            <TextInput
                label="Email ID or username"
                placeholder="Email ID or username"
                className="my-6"
                value={email}
                setValue={setEmail}
            />
            <PasswordInput
                label="Password"
                placeholder="Password"
                value={password}
                setValue={setpassword}
            />
            <div className='w-full flex items-center justify-end mt-8'>
            <button className="bg-green-400 font-semibold p-3 px-10 rounded-full"
                onClick={(e)=>{
                    e.preventDefault();
                    login();
                }
            }
            >
            LOG IN</button>
            </div>

            <div className='mt-6 border border-solid border-gray-300 w-full'></div>
            <div className='my-6 font-semibold text-lg'> Don't have an account?</div>
            <div className='border text-gray-500 border-gray-500 font-semibold w-full rounded-full py-3 flex items-center justify-center'>
                <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
            </div>
        </div>
    </div>

};

export default LoginComponent;