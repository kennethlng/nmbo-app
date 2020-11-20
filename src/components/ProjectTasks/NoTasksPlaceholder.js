import React from 'react';
import { toast } from 'react-toastify';

export default function NoTasksPlaceholder() {
    const handleFocus = (e) => {
        copyToClipboard(); 
    }

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(window.location.href);

        toast("Checklist URL copied to clipboard", {
            position: toast.POSITION.TOP_CENTER
        })
    }

    return (
        <div className="block">
            <div className="block m-3 p-6 has-text-centered">
                <h3 className="title is-2">
                    👜 🏄 🍱 🛫
                </h3>
                <h4 className="subtitle is-4 has-text-grey">
                    Add something to the checklist!
                </h4>
            </div>
        </div>
    )
}