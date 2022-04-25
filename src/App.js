import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [description, setDesription] = useState("");
  const [bookslist, setBookslist] = useState("");
  const [newBooks, setNewBooks] = useState("");
  //const [Category, setCategory] = useState("");
  const [userImage, setUserImage] = useState({ file: null });

  useEffect(() => {
    axios
      .get("http://localhost:8000/read")
      .then((response) => setBookslist(response.data))
      .catch((Error) => console.log(Error));
  }, []);
  console.log(bookslist);
  const handleFileInput = (e) => {
    axios.post("http://localhost:5000/upload-profile-pic");
    setUserImage({ file: URL.createObjectURL(e.target.files[0]) });
  };
  const handelClick = () => {
    axios.post("http://localhost:5000/insert", {
      userImage: userImage,
      title: title,
      authors: authors,
      description: description,
      // Category: Category,
    });
  };
  const updateBooks = (id) => {
    axios.put("http://localhost:5000/update", {
      id: id,
      newBooks: newBooks,
    });
  };
  const deletebooks = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`);
  };
  return (
    <div className="App">
      <div>Haloo Crud with MERN</div>
      <label>fotos upload:</label>
      <input
        type="file"
        name="fileinput"
        id="fileinput"
        onChange={handleFileInput}
      />
      <label>title :</label>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>authors :</label>
      <input
        type="text"
        placeholder="authors"
        onChange={(e) => setAuthors(e.target.value)}
      />

      <label>description :</label>
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDesription(e.target.value)}
      />
      <label>Category :</label>
      <select aria-label="choose varieties for books">
        <option>choose varieties for books</option>
        <option value="Poems">Poems</option>
        <option value="Western">Western</option>
        <option value="History">History</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Drama">Drama</option>
        <option value="Fairy-tale">Fairy-tale</option>
        <option value="Fiction">Fiction"</option>
        <option value="Novel">Novel</option>
        <option value="Romance">Romance</option>
        <option value="Myth">Myth</option>
      </select>
      <br />
      <select aria-label="give away or sale">
        <option>give away or sale</option>
        <option value="give away">give away</option>
        <option value="sale">sale</option>
      </select>
      <br />
      <button onClick={handelClick}>send</button>

      <h1> Books Liste</h1>

      {bookslist &&
        bookslist.map((val, index) => {
          return (
            <div className="main">
              <ul>
                <li>
                  <img src={userImage.file} alt="" />
                </li>
                <li key={index}>title:{val.title}</li>
                <li>authors: {val.authors}</li>
                <li>description: {val.description}</li>
              </ul>
              <input
                type="text"
                placeholder="new books name"
                onChange={(e) => setNewBooks(e.target.value)}
              />
              <button onClick={() => updateBooks(val._id)}>update</button>
              <br />
              <button onClick={() => deletebooks(val._id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
}

export default App;
