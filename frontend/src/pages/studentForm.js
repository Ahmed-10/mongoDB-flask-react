import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { TextField } from 'formik-material-ui';
import { Button, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: '25ch',
    }
}));

const ColorButton = withStyles((theme) => ({
root: {
    color: theme.palette.getContrastText('#29479a'),
    backgroundColor: '#29479a',
    width: 'auto', 
    minWidth: '150px',
    borderRadius: '25px',
    marginBottom: '50px',
    '&:hover': {
    backgroundColor: '#294780',
    },
},
}))(Button);

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    grade: Yup.string()
        .max(3, 'Too Long!')
        .required('Required'),
    number: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    address: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    age: Yup.number().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const StudentForm = (props) => {
    const classes = useStyles();


    const history = useHistory()
    const url = (window.location.href).split('/')
    const type = url[url.length - 1] 

    let initialValues
    if (type === 'new'){
        initialValues = {
            name: '',
            email: '',
            age: '',
            grade: '',
            number: '',
            address: ''
        }
    }
    else if (type === 'edit'){
        initialValues = { 
            name: props.location.state.name,
            email: props.location.state.email,
            age: props.location.state.age,
            grade: props.location.state.grade,
            number: props.location.state.number,
            address: props.location.state.address
        }
    }

    const handleSubmit = async(values, { setSubmitting }) => {
        if( type === 'new'){
            fetch('http://127.0.0.1:5000/students', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then((res) => res.json())
            .then((res) => {
                if (res.error){
                    console.log(res.message)
                    history.push({ pathname: `/error/${res.error}`})
                }else{
                    history.push({ pathname: `/students/${res.student.id}`})
                }
            })
        }else if ( type === 'edit'){
            fetch(`http://127.0.0.1:5000/students/${props.location.state.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then((res) => res.json())
            .then((res) => {
                if (res.error){
                    console.log(res.message)
                    history.push({ pathname: `/error/${res.error}`})
                }else{
                    history.push({ pathname: `/students/${res.student.id}`})
                }
            })
        }
    }

    return (
        <>
        <Grid 
        container
        direction='row' 
        justify='space-evenly' 
        alignItems='center'>
            { (type === 'new')? 
            <h1>Add New Student</h1> : 
            <h1>Edit Student <br />id: {props.location.state.id}</h1> }
            <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            // onSubmit action 
            // onSubmit={(values, { setSubmitting }) => {
            //     setTimeout(() => {
            //         setSubmitting(false);
            //         alert(JSON.stringify(values));
            //     }, 500);
            //     }}
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values, { setSubmitting })
            }}>
            {({ submitForm, isSubmitting }) => (
            <Form className={classes.root} >
                <Grid container 
                direction='row' 
                justify='center' 
                alignItems='center'>
                    <Field 
                    name='name'
                    component={TextField}
                    id="standard-required" label="Name" />
                    <Field 
                    name='email'
                    component={TextField}
                    id="standard-required" label="Email" />
                </Grid>
                <Grid container 
                direction='row' 
                justify='center' 
                alignItems='center'>
                    <Field
                    name='age'
                    component={TextField}
                    id="standard-required"
                    label="age" />
                    <Field 
                    name='grade'
                    component={TextField}
                    id="standard-required" label="Grade" />
                </Grid>
                <Grid container 
                direction='row' 
                justify='center' 
                alignItems='center'>
                    <Field 
                    name='number'
                    component={TextField} 
                    id="standard-required" label="Number" />
                </Grid>
                <Grid container 
                direction='row' 
                justify='center' 
                alignItems='center'>
                    <Field
                    name='address'
                    component={TextField}
                    id="standard-required"
                    label="Address"/>
                </Grid>
                <Grid 
                container 
                direction='row' 
                justify='center' 
                alignItems='center'
                style={{marginTop: 40}}>
                    <ColorButton
                    disabled={isSubmitting}
                    onClick={submitForm}>
                        submit
                    </ColorButton>
                </Grid>
            </Form>
            )}
            </Formik>
        </Grid>
        </>
    );
}
 
export default StudentForm;