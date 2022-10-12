import { useState } from "react";
import { useAppContext } from "../store/Store";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
export default function Create() {
  //definir los estados de los libros
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [intro, setIntro] = useState("");
  const [completed, setCompleted] = useState(false);
  const [review, setReview] = useState("");

  //declarar la store y la navegacion
  const store = useAppContext();
  const navigate = useNavigate();

  //estilos
  const inputStyles = {
    formContainer: {
      width: "400px",
      margin: "0 auto",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      margin: "15px 0",
    },
    title: {
      fontSize: "16px",
      textAlign: "left",
      color: "white"
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      fontSize: "16px",
    },
  };

  const buttonStyle ={
    padding: "15px 20px",
    minWidth: "200px",
    border: "none",
    borderRadius: '5px',
    backgroundColor: "#12A6C1",
    color: "white",
    fontWeigth: 'bolder',
    fontSize: "18px"
  }

  //definir handle change para saber que input se esta tocando y cambiar el estado
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "intro":
        setIntro(value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "review":
        setReview(value);
        break;

      default:
    }
  }

  //renderizar un archivo y traducirlo como imagen
  function handleOnChangeFile(e) {
    const element = e.target;
    const file = element.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setCover(reader.result.toString());
    };
  }

  //funcion para cuando se pulsa el boton
  function handleSubmit(e) {
    //que el navegador no recargue la pagina cuando se pulsa el boton
    e.preventDefault();

    //declarar el nuevo libro
    const newBook = {
      id: crypto.randomUUID(),
      title,
      author,
      cover,
      intro,
      completed,
      review,
    };
    //registrar el libro
    store.createItem(newBook);
    navigate("/");
  }
  //componente
  return (
    <div>
      <Layout>
        <form onSubmit={handleSubmit} style={inputStyles.formContainer}>
          <div style={inputStyles.container}>
            <div style={inputStyles.title}>Title</div>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={title}
              style={inputStyles.input}
            />
          </div>
          <div style={inputStyles.container}>
            <div style={inputStyles.title}>Author</div>
            <input
              type="text"
              name="author"
              onChange={handleChange}
              value={author}
              style={inputStyles.input}
            />
          </div>
          <div style={inputStyles.container}>
            <div style={inputStyles.title}>Cover</div>
            <input type="file" name="cover" onChange={handleOnChangeFile} style={inputStyles.input} />
            <div>
              {!!cover ? <img src={cover} width="200" alt="preview" /> : ""}
            </div>
          </div>

          <div style={inputStyles.container}>
            <div style={inputStyles.title}>Introduction</div>
            <input
              type="text"
              name="intro"
              onChange={handleChange}
              value={intro}
              style={inputStyles.input}
            />
          </div>

          <div style={inputStyles.container}>
            <div style={inputStyles.title}>Completed</div>
            <input
              type="checkbox"
              name="completed"
              onChange={handleChange}
              value={completed}
              
            />
          </div>
          <div style={inputStyles.container}>
            <div style={inputStyles.title}>Review</div>
            <input
              type="text"
              name="review"
              onChange={handleChange}
              value={review}
              style={inputStyles.input}
            />
          </div>
          <input type="submit" value="Register book" style={buttonStyle}/>
        </form>
      </Layout>
    </div>
  );
}
