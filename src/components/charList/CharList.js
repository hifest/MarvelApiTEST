import React,{useState,useEffect,useRef} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import { CSSTransition,TransitionGroup  } from 'react-transition-group';
import './charList.scss';
// import setContent from '../../utils/setContent';
const setContent  = (process,Component,newItem) =>{
    switch(process){
        case 'waiting': 
            return <Spinner></Spinner>;
            break;
        case 'loading': 
            return newItem ? <Component></Component> :  <Spinner></Spinner>;
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
const CharList = (props) => {

    const [charList,setCharList] = useState([])
    const [newItem,setNewItem] = useState(false)
    const [offset,setOffset] = useState(250)
    const [charEnded,setCharEnded] = useState(false)

    const {getAllCharactres,process,setProcess} =  useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset,initial) =>{
        initial ? setNewItem(false) : setNewItem(true)
        getAllCharactres(offset)
        .then(onCharListLoaded)
        .then(setProcess(()=> 'confirmed'))
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true
        }

        setCharList(charList => [...charList,...newCharList]);
        setNewItem(false);
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
                <CSSTransition  timeout={300} classNames="my-node" >
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
                </CSSTransition>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                {items}
                </TransitionGroup>
                
            </ul>
        )
    }

    


        return (
            <div className="char__list">
                {setContent(process,()=>renderItems(charList),newItem)}
                <button 
                disabled={newItem} 
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