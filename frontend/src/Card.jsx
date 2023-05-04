import './Card.css'

export default function Card({ tokens }){
console.log("Insider Card");
console.log(tokens)
    return (
        <>
       <div className="container">
        {tokens.map(({ chain, imageUrl, contractAddress, name, symbol }) => {
          return (
            <>
              <div
                style={{
                  width: "360px",
                  height: "220px",
                  padding: "20px",
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                className="creditCard"
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
                      {name}
                    </h2>
                    <h2 style={{ margin: "0" }}>{symbol}</h2>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <p style={{ margin: "0" }}>{chain}</p>
                    <p style={{ margin: "0" }}>{contractAddress}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
            </div>
        </>
    )
}
