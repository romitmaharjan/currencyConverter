import React, {useState, useEffect, useContext} from 'react'
import { CurrencyContext } from './Context'

import { makeStyles, List, ListItem, ListItemText } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: 400,
        height: 600,
        overflow: 'inherit'
    },
    listItem: {
        textTransform: 'capitalize',
        fontFamily: "Segoe UI !important",
        lineHeight: 'inherit !important',        
    },   
    image: {
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15) !important',
        borderRadius: '.25rem',
        marginRight: '0.75rem !important'
    },    
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}))

const CurrencyList = (props) => {

    const currency = useContext(CurrencyContext)

    const classes = useStyles()
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {        
        const fetchData = async () => {
          const response = await axios.get("https://restcountries.eu/rest/v2/all?fields=name;flag;currencies")
    
          setCountries(response.data)          
        }
    
        fetchData()        
      }, [])
    
      useEffect(() => {
        setFiltered(
          countries.filter((country) =>
            country.name.toUpperCase().includes((props.searchedText).toUpperCase())
          )
        )
      }, [countries, props.searchedText])      

      const handleClick = (selected) => {
          if(currency.source === true){
            currency.setFromFlag(selected.flag)
            currency.setFromCode(selected.currencies[0].code)            
          } else {
            currency.setToFlag(selected.flag)
            currency.setToCode(selected.currencies[0].code)
          }          
          currency.toggleOpen(false)
      }
      
    return(
        <div className={classes.root}>                    
            <List>              
            {filtered.map((country) => (
                <ListItem button key={country.name} className="currencyItem" onClick={() => handleClick(country)}>                    
                    <img 
                        alt={country.name}
                        src={country.flag} 
                        height="30px"
                        width="50px"
                        className={classes.image}
                    />
                    <ListItemText 
                        className={classes.listItem}
                        primary={country.currencies[0].code} 
                        secondary={country.currencies[0].name+" - "+country.name}
                        />
                </ListItem>
            ))}
            </List>
        </div>
    )
}

export default CurrencyList