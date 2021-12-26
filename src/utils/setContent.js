import Skeleton from '../components/skeleton/Skeleton';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';

const setContent  = (process,Component,data) =>{
    switch(process){
        case 'waiting': 
            return <Skeleton></Skeleton>;
            break;
        case 'loading': 
            return <Spinner></Spinner>;
            break;
        case 'confirmed':
            return <Component data={data}/>;
            break;
        case 'error' :
            return <ErrorMessage></ErrorMessage>;
            break;
        default:
            throw new Error("ФАК МАШИНА")
    }
};

export default setContent;