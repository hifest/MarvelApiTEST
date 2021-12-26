import {lazy,Suspense} from 'react'

import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
const Page404 = lazy(()=>import("../pages/404"))
const MainPage = lazy(()=>import("../pages/MainPage"))
const ComicsPage = lazy(()=>import("../pages/ComicsPage"))
const SinglePage = lazy(()=>import('../pages/SinglePage'))
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
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

                            <Route  path="/comics/:id" element={<SinglePage Component={SingleComicLayout}  dataType='comic'/>}> 
                            {/* //зайди в singlepage.js если не понял зачем нужен dataType */}
                            </Route>
                            <Route  path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout}  dataType='character'/>}>
                                {/* //зайди в singlepage.js если не понял зачем нужен dataType */}
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