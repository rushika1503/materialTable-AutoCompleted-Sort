import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from "@material-ui/icons/Search";



function createData(id,createdTime,customer,product,startTime,endTime,distirbution,status,deliveryStatus,price){
  return{id,createdTime,customer,product,startTime,endTime,distirbution,status,deliveryStatus,price};
}
const rows = [
  createData('QH29','15 JUL 2020','Peter Kristinen','Orebea Orca M30','08 Aug 2020','12 Aug 2020','Grubbegeta 1','Cancelled','cancelled',800),
  createData('VB58','15 JUN 2020','Ola Nordman','Pinarello Gan Desk','08 Aug 2020','12 Aug 2020','Grubbegeta 1','Request','In Transport',800),
  createData('LH44','05 APR 2020','Vigo Aukland','Orebea Orca M30','08 Aug 2020','12 Aug 2020','Grubbegeta 1','Booked','Delayed',800),
  createData('T549','15 MAY 2020','Merethe Meiling','Orebea Orca M30','08 Aug 2020','12 Aug 2020','Grubbegeta 1','Closed','Picked Up',800),
  createData('QE80','15 SEP 2020','Edvin Jonsaon','Orebea Orca M30','08 Aug 2020','12 Aug 2020','Grubbegeta 1','Cancelled','cancelled',800),
  createData('HJ91','01 OCT 2020','Rushika Siri','Orebea Orca M30','08 Aug 2020','12 Aug 2020','Grubbegeta 1','Cancelled','cancelled',800),
]


const useStyles = makeStyles((theme) => ({

    table: {
     maxWidth: '-webkit-fill-available',
     margin :'10px'
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 1250
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#f5f2f2',
        color: 'cadetblue'
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));
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
  { id: 'id', numeric: false, disablePadding: true, label: 'REF' },
  { id: 'createdTime', numeric: true, disablePadding: false, label: 'CREATED' },
  { id: 'customer', numeric: true, disablePadding: false, label: 'CUSTOMER' },
  { id: 'product', numeric: false, disablePadding: false, label: 'PRODUCT'},
  { id: 'startTime', numeric: true, disablePadding: false, label: 'START TIME' },
  { id: 'endTime', numeric: true, disablePadding: false, label: 'END TIME' },
  { id: 'distribuiton', numeric: false, disablePadding: false, label: 'DISTRIBUTION' },
  { id: 'status', numeric: false, disablePadding: false, label: 'STATUS' },
  {id: 'deliveryStatus', numeric: false, disablePadding: false, label: 'Delivery Status' },
  { id: 'price', numeric: true, disablePadding: false, label: 'PRICE' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
 
    <TableHead className={classes.table} aria-label="simple table" >
      <TableRow>
        <TableCell  className={classes.tableHeaderCell}>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell 
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            className={classes.tableHeaderCell}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const classes = props;
  const { numSelected } = props;

  return (
  <TableContainer >
    <Table>
        <TableHead>
          <TableCell style={{font:'bold',fontSize:'2rem'}}>Orders</TableCell>
          <TableCell>
            {/* <SearchIcon style={{marginBottom: '-2em',
              zIndex: '1000',
              marginLeft: '0.8em'}}/> */}
              <Autocomplete
                  options={rows}
                  getOptionLabel={(option) => ( option.product)}
                  style={{ width: 300, backgroundColor:'white'}}
                  renderInput={(params) => <TextField {...params}  placeholder="   Search by any order parameter" variant="outlined" style={{marginLeft:'1.25em'}} id="standard-basic" />} />
          </TableCell>
      
        </TableHead>
    </Table>
  </TableContainer>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};



export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
 
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer >
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
                   
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow>
                      <TableCell >
                       
                      </TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.createdTime}</TableCell>
                      <TableCell align="right">{row.customer}</TableCell>
                      <TableCell align="right" >{row.product}</TableCell>
                      <TableCell align="right">{row.startTime}</TableCell>
                      <TableCell align="right">{row.endTime}</TableCell>
                      <TableCell align="right">{row.distirbution}</TableCell>
                      
                      <TableCell>
                            <Typography 
                              className={classes.status}
                              style={{
                                  backgroundColor: 
                                  ((row.status === 'Request' && 'yellow') ||
                                  (row.status === 'Closed' && 'grey') ||
                                  (row.status === 'Booked' && 'green') ||
                                  (row.status === 'Cancelled' && 'red')) 
                                  
                              }}
                            >{row.status}</Typography>
                      </TableCell>
                      <TableCell align="right">{row.deliveryStatus}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination className={classes.tableContainer}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

  );
}
