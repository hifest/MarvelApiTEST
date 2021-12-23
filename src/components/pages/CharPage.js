import {useParams,Link} from 'react-router-dom'
import Error from '../errorMessage/ErrorMessage';
import '../pages/charPage.scss';
import Spinner from '../spinner/Spinner'
import React,{useState,useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import { CSSTransition  } from 'react-transition-group';
const CharPage = () =>{
    const {charID} = useParams();
    const [char,setChar] = useState(null);
    const [сharLoad,setLoad] = useState(false);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charID])

    const updateChar = () => {
        clearError();
        getCharacter(charID)
            .then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
        setChar(char);
        setLoad(true)
    }
    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} сharLoad={сharLoad} /> : null;
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}
const View = ({char,сharLoad}) =>{
    const {name,thumbnail,descr} = char;
    return (
        <CSSTransition in={сharLoad} timeout={300} classNames="my-char">
        <div className="single-char">
        <img  className="single-char__char-img" src={thumbnail}/>
        <div className="single-char__info">
            <h2 className="single-char__name">{name}</h2>
            <p className="single-char__descr">{descr}</p>
        </div>
    <Link to='/' className="link-back">
        Go back!!!!
    </Link>
    </div>
    </CSSTransition>
    )
}
export default CharPage;