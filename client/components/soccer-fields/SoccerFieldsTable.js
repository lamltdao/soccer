import React, { useState, useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import {
  Typography,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  FormControl,
} from "@material-ui/core";
import { SOCCERFIELDS_STATUS, SORT_ORDER } from "../../constants";
import { SoccerFieldsContext } from "../../contexts/SoccerFieldsProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const SoccerFieldsTable = () => {
  const classes = useStyles();
  const { soccerFields } = useContext(SoccerFieldsContext);
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

// Create mock data

function createData(placeId, name, price, distance, status) {
  return { placeId, name, price, distance, status };
}

const rows = [
  createData("ad", "San bong Hn-ams", 800000, 8.7, "Vacant"),
  createData("asv", "San bong HSGS", 1000000, 9.2, "Vacant"),
  createData("vsv", "San bong Thanh phat", 500000, 8.5, "Full"),
];

// Helpers function dealing with sorting and selecting rows

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(rows, comparator, status) {
  const stabilizedThis = rows
    .filter(
      (row) => status === SOCCERFIELDS_STATUS.All || row.status === status
    )
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
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    statusShown,
    setStatusShown,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  // functions to handle status column
  const [selectStatusOpen, setSelectStatusOpen] = useState(false);
  const handleOpen = () => {
    setSelectStatusOpen(true);
  };
  const handleClose = () => {
    setSelectStatusOpen(false);
  };
  const handleChange = (e) => {
    setStatusShown(e.target.value);
  };

  const MenuProps = {
    PaperProps: {
      className: classes.selectStatusMenu,
    },
  };
  return (
    <TableHead>
      <TableRow className={classes.tableHead}>
        <TableCell>
          <Typography color="secondary">Name</Typography>
        </TableCell>
        <TableCell sortDirection={orderBy === "price" ? order : false}>
          <TableSortLabel
            active={orderBy === "price"}
            direction={orderBy === "price" ? order : "asc"}
            onClick={createSortHandler("price")}
            classes={{
              icon: classes.sortIcon,
            }}
          >
            <Typography color="secondary">Price</Typography>
          </TableSortLabel>
        </TableCell>
        <TableCell sortDirection={orderBy === "distance" ? order : false}>
          <TableSortLabel
            classes={{
              icon: classes.sortIcon,
            }}
            active={orderBy === "distance"}
            direction={orderBy === "distance" ? order : "asc"}
            onClick={createSortHandler("distance")}
          >
            <Typography color="secondary">Distance</Typography>
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <FormControl className={classes.statusFormControl}>
            <InputLabel>
              <Typography color="secondary">Status</Typography>
            </InputLabel>
            <Select
              open={selectStatusOpen}
              onClose={handleClose}
              onOpen={handleOpen}
              value={statusShown}
              onChange={handleChange}
              MenuProps={MenuProps}
              classes={{
                icon: classes.dropDownIcon,
              }}
            >
              <MenuItem value={SOCCERFIELDS_STATUS.All}>
                <Typography color="secondary">All</Typography>
              </MenuItem>
              <MenuItem value={SOCCERFIELDS_STATUS.Vacant}>
                <Typography color="secondary">Vacant</Typography>
              </MenuItem>
              <MenuItem value={SOCCERFIELDS_STATUS.Full}>
                <Typography color="secondary">Full</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <Typography color="secondary">Detail</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf([SORT_ORDER.asc, SORT_ORDER.desc]).isRequired,
  orderBy: PropTypes.oneOf(["price", "distance"]).isRequired,
  setStatusShown: PropTypes.func.isRequired,
  statusShown: PropTypes.string,
};

// TABLE BODY

// styles used for both EnhancedTable and EnhancedTableHead(passing down prop classes)
const useTableStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  statusFormControl: {
    marginRight: theme.spacing(1),
    minWidth: 100,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
  vacantRow: {
    backgroundColor: theme.palette.success.main,
  },
  fullRow: {
    backgroundColor: theme.palette.error.main,
  },
  selectStatusMenu: {
    "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
      backgroundColor: theme.palette.info.main,
    },
    "& .MuiListItem-root": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiList-padding": {
      padding: 0,
    },
  },
  dropDownIcon: {
    color: "white",
  },
  sortIcon: {
    backgroundColor: "white",
  },
}));

const EnhancedTable = () => {
  const classes = useTableStyles();
  // By default, items are sorted in ascending order of price
  const [order, setOrder] = useState(SORT_ORDER.asc);
  const [orderBy, setOrderBy] = useState("price");
  const [statusShown, setStatusShown] = useState(SOCCERFIELDS_STATUS.Vacant);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === SORT_ORDER.asc;
    setOrder(isAsc ? SORT_ORDER.desc : SORT_ORDER.asc);
    setOrderBy(property);
  };

  // When a row is Clicked
  const handleClick = (event, row) => {};

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          statusShown={statusShown}
          setStatusShown={setStatusShown}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy), statusShown).map(
            (row) => {
              return (
                <TableRow
                  onClick={(event) => handleClick(event, row)}
                  key={row.placeId}
                  className={
                    row.status === SOCCERFIELDS_STATUS.Vacant
                      ? classes.vacantRow
                      : classes.fullRow
                  }
                >
                  <TableCell>
                    <Typography color="secondary">{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="secondary">{row.price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="secondary">{row.distance}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="secondary">{row.status}</Typography>
                  </TableCell>
                  <TableCell>
                    <Link href={`/soccer-fields/${row.placeId}`}>
                      <a style={{ textDecoration: "none" }}>
                        <Typography color="secondary">View</Typography>
                      </a>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
