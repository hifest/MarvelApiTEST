import {lazy,Suspense} from 'react'

import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/AppBanner";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { CSSTransition,TransitionGroup  } from 'react-transition-group';
const Page404 = lazy(()=>import("../pages/404"))
const MainPage = lazy(()=>import("../pages/MainPage"))
const ComicsPage = lazy(()=>import("../pages/ComicsPage"))
const SingleComicsPage = lazy(()=>import("../pages/SingleComicsPage"))
const CharPage = lazy(()=>import ('../pages/CharPage'))
const  App = () => {
    return (

        <Router >
            <div className="app">
                <AppHeader/>
                <main>
                  <Suspense fallback={<Spinner></Spinner>}>
                    <Routes>
                            <Route  path="/" element={<MainPage/>} >
                            
                                    
                            </Route>
                            <Route  path="/comics" element={<ComicsPage/>}>
                            </Route>

                            <Route  path="/comics/:comicID" element={<SingleComicsPage/>}>
                            </Route>
                            <Route  path="/characters/:charID" element={<CharPage/>}>
                            </Route>

                            <Route path="*" element={<Page404></Page404>}>
                            </Route>
                        </Routes>
                  </Suspense>
                </main>
            </div>
        </Router>

    )

    }
export default App;