import React, {useState, useEffect, useContext} from 'react'
import { CurrencyContext } from './Context';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import FlipCameraAndroidOutlinedIcon from '@material-ui/icons/FlipCameraAndroidOutlined';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import Modal from './Modal'
import ExpandMore from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles({
    root: {
        maxWidth: 400, 
        margin: '0 auto',
        paddingTop: '100px'
    },
    title: {
        fontSize: 20
    },
    fields: {
        border: '1px solid black',
        margin: '10px 20px',
        borderRadius: 20,
        padding: '10px !important',
        textAlign: 'left'
    },
    skeleton: {
        border: '1px solid black'
    },
    textRight: {
        textAlign: 'right !important',
        border: '1px solid black',
        outline: 'none',
        flex: '1 1 auto',                
        align: 'right'
    },
    mainButton: {
        padding: '5px 10px',
        borderRadius: '100px',
        paddingLeft: '20px'
    }
})

const Landing = () => {
    document.title="Currency Converter"

    const fromData = useContext(CurrencyContext)

    const classes = useStyles()

    const [fromRate, setFromRate] = useState('')
    const [toRate, setToRate] = useState('')    
    const [amount, setAmount] = useState()           
    const [exchangeRate, toggleExchangeRate] = useState(true)
    const [amountFromCurrency, setAmountFromCurrency] = useState(true)

    let toAmount, fromAmount

    if(amountFromCurrency){
        toAmount = ((toRate / fromRate) * amount).toFixed(4)        
    } else {
        fromAmount = ((fromRate / toRate) * amount).toFixed(4)        
    }

    /*useEffect(() => {
        fetch('http://data.fixer.io/api/latest?access_key=afb1f5861c1a78d0b4b30fcd9c2136ef&format=1')
        .then(res => res.json())
        .then(data => {            
            setList([data.base, ...Object.keys(data.rates)])            
        })
    }, [])    */

    useEffect(() => {
        fetch('http://data.fixer.io/api/latest?access_key='+process.env.REACT_APP_FIXER_API_KEY)        
        .then(res => res.json())
        .then(data => {
            setFromRate(data.rates[fromData.fromCode])
            setToRate(data.rates[fromData.toCode])            
        })        
    }, [fromData.fromCode, fromData.toCode])
    
    const handleFromAmount = (e) => {        
        setAmount(e.target.value)     
        setAmountFromCurrency(true)   
    }

    const handleFromClick = () => {
        fromData.toggleOpen(!fromData.open)
        fromData.setSource(true)                       
    }

    const handleToAmount = (e) => {
        setAmount(e.target.value)
        setAmountFromCurrency(false) 
    }

    const handleToClick = () => {
        fromData.toggleOpen(!fromData.open)
        fromData.setSource(false)
    }

    const handleExchange = () => {
        toggleExchangeRate(!exchangeRate)
    }    

    const handleSwap = () => {
        fromData.setFromCode(fromData.toCode)
        fromData.setToCode(fromData.fromCode)
        fromData.setFromFlag(fromData.toFlag)
        fromData.setToFlag(fromData.fromFlag)        
    }

    return(
        <>         
        {fromData.open && <Modal open={fromData.toggleOpen} />}
        <div className={classes.root}>
            <Card className={classes.skeleton}>
                <CardContent style={{'padding': '10px'}}>
                    <Typography className={classes.title}>
                        Swap
                    </Typography>
                </CardContent>
                <CardContent className={classes.fields}>
                    <Typography variant="h7" component="h7">
                        From
                    </Typography>
                    <br />
                    <br />
                    <Button 
                        className={classes.mainButton}
                        variant="outlined"
                        color="primary"
                        onClick={handleFromClick}
                        startIcon={fromData.fromFlag === "" ? "" : <img src={fromData.fromFlag} alt={fromData.fromCode} height="20px" width="30px"/> } 
                    >   
                        {fromData.fromCode === "" ? "From" : fromData.fromCode}   
                        <ExpandMore />                   
                    </Button>                                            
                    <TextField 
                        type="number" 
                        id="fromAmount"
                        inputProps={{"step": "any", style: { textAlign: 'right' }}} 
                        InputProps={{disableUnderline: true}}
                        required        
                        onChange={handleFromAmount}    
                        style={{"float":"right", "width": '150px'}}     
                        placeholder="0.0"   
                        value={fromAmount}                               
                    /> 
                </CardContent>
                {fromData.fromCode === "" || fromData.toCode === "" ? "":
                <IconButton style={{padding: '0'}}>
                    <SwapVerticalCircleIcon fontSize="large" onClick={handleSwap} />
                </IconButton>
                }
                <CardContent className={classes.fields}>
                    <Typography variant="h7" component="h7">
                        To
                    </Typography>
                    <br />
                    <br />
                    <Button 
                        className={classes.mainButton}
                        variant="outlined"
                        color="secondary"
                        onClick={handleToClick}
                        startIcon={fromData.toFlag === "" ? "" : <img src={fromData.toFlag} alt={fromData.toCode} height="20px" width="30px"/> } 
                    >   
                        {fromData.toCode === "" ? "To" : fromData.toCode} 
                        <ExpandMore />                     
                    </Button>                                            
                    <TextField 
                        type="number" 
                        id="toAmount"
                        inputProps={{"step": "any", style: { textAlign: 'right' }}} 
                        InputProps={{disableUnderline: true}}
                        required        
                        onChange={handleToAmount}    
                        style={{"float":"right", "width": '150px'}}  
                        placeholder="0.0"   
                        value={toAmount}                                                   
                    />
                </CardContent>
                {fromData.fromCode === "" || fromData.toCode === "" ? "":
                <div>                    
                    {exchangeRate ? <>{(fromRate/toRate).toFixed(4)} {fromData.fromCode} per {fromData.toCode}</>: <>{(toRate/fromRate).toFixed(4)} {fromData.toCode} per {fromData.fromCode}</>}
                    <IconButton><FlipCameraAndroidOutlinedIcon onClick={handleExchange}/></IconButton>
                </div>
                }
            </Card>
            </div>
     </>
    )
}

export default Landing