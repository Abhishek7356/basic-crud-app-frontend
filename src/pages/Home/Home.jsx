import React, { useEffect, useState } from 'react'
import './Home.css'
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink
} from 'mdb-react-ui-kit';
import { deleteItem, getAllItems, updateItem } from '../../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { validateItemForm } from '../../validation/itemValidation';



const Home = ({ status }) => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        name: '',
        description: ''
    });
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [centredModal, setCentredModal] = useState(false);
    const [basicModal, setBasicModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [errors, setErrors] = useState({});

    const toggleOpen = () => setBasicModal(!basicModal);
    const toggleOpenForDelete = () => setCentredModal(!centredModal);


    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;
    const paginationSize = Math.ceil(items.length / itemPerPage);


    const fetchData = async () => {
        const res = await getAllItems();
        // console.log(res)
        setItems(res.data)
        setLoading(false)
    }
    // console.log(items)

    const handlePopup = (id) => {
        toggleOpenForDelete()
        setDeleteItemId(id)

    }

    const handleSetEdit = (item) => {
        toggleOpen()
        setErrors({})
        setData(item)
        // console.log(items.includes(item))
    }
    // console.log(data)

    const handleEdit = async () => {
        const body = { name: data.name, description: data.description }
        if (data.name == '' || data.description == '') {
            setErrors(validateItemForm(body))
        }

        if (data.name && data.description) {
            const res = await updateItem(data.ID, body);
            // console.log(res)
            if (res.status == 200) {
                fetchData()
                setBasicModal(false)
                toast.success("Item has updated successfully", {
                    theme: "dark",
                    position: "bottom-right"
                });
            } else {
                toast.error("Some went wrong !", {
                    theme: "dark",
                    position: "bottom-right"
                });
            }
        }
    }

    const handleDelete = async () => {
        const res = await deleteItem(deleteItemId)
        // console.log(res)
        if (res.status == 200) {
            fetchData()
            setCentredModal(false)
            setDeleteItemId(null)
            toast.error("Item has deleted successfully", {
                theme: "dark",
                position: "bottom-right"
            });
        }
    }

    useEffect(() => {
        fetchData()

    }, [status])

    const allItems = items.slice(firstItemIndex, lastItemIndex).map((item, key) => {
        return (
            <tr key={key}>
                <th scope='row'>{key + firstItemIndex + 1}</th>
                <td><Link to={`/item/${item.ID}`}>{item.name}</Link></td>
                <td>{item.description}</td>
                <th scope='row'>{item.ID}</th>
                <td className='d-flex gap-1' style={{ flexWrap: 'wrap' }}>
                    <button onClick={() => handleSetEdit(item)} className='btn btn-outline-primary'><i className='fa-solid  fa-pencil'></i></button>
                    <button onClick={() => handlePopup(item.ID)} className='btn btn-secondary'><i className='fa-solid  fa-trash'></i></button>
                </td>
            </tr >
        )
    })

    const paginationLength = items.map((item, key) => {
        if (key < paginationSize) {
            return (
                <MDBPaginationItem className={currentPage == key + 1 ? 'bg-secondary rounded' : ''}>
                    <MDBPaginationLink onClick={() => setCurrentPage(key + 1)}>{key + 1}</MDBPaginationLink>
                </MDBPaginationItem>
            )
        }
    })

    return (
        <div className='container pt-2' style={{ flex: '1' }}>
            {loading ? <div className='w-full d-flex justify-content-center pt-5'><Loading /></div>
                : items.length > 0 ?
                    <div class="table-responsive">
                        <MDBTable className='table-hover'>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>SI No.</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Description</th>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {allItems}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    :
                    <div className='d-flex align-items-center flex-column gap-3'>
                        <img src="https://ouch-cdn2.icons8.com/nC3HaCGSAW-r9xtJ9b1iDjFqhqxykpUZxThkxKwePnk/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMy82/YTk5NTJiMi1mNWVh/LTRkNDAtYjZlMi1h/ZGQzODUwYTIwMjUu/c3Zn.png" className='emptyImage' alt="" />
                        <h5>Items is empty! Add items</h5>
                    </div>
            }


            {/* Pagination */}
            {items.length > 0 &&
                <div className='d-flex justify-content-center mt-5'>
                    <nav aria-label='Page navigation example'>
                        <MDBPagination className='mb-0'>
                            {currentPage > '1' && <MDBPaginationItem>
                                <MDBPaginationLink onClick={() => setCurrentPage(currentPage - 1)} >Prev</MDBPaginationLink>
                            </MDBPaginationItem>}
                            {paginationLength}
                            {currentPage < paginationSize && <MDBPaginationItem>
                                <MDBPaginationLink onClick={() => setCurrentPage(currentPage + 1)}>Next</MDBPaginationLink>
                            </MDBPaginationItem>}
                        </MDBPagination>
                    </nav>
                </div>
            }


            <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Edit document</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='py-4'>
                            <MDBInput onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} className='mb-3' type='email' id='form1Example1' label='Enter name' />
                            {errors.name && <p className='text-danger mb-4'>{errors.name}</p>}
                            <MDBInput onChange={(e) => setData({ ...data, description: e.target.value })} value={data.description} className='mb-3' type='text' id='form1Example2' label='Enter description' />
                            {errors.description && <p className='text-danger mb-4'>{errors.description}</p>}
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn disabled={items.includes(data)} onClick={handleEdit} >Save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


            {/* for delete popup */}
            <MDBModal tabIndex='-1' open={centredModal} setOpen={setCentredModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalBody>
                            <p className='fw-bold text-center fs-6 py-3'>
                                Are you sure you want to delete this item ?
                            </p>
                            <div className='d-flex justify-content-center gap-3'>
                                <MDBBtn color='secondary' onClick={toggleOpenForDelete}>
                                    Cancel
                                </MDBBtn>
                                <MDBBtn className='btn-danger' onClick={handleDelete} >Delete</MDBBtn>
                            </div>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


            {/* for toast */}
            <ToastContainer />
        </div>
    )
}

export default Home