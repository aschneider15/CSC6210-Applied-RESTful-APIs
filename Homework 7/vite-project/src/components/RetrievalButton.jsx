import { useState } from "react";
import axios from "axios";

function RetrievalButton() {
  const [displayText, setDisplayText] = useState("Placeholder Text");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");

  const callAPIVerse = async (event) => {
    event.preventDefault();

    // Ensure all fields are filled
    if (!book || !chapter || !verse) {
      setDisplayText("Please enter a valid book, chapter, and verse.");
      return;
    }

    try {
      const response = await axios.get(
        `https://labs.bible.org/api/?passage=${book}+${chapter}:${verse}&formatting=plain`
      );
      console.log("API Response:", response.data);
      setDisplayText(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDisplayText("Error retrieving verse. Please try again.");
    }
  };

  return (
    <>
      <h2>{displayText}</h2>
      <p>Enter Book, Chapter, and Verse to retrieve a Bible passage.</p>
      <form onSubmit={callAPIVerse}>
        <label htmlFor="book">Book:</label>
        <input
          type="text"
          id="book"
          name="book"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          placeholder="e.g., John"
        />

        <label htmlFor="chapter">Chapter:</label>
        <input
          type="text"
          id="chapter"
          name="chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          placeholder="e.g., 3"
        />

        <label htmlFor="verse">Verse:</label>
        <input
          type="text"
          id="verse"
          name="verse"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          placeholder="e.g., 16"
        />

        <input type="submit" value="Retrieve" />
      </form>
    </>
  );
}

export default RetrievalButton;
