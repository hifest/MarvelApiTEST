import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link,useNavigate ,useLocation} from 'react-router-dom';
const Page404 = () =>{
    let location = useLocation();
    let navigate = useNavigate();
    console.log(location)
    return (
        <div>
            <ErrorMessage></ErrorMessage>
            <p style={{'color': 'red','fontSize' : '24px', 'textAlign': 'center'}}>
            No match for {location.pathname}
            </p>
            <Link to="/" style={{'color': 'purple','fontSize' : '34px', 'textAlign': 'center', 'display' : 'block','marginTop' : '15px'}}>
                This button will take you back to the home page
            </Link>
            <button style={{'color': 'purple','fontSize' : '34px', 'textAlign': 'center', 'display' : 'block','margin' : '0'}} onClick={() => navigate(-1) }>Go back</button>
        </div>
    )
}
export default Page404;