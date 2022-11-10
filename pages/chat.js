import { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { TextInput } from '../components/TextInput';
import { MessageLeft, MessageRight } from '../components/Message';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: '80vw',
      height: '80vh',
      maxWidth: '500px',
      maxHeight: '700px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    paper2: {
      width: '80vw',
      maxWidth: '500px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesBody: {
      width: 'calc( 100% - 20px )',
      margin: 10,
      overflowY: 'scroll',
      height: 'calc( 100% - 80px )',
    },
  })
);

export default function App() {
  const sender = ['Hello this is Alumini', 'Pleased to meet you.'];
  let re = ['Hi'];
  const [receiver, setReceiver] = useState({ msg: re });
  const classes = useStyles();
  const changeReceiver = (val) => {
    let arr = [...receiver.msg];
    arr.push(val);
    setReceiver({ msg: arr });
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          {sender.map((msg) => {
            return (
              <MessageLeft
                message={msg}
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName=""
                avatarDisp={true}
              />
            );
          })}
          {receiver.msg.map((msg) => {
            return (
              <MessageRight
                message={msg}
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName=""
                avatarDisp={true}
              />
            );
          })}
        </Paper>
        <TextInput receiver={receiver} changeReceiver={changeReceiver} />
      </Paper>
    </div>
  );
}
