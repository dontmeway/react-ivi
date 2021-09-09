import styles from './Header.module.scss'
import {Link, useHistory} from 'react-router-dom'
import React from 'react'
import { AppContext } from '../../App'

function Header() {

    const [isInput, setIsInput] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')
    const { searchMovie } = React.useContext(AppContext)
    const history = useHistory();


    const handleSearchMovie = (e) => {
        e.preventDefault();
        inputValue && searchMovie(inputValue);
        history.push('searchByRequest')
        setInputValue('')
    }

    const handleSearch = () => {
        setIsInput(!isInput)
    }
    const handleInput = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <header>
            <div className = {styles.headerLeft}>
                <Link to = "/react-ivi/" ><img src = "images/logo.svg" alt = "logo"/></Link>
                    <ul>
                        <Link to = "/react-ivi/myIvi">
                            <li>My Ivi</li>
                        </Link>
                        <li>Movies</li>
                        <li>Shows</li>
                        <li>Cartoons</li>
                    </ul>
            </div>
            <div className = {styles.headerRight}>
                <button className = "btn">Connect Subscription</button>
                {isInput ? 
                <form onSubmit = {(e) => {
                    handleSearchMovie(e);

                }}>
                    <input value = {inputValue} onChange = {handleInput}/>
                </form> 

              : <button onClick = {handleSearch} className = {styles.search}>
                    <span className = "bi bi-search"></span>
                    Search
                </button>}
                <span className = "bi bi-bell-fill"></span>
                <button className = {styles.user}> 
                    B
                </button>
            </div>
        </header>
    )
                
                
}

export default Header