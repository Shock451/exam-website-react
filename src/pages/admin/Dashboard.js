import React from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import {
  Box,
  ButtonBase,
  Container,
  Grid,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import DashboardLayout from '../../components/DashboardLayout';
import { fetchUsers, deleteUser } from '../../redux/action/admin';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from 'src/utils/functions';


const Dashboard = (props) => {

  const dispatch = useDispatch();
  const [userToDelete, setUserToDelete] = React.useState(null);
  const { users, deletingUser } = useSelector(state => state.Admin);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDelete = async (id) => {
    setUserToDelete(id);
    dispatch(deleteUser(id));
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard | Exam Website</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Card {...props}>
                <CardHeader title="All Registered Users" />
                <Divider />
                <PerfectScrollbar>
                  <Box sx={{ minWidth: 800 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            #
                          </TableCell>
                          <TableCell>
                            Full Name
                          </TableCell>
                          {/* <TableCell sortDirection="desc">
                            <Tooltip
                              enterDelay={300}
                              title="Sort"
                            >
                              <TableSortLabel
                                active
                                direction="desc"
                              >
                                Date
                            </TableSortLabel>
                            </Tooltip>
                          </TableCell> */}
                          <TableCell>
                            Email
                          </TableCell>
                          <TableCell>
                            Phone Number
                          </TableCell>
                          <TableCell>
                            Role
                          </TableCell>
                          <TableCell>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user, index) => (
                          <TableRow hover key={user.id}>
                            <TableCell>
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              {user.name}
                            </TableCell>
                            <TableCell>
                              {user.email}
                            </TableCell>
                            <TableCell>
                              {user.mobile}
                            </TableCell>
                            <TableCell>
                              {capitalize(user.role)}
                            </TableCell>
                            <TableCell>
                              <ButtonBase
                                onClick={() => handleDelete(user.id)}>
                                <Box width={"80px"} bgcolor="#dc004e" px={1} py={1} borderRadius="4px" color="white" fontWeight="bold">
                                  {deletingUser && userToDelete === user.id ? "DELETING" : "DELETE"}
                                </Box>
                              </ButtonBase>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {users.length === 0 &&
                      <Typography>
                        <Box textAlign="center" py={3}>
                          There are no registered users.
                      </Box>
                      </Typography>
                    }
                  </Box>
                </PerfectScrollbar>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;
