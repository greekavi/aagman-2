import Head from 'next/head'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import styles from '../styles/Login.module.css'
import { useState } from "react";
import { postOtp } from '../lib/auth';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
        let user;

        checkIfUserExists(email).then(res => {user = res;
            if(user !== null)
            {
                postOtp(email).then(res =>{
                    if(res)
                    {
                        alert("Email has been sent check your mail and enter the OTP.")
                    }
                    else
                    {
                        alert("Email has not been sent due to some error.");
                    }
                })
            }
            else
            {
                alert("User does not exists already. Sign Up first to continue.");
            }
        });
    }

    return (
        <>
          <Head>
                <title>Login</title>
            </Head>
        <div className={styles.loginWrap}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formSignIn}>
                <div className="mb-3">
                    <label htmlFor="email" className={styles.formLabel}>
                        Email address
                    </label>
                    <input
                        type="text"
                        className="form-control my-3"
                        id="email"
                        name="email"
                        {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[a-zA-Z0-9\.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/,
                                message: "Please enter a valid email.",
                            },
                        })}
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    {errors?.email && (
                        <span className={styles.errors}>{errors.email.message}</span>
                    )}
                </div>
                <button type="submit" className="my-3 btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
        </>
    );
};
