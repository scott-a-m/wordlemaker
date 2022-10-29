import { useEffect, useRef, useState } from "react";
import Wordle from "../components/Wordle";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import Link from "next/link";

export default function Home() {
  const { query } = useRouter();

  const [solution, setSolution] = useState(null);
  const [wordleId, setWordleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const queryRef = useRef();
  queryRef.current = wordleId;

  const getWorlde = async () => {
    try {
      const res = await fetch(
        `https://wordle-maker.ap-1.evennode.com/${wordleId}`
      );
      const data = await res.json();
      setSolution(data.word);
      setMessage(null);
      setLoading(false);
    } catch (error) {
      setError(true);
      setMessage(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.id) {
      setWordleId(query.id);
    }
  }, [query.id]);

  useEffect(() => {
    if (wordleId) {
      getWorlde();
    }
  }, [wordleId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!queryRef.current) {
        setMessage(null);
        setLoading(false);
        setError(true);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setMessage(
          "This is taking a little longer than we thought. Please hang on a moment."
        );
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <main>
        <h1 className="wordle-heading">Wordle Maker</h1>
        <div>
          {loading && (
            <div className="whole-page">
              <Loader message={message} />
            </div>
          )}
          {solution && <Wordle solution={solution} />}
          {error && (
            <div className="whole-page">
              <div className="error-box">
                <h3>Oops, there's no game here 😔</h3>
                <h3>Please recheck your link</h3>
                <h3>
                  If you've forgotten it,{" "}
                  <Link href="/">
                    <a className="link">recreate one</a>
                  </Link>
                </h3>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
