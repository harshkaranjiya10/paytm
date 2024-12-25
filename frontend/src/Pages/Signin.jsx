import React, { useState } from "react";
import axios from "axios"
import Transfer from "./Transfer";
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning";
import { useNavigate} from "react-router-dom"

const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    return (
            <main>
                <div className="bg-slate-300 h-screen flex justify-center">
                    <div className="flex flex-col justify-center">
                        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                            <Heading head="SignIn" subHead="Enter Your information to Signin an account"/>
                            <InputBox onChange={(e) => {setUsername(e.target.value)}} label="User Name/ Email" placeholder="hrash@123gmail.com"/>
                            <InputBox onChange={(e) => {setPassword(e.target.value)}} label="Password" placeholder="123564"/>
                            <div className="pt-4">
                                <Button onClick={async () => {
                                    const response = await axios.post("http://localhost:5000/api/v1/user/signin",{
                                        username,
                                        password
                                    }) 
                                    localStorage.setItem("token", response.data.token) 
                                    localStorage.setItem("firstname", firstname) 
                                    
                                    navigate(`/dashboard`);
                                }
                                } label="SignIn" /> 
                            </div>
                            <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                        </div>
                    </div>
                </div>
            </main>
    )
}

export default Signin;