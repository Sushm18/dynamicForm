import {
   AddCircleOutline, CheckBox,
    Close, CropOriginal, FilterNone,
    MoreVert, OndemandVideo, ShortText,
    Subject,
    TextFields
} from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, IconButton, Radio, Select, Switch, TextField, Typography, MenuItem } from "@mui/material";
import { BsTrash } from "react-icons/bs";
import { FcRightUp } from "react-icons/fc";
import './Question_form.css';
import { useState } from "react";

function Question_form() {
    const [questions, setQuestions] = useState([
        {
            questionText: "Which is the capital city of Karnataka?",
            questionType: "radio",
            options: [
                { optionText: "Bengaluru" },
                { optionText: "Belgavi" },
                { optionText: "Hubli" },
                { optionText: "Mandya" }
            ],
            open: true,
            required: false
        }
    ]);




    function setoptionAnswer(ans, qno) {
        var Questions = [...questions];
        Questions[qno].answerkey = ans;
        setQuestions(Questions);
        console.log(qno + " " + ans);
    }

    function setoptionPoints(points, qno) {
        var questions = [...questions];
        questions[qno].points = points;
        setQuestions(Questions);
        console.log(qno + " " + points);
    }

    function doneAnswer(i) {
        var answerofquestion = [...questions];
        answerofquestion[i].answer = answerofquestion[i].answer;
        setQuestions(answerofquestion)
    }

    function addAnswer(i) {
        var answerofquestion = [...questions];
        answerofquestion[i].answer = ![...answerofquestion[i].answers];
        setQuestions(answerofquestion)
    }




    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        var itengg = [...questions];
        const itemF = reorder(
            itengg,
            result.source.index,
            result.destination.index
        );
        setQuestions(itemF);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };








    function changeQuestion(text, i) {
        var newQuestion = [...questions]
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        console.log(newQuestion)
    }

    function changeOptionValue(text, i, j) {
        var optionsQuestion = [...questions];
        optionsQuestion[i].options[j].optionText = text;
        setQuestions(optionsQuestion)
        console.log(optionsQuestion)
    }


    function addQuestionType(i, type) {
        let qs = [...questions];
        console.log(type);
        qs[i].questionType = type;
        setQuestions(qs);
        console.log(qs)
    }

    function removeOption(i, j) {
        var RemoveOptionQuestion = [...questions];
        if (RemoveOptionQuestion[i].options.length > 1) {
            RemoveOptionQuestion[i].options.splice(j, 1);
            setQuestions(RemoveOptionQuestion);
            console.log(i + " " + j);
        }
    }



    function addOption(i) {
        var optionsOfQuestion = [...questions];
        if (optionsOfQuestion[i].options.length < 5) {
            optionsOfQuestion[i].options.push({ optionText: "Option" + (optionsOfQuestion[i].options.length + 1) });
        } else {
            console.alert("Max 5 options");
        }
        setQuestions(optionsOfQuestion);
    }


    function copyQuestion(i) {
        // expandCloseAll()
        let qs = [...questions]
        var newQuestion = qs[i]
        setQuestions([...questions, newQuestion])
    }

    function deleteQuestion(i) {
        let qs = [...questions]
        if (questions.length > 1) {
            qs.splice(i, 1)
        }
        setQuestions(qs)
    }



    function requiredQuestion(i) {
        var reqquestion = [...questions];
        reqquestion[i].required = !reqquestion[i].required;
        console.log(reqquestion[i].required + " " + i);
        setQuestions(reqquestion);
    }

    function addMoreQuestionField() {
        setQuestions([
            ...questions,
            {
                questionText: "Question",
                questionType: "radio",
                options: [{ optionText: "Option 1" }],
                open: true,
                required: false,
            },
        ]);
    }




    function expandCloseAll() {
        let qs = [...questions];
        for (let j = 0; j < qs.length; j++) {
            qs[j].open = false;
        }
        setQuestions(qs);
    }

    function handleExpand(i) {
        let qs = [...questions];
        for (let j = 0; j < qs.length; j++) {
            if (j === i) {
                qs[j].open = !qs[j].open;
            } else {
                qs[j].open = false;
            }
        }
        setQuestions(qs);
    }




    function questionUI() {
        return questions.map((ques, i) => (
            <Accordion expanded={questions[i].open} className={questions[i].open ? 'add_border' : ""} key={i}>
                <AccordionSummary
                    aria-controls="panella-content"
                    id="panella-header"
                    elevation={1}
                    style={{ width: '100%' }}
                >
                    {!questions[i].open ? (
                        <div className="saved_questions">
                            <Typography
                                style={{
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    letterSpacing: '-1px',
                                    lineHeight: '24px',
                                    paddingBottom: '8px'
                                }}
                            >
                                {i + 1}. {questions[i].questionText}
                            </Typography>
                            {ques.options.map((op, j) => (
                                <div key={j} style={{ display: 'flex' }}>
                                    <FormControlLabel
                                        style={{ marginLeft: '5px', marginBottom: '5px' }}
                                        disabled
                                        control={<input type={ques.questionType} style={{ marginRight: '3px' }} />}
                                        label={<Typography style={{ fontSize: '13px' }}>{op.optionText}</Typography>}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : ""}
                </AccordionSummary>


                <AccordionDetails className="add_question">
                    <div className="add_question_top">
                        <input
                            type="text"
                            className="question"
                            placeholder="Question"
                            value={ques.questionText}
                            onChange={(e) => {
                                changeQuestion(e.target.value, i)
                            }}

                        />
                        <CropOriginal style={{ color: "#5f6368" }} />
                        <Select className="select" style={{ color: "#5f6368", fontSize: "13px" }}>
                            <MenuItem id="text" value="Text"
                                onClick={() => { addQuestionType(i, "text") }}>
                                <Subject style={{ marginRight: "10px" }}
                                /> Paragraph
                            </MenuItem>

                            <MenuItem id="checkbox" value="Checkbox"
                                onClick={() => { addQuestionType(i, "checkbox") }}>
                                <CheckBox style={{ marginRight: "10px", color: "#70757a" }} />
                                Checkbox
                            </MenuItem>

                            <MenuItem id="radio" value="Radio"
                                onClick={() => { addQuestionType(i, "radio") }}>
                                <Radio style={{ marginRight: "10px", color: "#70757a" }} />
                                Multiple Choice
                            </MenuItem>

                        </Select>
                    </div>


                    {ques.options.map((op, j) => (
                        <div className="add_question_body" key={j}>

                            {
                                (ques.questionType != 'text') ?
                                    <input type={ques.questionType} /> :
                                    <ShortText style={{ marginRight: '10px' }} />
                            }

                            <div>
                                <input
                                    type="text"
                                    className="text_input"
                                    placeholder="option"
                                    value={ques.options[j].optionText}
                                    onChange={(e) => {
                                        changeOptionValue(e.target.value, i, j)
                                    }}
                                />
                            </div>



                            <IconButton aria-label="delete">
                                <Close onClick={()=>{
                                    removeOption(i,j)
                                }} />
                                </IconButton>
                        </div>
                    ))}


                    {ques.options.length < 5 ? (
                        <div className="add_question_body">
                            <FormControlLabel
                                disabled
                                control={
                                    (ques.questionType === "text") ? (
                                        <input
                                            type={ques.questionType}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            style={{ marginLeft: "10px", marginRight: "10px" }}
                                            disabled
                                        />
                                    ) : (
                                        <ShortText style={{ marginRight: "10px" }} />
                                    )
                                }
                                label={
                                    <div>
                                        <input
                                            type="text"
                                            className="text_input"
                                            style={{ fontSize: "13px", width: "60px" }}
                                            placeholder="Add other"
                                        ></input>
                                        <Button
                                            size="small"
                                            style={{ textTransform: "none", color: "#84285f4", fontSize: "13px", fontWeight: "600" }}
                                            onClick={()=>{
                                                addOption(i)
                                            }}
                                        >
                                            Add Option
                                        </Button>
                                    </div>
                                }
                            />
                        </div>
                    ) : null}









                    <div className="add_footer">
                        <div className="add_question_bottom_left">
                            <Button size="small" style={{ color: "#4285f4", fontSize: "13px", fontWeight: "600" }}>
                                <FcRightUp style={{ border: "2px solid #4285f4", padding: "2px", marginRight: "8px" }} /> Answer key
                            </Button>
                        </div>
                        <div className="add_question_bottom">
                            <IconButton aria-label="Copy"
                            onClick={()=>{
                                copyQuestion(i)
                            }}
                            ><FilterNone /></IconButton>

                            <IconButton aria-label="delete"
                              onClick={()=>{
                                deleteQuestion(i)
                            }}><BsTrash /></IconButton>

                            <span style={{ color: "#5f6368", fontSize: "13px" }}>Required </span>
                            <Switch name="checked" color="primary"
                            onClick={()=>{
                                requiredQuestion(i)
                            }}
                             />

                            <IconButton><MoreVert /></IconButton>
                        </div>
                    </div>
                </AccordionDetails>


                <div className="question_edit">
                    <AddCircleOutline className='edit'  onClick={addMoreQuestionField}/>
                    <OndemandVideo className='edit'  onClick={addMoreQuestionField}/>
                    <CropOriginal className='edit'  onClick={addMoreQuestionField} />
                    <TextFields className='edit'  onClick={addMoreQuestionField}/>
                </div>
   </Accordion>
        ));
    }

    return (
        <div>
            <div className="question_form">
                <div className="section">
                    <div className="question_title_section">
                        <div className="question_form_top">
                            <input type="text" className="question_form_top_name" placeholder="Untitled document" />
                            <input type="text" className="question_form_top_desc" placeholder="Form Description" />
                        </div>
                    </div>
                    {questionUI()}
                </div>
            </div>
        </div>
    );
}

export default Question_form;





