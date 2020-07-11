import React , {useState} from 'react';

// material imports
import { Typography , Paper , Avatar , Button  , FormControl , Input , InputLabel} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from "@material-ui/core/styles/withStyles";

// react router dom
import { Link , withRouter } from 'react-router-dom'

//import firebase
import firebase from "../firebase";

import alertify from "alertifyjs";


const styles = theme => ({
    main:{
        width:'auto',
        display: 'block',
        marginLeft:theme.spacing(3) ,
        marginRight:theme.spacing(3) ,
        [theme.breakpoints.up(400 + theme.spacing(6))]:{
            width: 400 ,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    },
    paper: {
        marginTop: theme.spacing(10),
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding:`${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
    },
    avatar:{
        margin:theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    submit:{
        marginTop: theme.spacing(2)
    },
    form:{
        width: '100%',
        marginTop: theme.spacing(1)
    }
})

function Register(props) {
    const {classes} = props
    const [passs , setPass] = useState('');
    const [mails ,  setMail ] = useState('')
    const [names ,  setName ] = useState('')
    const [authan ,  setAuthan ] = useState('')
    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in here
                </Typography>
                <form className={classes.form}>
                    <FormControl margin='normal' required fullWidth >
                        <InputLabel htmlFor="name">UserName</InputLabel>
                        <Input value={names} onChange={e => setName(e.target.value)} name="name" id="name" autoComplete='off' autoFocus ></Input>
                    </FormControl>

                    <FormControl margin='normal' required fullWidth >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input value={mails} onChange={e => setMail(e.target.value)} name="email" id="email" autoComplete='off' autoFocus ></Input>
                    </FormControl>

                    <FormControl margin='normal' required fullWidth >
                        <InputLabel htmlFor="pass">Password</InputLabel>
                        <Input value={passs} onChange={e => setPass(e.target.value)} name="pass" id="pass" autoComplete='off' autoFocus ></Input>
                    </FormControl>

                    <FormControl margin='normal' required fullWidth >
                        <InputLabel htmlFor="authan">Authantication key (word only you know)</InputLabel>
                        <Input value={authan} onChange={e => setAuthan(e.target.value)} name="authan" id="authan" autoComplete='off' autoFocus ></Input>
                    </FormControl>
                </form>
                <Button className={classes.submit} type="submit" fullWidth variant="outlined" color="primary" onClick={onRegister}>Register</Button>
                <Button className={classes.submit} type="submit" fullWidth variant="outlined" color="secondary" component={Link} to={'/'}>Home page</Button>
            </Paper>
        </main>
    );

    async function onRegister() {
        try {
            await firebase.register(names , mails , passs)
            await firebase.addAuth(authan)
            props.history.replace('/dashboard')
        }catch (err) {
            alertify.set('notifier','position', 'top-right');
            alertify.error(err.message)
        }
    }

}





export default withRouter(withStyles(styles)(Register));
