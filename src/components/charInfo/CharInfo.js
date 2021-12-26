import './charInfo.scss';
import React,{useState,useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import setContent from '../../utils/setContent';

const  CharInfo = (props) => {
    const [char,setChar] = useState(null);
    // const [comics,setComics] = useState(null);

    const {getCharacter,clearError,process,setProcess} =  useMarvelService()

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () =>{
        const {charId} = props;
        if(!charId){
            return;
        }
        clearError()
        getCharacter(charId)
        .then(onCharLoaded)
        .then(()=>setProcess('confirmed'))
        // this.foo.bar = 0
    }
    // fN5mmdMf
    const onCharLoaded = (char) =>{
        setChar(char);
    }


        return (
            <div className="char__info">
                {setContent(process,View,char)}
            </div>
        )
}
const View = ({data}) =>{
    const {name,descr,thumbnail,homepage,wiki,comics} = data;
    let styleImg = {'objectFit' : 'cover'}
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        styleImg = {'objectFit' : 'contain'}
    }
    const allComics = comics.map((item,i )=>{
        let allUrl = []
        allUrl.push(item.resourceURI)
       let url = allUrl.map(item => {
            let n = item.lastIndexOf('/');
            let result = item.substring(n + 1);
            return +result
    });
        return (
        <li className="char__comics-item" key={i}>
            <Link to={`comics/${url}`}>
            {item.name}
            </Link>
        </li>
        )
    })
    return (
        <>
        <div className="char__basics">
                    <img src={thumbnail} alt="abyss" style={styleImg}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {descr}
                </div>
                <div className="char__comics">Comics:
                </div>
                <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {allComics}
                </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;