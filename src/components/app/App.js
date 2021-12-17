import {lazy,Suspense} from 'react'

import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(()=>import("../pages/404"))
const MainPage = lazy(()=>import("../pages/MainPage"))
const ComicsPage = lazy(()=>import("../pages/ComicsPage"))
const SingleComicsPage = lazy(()=>import("../pages/SingleComicsPage"))

const  App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                  <Suspense fallback={<Spinner></Spinner>}>
                    <Switch>
                            <Route exact  path="/">
                                <MainPage/>
                            </Route>

                            <Route exact path="/comics">
                                <ComicsPage/>
                            </Route>

                            <Route exact path="/comics/:comicID">
                                <SingleComicsPage/>
                            </Route>

                            <Route path="*">
                                <Page404></Page404>
                            </Route>
                        </Switch>
                  </Suspense>
                </main>
            </div>
        </Router>
    )

    }

export default App;