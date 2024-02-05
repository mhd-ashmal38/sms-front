import React from 'react'

function LoadingSpinner() {
    return (
        <div>
            <div className='flex justify-center items-center my-60 md:m-60'>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        </div>
    )
}

export default LoadingSpinner