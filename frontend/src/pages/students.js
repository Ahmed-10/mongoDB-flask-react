import React from 'react';
import { useHistory } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import StudentsTable from '../components/studentsTable';

function createData(id, name, email, age, grade, number, address) {
    return { id, name, email, age, grade, number, address };
  }

const rows = [
    createData(
        0, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        1, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        2, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        3, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        4, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        5, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        6, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        7, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        8, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        9, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        10, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        11, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        12, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
    createData(
        13, 
        'Alex Dupuy Franklin Kyler SHORT', 
        'Russorv@state.gov', 
        25, 
        'A',
        '(718) 491-9324',
        '5600 FIRST AVENUE Afghanistan'
    ),
  ];


const Students = () => {
    const history = useHistory()
    let matches = useMediaQuery('(max-width:762px)');

    const handleClick = () => {
        history.push({
            pathname: '/students/new'
        })
    }

    return (  
        <>
        <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        >
            <Grid item xs={(matches === true)? 6 : 9}>
                <h2>Students Table</h2>
            </Grid>
            <Grid item xs={(matches === true)? 4 : 2}>
                <Fab 
                color="primary"  
                variant="extended"
                style={{ marginTop: 30, marginBottom: 30, }}
                onClick={handleClick}>
                    <AddIcon />
                    student
                </Fab>
            </Grid>
        </Grid>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >   
            <Grid item xs={10}>
                <StudentsTable 
                rows={rows}
                small={matches}/>
            </Grid>
        </Grid>
      </>
    );
}
 
export default Students;