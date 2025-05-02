import { rest } from 'msw';

let questions = [
  {
    id: 1,
    prompt: "lorem testum 1",
    answers: ["a", "b", "c", "d"],
    correctIndex: 0,
  },
  {
    id: 2,
    prompt: "lorem testum 2",
    answers: ["e", "f", "g", "h"],
    correctIndex: 1,
  },
];

export const handlers = [
  rest.get('http://localhost:4000/questions', (req, res, ctx) => {
    return res(ctx.json(questions));
  }),
  rest.post('http://localhost:4000/questions', (req, res, ctx) => {
    const newQuestion = {
      id: Math.max(...questions.map(q => q.id)) + 1,
      ...req.body,
    };
    questions.push(newQuestion);
    return res(ctx.json(newQuestion));
  }),
  rest.delete('http://localhost:4000/questions/:id', (req, res, ctx) => {
    questions = questions.filter(q => q.id !== Number(req.params.id));
    return res(ctx.status(200));
  }),
  rest.patch('http://localhost:4000/questions/:id', (req, res, ctx) => {
    const question = questions.find(q => q.id === Number(req.params.id));
    question.correctIndex = req.body.correctIndex;
    return res(ctx.json(question));
  }),
];