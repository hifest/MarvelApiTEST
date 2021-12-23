import {useParams,Link} from 'react-router-dom'
import Error from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
import React,{useState,useEffect} from 'react';
import '../pages/charPage.scss'
import useMarvelService from '../../services/MarvelService';
import { CSSTransition,TransitionGroup  } from 'react-transition-group';
const SingleCharPage = () => {
    const {Id} = useParams();
    const [char, setchar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const [loadChar,setLoad] = useState(false)
    useEffect(() => {
        updatechar()
    }, [Id])
    console.log(Id)
    const updatechar = () => {
        clearError();
        getCharacter(Id)
            .then(oncharLoaded)
    }
    const oncharLoaded = (char) => {
        setchar(char);
        setLoad(true)
    }
    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} loadChar={loadChar}/> : null;
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}
const View = ({char,loadChar}) =>{
    const {name,thumbnail,descr} = char;
    return (
        <>
        <CSSTransition in={loadChar} timeout={500} classNames="my-node1">
        <div className="single-char">
        <img  className="single-char__char-img" src={thumbnail}/>
        <div className="single-char__info">
            <h2 className="single-char__name">{name}</h2>
            <p className="single-char__descr">{descr}</p>
        </div>
        <Link to='/'>Back to all</Link>
    </div>
    </CSSTransition>
    </>
    )
}

export default SingleCharPage;