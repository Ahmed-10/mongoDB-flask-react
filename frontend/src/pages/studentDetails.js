import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const StudentDetails = (props) => {
    const history = useHistory()
    const handleClick = () => {
        history.push({
            pathname: `/students/${props.location.state.id}/edit`,
            state: { 
                'id': props.location.state.id, 
                'name': props.location.state.name,
                'email': props.location.state.email,
                'age': props.location.state.age,
                'grade': props.location.state.grade,
                'number': props.location.state.number,
                'address': props.location.state.address
              }
        })
    }

    return (
        <>
        <Grid container
        direction="row"
        justify="center"
        alignItems="center">
            <Grid item xs={10}>
                <h1>{props.location.state.name}</h1>
            </Grid>
            <Grid item xs={10}>
                <p><small>id: {props.location.state.id}</small></p>
            </Grid>
        </Grid>
        <Grid container
        direction="row"
        justify="center"
        alignItems="center">
            <Grid item xs={10} sm={5}>
                <p><strong>email: </strong>{props.location.state.email}</p>
                <p><strong>phone: </strong>{props.location.state.number}</p>
            </Grid>
            <Grid item xs={10} sm={5}>
                <p><strong>age: </strong>{props.location.state.age}</p>
                <p><strong>grade: </strong>{props.location.state.grade}</p>
            </Grid>
            <Grid item xs={10}>
                <p><strong>address: </strong>{props.location.state.address}</p>
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
            style={{ marginTop: 30, marginBottom: 30, }}>
                <DeleteIcon />
            </Fab>
            <span style={{ width: 30 }}></span>
        </Grid>
    </>
    );
}
 
export default StudentDetails;