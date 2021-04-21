import React from 'react';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton'
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Grid,
  Card,
  CardHeader,
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DashboardLayout from '../../components/DashboardLayout';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams, fetchQuestions, submitAnswers } from '../../redux/action/exam';
import { useHistory } from 'react-router-dom';

const Dashboard = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { exams, questions, examInProgress, submittingAnswers, submitAnswersError, fetchingQuestions } = useSelector(state => state.Exam);
  const [questionsState, setQuestionsState] = React.useState({});

  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (submitted && !submittingAnswers && submitAnswersError === null) {
      history.push("/records");
    }
    return () => null;
  }, [submitted, submittingAnswers, submitAnswersError, history]);

  React.useEffect(() => {
    dispatch(fetchExams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = (exam_id) => {
    dispatch(fetchQuestions(exam_id));
  }

  const handleChange = (question_id, option_id) => {
    let _questionState = { ...questionsState };
    _questionState[question_id] = option_id;
    console.log(_questionState)
    setQuestionsState(_questionState);
  }

  const handleEnd = () => {
    dispatch(submitAnswers(examInProgress, questionsState));
    setSubmitted(true);
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
            {!examInProgress ?
              <Grid item lg={12}>
                <Card {...props}>
                  <CardHeader title="Available Exams" />
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
                            if (exam.open) {
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
                                    <ButtonBase
                                      onClick={() => handleStart(exam.id)}>
                                      <Box width={"80px"} bgcolor="#1976d2" px={1} py={1} borderRadius="4px" color="white" fontWeight="bold">
                                        {"START"}
                                      </Box>
                                    </ButtonBase>
                                  </TableCell>
                                </TableRow>
                              )
                            }
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
              :
              fetchingQuestions ?
                null
                :
                <>
                  {Object.values(questions).map((question, index) => {
                    return (
                      <Grid key={`question-${question.id}`} item xs={12}>
                        <Box p={1}>
                          <FormControl component="fieldset">
                            <FormLabel component="h4">{index + 1}. {question.question}</FormLabel>
                            <RadioGroup
                              aria-label={`question-${question.id}`}
                              name={`question-${question.id}`}
                              // value={questionsState[question.id]}
                              onChange={(e) => handleChange(question.id, e.target.value)}>
                              {question.options.map((option, index) => (
                                <FormControlLabel
                                  key={`${option.id}-${index}`}
                                  value={option.id}
                                  control={<Radio checked={questionsState[question.id] == option.id} />}
                                  label={option.option}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </Grid>
                    )
                  })}
                  <Box sx={{ py: 2, mx: 3, mt: 3, mb: 2 }}>
                    <Button
                      color="primary"
                      disabled={submittingAnswers}
                      // fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={handleEnd}
                    >
                      Submit Exam
                    </Button>
                  </Box>
                </>
            }
          </Grid>
        </Container>
      </Box >
    </DashboardLayout >
  );
}

// const Loader = () => (
//   <>
//     <Grid item xs={12}>
//       <Box p={1}>
//         <FormControl component="fieldset">
//           <FormLabel component="p"><Skeleton width={800} /></FormLabel>
//           <RadioGroup aria-label="" name="" value={""} onChange={() => null}>
//             <FormControlLabel value="" control={<Skeleton width={200} />} label="" />
//             <FormControlLabel value="" control={<Skeleton width={400} />} label="" />
//             <FormControlLabel value="" control={<Skeleton width={600} />} label="" />
//             <FormControlLabel value="" control={<Skeleton width={100} />} label="" />
//           </RadioGroup>
//         </FormControl>
//       </Box>
//     </Grid>
//     <Grid item xs={12}>
//       <Box p={1}>
//         <FormControl component="fieldset">
//           <FormLabel component="p"><Skeleton width={500} /></FormLabel>
//           <RadioGroup aria-label="" name="" value={""} onChange={() => null}>
//             <FormControlLabel value="" control={<Skeleton width={150} />} label="" />
//             <FormControlLabel value="" control={<Skeleton width={670} />} label="" />
//             <FormControlLabel value="" control={<Skeleton width={400} />} label="" />
//             <FormControlLabel value="" control={<Skeleton width={320} />} label="" />
//           </RadioGroup>
//         </FormControl>
//       </Box>
//     </Grid>
//   </>
// )

export default Dashboard;
