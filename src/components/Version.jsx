import React from 'react'

export default function Version() {
    return (
        <>
            <span className='text-[.6rem]'>{import.meta.env.VITE_MODE} {__APP_VERSION}</span>
        </>
    )
}
