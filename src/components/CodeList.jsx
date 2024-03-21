"use client";
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import ViewFullCode from './ViewFullCode';

export default function CodeList() {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const languages = [
        "Javascript",
        "C++",
        "Java",
        "Python"
    ]
    const fetchCodes = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/list`
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        setList(parsedData)
        setLoading(false)
    }
    useEffect(() => {
        fetchCodes()
    }, [])
    return (
        <div>
            <BeatLoader
                color="white"
                loading={loading}
                size={30}
                aria-label="Loading..."
                data-testid="loader"
            />
            <div>
                <div className="relative block bg-gray-700 rounded-lg shadow-lg">
                    {list.map((code, index) => (
                        <div key={index}>
                            <div className="bg-gray-800 p-8">
                                <div className="text-xs text-gray-300 uppercase font-semibold">{new Date(code.createdAt).toLocaleString()}</div>
                                <h2 className="mt-3 text-2xl mb-6 font-display font-bold text-white leading-tight max-w-sm">
                                    {code.username}
                                </h2>
                                <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded text-gray-300 bg-indigo-900">{code.lang}</span>

                                <CodeMirror
                                    value={code.code.slice(0, 99)}
                                    width='280px'
                                    color='#333333'
                                    theme="dark"
                                    readOnly={true}
                                    extensions={[cpp()]}
                                />
                                <a href={`#view-code-${code.id}`} className="text-blue-500 text-xs italic cursor-pointer hover:text-slate-500">{code.code.length>100&&"View Full Code"}</a>
                                <ViewFullCode id={code.id} code={code.code} username={code.username} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
