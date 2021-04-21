import React from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Check as CheckIcon } from '@material-ui/icons';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import {
    Box,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    InputAdornment,
    FormControl,
    FormLabel,
    // ButtonBase,

    Container,
    Grid,
    Card,
    CardHeader,
    Divider,
    Link,
    Typography,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Budget from '../../components/dashboard/Budget';
import LatestOrders from '../../components/dashboard/LatestOrders';
import LatestProducts from '../../components/dashboard/LatestProducts';
import DashboardLayout from '../../components/DashboardLayout';
import { fetchQuestions } from '../../redux/action/exam';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";

const EditExam = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();
    const { questions } = useSelector(state => state.Exam);

    const [newQuestion, setNewQuestion] = React.useState("");
    const [newOptions, setNewOptions] = React.useState([
        { option: "", correct: true },
    ]);

    React.useEffect(() => {
        dispatch(fetchQuestions(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                        {Object.values(questions).map((question, index) => {
                            return (
                                <Grid key={`question-${question.id}`} item lg={12}>
                                    <Card>
                                        <Box px={4} py={1}>
                                            <Box mb={1} sx={{ minWidth: 800 }}>
                                                <TextField
                                                    fullWidth
                                                    label={`Question ${index + 1}`}
                                                    margin="normal"
                                                    disabled
                                                    name={`question-${question.id}`}
                                                    // onChange={handleChange}
                                                    value={question.question}
                                                    variant="outlined"
                                                />
                                            </Box>
                                            <Divider />
                                            {question.options.map((option, index) => {
                                                return (
                                                    <Box sx={{ minWidth: 800 }}>
                                                        <TextField
                                                            fullWidth
                                                            InputProps={option.correct && {
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <CheckIcon />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            label={`Option ${index + 1}`}
                                                            margin="normal"
                                                            name={`option-${option.id}`}
                                                            disabled
                                                            // onChange={handleChange}
                                                            value={option.option}
                                                            variant="outlined"
                                                        />
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Card>
                                </Grid>
                            )
                        })}
                        <Grid item lg={12}>
                            <Card>
                                <Box px={4} py={1}>
                                    <Box mb={1} sx={{ minWidth: 800 }}>
                                        <TextField
                                            fullWidth
                                            label="New Question"
                                            margin="normal"
                                            name={`newQuestion`}
                                            onChange={(e) => setNewQuestion(e.target.value)}
                                            value={newQuestion}
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Divider />
                                    {newOptions.map((option, index) => {
                                        return (
                                            <Box sx={{ minWidth: 800 }}>
                                                <TextField
                                                    fullWidth
                                                    InputProps={option.correct && {
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <CheckIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    label={`Option ${index + 1}`}
                                                    margin="normal"
                                                    name={`option-${index}`}
                                                    onChange={(e) => {
                                                        let _options = [...newOptions].map(_option => {
                                                            if (_option.option === option.option) {
                                                                return { option: e.target.value, correct: true }
                                                            } else {
                                                                return { ..._option, correct: false }
                                                            }
                                                        })
                                                        setNewOptions(..._options)
                                                    }}
                                                    value={option.option}
                                                    variant="outlined"
                                                />
                                            </Box>
                                        )
                                    })}
                                    <Box textAlign="right" sx={{ py: 2 }}>
                                        <Button
                                            color="primary"
                                            // disabled={}
                                            // fullWidth
                                            size="small"
                                            type="submit"
                                            variant="contained"
                                        >
                                            Add Option
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                        <Box ml={4} sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                // disabled={}
                                // fullWidth
                                size="normal"
                                type="submit"
                                variant="contained"
                            >
                                Add Question
                            </Button>
                        </Box>
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    );
}

export default EditExam;
