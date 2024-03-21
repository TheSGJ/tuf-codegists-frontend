"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState  } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";


export default function CodeInput() {
  const router = useRouter()
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", code);
    setCode(value)
  }, [code]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    console.log(username)
  }
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const [defaultLanguage, setDefaultLanguage] = useState(0);
  const [errors, setErrors] = useState([])
  const triggerDropdown = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  }
  const languages = [
    "Javascript",
    "C++",
    "Java",
    "Python"
  ]

  const changeDefaultLanguage = (index) => {
    setDefaultLanguage(index)
    triggerDropdown();
  }

  const getSyntax = () => {
    if (languages[defaultLanguage] === "Javascript") {
      return javascript()
    }
    if (languages[defaultLanguage] === "Python") {
      return python()
    }
    if (languages[defaultLanguage] === "C++") {
      return cpp()
    }
    if (languages[defaultLanguage] === "Java") {
      return java()
    }
  }

  const isSubmitDisabled = () => {
    if (code===""|username===""){
      return false
    } else {
      return true
    }
  }

  const submitCode = (e) => {
    e.preventDefault()
    addCode(code, languages[defaultLanguage], username)
  }
  const addCode = async (code, lang, username) => {
    function validateLang() {
      if (lang === "C++") {
        return "cpp"
      } else {
        const language = languages[defaultLanguage].toLowerCase()
        return language;
      }
    }
    try {
      setLoading(true)
      console.log("POSTING CODE:", code)
      console.log("POSTING lang:", validateLang())
      console.log("POSTING username:", username)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/new`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code, lang: validateLang(), username: username })
      })
      console.log('Adding a new code')
      console.log("Response Status:", response.status)
      const json = await response.json()
      if (response.status === 201) {
        toast("Code Submitted Successfully!")
        setLoading(false)
        router.push('/list')
      }

      if (response.status === 400){
        setErrors(json.errors)
        console.log(json.errors[0].msg)
        setLoading(false)
      }
      // console.log('response.status: ', response.status);
      console.log(json)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="container">
      <form>
        <div className="flex items-center justify-center from-teal-100 via-teal-300 to-teal-500">
          <div className="rounded-lg max-w-300 shadow-xl p-5 dark:bg-[#121212]">
            <div>
              <div className="text-gray-700">
                <div className="mb-6">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Username*
                  </label>
                  <input
                    className="shadow appearance-none border border-red-500 text-gray-200 bg-gray-600 rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    required
                  />
                </div>
                <>
                  <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={triggerDropdown}
                  >
                    {languages[defaultLanguage]}{" "}
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  <div
                    id="dropdown"
                    className={`${!showDropdown && "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      {
                        languages.map((title, index) => {
                          return (
                            <li key={index}>
                              <span
                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => changeDefaultLanguage(index)}
                              >
                                {title}
                              </span>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </>

                <div>
                  <CodeMirror
                    theme="dark"
                    height="270px"
                    width="340px"
                    value={code}
                    extensions={[getSyntax()]}
                    onChange={onChange}
                    required
                  />
                  <div>{errors&&errors.map((error, index)=>(
                    <p className="text-red-500 text-base" key={index}>
                      {error.msg}
                    </p>
                  ))}</div>
                </div>
              </div>
              {code === "" && <p className="text-red-500 text-xs italic">Code is required for submission.*</p>}
              <button onClick={submitCode} className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center bg-[#4285F4] dark:bg-blue-700" role="button" type="submit">
              
              <BeatLoader
        color="white"
        loading={loading}
        size={12}
        aria-label="Loading..."
        data-testid="loader"
      />
               {!loading && "Submit Code"}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
