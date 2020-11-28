import React from 'react';
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
  { id: 'grade', numeric: false, disablePadding: false, label: 'Grade' },
  { id: 'number', numeric: false, disablePadding: false, label: 'Number' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy,  onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  table: {
    width: '100%'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function StudentsTable(props) {
  const history = useHistory();
  const classes = useStyles();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  
  const rowsPerPage = 10
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (id, name, email, age, grade, number, address) => {
    history.push({ 
        pathname: `/students/${name}`,
        state: { 
          'id': id, 
          'name': name,
          'email': email,
          'age': age,
          'grade': grade,
          'number': number,
          'address': address
        } 
    })
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <TableContainer>
      <Table
      className={classes.table}
      aria-labelledby="tableTitle"
      size='medium'
      aria-label="enhanced table">
        <EnhancedTableHead
        classes={classes}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        rowCount={props.rows.length}/>
        <TableBody>
        {stableSort(props.rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
            hover
            onClick={(event) => handleClick(
              row.id, 
              row.name, 
              row.email,
              row.age,
              row.grade,
              row.number,
              row.address
            )}
            tabIndex={-1}
            key={row.name}
            style={{ cursor: 'pointer' }}>
            <TableCell 
            component="th" 
            id={labelId} 
            scope="row" 
            align="right">
                {row.id}
            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.email}</TableCell>
            <TableCell align="right">{row.age}</TableCell>
            <TableCell align="left">{row.grade}</TableCell>
            <TableCell align="left">{row.number}</TableCell>
            <TableCell align="left">{row.address}</TableCell>
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
          </TableRow>
        )}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
      rowsPerPageOptions={[10]}
      component="div"
      count={props.rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}/>
    </div>
  );
}
