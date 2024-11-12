import React, { useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Checkbox,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Add, Delete, CopyAll } from '@mui/icons-material';

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [newOption, setNewOption] = useState({ text: '' });

  const questionTypes = [
    { value: 'short_answer', label: 'Short Answer' },
    { value: 'paragraph', label: 'Paragraph' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio Button' },
  ];

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        questionText: '',
        type: 'short_answer',
        options: [],
        isRequired: false,
        answer: '', // For storing user answers
      },
    ]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleCopyQuestion = (id) => {
    const question = questions.find((question) => question.id === id);
    setQuestions([...questions, { ...question, id: Date.now() }]);
  };

  const handleAddOption = (id) => {
    setCurrentQuestionId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewOption({ text: '' });
  };

  const handleAddOptionConfirm = () => {
    if (newOption.text) {
      setQuestions(
        questions.map((question) =>
          question.id === currentQuestionId
            ? {
                ...question,
                options: [
                  ...question.options,
                  { id: Date.now(), text: newOption.text },
                ],
              }
            : question
        )
      );
    }
    handleDialogClose();
  };

  const handleRemoveOption = (questionId, optionId) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter(
                (option) => option.id !== optionId
              ),
            }
          : question
      )
    );
  };

  const handleQuestionTypeChange = (id, type) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, type, options: [] } : question
      )
    );
  };

  const handleQuestionTextChange = (id, text) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, questionText: text } : question
      )
    );
  };

  const handleOptionTextChange = (questionId, optionId, text) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId ? { ...option, text } : option
              ),
            }
          : question
      )
    );
  };

  const handleQuestionRequiredChange = (id) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, isRequired: !question.isRequired } : question
      )
    );
  };

  const handleOptionRequiredChange = (questionId, optionId) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId
                  ? { ...option, isRequired: !option.isRequired }
                  : option
              ),
            }
          : question
      )
    );
  };

  const handleAnswerChange = (id, answer) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, answer } : question
      )
    );
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddQuestion}>
        Add Question
      </Button>

      {questions.map((question, index) => (
        <Paper key={question.id} style={{ padding: '20px', marginTop: '20px' }}>
          <TextField
            fullWidth
            label={`Question ${index + 1}`}
            value={question.questionText}
            onChange={(e) =>
              handleQuestionTextChange(question.id, e.target.value)
            }
          />
          
          {/* Required Checkbox for Question */}
          <div>
            <Checkbox
              checked={question.isRequired}
              onChange={() => handleQuestionRequiredChange(question.id)}
            />
            <span>Required</span>
          </div>

          <TextField
            select
            label="Question Type"
            value={question.type}
            onChange={(e) =>
              handleQuestionTypeChange(question.id, e.target.value)
            }
            style={{ marginTop: '10px' }}
          >
            {questionTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Render Answer Field based on Question Type */}
          {(question.type === 'short_answer' || question.type === 'paragraph') && (
            <TextField
              label="Your Answer"
              fullWidth
              multiline={question.type === 'paragraph'}
              rows={question.type === 'paragraph' ? 4 : 1}
              value={question.answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              style={{ marginTop: '10px' }}
            />
          )}

          {(question.type === 'checkbox' || question.type === 'radio') && (
            <div>
              {question.options.map((option) => (
                <div
                  key={option.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '10px',
                  }}
                >
                  {question.type === 'checkbox' ? (
                    <Checkbox
                      checked={option.isRequired}
                      onChange={() => handleOptionRequiredChange(question.id, option.id)}
                    />
                  ) : (
                    <Radio
                      checked={option.isRequired}
                      onChange={() => handleOptionRequiredChange(question.id, option.id)}
                    />
                  )}
                  <TextField
                    placeholder="Option text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionTextChange(question.id, option.id, e.target.value)
                    }
                  />
                  
                  {/* Option Required Checkbox */}
                  <Checkbox
                    checked={option.isRequired}
                    onChange={() => handleOptionRequiredChange(question.id, option.id)}
                  />
                  <span>Required</span>
                  
                  <IconButton
                    onClick={() => handleRemoveOption(question.id, option.id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              ))}
              <Button
                variant="outlined"
                style={{ marginTop: '10px' }}
                onClick={() => handleAddOption(question.id)}
              >
                Add Option
              </Button>
            </div>
          )}

          <div style={{ marginTop: '10px' }}>
            <IconButton onClick={() => handleDeleteQuestion(question.id)}>
              <Delete color="error" />
            </IconButton>
            <IconButton onClick={() => handleCopyQuestion(question.id)}>
              <CopyAll />
            </IconButton>
          </div>
        </Paper>
      ))}

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Option</DialogTitle>
        <DialogContent>
          <TextField
            label="Option Text"
            fullWidth
            value={newOption.text}
            onChange={(e) => setNewOption({ text: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddOptionConfirm} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormBuilder;
