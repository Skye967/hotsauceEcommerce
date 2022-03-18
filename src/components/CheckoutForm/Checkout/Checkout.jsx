/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core'
import useStyles from './styles.js'
import AddressForm from '../AddressForm.jsx';
import PaymentForm from '../PaymentForm.jsx';
import { commerce } from '../../../lib/commerce.js';
import { Link, useNavigate } from 'react-router-dom';


const steps = ['Shipping address', 'Payment details'];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const history = useNavigate();

    useEffect(() => {
        const generateToken = async () =>{
            try {
                console.log('token')

                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})

                console.log(token)

                setCheckoutToken(token);
            }catch(error){
                console.log(error)
                //history("/")
            }
        }
        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        console.log("next")
        console.log(data)
        setShippingData(data);
        console.log(shippingData);

        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
                <br/>
                <Button component={Link} to="/" variant='outlined' type='button'>Back to Home</Button>
            
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase</Typography>
                <Divider className={classes.divider}/>
            </div>
                <br/>
                <Button component={Link} to="/" variant='outlined' type='button'>Back to Home</Button>
            
        </>    
    ) : (
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    );

    if(error){
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant='outlined' type='button'>Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />

  return (
    <>
        <CssBaseline/>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form/>} 
            </Paper>
        </main>
    </>
  )
}

export default Checkout