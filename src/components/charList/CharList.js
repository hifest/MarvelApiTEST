import React,{useState,useEffect,useRef} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import './charList.scss';

const CharList = (props) => {

    const [charList,setCharList] = useState([])
    const [newItem,setNewItem] = useState(false)
    const [offset,setOffset] = useState(250)
    const [charEnded,setCharEnded] = useState(false)

    const {loading,error,getAllCharactres} =  useMarvelService();

    useEffect(()=>{
        onRequest(offset, true);
    },[]);

    const onRequest = (offset,initial) =>{
        initial ? setNewItem(false) : setNewItem(true)
        getAllCharactres(offset)
        .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true
        }

        setCharList(charList => [...charList,...newCharList]);
        setNewItem(newItem => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended)

    }

  const itemRefs =  useRef([]);



    const onFocusItem = (id) =>{

        itemRefs.current.forEach(element => {
            element.classList.remove('char__item_selected')
        });

        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }
//try
    function renderItems(arr) {
        const items =  arr.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    ref = {el => itemRefs.current[i] = el}
                    onClick={()=>{ 
                        props.onCharSelected(item.id)
                        onFocusItem(i)
                    }} 
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            onFocusItem(i);
                        }
                    }}>
                    
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                
                {items}
            </ul>
        )
    }

        
        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItem ? <Spinner/> : null;
        // const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button 
                className="button button__main button__long"
                // disabled={newItemLoading}
                style = {{'display' : charEnded ? 'none' : 'block'}}
                onClick ={()=>onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

CharList.propTypes = {
    onCharSelected:PropTypes.func.isRequired
}

export default CharList;