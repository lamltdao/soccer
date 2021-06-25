import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, makeStyles, Button } from '@material-ui/core';
//
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
//
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const SoccerFieldsTable = ({ soccerFields }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* {soccerFields.length > 0 ? (
        <>
          <Typography variant="h5">Compare Results</Typography>
          <EnhancedTable />
        </>
      ) : (
        <Typography>Nothing to display</Typography>
      )} */}

      {/** Temporarily comment the above code bc we'll test the table without using the Map */}
      <>
        <Typography variant="h5">Compare Results</Typography>
        <EnhancedTable />
      </>
    </div>
  );
};

SoccerFieldsTable.propTypes = {
  soccerFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      color: PropTypes.string,
    })
  ),
};

export default SoccerFieldsTable;

// Helpers function dealing with sorting and selecting rows

function createData(name, price, distance, status) {
  return { name, price, distance, status };
}

const rows = [
  createData('San bong Hn-ams', 800000, 8, 'Vacant'),
  createData('San bong HSGS', 1000000, 9, 'Vacant'),
  createData('San bong Thanh phat', 500000, 8.5, 'Full'),
];

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

function stableSort(rows, comparator, status = null) {
  const stabilizedThis = rows
    .filter((row) => status == null || row.status === status)
    .map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// TABLE HEAD
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, statusShown, setStatusShown } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleStatusChange = () => {
    setStatusShown((prev) => {
      if(prev == null || prev == 'Full') {
        return 'Vacant';
      }
      else return null;
    })
  }
  return (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell sortDirection={orderBy === 'price' ? order : false}>
          <TableSortLabel
            active={orderBy === 'price'}
            direction={orderBy === 'price' ? order : 'asc'}
            onClick={createSortHandler('price')}
          >
            Price
          </TableSortLabel>
        </TableCell>
        <TableCell sortDirection={orderBy === 'distance' ? order : false}>
          <TableSortLabel
            active={orderBy === 'distance'}
            direction={orderBy === 'distance' ? order : 'asc'}
            onClick={createSortHandler('distance')}
          >
            Distance
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <Button onClick={handleStatusChange}>
            {statusShown ? 'Vacant' : 'Status'}
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.oneOf(['price', 'distance']).isRequired,
  setStatusShown: PropTypes.func.isRequired,
  statusShown: PropTypes.string,
};

// TABLE BODY
const useTableStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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

const EnhancedTable = () => {
  const classes = useTableStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('price');
  const [statusShown, setStatusShown] = useState(null);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // When a row is Clicked
  const handleClick = (event, name) => {};

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table}>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              statusShown={statusShown}
              setStatusShown={setStatusShown}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy), statusShown).map((row) => {
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    key={row.name}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.distance}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
