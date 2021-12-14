import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import React,{useState,useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
const ComicsList = () => {
    const [comics,setComics] = useState([])
    const [offset,setOffset] = useState(7891)
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [ComicEnded,setComicsEnded] = useState(false)
    const {loading,error,clearError,getAllComics} =  useMarvelService()
    useEffect(()=>{
        getComics(offset, true);
    },[]);

    const getComics = (offset, initial) =>{
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
        .then(onComicLoaded)
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
            console.log(item)
            return (
                <li className="comics__item" key={item.id}>
                    <a href={item.url} target="_blank">
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}$</div>
                    </a>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const items = renderItems(comics);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    return (
        <div className="comics__list">
    {items}
    {spinner}
    {errorMessage}
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