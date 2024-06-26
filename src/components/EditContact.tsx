import { useSelector } from "react-redux";
import { useState } from "react";
import { EditContactQueryFunction } from '../lib/Queries'
import { Spinner } from "flowbite-react";
import toast, { Toaster } from 'react-hot-toast';

const EditContact = () => {

  const completeListObj = useSelector(
    (rootReducer: any) => rootReducer.contactReducer
  );

  const { id, firstName, lastName, contactNumber, status } = completeListObj.editContactData;
  const [userFirstName, updateFirstName] = useState(firstName);
  const [userLastName, updateLastName] = useState(lastName);
  const [usercontactNumber, setusercontactNumber] = useState(contactNumber);
  const [userActiveStatus, updateStatus] = useState(status);
  const { mutateAsync: EditContact, isPending: editingContact } = EditContactQueryFunction();

  const submitEditForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (userFirstName !== '' && userLastName !== '') {
      const newData = {
        id,
        firstName: userFirstName,
        lastName: userLastName,
        contactNumber: usercontactNumber,
        status: userActiveStatus
      }
      EditContact(newData)
    }
    else {
      toast.error("Please fill all details!!");
    }
  };

  return (
    <div className="overflow-visible md:h-screen min-h-[580px] md:w-full flex flex-col md:text-center items-center justify-center border text-[#36454F] bg-[#F3F3F3]">
      <h1 className="text-[25px] md:text-3xl mb-8 font-bold text-[#143d59]">
        Edit Contact
      </h1>
      <form onSubmit={submitEditForm}>
        <div className="flex flex-col md:w-[550px] w-[300px] mx-5 border p-10 h-[300px] bg-[white] rounded-xl drop-shadow-sm items-center justify-center">
          <div className="md:w-full block md:flex items-center mb-5 justify-between">
            <label
              className="mr-3 font-bold text-[18px] md:text-[25px]"
              htmlFor="FIRSTNAME"
            >
              First Name:
            </label>
            <input
              onChange={(event) => updateFirstName(event.target.value)}
              value={userFirstName}
              className="grow max-w-[300px] border-2 border-[#36454F] rounded-lg px-3 py-1 font-[500]"
              type="text"
              id="FIRSTNAME"
            />
          </div>

          <div className="md:w-full block md:flex  items-center mb-5 justify-between">
            <label
              className="mr-3 font-bold text-[18px] md:text-[25px]"
              htmlFor="LASTNAME"
            >
              Last Name:
            </label>
            <input
              onChange={(event) => updateLastName(event.target.value)}
              value={userLastName}
              className="grow max-w-[300px] border-2 border-[#36454F] rounded-lg px-3 py-1 font-[500]"
              type="text"
              id="LASTNAME"
            />
          </div>

          <div className="md:w-full block md:flex  items-center mb-5 justify-between">
            <label
              className="mr-3 font-bold text-[18px] md:text-[25px]"
              htmlFor="CONTACTNUMBER"
            >
              Contact Number:
            </label>
            <input
              onChange={(event) => setusercontactNumber(event.target.value)}
              value={usercontactNumber}
              className="grow max-w-[300px] border-2 border-[#36454F] rounded-lg px-3 py-1 font-[500]"
              type="text"
              id="CONTACTNUMBER"
            />
          </div>

          <div className="flex items-center text-[18px] md:text-2xl font-bold md:w-full justify-between">
            <h1 className="mr-5">Status: </h1>
            <div className="grow max-w-[300px]">
              <div className="flex items-center">
                <input
                  onChange={(event) => updateStatus(event.target.value)}
                  checked={userActiveStatus === "ACTIVE"}
                  className="mr-2 "
                  type="radio"
                  id="ACTIVE"
                  value="ACTIVE"
                  name="ACTIVEINACTIVE"
                />
                <label className=" mb-1" htmlFor="ACTIVE">
                  Active
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={(event) => updateStatus(event.target.value)}
                  checked={userActiveStatus === "INACTIVE"}
                  className="mr-2 "
                  type="radio"
                  id="INACTIVE"
                  value="INACTIVE"
                  name="ACTIVEINACTIVE"
                />
                <label className=" mb-1" htmlFor="INACTIVE">
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="hover:bg-[#d2a25b] hover:text-[#36454F] md:h-[50px] h-[40px] w-[200px] text-white font-bold rounded-xl drop-shadow-md bg-[#F49F1C] mt-5 "
            type="submit"
            onSubmit={submitEditForm}
          >
            {editingContact ? (<div><Spinner color="white" aria-label="Pink spinner example" /></div>) : (<div>Save Edited Contact</div>)}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default EditContact;
