import React, { useState } from 'react'

import {useHttp} from '../../hooks/httpHook'

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 363,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
})

interface IDocumentCreatingProps {
  authState: any, 
  setDocuments: any,
}




const DocumentCreating: React.FC<IDocumentCreatingProps> = ({authState, setDocuments}) => {

  const classes = useStyles()
  const {loading, request, error, clearError} = useHttp()
  const [formValue, setFormValue] = useState('')

  const addDocument = async () => {
      const newDocument = await request('api/documents', 'POST', {title: 'TITLE', text: formValue}, 
      {authorization: `Bearer ${authState.token}`} )
      setDocuments((documents: any) => [...documents, newDocument.document])
      setFormValue('')
  }

  return (
    <div>
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input}
                 placeholder="type your text here"
                 value = {formValue}
                 onChange = {(e) => {setFormValue(e.target.value)}} />
      <Divider className={classes.divider} />
      <IconButton onClick = {addDocument} color="primary" className={classes.iconButton}>
        <AddIcon />
      </IconButton>
    </Paper>
    </div>
  )
}

export default DocumentCreating