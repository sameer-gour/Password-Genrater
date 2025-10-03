import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setlength] = useState(0);
  const [isnum, setIsNum] = useState(false);
  const [islatter, setIsLatter] = useState(false);
  const [password, setPassword] = useState();
  


  const passwordRef = useRef(null);

  const passwordgenrat = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isnum) str += "0123456789";
    if (islatter) str += "!@#$%^&*()_+-={}[]|;<>,.?/";

    for (let i = 1; i < length; i++) {
      let temp = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(temp);
    }

    setPassword(pass);
  }, [length, islatter, isnum, setPassword]);

  useEffect(() => {
    passwordgenrat();
  }, [length, islatter, isnum, passwordgenrat]);

  const copypassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className="w-full h-screen bg-zinc-700 p-5 flex justify-center ">
        <div className="w-fit h-fit text-center bg-blue-200 p-5 rounded-4xl">
          <div>
            <h1 className="text-3xl mb-2 font-semibold ">Password Genrater</h1>

           <div className="flex w-full max-w-md">
  <input
    className="bg-zinc-100 w-full py-2 px-2 rounded-l-lg outline-none"
    type="text"
    value={password}
    placeholder="Password"
    readOnly
    ref={passwordRef}
  />
  <label
    onClick={copypassword}
    className="bg-blue-500 py-2 px-4 uppercase font-semibold rounded-r-lg text-white 
               transform transition duration-200 hover:bg-blue-700 active:scale-95 cursor-pointer"
  >
    copy
  </label>
</div>

          </div>
          <div className="flex justify-center">
            <div>
              <input
                className="cursor-pointer"
                onClick={(e) => {
                  setlength(e.target.value);
                }}
                type="range"
                min={3}
                max={30}
                  defaultValue="0"  
              ></input>

              <label className=" pr-3 ">{length}</label>
            </div>
            <div className="">
              <input
                className="cursor-pointer"
                type="checkbox"
                defaultChecked={islatter}
                onClick={() => {
                  setIsLatter((prev) => !prev);
                }}
              ></input>
              <label className="pr-2">latters</label>
            </div>
            <div>
              <input
                className="cursor-pointer  "
                type="checkbox"
                defaultChecked={isnum}
                onClick={() => {
                  setIsNum((prev) => !prev);
                }}
              ></input>
              <label className="pr-2">numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
