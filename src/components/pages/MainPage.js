import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import SearchChar from "../SearchCharPanel/SearchChar";
import {useState} from 'react';
import {Helmet} from "react-helmet";

const MainPage = () =>{
    const [selectChar,setChar] = useState(null)

    const onCharCelected = (id) =>{
        setChar(id);
    };
    return (
        <>
        <Helmet>
        <meta
      name="description"
      content="Marvel information portal"
    />
    <title>Marvel information</title>
        </Helmet>
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
                    <SearchChar />
            </ErrorBoundary>
        </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
};
export default MainPage