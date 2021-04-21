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
import { fetchRecords } from '../../redux/action/exam';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize, formatDate } from 'src/utils/functions';


const ExamRecords = (props) => {

    const dispatch = useDispatch();
    // const [userToDelete, setUserToDelete] = React.useState(null);
    const { records } = useSelector(state => state.Exam);

    React.useEffect(() => {
        dispatch(fetchRecords());
    }, []);

    // const handleDelete = async (id) => {
    //     setUserToDelete(id);
    //     dispatch(deleteUser(id));
    // }

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
                                <CardHeader title="Your records" />
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
                                                        Exam Title
                                                    </TableCell>
                                                    <TableCell>
                                                        Exam Year
                                                    </TableCell>
                                                    <TableCell>
                                                        Score Attained
                                                    </TableCell>
                                                    <TableCell>
                                                        Grade Letter
                                                    </TableCell>
                                                    <TableCell>
                                                        Total Questions
                                                    </TableCell>
                                                    <TableCell>
                                                        Date Taken
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {records.map((record, index) => (
                                                    <TableRow hover key={record.id}>
                                                        <TableCell>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {record.title}
                                                        </TableCell>
                                                        <TableCell>
                                                            {record.year}
                                                        </TableCell>
                                                        <TableCell>
                                                            {record.score}
                                                        </TableCell>
                                                        <TableCell>
                                                            {record.grade}
                                                        </TableCell>
                                                        <TableCell>
                                                            {record.total}
                                                        </TableCell>
                                                        <TableCell>
                                                            {formatDate(record.created)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        {records.length === 0 &&
                                            <Typography>
                                                <Box textAlign="center" py={3}>
                                                    You have not taken any exams. 
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

export default ExamRecords;
