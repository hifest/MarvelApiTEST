import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { CSSTransition,TransitionGroup  } from 'react-transition-group';
const setContent  = (process,Component,newItemLoading) =>{
    switch(process){
        case 'waiting': 
            return <Spinner></Spinner>;
            break;
        case 'loading': 
            return newItemLoading ? <Component></Component> :  <Spinner></Spinner>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error' :
            return <ErrorMessage></ErrorMessage>;
            break;
        default:
            throw new Error("ФАК МАШИНА")
    }
};
const ComicsList = () => {
    const [comics,setComics] = useState([])
    const [offset,setOffset] = useState(7891)
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [ComicEnded,setComicsEnded] = useState(false)

    const {clearError,getAllComics,process,setProcess} =  useMarvelService()
    useEffect(()=>{
        getComics(offset, true);
    },[]);

    const getComics = (offset, initial) =>{
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
        .then(onComicLoaded)
        .then(setProcess(()=> 'confirmed'))
    }

    const onComicLoaded = (newComics) =>{
        let ended = false;
        if(newComics.length < 8){
            ended = true
        }
        setComics([...comics,...newComics])
        setOffset(offset => offset + 8);
        setComicsEnded(ended)
    }
    function renderItems(arr) {
        const items =  arr.map((item,i) => {
            return (
                <CSSTransition  timeout={500} classNames="my-node">
                    <li className="comics__item" key={item.id}>
                        <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
                
            </ul>
        )
    }
    return (
        <div className="comics__list">
                {setContent(process, () => renderItems(comics), newItemLoading)}
            <button 
            onClick={()=>getComics(offset)}
            style={{'display' : ComicEnded ? 'none' : 'block'}}
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;