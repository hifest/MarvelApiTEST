import {useState} from 'react';
import '../SearchCharPanel/SearchChar.scss';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
import Error from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner'

const SearchChar =  () =>{
    const [char,setChar] = useState(null)
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const updateChar = (name) =>{
        getCharacterByName(name).then(onCharLoaded)
    }
    const onCharLoaded = (char) =>{
        setChar(char)
        console.log(char)
    }
    const result =  !char ? null : char.length > 0 ? 
    <div className='search__char-wrapper'>
        <div className="search__char-success-text">
        There is! Visit {char[0].name} page?
        </div>
        <Link to={`/characters/${char[0].id}`}>
        <button  type='submit' className="button button__main button__secondary">
                    <div className="inner">Go to page</div>
        </button>
        </Link>
    </div> : <div className='search__char-wrapper'>
        <div className="search__char-error-text">
        The character was not found.  Check the name and try again
        </div>
    </div>
return(
    <div className="search__char-form">
        <Formik
        initialValues={{
            charName: ''
        }}
        validationSchema={Yup.object({
            charName: Yup.string().min(2,'Минимум 2 символа!').required('Обезательное поле!')
        })}
        onSubmit = {({charName})=>{
            updateChar(charName)
        }}
        >
        <Form>
            <label  htmlFor="charName" className="search__char-label">Or find a character by name:</label>
            <div className='search__char-wrapper'>
                <Field
                        id="charName" 
                        name='charName' 
                        type='text' 
                        placeholder="Enter name"
                ></Field>
                <button  type='submit' className="button button__main">
                    <div className="inner">find</div>
                </button>
            </div>
            <ErrorMessage component='div' className="char__search-error" name='charName'></ErrorMessage>
        </Form>
        </Formik>
        {result}
    </div>
)
}
export default SearchChar 