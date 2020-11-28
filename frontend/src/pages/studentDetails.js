import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const StudentDetails = (props) => {
    const url = (window.location.href).split('/')
    const id = url[url.length - 1] 

    const history = useHistory()
    const [student, setStudent] = useState({})
    const [err, setErr] = useState('')


    useEffect(() => {
        const fetchStudent = async () => {
            await fetch(`http://127.0.0.1:5000/students/${id}`, {
                method: 'GET'
            }).then((res) => res.json())
            .then((res) => {
                if (res.error){
                    setErr(res.message);
                    history.push({ pathname: `/error/${res.error}`})
                }else{
                    setStudent(res.student);
                }
            }).catch((error) => {
                setErr(error.name + ': ' + error.message);
                console.log(err)
            })
        }
        fetchStudent()
    }, [err, history, id])

    const handleClick = () => {
        history.push({
            pathname: `/students/${student.id}/edit`,
            state: { 
                'id': student.id, 
                'name': student.name,
                'email': student.email,
                'age': student.age,
                'grade': student.grade,
                'number': student.number,
                'address': student.address
              }
        })
    }

    const handleDelete = async() => {
        await fetch(`http://127.0.0.1:5000/students/${student.id}`, {
            method: 'DELETE'
        }).then((res) => res.json())
        .then((res) => console.log(res))
        .then(() => history.push({
            pathname: '/students'
        }))
    }

    return (
        <>
        <Grid container
        direction="row"
        justify="center"
        alignItems="center">
            <Grid item xs={10}>
                <h1>{student.name}</h1>
            </Grid>
            <Grid item xs={10}>
                <p><small>id: {student.id}</small></p>
            </Grid>
        </Grid>
        <Grid container
        direction="row"
        justify="center"
        alignItems="center">
            <Grid item xs={10} sm={5}>
                <p><strong>email: </strong>{student.email}</p>
                <p><strong>phone: </strong>{student.number}</p>
            </Grid>
            <Grid item xs={10} sm={5}>
                <p><strong>age: </strong>{student.age}</p>
                <p><strong>grade: </strong>{student.grade}</p>
            </Grid>
            <Grid item xs={10}>
                <p><strong>address: </strong>{student.address}</p>
            </Grid>
        </Grid>
        <Grid container
        direction="row"
        justify="flex-end"
        alignItems="center">
            <Fab 
            color="primary"  
            variant="extended"
            style={{ marginTop: 30, marginBottom: 30, }}
            onClick={handleClick}>
                <EditIcon />
                edit
            </Fab>
            <span style={{ width: 10 }}></span>
            <Fab 
            color="secondary"  
            style={{ marginTop: 30, marginBottom: 30, }}
            onClick={handleDelete}>
                <DeleteIcon />
            </Fab>
            <span style={{ width: 30 }}></span>
        </Grid>
    </>
    );
}
 
export default StudentDetails;