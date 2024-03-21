"use client";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const ToastProvider = ({ children }) => {
    return (
        <>
            <ToastContainer theme="dark" />
            {children}
        </>
    )
}
export default ToastProvider;