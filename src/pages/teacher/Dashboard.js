import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  ButtonBase,
  Container,
  Grid,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import DashboardLayout from '../../components/DashboardLayout';
import { fetchExams, deleteExam } from '../../redux/action/exam';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const Dashboard = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { exams, deletingExam } = useSelector(state => state.Exam);
  const [examToDelete, setExamToDelete] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchExams(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    setExamToDelete(id);
    dispatch(deleteExam(id));
  }

  const handleManage = async (id) => {
    history.push(`/teacher/exams/${id}`)
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
                <CardHeader title="Your Exams" />
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
                            Course Title
                          </TableCell>
                          <TableCell>
                            Year
                          </TableCell>
                          <TableCell>
                            Time Limit
                          </TableCell>
                          <TableCell>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {exams.map((exam, index) => {

                          return (
                            <TableRow hover key={exam.id}>
                              <TableCell>
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                {exam.title}
                              </TableCell>
                              <TableCell>
                                {exam.year}
                              </TableCell>
                              <TableCell>
                                {exam.time_limit}
                              </TableCell>
                              <TableCell>
                                <Grid container justify="space-around">
                                  <Grid item xs={4}>
                                    <ButtonBase
                                      onClick={() => handleManage(exam.id)}>
                                      <Box width={"80px"} bgcolor="#1976d2" px={1} py={1} borderRadius="4px" color="white" fontWeight="bold">
                                        {"MANAGE"}
                                      </Box>
                                    </ButtonBase>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <ButtonBase
                                      onClick={() => handleDelete(exam.id)}>
                                      <Box width={"80px"} bgcolor="#dc004e" px={1} py={1} borderRadius="4px" color="white" fontWeight="bold">
                                        {deletingExam && examToDelete === exam.id ? "DELETING" : "DELETE"}
                                      </Box>
                                    </ButtonBase>
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                          )
                        }
                        )}
                      </TableBody>
                    </Table>
                    {exams.length === 0 &&
                      <Typography>
                        <Box textAlign="center" py={3}>
                          There are no exams available at this time.
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
