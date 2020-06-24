import React, { useEffect, useState } from 'react'
import { IauthState } from '../../reducers/authReducer'
import { useHttp } from '../../hooks/httpHook' 

import Document from './Document'

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { openToastActionCreator } from '../../reducers/toastReducer'
import { logoutActionCreator } from '../../reducers/authReducer' 

import DocumentCreating from '../../components/pages/DocumentCreating'



interface IDocumentsProps  {
  authState: IauthState,
  authDispatch: any,
  toastDispatch: any,
}

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    marginTop: 20,
    padding: 10,
    width : 370,
    textAlign: 'center',
  },
  btn: {
    margin: 10
  }
})

const Documents: React.FC<IDocumentsProps> = ({authState, authDispatch, toastDispatch}) => {

  const classes = useStyles()
  const {loading, request, error, clearError} = useHttp()
  const [documents, setDocuments] = useState([])
  

  useEffect(() => {
    (async () => {
      try {
        const data = await request('api/documents', 'GET', null, 
        {authorization: `Bearer ${authState.token}`} )
        setDocuments(data)
      } catch (e) {
        toastDispatch(openToastActionCreator(e.message, 'error'))
        authDispatch(logoutActionCreator())
      } 
    })()
  }, [])


  return (
    <div>
      <Card className= {classes.root}>
        <DocumentCreating authState = {authState} setDocuments = {setDocuments}/>
          {documents.map((document: any, i) => {
            return (
              <Document text = {document.text} key={i}/>
            )
          })}
      </Card>

    </div>
  ) 
}

export default Documents