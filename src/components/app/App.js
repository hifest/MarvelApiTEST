// import {lazy,Suspense} from 'react'

// import AppHeader from "../appHeader/AppHeader";
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Spinner from '../spinner/Spinner';
// import { CSSTransition,TransitionGroup  } from 'react-transition-group';
// const Page404 = lazy(()=>import("../pages/404"))
// const MainPage = lazy(()=>import("../pages/MainPage"))
// const ComicsPage = lazy(()=>import("../pages/ComicsPage"))
// const SingleComicsPage = lazy(()=>import("../pages/SingleComicsPage"))
// const  App = () => {

//     return (

//         <Router>
//             <div className="app">
//                 <AppHeader/>
//                 <main>
//                   <Suspense fallback={<Spinner></Spinner>}>
//                     <Switch>
                        
//                             <Route exact  path="/">
//                                 <MainPage/>
//                             </Route>

//                             <Route exact path="/comics">
//                                 <ComicsPage/>
//                             </Route>

//                             <Route exact path="/comics/:comicID">
//                                 <SingleComicsPage/>
//                             </Route>

//                             <Route path="*">
//                                 <Page404></Page404>
//                             </Route>
//                         </Switch>
//                   </Suspense>
//                 </main>
//             </div>
//         </Router>
//     )

//     }
// export default App;
import {lazy,Suspense} from 'react'
import './appBann123213er.scss'
import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { CSSTransition } from 'react-transition-group'
const Page404 = lazy(()=>import("../pages/404"))
const MainPage = lazy(()=>import("../pages/MainPage"))
const ComicsPage = lazy(()=>import("../pages/ComicsPage"))
const SingleComicsPage = lazy(()=>import("../pages/SingleComicsPage"))

const  App = () => {
    const routes = [
        { path: '/', name: 'Home', Component: MainPage },
        { path: '/comics', name: 'About', Component: ComicsPage },
        { path: '/comics/:comicID', name: 'Contact', Component: SingleComicsPage },
        // {path:'*',name:'error',Component:Page404}
      ]
      const onAA = (a) =>{
          console.log(a)
      }
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                  <Suspense fallback={<Spinner></Spinner>}>
                  {routes.map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                    {({ match }) => (
                            <CSSTransition
                            in={match}
                            timeout={300}
                            classNames="page"
                            unmountOnExit
                            >
                            <div className="page">
                                <Component />
                            </div>
                            </CSSTransition>
                            )}
                    </Route>
          ))}
                  </Suspense>
                </main>
            </div>
        </Router>
    )


}

export default App;