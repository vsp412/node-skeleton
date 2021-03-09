const express = require('express');
const router = express.Router({ mergeParams: true });
const { insertNewPoll,
  updateURLs, insertOptions } = require('../db/queries/insert_new_poll.js')
router.get('/', (req, res) => {
  res.render('create_poll')
});
//Renders admin_poll page where the user enters their options
router.get('/:poll_id', (req, res) => {

  return updateURLs(req.params)
  .then((results) => {

    console.log(results);
    const templateVars = {poll_id: req.params.poll_id, opNum : results[0].numops}
    res.render('admin_poll', templateVars)

  })
  .catch(er => console.log('ERROR',er))
});
//User enters title and description of poll, redirects to poll/:id after storing poll in db
router.post('/', (req, res) => {
  const newPoll = req.body;
  console.log(newPoll);
  return insertNewPoll(newPoll)
  .then(poll => res.redirect(`/poll/${poll[0].id}`))
  .catch(er => console.log('ERROR',er))
});
//Posts the entered options
router.post('/:poll_id', (req, res) => {
  const options = req.body;
  console.log(options);
  const pollID = Number(req.params.poll_id);
  for (let i = 1; i <= Object.keys(options).length; i++) {
    const op = `op${i}`;
    if (options[op]) {
      insertOptions(options[op], pollID)
      .catch(e => console.log(e))
    }
    if (!options[op]) {
    }
  }

  res.redirect(`/vote/${pollID}`);
});
module.exports = router;
