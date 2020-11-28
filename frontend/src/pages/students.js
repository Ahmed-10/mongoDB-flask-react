import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import StudentsTable from '../components/studentsTable';

/*
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
        'Andrew Mayock Adam Noelle CARSON', 
        'sullivanjj@state.com', 
        23, 
        'C',
        '(718) 492-0760',
        '5600 FIRST AVENUE Åland Islands'
    ),
    createData(
        2, 
        'Andrew Shapiro Alex Josie MORROW', 
        'Russorv@state.gov', 
        32, 
        'B',
        '(043) 748-1721',
        '5600 FIRST AVENUE Albania'
    ),
    createData(
        3, 
        'Anne-Marie Slaughter Alonzo Jennifer COLON', 
        'Russorv@state.gov', 
        23, 
        'D',
        '(718) 499-7821',
        '5600 FIRST AVENUE Algeria'
    ),
    createData(
        4, 
        'Anthony Lake Everett Melissa HOLLOWAY', 
        'sullivanjj@gmail.com', 
        32, 
        'F',
        '(718) 238-7033',
        '5600 1ST AVE B-8 American Samoa'
    ),
    createData(
        5, 
        'Arturo Valenzuela Clifford Milo SUMMERS', 
        'Russorv@state.gov', 
        56, 
        'A+',
        '(718) 238-8766',
        '5600 1ST AVENUE Andorra'
    ),
    createData(
        6, 
        'Ban Ki-moon Victor Archer BRYAN', 
        'mhcaleja@state.gov', 
        33, 
        'C+',
        '(718) 836-8159',
        '5600 FIRST AVENUE Angola'
    ),
    createData(
        7, 
        'Barack Obama Eddie Gabriela PETERSEN', 
        'postmaster@state.gov', 
        21, 
        'B',
        '48867',
        'BROOKLYN NAVY YARD, BUILDING # 7 Anguilla'
    ),
    createData(
        8, 
        'Barbara Mikulski Alvin Allie MCKENZIE', 
        'rooneym@state.gov', 
        45, 
        'A',
        '43006801300',
        '826 WASHINGTON STREET Antarctica'
    ),
    createData(
        9, 
        'Betsy Ebeling Levi Eloise SERRANO', 
        'russorv@stategov', 
        44, 
        'B',
        '(718) 4398375',
        '525 WEST STREET Antigua & Barbuda'
    ),
    createData(
        10, 
        'Bill Clinton Amos Jeffrey WILCOX', 
        'sullivahu@state.gov', 
        35, 
        'B+',
        '(010) 491-2773',
        '1195 SPOFFORD AVE Argentina'
    ),
    createData(
        11, 
        'Biography Roscoe Holden CAREY', 
        'russoiv@state.gov', 
        46, 
        'C+',
        '(718) 6305555',
        '1170 RANDALL AVE Armenia'
    ),
    createData(
        12, 
        'Bonnie Klehr Wesley Arthur CLAYTON', 
        'miliscd@stategov', 
        34, 
        'D',
        '(718) 4395410',
        '426 BARRETO STREET Aruba'
    ),
    createData(
        13, 
        'Brian Greenspun Mary Cassidy POOLE', 
        'abedinh@stategov', 
        26, 
        'F',
        '7184399096',
        '700 WHITTIER STREET Ascension Island'
    ),
  ];
*/

const Students = () => {
    const [rows, setRows] = useState([])
    const [err, setErr] = useState('')

    useEffect(() => {
        fetchStudents()
    }, []);

    const fetchStudents = async() => {
        await fetch('http://127.0.0.1:5000/students', {
            method: 'GET'
        }).then((res) => res.json())
        .then((res) => setRows(res.students))
        .catch((error) => {
            setErr(error.name + ': ' + error.message);
            console.log(err)
        })
    }

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
                rows={rows}/>
            </Grid>
        </Grid>
      </>
    );
}
 
export default Students;