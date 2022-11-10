import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
      margin: `${theme.spacing(0)} auto`,
    },
    wrapText: {
      width: '100%',
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);

export const TextInput = ({ receiver, changeReceiver }) => {
  const classes = useStyles();
  const [val, setVal] = useState('');
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="Enter message"
          className={classes.wrapText}
          //margin="normal"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            changeReceiver(val);
            setVal("")
          }}
        >
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
