import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
const Signup = () => {
    
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return (
            <main>
                <div className="bg-slate-300 h-screen flex justify-center">
                    <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        <Heading head="SignUp" subHead="Enter Your information to create an account"> </Heading>
                        <InputBox onChange={(e) => { setFirstname(e.target.value) } } label="First Name" placeholder="Harsh"> </InputBox>
                        
                        <InputBox label="Last Name" placeholder="Karanjiya" onChange={(e) =>{ setLastname(e.target.value) } }> </InputBox>
                        <InputBox label="User Name/ Email" placeholder="hrash@123gmail.com" onChange={(e)=>{setUsername(e.target.value)}} ></InputBox>
                        <InputBox label="Password" placeholder="123564" onChange={(e)=>{setPassword(e.target.value)}}></InputBox>
                        <div className="pt-4">
                            <Button 
                                label={"Sign up"}  
                                onClick={async () => {
                                    const response = await axios.post("http://localhost:5000/api/v1/user/signup", {
                                        firstname,
                                        lastname,
                                        username,
                                        password
                                    });
                                    localStorage.setItem("token", response.data.token)
                                    localStorage.setItem("firstname", firstname)
                                    
                                    navigate('/dashboard')
                                }} />
                        </div>
                            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                        </div>
                    </div>
                </div>
                
            </main>
    )   
}   

export default Signup;