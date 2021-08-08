import React, {useState} from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Dialog, IconButton, Typography, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import List from './List'

const styles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),        
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }, currencyBar: {
        width: '100%',
        borderRadius: '20px '
    }
}))

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent)

const CurrencyDialog = (props) => {
    const classes = styles()    
    const [search, setSearch] = useState('')    

    const handleClose = () => {
        setSearch('')
        props.open(false)        
    }

    const handleChange = (e) => setSearch(e.target.value)    

    return(
        <div>            
            <Dialog onClose={handleClose} open={true} maxWidth="lg" style={{'borderRadius': '100px'}}>                
                <MuiDialogTitle className={classes.root}>
                    <Typography variant="h6">Select a Currency</Typography>
                    {true ? (
                        <IconButton className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}                                           
                </MuiDialogTitle>
                <DialogContent dividers>
                <TextField 
                            id="fromCurrency"
                            variant="outlined"
                            placeholder="Search by Country"
                            className={classes.currencyBar}
                            size="small"
                            onChange={handleChange}
                            style={{"marginBottom": '10px'}}
                        />
                    <List searchedText={search}/>
                </DialogContent>                
            </Dialog>
        </div>
    )
}

export default CurrencyDialog