import React from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import {
    Box,
    TextField,
    Button,
    // ButtonBase,
    Container,
    Grid,
    Link,
    Typography,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Budget from '../../components/dashboard/Budget';
import LatestOrders from '../../components/dashboard/LatestOrders';
import LatestProducts from '../../components/dashboard/LatestProducts';
import Sales from '../../components/dashboard/Sales';
import TasksProgress from '../../components/dashboard/TasksProgress';
import TotalCustomers from '../../components/dashboard/TotalCustomers';
import TotalProfit from '../../components/dashboard/TotalProfit';
import TrafficByDevice from '../../components/dashboard/TrafficByDevice';
import DashboardLayout from '../../components/DashboardLayout';
import { createExam } from '../../redux/action/exam';
import { useDispatch, useSelector } from 'react-redux';


const CreateUser = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { creatingExam, createExamError } = useSelector(state => state.Exam);
    const [submitted, setSubmitted] = React.useState(false);
    // const handleDelete = async (id) => {
    //     setUserToDelete(id);
    //     dispatch(deleteUser(id));
    // }

    React.useEffect(() => {
        if (submitted && !creatingExam && createExamError === null) {
            history.push("/teacher");
        }
        return () => null;
    }, [submitted, creatingExam, createExamError, history]);
    return (
        <DashboardLayout>
            <Helmet>
                <title>Create Exam | Exam Website</title>
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
                            <Box
                                sx={{
                                    backgroundColor: 'background.default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'center'
                                }}
                            >
                                {/* <Container maxWidth="sm"> */}
                                <Formik
                                    initialValues={{
                                        title: '',
                                        year: '',
                                        time_limit: '',
                                    }}
                                    validationSchema={
                                        Yup.object().shape({
                                            title: Yup.string().max(255).required('Exam Title is required'),
                                            year: Yup.string().max(4).required('Year of Exam is required'),
                                            time_limit: Yup.number().required('Time Limit is required').positive().integer(),
                                        })
                                    }
                                    onSubmit={(values) => {
                                        dispatch(createExam(values));
                                        setSubmitted(true);
                                    }}
                                >
                                    {({
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                        isSubmitting,
                                        touched,
                                        values
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Box sx={{ mb: 3 }}>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="h2"
                                                >
                                                    Create an Examination
                                                    </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    You can add as many exams to the platform!
                                                </Typography>
                                            </Box>
                                            <TextField
                                                error={Boolean(touched.title && errors.title)}
                                                fullWidth
                                                helperText={touched.title && errors.title}
                                                label="Exam Title"
                                                margin="normal"
                                                name="title"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.title}
                                                variant="outlined"
                                            />
                                            <TextField
                                                error={Boolean(touched.year && errors.year)}
                                                fullWidth
                                                helperText={touched.year && errors.year}
                                                label="Year of Examination"
                                                margin="normal"
                                                name="year"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.year}
                                                variant="outlined"
                                            />
                                            <TextField
                                                error={Boolean(touched.time_limit && errors.time_limit)}
                                                fullWidth
                                                helperText={touched.time_limit && errors.time_limit}
                                                label="Time Allocated"
                                                margin="normal"
                                                name="time_limit"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.time_limit}
                                                variant="outlined"
                                            />

                                            <Box sx={{ py: 2 }}>
                                                <Button
                                                    color="primary"
                                                    disabled={creatingExam}
                                                    // fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Create Exam
                                                    </Button>
                                            </Box>
                                        </form>
                                    )}
                                </Formik>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    );
}

export default CreateUser;
