import React from "react";
import abstract from "../assets/abstract.jpg";
import building from "../assets/building.jpg";
import colors from "../assets/colors.jpg";
import lines from "../assets/lines.jpg";
import ocean from "../assets/ocean.jpg";
import sky from "../assets/sky.jpg";
import tree from "../assets/tree.jpg";
import universe from "../assets/universe.jpg";
import white from "../assets/white.jpg";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./helper";

const ChangeImageWindow = () => {
  const {
    username,
    setUsername,
    room,
    setRoom,
    socket,
    selectedImage,
    setSelectedImage,
    userSelectedImage,
    setUserSelectedImage,
  } = useContext(UserContext);

  // const [selectedImage, setSelectedImage] = useState([null]);
  // const [userSelectedImage, setUserSelectedImage] = useState([null]);

  useEffect(() => {
    document.getElementById(
      "body"
    ).style.backgroundImage = `url(${selectedImage})`;
    console.log("din local ---->>>>" + selectedImage + `url(${selectedImage})`);
  }, [selectedImage]);

  useEffect(() => {
    document.getElementById(
      "body"
    ).style.backgroundImage = `url(${URL.createObjectURL(
      new Blob(userSelectedImage)
    )})`;
    console.log(
      "de la user ---->>>>" +
        userSelectedImage +
        `url(${URL.createObjectURL(new Blob(userSelectedImage))})`
    );
  }, [userSelectedImage]);

  return (
    <div className="change-image-window">
      <div className="images container">
        <div className="row">
          <button
            className="img-btn"
            onClick={() => {
              setSelectedImage(abstract);
            }}
          >
            <img className="img" src={abstract} />
          </button>
          <button
            className="img-btn"
            onClick={() => {
              setSelectedImage(building);
            }}
          >
            <img className="img" src={building} />
          </button>
          <button
            className="img-btn"
            onClick={() => {
              setSelectedImage(colors);
            }}
          >
            <img className="img" src={colors} />
          </button>
        </div>
        <div className="row">
          <button
            className="img-btn"
            onClick={() => {
              setSelectedImage(lines);
            }}
          >
            <img className="img" src={lines} />
          </button>
          <button
            className="img-btn"
            onClick={() => {
              setSelectedImage(ocean);
            }}
          >
            <img className="img" src={ocean} />
          </button>
          <button
            className="img-btn"
            onClick={() => {
              setSelectedImage(sky);
            }}
          >
            <img className="img" src={sky} />
          </button>
        </div>
        <div className="row">
          <button
            className="img-btn"
            onClick={() => {
              setSelectedImage(tree);
            }}
          >
            <img className="img" src={tree} />
          </button>
          <button
            className="img-btn"
            onClick={() => {
              setSelectedImage(universe);
            }}
          >
            <img className="img" src={universe} />
          </button>
          <button
            className="img-btn"
            onClick={() => {
              setSelectedImage(white);
            }}
          >
            <img className="img" src={white} />
          </button>
        </div>
      </div>
      {/* choose your own image */}
      <label
        htmlFor="files"
        className="select"
        style={{
          backgroundColor: "lightgrey",
          borderRadius: "3px",
          margin: "3px",
          padding: "3px",
        }}
      >
        Select Image
      </label>
      <input
        id="files"
        style={{ visibility: "hidden" }}
        type="file"
        name="myImage"
        onChange={(event) => {
          setUserSelectedImage([event.target.files[0]]);
        }}
        accept=".png, .jpg, .jpeg"
      />
    </div>
  );
};

export default ChangeImageWindow;
