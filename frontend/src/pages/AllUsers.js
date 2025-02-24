import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Paginations from './Pagination';
const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [search,setSearch] = useState("");
    const [role,setRole] = useState("All");
    const [sort ,setSort ] =useState("new")
    const [page,setPage] = useState(1);
    const [pageCounts,setPageCounts] = useState(0);
      // pagination
    // handle prev btn

    const handlePrevious = ()=>{
      setPage(()=>{
        if(page === 1) return page;
        return page - 1
      })
    }
  
    // handle next btn
    const handleNext = ()=>{
      setPage(()=>{
        if(page === pageCounts) return page;
        return page + 1
      })
    }

    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : "",
    })

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(
        `${SummaryApi.allUser.url}?search=${search}&role=${role}&sort=${sort}&page=${page}`, // Corrected template literal
        {
            method: SummaryApi.allUser.method,
            credentials: "include",
        }
    );

        const dataResponse = await fetchData.json()
        if(dataResponse.success){
            setAllUsers(dataResponse.data)
            // setPageCount(dataResponse?.Paginations?.pageCount)
   setPageCounts(dataResponse?.Pagination?.pageCount)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[search,role,sort,page])

  return (
    <div className="container mx-auto p-4">
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <Form className="flex items-center gap-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Search</Button>
          </Form>
        </div>
        <div className="flex items-center gap-4 mr-24 ">
          <div>
          <div>
  <label className="text-lg font-semibold">Sort By:</label>
  <select
    className="ml-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
    onChange={(e) => setSort(e.target.value)}
  >
    <option value="">Select</option>
    <option value="new">New User</option>
    <option value="old">Old User</option>
  </select>
</div>

          </div>
          <div className="ml-20">
  <h2 className="text-lg font-semibold mr-20">Filter By Role</h2>
  <div className="flex gap-4">
    <Form.Check 
      type="radio" 
      label="All" 
      name="Role" 
      value="All" 
      onChange={(e) => setRole(e.target.value)} 
      defaultChecked 
      className="cursor-pointer" 
    />
    <Form.Check 
      type="radio" 
      label="ADMIN" 
      name="Role" 
      value="ADMIN" 
      onChange={(e) => setRole(e.target.value)} 
      className="cursor-pointer"
    />
    <Form.Check 
      type="radio" 
      label="GENERAL" 
      name="Role" 
      value="GENERAL" 
      onChange={(e) => setRole(e.target.value)} 
      className="cursor-pointer"
    />
  </div>
</div>


        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 shadow-md rounded-lg text-left">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3">Sr.</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created Date</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((el, index) => (
              <tr key={el._id} className="border-b border-gray-300 hover:bg-gray-100 text-gray-800">
                <td className="px-4 py-3 text-center">{index + 1 + (page - 1) * 4}</td>
                <td className="px-4 py-3">{el?.name}</td>
                <td className="px-4 py-3">{el?.email}</td>
                <td className="px-4 py-3">{el?.role}</td>
                <td className="px-4 py-3">{moment(el?.createdAt).format("LL")}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white transition duration-200"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>

    <div className="flex justify-end mt-6">
      <div className="flex items-center gap-2 bg-gray-200 p-3 rounded-lg shadow-md">
        <button onClick={handlePrevious} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">Prev</button>
        <span className="text-gray-800 font-semibold">{page}</span>
        <button onClick={handleNext} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">Next</button>
      </div>
    </div>
  </div>
   
  )
}

export default AllUsers
