import express from 'express';

const errorTestRouter = express.Router();

errorTestRouter.get('/errorTestA', (req, res) => {
  throw new Error('Test err A!');
  // automatically passed to error middleware
});

errorTestRouter.get('/errorTestB', (req, res, next) => {
  const error = new Error('Test err B!');
  next(error); // manually pass to error middleware
});

export { errorTestRouter };
