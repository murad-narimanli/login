import React  , {useState , useEffect}  from 'react';

// material imports
import { Typography , Paper , Avatar , Button  , FormControl , Input , InputLabel} from '@material-ui/core';
import   VerifiedUserOutlined   from '@material-ui/icons/VerifiedUserOutlined';
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

function Dashboard(props) {
    const {classes} = props
    if (!firebase.getUsername()){
        alertify.set('notifier','position', 'top-right');
        alertify.error('Login please')
        props.history.replace('/login')
        return null
    }
    //
    // const [auth ,  setauth] = useState('')
    // useEffect(()=>{
    //     firebase.getAuth().then(setauth)
    // })

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VerifiedUserOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Hello {firebase.getUsername()}
                </Typography>
                {/*<Typography component="h1" variant="h5">*/}
                {/*    auth {auth}*/}
                {/*</Typography>*/}


                <Button className={classes.submit} type="submit" fullWidth variant="outlined" color="primary" onClick={logOut}>Logout</Button>
            </Paper>
        </main>
    );

    async function logOut (){
        try{
            await  firebase.logOut()
            props.history.push('/')
        }catch (err) {
            alertify.set('notifier','position', 'top-right');
            alertify.error(err.message)
        }
    }

}


export default withRouter(withStyles(styles)(Dashboard));
