import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import {Helmet} from "react-helmet";
const ComicsPage = () =>{
    return (
        <>
        <Helmet>
        <meta
      name="description"
      content="Marvel information portal"
    />
    <title>Marvel comics</title>
        </Helmet>
            <AppBanner></AppBanner>
            <ComicsList></ComicsList>
         </>
  
    )
};
export default ComicsPage