import React, { useState } from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
import { addItem, deleteItem } from '../../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { validateItemForm } from '../../validation/itemValidation';


const Header = ({ status, setStatus }) => {

    const [data, setData] = useState({
        name: '',
        description: ''
    })
    const [errors, setErrors] = useState({})
    console.log(data)
    const [topRightModal, setTopRightModal] = useState(false);

    const toggleOpen = () => {
        setTopRightModal(!topRightModal)
        setErrors({})
    };

    const handleAddData = async () => {
        const { name, description } = data
        if (name == '' || description == '') {
            setErrors(validateItemForm({ name, description }));
        }
        if (name && description) {
            const res = await addItem(data)
            // console.log(res)
            if (res.status == 200) {
                setTopRightModal(false)
                setStatus(!status)
                setData({
                    name: '',
                    description: ''
                })
                setErrors({})
            } else {
                toast.error("Something went wrong !", {
                    theme: "dark",
                    position: "bottom-right"
                });
            }
        }
    }

    // console.log(errors)

    return (
        <>
            <MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand className='fw-bold'>
                        <img
                            src='https://res.cloudinary.com/practicaldev/image/fetch/s--XKjmRPlR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ogwbccm17y7b24ues8hp.png'
                            height='30'
                            alt=''
                            loading='lazy'
                            className='me-2'
                        />
                        <span className='brandName'><Link to={'/'}>Crud App</Link></span>
                    </MDBNavbarBrand>
                    <div>
                        <button onClick={toggleOpen} className='btn btn-secondary'>Add item</button>
                    </div>
                </MDBContainer>
                <MDBModal
                    animationDirection='right'
                    open={topRightModal}
                    tabIndex='-1'
                    setOpen={setTopRightModal}
                >
                    <MDBModalDialog position='top-right' side>
                        <MDBModalContent>
                            <MDBModalHeader className='bg-info text-white'>
                                <MDBModalTitle>Add new Item</MDBModalTitle>
                                <MDBBtn
                                    color='none'
                                    className='btn-close btn-close-white'
                                    onClick={toggleOpen}
                                ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <div className='row'>
                                    <div className='col-12 py-4'>
                                        <MDBInput onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} className='mb-3' type='email' id='form1Example1' label='Enter name' />
                                        {errors.name && <p className='text-danger mb-4'>{errors.name}</p>}
                                        <MDBInput onChange={(e) => setData({ ...data, description: e.target.value })} className='mb-3' value={data.description} type='text' id='form1Example2' label='Enter description' />
                                        {errors.description && <p className='text-danger mb-4'>{errors.description}</p>}
                                    </div>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='info' onClick={handleAddData}>Add</MDBBtn>
                                <MDBBtn outline color='info' onClick={toggleOpen}>
                                    Cancel
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </MDBNavbar>

            <ToastContainer autoClose={500} />
        </>
    )
}

export default Header