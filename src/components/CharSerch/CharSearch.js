import {useState,useEffect} from 'react';
import '../CharSerch/charSearch.scss'
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
const CharSeacrh = () =>{
    const [char,setChar] = useState(null)
    const {loading, error, getCharacterByName, clearError} = useMarvelService();
    const onCharLoaded = (char) =>{
        setChar(char)
        console.log(char)
    }
    const updateChar = (name) =>{
        clearError()
        getCharacterByName(name).then(onCharLoaded)
    };
    const results = !char ? null : char.length > 0 ?
    <div className="char__search-wrapper">
        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
            <div className="inner">To page</div>
        </Link>
    </div> : 
    <div className="char__search-error">
        The character was not found. Check the name and try again
    </div>;


    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string()
                            .min(2, 'Минимум 2 символа!')
                            .required('Обязательное поле!'),
                })}
                onSubmit={({charName})=>{
                    updateChar(charName)
                }}
                >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field   
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"
                            />
                        <button 
                            type='submit' 
                            className="button button__main"
                            >
                            <div className="inner">find</div>
                        </button>
                        
                    </div>
                    <FormikErrorMessage component="div" name="charName"/>
                </Form>
                </Formik>
                {results}
        </div>
    )
}
export default CharSeacrh;