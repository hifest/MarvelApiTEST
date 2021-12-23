import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import CharSeacrh from "../CharSerch/CharSearch";
import {useState} from 'react';

const MainPage = () =>{
    const [selectChar,setChar] = useState(null)

    const onCharCelected = (id) =>{
        setChar(id);
    };
    return (
        <>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>

        <div className="char__content">

        <ErrorBoundary>
            <CharList onCharSelected={onCharCelected} />
        </ErrorBoundary>
        <div>
            <ErrorBoundary>
                    <CharInfo charId = {selectChar} />
            </ErrorBoundary>
            <ErrorBoundary>
                    <CharSeacrh></CharSeacrh>
            </ErrorBoundary>
        </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
};
export default MainPage