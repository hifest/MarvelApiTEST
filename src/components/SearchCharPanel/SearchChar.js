import { useState,useEffect } from "react";
import "../SearchCharPanel/SearchChar.scss";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage,useFormik } from "formik";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../errorMessage/ErrorMessage";

const setContent = (process,  char) => {
  switch (process) {
    case "waiting":
      return null;
      break;
    case "loading":
      return <Spinner></Spinner>;
      break;
    case "confirmed":
      return char.length > 0 ?
       (
        <div className="search__char-wrapper">
          <div className="search__char-success-text">
            There is! Visit {char[0].name} page?
          </div>
          <Link to={`/characters/${char[0].id}`}>
            <button
              type="submit"
              className="button button__main button__secondary"
            >
              <div className="inner">Go to page</div>
            </button>
          </Link>
        </div>
      ) : (
        <div className="search__char-wrapper">
          <div className="search__char-error-text">
            The character was not found. Check the name and try again
          </div>
        </div>
      );
      break;
    case "error":
      return  <ErrorMessage></ErrorMessage>;
      break;
    default:
      throw new Error("ФАК МАШИНА");
  }
};

const SearchChar = () => {
  const [char, setChar] = useState(null);
  const { getCharacterByName, clearError, process, setProcess } = useMarvelService();
  const [newItem,setNewItem] = useState(false);

  const updateChar = (name) => {
    setNewItem(true)
    getCharacterByName(name)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };
  const onCharLoaded = (char) => {
    setNewItem(false)
    clearError();
    setChar(char);
  };

  const result = setContent(process,char)
  return (
    <div className="search__char-form">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string()
            .min(2, "Минимум 2 символа!")
            .required("Обезательное поле!"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form>
          <label htmlFor="charName" className="search__char-label">
            Or find a character by name:
          </label>
          <div className="search__char-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            ></Field>
            <button type="submit" className="button button__main"  disabled={newItem}>
              <div className="inner">find</div>
            </button>
          </div>
          <ErrorMessage
            component="div"
            className="char__search-error"
            name="charName"
          ></ErrorMessage>
        </Form>
      </Formik>
      {result}
    </div>
  );
};
export default SearchChar;
