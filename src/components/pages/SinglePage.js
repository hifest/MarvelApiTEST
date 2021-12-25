import {useParams} from 'react-router-dom'
import Error from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from "../appBanner/AppBanner";
import '../pages/ComicAndChar.scss'
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import React,{useState,useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import { CSSTransition  } from 'react-transition-group';


const SinglePage = ({dataType}) => {
    const {id} = useParams();
    const [data,setData] = useState(null);
    const [load,setLoad] = useState(false)
    const {getCharacter,error,loading,clearError,getComic} = useMarvelService()
    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();
        switch (dataType) {
            case 'character' :
                getCharacter(id).then(onDataLoaded)
                break;
            case 'comic' :
                getComic(id).then(onDataLoaded)
        }
    }
    const onDataLoaded = (data) => {
        setData(data);
        setLoad(true)
    }
    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    let content;

    if(!(loading || error || !data)){
        if(dataType === 'character'){
            content =  <CharPage data={data} loading={load}></CharPage>
        }else if(dataType === 'comic'){
            content = <ComicPage data={data} loading={load}></ComicPage>
        }else{
            content = null
        }
    }

    return (
        <>
                <AppBanner></AppBanner>
                {errorMessage}
                {spinner}
                {content}
           
        </>
    )
}
const CharPage = ({data,loading}) =>{
    const {name,thumbnail,descr} = data;
    return (
    <CSSTransition in={loading} timeout={300} classNames="my-char">
        <div className="single-char">
        <Helmet>
        <meta
      name="description"
      content="Marvel information portal"
    />
    <title>{name}</title>
        </Helmet>
            <img  className="single-char__char-img" src={thumbnail}/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{descr}</p>
            </div>
            <Link to='/'>Back</Link>
        </div>
    </CSSTransition>
    )
};

const ComicPage = ({data,loading}) =>{
    const {title,description,pageCount,thumbnail,language,price} = data;
    return (
        <CSSTransition in={loading} timeout={300} classNames="my-comic">
        <div className="single-comic">
        <Helmet>
        <meta
      name="description"
      content="Marvel information portal"
    />
    <title>{title}</title>
        </Helmet>
        <img src={thumbnail} alt="x-men" className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount} pages</p>
            <p className="single-comic__descr">Language: {language}</p>
            <div className="single-comic__price">{price}$</div>
        </div>
        <Link to='/'>Back</Link>
    </div>
    </CSSTransition>
    )
}
export default SinglePage;