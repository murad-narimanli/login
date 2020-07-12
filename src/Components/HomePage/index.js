import React from 'react';

// material imports
import { Typography , Paper , Avatar , Button } from '@material-ui/core';
import   VerifiedUserOutlined   from '@material-ui/icons/VerifiedUserOutlined';
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
// react router dom
import { Link , Redirect } from 'react-router-dom'
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
    }
})

function Homepage(props) {
    const {classes} = props

    return !firebase.getUsername() ? (
       <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VerifiedUserOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Guest Login
                </Typography>
                <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary" component={Link} to={'/register'}>Registr</Button>
                <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary" component={Link} to={'/login'}>Login</Button>
                <Button className={classes.submit} type="submit" fullWidth variant="outlined" color="secondary" component={Link} to={'/dashboard'}>Dashboard</Button>
            </Paper>
       </main>
    ):<Redirect to={'/dashboard'} />
}


export default withStyles(styles)(Homepage);
