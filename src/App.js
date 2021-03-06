import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import "./App.css";
import { FiDownload } from "react-icons/fi";
import { ImLoop } from "react-icons/im";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
const api = axios.create({
  baseURL: `https://0bd7-34-73-148-230.ngrok.io`,
});
function App() {
  const [input, setInput] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {}, [imgUrl]);

  const downloadImage = () => {
    saveAs(`${imgUrl}`, `${input}.jpg`); // Put your image url here.
  };

  const onClear = () => {
    setImgUrl("");
    setInput("");
    setLastInput("");
  };
  const getRandomNum = () => {
    return Math.floor(Math.random() * 300 + 1);
  };
  const generate = () => {
    setImgUrl("");
    if (input === "") {
      toast.error("Input can't be empty");
    } else {
      setLastInput(input);
      // const random = getRandomNum();
      // setImgUrl(`https://picsum.photos/id/${random}/600/300`);
      setLoading(true);
      api
        .get(`/${input}`)
        .then((res) => {
          setImgUrl(res.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Something went wrong.");
          setLoading(false);
        });
    }
  };
  const regenerate = () => {
    setImgUrl("");
    if (lastInput === "") {
      toast.error("Nothing to Regenerate");
    } else {
      // const random = getRandomNum();
      // setImgUrl(`https://picsum.photos/id/${random}/600/300`);
      setLoading(true);
      api
        .get(`/${lastInput}`)
        .then((res) => {
          setImgUrl(res.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Something went wrong.");
          setLoading(false);
        });
    }
  };
  const DownloadError = () => {
    toast.error("Nothing to Download");
  };
  return (
    <div className="container">
      <h1 className="heading">SketchNN</h1>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <h2 className="description">Enter Description To Generate Sketch</h2>
          <form>
            <div className="form-group rightMargin">
              <textarea
                className="form-control"
                value={input}
                rows="5"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder='For Example: "A horse under tree."'
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-info float-end rightMargin leftMargin topMargin"
              onClick={generate}
            >
              Generate
            </button>
            <button
              type="button"
              className="btn btn-light float-end topMargin"
              onClick={onClear}
            >
              Clear
            </button>
          </form>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="sketchContainer leftMargin topMargin rightMargin">
            {loading ? (
              <div className="d-flex justify-content-center marginAbove">
                <Oval color="black" height={80} width={80} />
              </div>
            ) : (
              <img
                src={
                  imgUrl
                    ? `data:image/png;base64, ${imgUrl}`
                    : require("./Images/Example.png")
                }
                alt={imgUrl ? "Generated Scene" : "A horse under tree"}
                className="imgFit"
              />
            )}
          </div>
          <FiDownload
            className="float-end rightMargin topMargin iconSize"
            onClick={imgUrl ? downloadImage : DownloadError}
          />
          <ImLoop
            className="float-end rightMargin topMargin iconSize"
            onClick={regenerate}
          />
        </div>
      </div>
      <div className="typewriter text-center">
        <Typewriter
          options={{
            strings: ["Draw Your Imaginations!"],
            autoStart: true,
            loop: true,
            pauseFor: 3000,
          }}
        />
      </div>
    </div>
  );
}

export default App;
