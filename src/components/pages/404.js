import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link,useLocation,useNavigate} from 'react-router-dom';
const Page404 = () =>{
    let location = useLocation();
    let history = useNavigate ();
    console.log(history)
    return (
        <div>
            <ErrorMessage></ErrorMessage>
            <p style={{'color': 'red','fontSize' : '24px', 'textAlign': 'center'}}>
            No match for {location.pathname}
            </p>
            <Link to="/" style={{'color': 'purple','fontSize' : '34px', 'textAlign': 'center', 'display' : 'block','marginTop' : '15px'}}>
                This button will take you back to the home page
            </Link>
        {/* <Link type="button" onClick={() => history(-1)} style={{'color': 'dark','fontSize' : '34px', 'textAlign': 'center', 'display' : 'block', 'margin' :'0 auto', 'fontWeight':'bold', 'marginTop' : '15px'}}>
            This button will take you back to where you were
        </Link> */}
        </div>
    )
}
export default Page404;