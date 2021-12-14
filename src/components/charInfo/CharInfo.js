import './charInfo.scss';
import Error from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner'
import React,{useState,useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types';

const  CharInfo = (props) => {
    const [char,setChar] = useState(null);
    const [comics,setComics] = useState(null);

    const {loading,error,getCharacter,clearError} =  useMarvelService()

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
        // this.foo.bar = 0
    }
    // fN5mmdMf
    const onCharLoaded = (char) =>{
        setChar(char);
    }



        const skeleton = loading || error || char ? null : <Skeleton></Skeleton> ;
        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {errorMessage}
                {spinner}
                {content}
                {skeleton}
            </div>
        )
}
const View = ({char}) =>{
    const {name,descr,thumbnail,homepage,wiki,comics} = char;
    let styleImg = {'objectFit' : 'cover'}
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        styleImg = {'objectFit' : 'contain'}
    }
    // console.log(comics)
    const allComics = comics.map((item,i )=>{
        return (
        <li className="char__comics-item" key={i}>
            {item.name}
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