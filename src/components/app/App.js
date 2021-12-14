import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {useState} from 'react';

import decoration from '../../resources/img/vision.png';

const  App = () => {
    const [selectChar,setChar] = useState(null)

    const onCharCelected = (id) =>{
        setChar(id);
    };
        return (
            <div className="app">
                <AppHeader/>
                <main>
                <ComicsList></ComicsList>
                    {/* <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={onCharCelected} />
                        </ErrorBoundary>
  
                        <ErrorBoundary>
                            <CharInfo charId = {selectChar} />
                        </ErrorBoundary>

                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/> */}
                </main>
            </div>
        )
    }

export default App;