import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { TextField } from 'formik-material-ui';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    phone: Yup.string()
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
    const url = (window.location.href).split('/')
    const type = url[url.length - 1] 

    let initialValues
    if (type === 'new'){
        initialValues = {
            name: '',
            email: '',
            age: '',
            grade: '',
            phone: '',
            address: ''
        }
    }
    else if (type === 'edit'){
        initialValues = { 
            name: props.location.state.name,
            email: props.location.state.email,
            age: props.location.state.age,
            grade: props.location.state.grade,
            phone: props.location.state.number,
            address: props.location.state.address
        }
    }
    
    const classes = useStyles();

    const [grade, setGrade] = React.useState('');

    const handleChange = (event) => {
        setGrade(event.target.value);
    };

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
            {/* { (type === 'edit') && <p>id: {props.location.state.id}</p> } */}
            <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            // onSubmit action 
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                }, 500);
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
                    component= {FormControl} className={classes.formControl}>
                        <InputLabel id="simple-select-label">Grade</InputLabel>
                        <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={grade}
                        onChange={handleChange}
                        >
                        <MenuItem value={'A'}>A</MenuItem>
                        <MenuItem value={'A+'}>A+</MenuItem>
                        <MenuItem value={'B'}>B</MenuItem>
                        <MenuItem value={'B+'}>B+</MenuItem>
                        <MenuItem value={'C'}>C</MenuItem>
                        <MenuItem value={'C+'}>C+</MenuItem>
                        <MenuItem value={'D'}>D</MenuItem>
                        <MenuItem value={'F'}>F</MenuItem>
                        </Select>
                    </Field>
                </Grid>
                <Grid container 
                direction='row' 
                justify='center' 
                alignItems='center'>
                    <Field 
                    name='phone'
                    component={TextField} 
                    id="standard-required" label="Phone Number" />
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