import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfoModal from "../components/InfoModal";
import Loader from "../components/Loader";
import { useSiteContext } from "../components/SiteContext";

export default function Home({ data }) {
  const { setIsModalOpen, isModalOpen } = useSiteContext();

  const [word, setWord] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState({ display: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [alert, setAlert] = useState(false);

  const checkWordLength = (query) => {
    if (query.length !== 5) {
      setError({
        display: true,
        msg: "Oops 😔, please make sure your word has five characters",
      });
      setLoading(false);
      return false;
    }
    return true;
  };

  const checkCharacters = (query) => {
    const pattern = /[^a-zA-z]/;
    if (pattern.test(query)) {
      setError({
        display: true,
        msg: "Oops 😔, please make sure you only use the characters a-z",
      });
      setLoading(false);
      return false;
    }
    return true;
  };

  const isWord = async (query) => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    );
    const data = await res.json();

    if (data.title) {
      setError({
        display: true,
        msg: "Sorry, this is not an actual word. Please try again.",
      });
      setMessage(null);
      setLoading(false);
      return false;
    }
    return true;
  };

  const createWordle = async (e) => {
    e.preventDefault();
    setLink("");
    setError({
      display: false,
      msg: "",
    });
    setAlert(false);
    setLoading(true);

    // validators

    if (!checkWordLength(word)) return;
    if (!checkCharacters(word)) return;
    const isItAWord = await isWord(word);
    if (!isItAWord) return;

    // create Worlde

    try {
      const res = await fetch("https://wordle-maker.ap-1.evennode.com/", {
        method: "POST",
        body: JSON.stringify({ word: word }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setLink(data.wordleItem._id);
      setMessage(null);
      setLoading(false);
    } catch (error) {
      setError({
        display: true,
        msg: "Oops 😔, something went wrong. Please try again.",
      });
      setMessage(null);
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://wordlemaker.scottsdev.net/play/?id=${link}`
    );
    setAlert(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError({ display: false, msg: "" });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setMessage(
          "This is taking a little longer than we thought. Please hang on a moment."
        );
      }
    }, 10000);
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <div>
      <Head>
        <title>Wordle Maker</title>
        <meta
          name="description"
          content="Worldle Maker - Come make a custom Wordle puzzle for your friends to solve!"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="/" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main>
        <div className="homepage-container">
          {" "}
          <h1 className="wordle-heading">Wordle Maker</h1>
          <div className="content">
            <h2 className="intro">
              Fancy making a custom Wordle for your friends to solve?
            </h2>
            <h2 className="intro">Create your FREE Wordle below</h2>
            <h3 className="learn-more">
              New to the game?{" "}
              <button
                className="learn-more-btn"
                onClick={() => setIsModalOpen(true)}
              >
                Learn More
              </button>
            </h3>
            <form onSubmit={createWordle}>
              <input
                type="text"
                onChange={(e) => setWord(e.target.value.toLowerCase())}
                value={word}
                placeholder="Enter a five-letter word"
                required={true}
              />
              <div className="btn-container">
                <button type="submit" className="submit-btn" disabled={loading}>
                  Submit
                </button>
              </div>
            </form>
            <div className="status">
              {loading && <Loader message={message} />}
              {error.display && <p className="error">{error.msg}</p>}
              {link && (
                <div className="success-info">
                  <p className="created">Wordle Created 😀</p>
                  <p>Copy and share your Wordle link below: </p>
                  <div className="link-div">
                    <button onClick={copyLink} className="learn-more-btn">
                      Copy Link
                    </button>
                    <p>{alert ? "✅" : null}</p>
                  </div>
                </div>
              )}
            </div>
            <p className="developer">
              developed by{" "}
              <a
                href="https://www.scottsdev.net/"
                className="link"
                target="_blank"
              >
                Scott Mitchell
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
