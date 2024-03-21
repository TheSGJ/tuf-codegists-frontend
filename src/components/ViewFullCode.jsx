import React from 'react'
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from '@codemirror/lang-cpp';

function ViewFullCode({ id, username, code }) {
    return (
        <div>
            <div id={`view-code-${id}`} class="modalDialog">
                <div className="container px-5 py-8 mx-auto">
                    <div className="flex flex-col text-center mx-8">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                            {username}
                        </h1>
                    </div>
                    <form className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">

                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label
                                        htmlFor="code"
                                        className="leading-7 text-sm text-white"
                                    >
                                        <CodeMirror
                                            value={code}
                                            maxWidth='300px'
                                            minWidth="380px"
                                            minHeight="380px"
                                            color='#333333'
                                            theme="dark"
                                            readOnly={true}
                                            extensions={[cpp()]}
                                        />
                                        <a href="#close" title="Close">
                                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    CLOSE
                                                </span>
                                            </button>
                                        </a>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ViewFullCode