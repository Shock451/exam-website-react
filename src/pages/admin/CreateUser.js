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
import { addTeacher } from '../../redux/action/admin';
import { useDispatch, useSelector } from 'react-redux';


const CreateUser = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { addingTeacher, addTeacherError } = useSelector(state => state.Admin);
    const [submitted, setSubmitted] = React.useState(false);
    // const handleDelete = async (id) => {
    //     setUserToDelete(id);
    //     dispatch(deleteUser(id));
    // }

    React.useEffect(() => {
        if (submitted && !addingTeacher && addTeacherError === null){
            history.push("/admin");
        }
        return () => null;
    }, [submitted, addingTeacher, addTeacherError, history]);
    return (
        <DashboardLayout>
            <Helmet>
                <title>Create User | Exam Website</title>
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
                                            email: '',
                                            name: '',
                                            mobile: '',
                                            password: '',

                                        }}
                                        validationSchema={
                                            Yup.object().shape({
                                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                                name: Yup.string().max(255).required('Full name is required'),
                                                mobile: Yup.string().max(255).required('Mobile number is required'),
                                                password: Yup.string().max(255).required('password is required'),
                                            })
                                        }
                                        onSubmit={(values) => {
                                            dispatch(addTeacher(values));
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
                                                        Add Teacher Account
                                                    </Typography>
                                                    <Typography
                                                        color="textSecondary"
                                                        gutterBottom
                                                        variant="body2"
                                                    >
                                                        You can add as many teachers to the platform!
                                                </Typography>
                                                </Box>
                                                <TextField
                                                    error={Boolean(touched.name && errors.name)}
                                                    fullWidth
                                                    helperText={touched.name && errors.name}
                                                    label="Teacher's name"
                                                    margin="normal"
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    error={Boolean(touched.email && errors.email)}
                                                    fullWidth
                                                    helperText={touched.email && errors.email}
                                                    label="Teacher's Official Email Address"
                                                    margin="normal"
                                                    name="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="email"
                                                    value={values.email}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    error={Boolean(touched.password && errors.password)}
                                                    fullWidth
                                                    helperText={touched.password && errors.password}
                                                    label="Password"
                                                    margin="normal"
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="password"
                                                    value={values.password}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    error={Boolean(touched.mobile && errors.mobile)}
                                                    fullWidth
                                                    helperText={touched.mobile && errors.mobile}
                                                    label="Teacher's Official Phone Line"
                                                    margin="normal"
                                                    name="mobile"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="mobile"
                                                    value={values.mobile}
                                                    variant="outlined"
                                                />
                                                <Box sx={{ py: 2 }}>
                                                    <Button
                                                        color="primary"
                                                    disabled={addingTeacher}
                                                        // fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        Add Teacher
                                                    </Button>
                                                </Box>
                                            </form>
                                        )}
                                    </Formik>
                                {/* </Container> */}
                            </Box>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    );
}

export default CreateUser;
