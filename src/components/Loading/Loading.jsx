import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit';

const Loading = () => {
    return (
        <MDBSpinner color='primary'>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    )
}

export default Loading