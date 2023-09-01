import { useState } from "react";
import { changeChain, getCurrentChain } from "./changeChain";
import { pause, unPause, mint, burn } from "./createToken";
import "./Card.css";

const ID = {
  mainnet: "0x1",
  goerli: "0x5",
  polygon: "0x89",
  sepolia: "0xaa36a7",
  mumbai: "0x13881",
};

export default function Card({ tokens, signer }) {
  async function sameChain() {
    console.log(ID[tokens[active].chain]);
    await changeChain(ID[tokens[active].chain]);
  }

  async function MINT() {
    setisLoading(0);
    const value = document.getElementById("mintValue").value;
    try {
      await sameChain();
      await mint(tokens[active].contract, signer, value);

      setTimeout(() => {
        setisLoading(1);
      }, 8000);
      document.getElementById("mintValue").value = "";
    } catch {
      setisLoading(-1);
    }
  }

  async function BURN() {
    setisLoading(0);
    const value = document.getElementById("burnValue").value;
    try {
      await sameChain();
      await burn(tokens[active].contract, signer, value);
      setTimeout(() => {
        setisLoading(1);
      }, 8000);
      document.getElementById("burnValue").value = "";
    } catch {
      setisLoading(-1);
    }
  }

  async function PAUSE() {
    setisLoading(0);
    try {
      await sameChain();
      await pause(tokens[active].contract, signer);
      setTimeout(() => {
        setisLoading(1);
      }, 8000);
    } catch {
      setisLoading(-1);
    }
  }

  async function UNPAUSE() {
    setisLoading(0);
    try {
      await sameChain();
      await unPause(tokens[active].contract, signer);
      setTimeout(() => {
        setisLoading(1);
      }, 8000);
    } catch {
      setisLoading(-1);
    }
  }

  const [active, setactive] = useState(0);
  const [isLoading, setisLoading] = useState(10);

  const url =
    "https://images.unsplash.com/photo-1682684123154-c21854fd90cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60";
  const symbol = "PWD";
  const name = "Panda";
  const address = "859025845028025";
  return (
    <>
      <div style={{ flexFlow: "row wrap" }} className="container">
        <div
          style={{ display: "flex", width: "60%", flexFlow: "row wrap" }}
          className="cards"
        >
          <div
            style={{ flex: "100%", display: "flex", justifyContent: "center" }}
          >
            <h1
              className="heading"
              style={{
                color: "rgb(243, 45, 184)",
                textShadow: "2px 2px 5px #FF007F",
              }}
            >
              Console
            </h1>
          </div>
          {tokens.map(({ chain, imageUrl, contract, name, symbol }, index) => {
            return (
              <>
                <div
                  style={{
                    width: "330px",
                    height: "180px",
                    padding: "20px",
                    display: "flex",
                    flexFlow: "row wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="creditCard"
                  onClick={() => setactive(index)}
                >
                  <img
                    src={imageUrl}
                    display="absolute"
                    alt="Token Image "
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "70%",
                      height: "100%",
                      paddingLeft: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                      }}
                    >
                      <h2 style={{ margin: "0", marginRight: "10px" }}>
                        {name.toUpperCase()}
                      </h2>
                      <h2 style={{ margin: "0" }}>({symbol.toUpperCase()})</h2>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <p style={{ margin: "0" }}>{chain.toUpperCase()}</p>
                      <p style={{ margin: "0" }}>
                        {contract.slice(0, 20) + "...."}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {tokens.length > 0 && (
          <div
            style={{
              display: "flex",
              flexFlow: "column ",
              width: "30%",
              background: "#333333",
              borderRadius: "10px",
              height: "88vh",
              alignItems: "center",
              border: "5px solid #000",
              position: "fixed",
              right: "20px",
              top: "68px",
            }}
          >
            <div
              style={{
                width: "50%",
                background: "#000",
                borderEndEndRadius: "10px",
                borderEndStartRadius: "10px",
                height: "15px",
              }}
            ></div>
            <img
              src={tokens ? tokens[active].imageUrl : url}
              alt="Token Image"
              style={{
                marginTop: "50px",
                width: "200px",
                height: "200px",
                borderRadius: "10%",
                border: "5px solid #000",
              }}
            />

            <div>
              <h2 style={{ marginBottom: "0px", color: "white" }}>
                {tokens ? tokens[active].symbol.toUpperCase() : symbol}
              </h2>
            </div>
            <div>
              <p style={{ marginTop: "2px", color: "white" }}>
                {tokens ? tokens[active].name.toUpperCase() : name}
              </p>
            </div>
            <div
              className={
                isLoading == 0
                  ? "circle"
                  : isLoading == 1
                  ? "success"
                  : isLoading == -1 && "fail"
              }
            ></div>
            <div
              style={{
                background: "#202123",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                marginTop: "15px",
              }}
            >
              <p style={{ marginTop: "20px", color: "white" }}>
                Contract Address :{" "}
                {tokens
                  ? tokens[active].contract.slice(0, 15) + "..."
                  : address.slice(0, 15) + "..."}
              </p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button
                  className="cardButton"
                  disabled={isLoading == 0 && true}
                  onClick={() => MINT()}
                >
                  Mint
                </button>
                <input
                  className="cardInput"
                  type="number"
                  disabled={isLoading == 0 && true}
                  id="mintValue"
                ></input>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "10px",
                }}
              >
                <button
                  className="cardButton"
                  disabled={isLoading == 0 && true}
                  onClick={() => BURN()}
                >
                  Burn
                </button>
                <input
                  className="cardInput"
                  disabled={isLoading == 0 && true}
                  type="number"
                  id="burnValue"
                ></input>
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "30px 20px 10px",
                  justifyContent: "space-between",
                }}
              >
                <button
                  className="cardButton"
                  disabled={isLoading == 0 && true}
                  onClick={() => PAUSE()}
                >
                  Pause
                </button>
                <button
                  className="cardButton"
                  disabled={isLoading == 0 && true}
                  onClick={() => UNPAUSE()}
                >
                  Unpause
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
