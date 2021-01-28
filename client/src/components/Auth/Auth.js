import React,{useState} from 'react';
import {Avatar ,Button ,Paper,Grid,Typography,Container} from "@material-ui/core";
import {GoogleLogin} from "react-google-login";
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import makeStyle from "./styles";
import {signin,signup} from "../../actions/auth.js"
import Input from "./Input"
import Icon from "./Icon"
//import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
const initialState={firstName:"",lastName:"",email:"",password:"",confirmPassword:""};
const Auth = () => {
    const classes=makeStyle();
    const [showPassword,setShowPassword]=useState(false);
    const [isSignup,setIsSignUp]=useState(false);
    const [formData,setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const history=useHistory();
    const handleShowPassword=()=>setShowPassword((prevShowPassword)=> !prevShowPassword)
    const switchMode =()=>{
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
        setShowPassword(false);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
   
    const googleSucces= async (res)=>{
        
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
           dispatch({type:AUTH,data:{result,token}});
           //redirect catre pagina de home
           history.push("/")

        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure=()=>{
        console.log("Google Sign in nu a reusit.Incearca mai tarziu")
    }
    
    return (
        <div>
            <Container compornent="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>


                    </Avatar>
                    <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                   <>
                                   
                                    <Input name="firstName" label="Numele" handleChange={handleChange} autoFocus half />
                                   
                                   
                                   
                                    <Input name="lastName" label="Prenumele" handleChange={handleChange} half />
                                   
                                   </> 
                                )
                            }
                            <Input name="email" label="Adresa de Email" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Parola" handleChange={handleChange} type={showPassword ? "text" :"password"} handleShowPassword={handleShowPassword}/>
                            {isSignup && <Input name ="confirmPassword" label="Reintroduce-ti parola" handleChange={handleChange} type="password"/>}
                        </Grid>
                       
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? "Inscriete" : "Logheaza-te"}
                        </Button>
                        <GoogleLogin 
                            clientId="156977089881-nge8av83qupgmqvujh4h950i39eh4k3g.apps.googleusercontent.com"
                            render={(renderProps)=>(
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">Logheaza-te cu Google</Button>
                            )}
                            onSuccess={googleSucces}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Button onClick={switchMode}>
                                {isSignup ? "Deja ai un cont? Logheaza-te" : "Nu ai un cont? Inscriete"}
                            </Button>

                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Auth
