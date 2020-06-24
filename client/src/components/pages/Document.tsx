import React from 'react'

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

interface IDocumentProps  {
  text: string,
}

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    marginTop: 10,
    padding: 10,
    width : 350,
    height: 40,
    textAlign: 'left',
    backgroundColor: '#e8edea',
  },
  btn: {
    margin: 10
  }
})

const Document: React.FC<IDocumentProps> = ({text}) => {

  const classes = useStyles()

  return (
    <div>
      <Card className= {classes.root}>
        {text}
      </Card>
    </div>
  )
}

export default Document