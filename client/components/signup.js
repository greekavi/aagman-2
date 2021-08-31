import Head from 'next/head'
import { useForm } from "react-hook-form";
import styles from '../styles/SignUp.module.css';
import { motion } from "framer-motion";
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { CREATE_USERS } from '../GraphQL/Mutations/UsersMutation';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    margin: "20px",
    backgroundColor: "#0596f5",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "40px",
    textAlign:"center"
  }
});

export default function Signup() {
    const classes = useStyles();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const variants = {
        hidden: { opacity: 0, x: 100, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
    }

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [location, setLocation] = useState("");
    const [storeName, setStoreName] = useState("");
    const [createUser] = useMutation(CREATE_USERS);
    const router = useRouter();

    const onSubmit = (e) => {
        e.preventDefault();
        createUser({
            variables: {
                createUserEmail: email,
                createUserFullName: fullName,
                createUserStoreName: storeName,
                createUserGstNumber: gstNumber,
                createUserLocation: location,
                createUserPhoneNumber: phoneNumber
            }
        })
        alert("User has been registered successfully.")
        router.push({
            pathname: '/orders',
            query: {email : email },
          })
    }
    const backHomePage = (e) => {

    }

    return (

        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <motion.main
                variants={variants}// Pass the variant object into Framer Motion 
                initial="hidden" // Set the initial state to variants.hidden
                animate="enter" // Animated state to variants.enter
                exit="exit" // Exit state (used later) to variants.exit
                transition={{ type: 'linear' }} // Set the transition to linear

            >
                <form onSubmit={onSubmit}>

                    <h1 className={styles.heading}>Sign Up</h1><br /><br />

                    <TextField label="Email" variant="outlined" color="primary" value={email} onChange={(e) => { setEmail(e.target.value); }} />    
                    <br /><br />
                    <TextField label="Full Name" variant="outlined" color="primary" value={fullName} onChange={(e) => { setFullName(e.target.value); }} />
                    <br /><br />
                    <TextField label="Store Name" variant="outlined" color="primary" value={storeName} onChange={(e) => { setStoreName(e.target.value); }} />
                    <br /><br />
                    <TextField label="Location" variant="outlined" color="primary" value={location} onChange={(e) => { setLocation(e.target.value); }} />
                    <br /><br />
                    <TextField label="Phone Number" variant="outlined" color="primary" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value); }} />
                    <br /><br />
                    <TextField label="GST Number" variant="outlined" color="primary" value={gstNumber} onChange={(e) => { setGstNumber(e.target.value); }} />
                    <br /><br />
                    <Button type="submit" variant="contained" color="secondary" className={classes.button}>Register</Button> <br />

                </form>


            </motion.main>
        </>);
};