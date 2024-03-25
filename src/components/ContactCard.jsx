import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { db } from '../config/firebase';
import AddandUpdateContact from './AddandUpdateContact';
import useDisclose from '../hooks/useDisclose';
import { toast } from 'react-toastify';



const ContactCard=({contacts})=>{

  const {onClose,onOpen,isOpen}=useDisclose();

  const deleteContact=async(id)=>{
    try{
      await deleteDoc(doc(db,"contacts",id));
      toast.success("Contact Deleted Successfully");

    }catch(error){
      console.log(error);
    }
  }


    return(
      <>
    <div key={contacts.id} className="flex items-center justify-around rounded-lg bg-yellow p-2 ">
         <div className="flex gap-1">
         <HiOutlineUserCircle className="text-4xl text-orange"/>
          <div className="">
            <h2 className="font-medium">{contacts.name}</h2>
            <p className="text-sm">{contacts.email}</p>
          </div>
         </div>
            <div className="flex text-3xl">
              <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
              <IoMdTrash onClick={()=>deleteContact(contacts.id)} className="text-orange"/>
            </div>
        </div>
        <AddandUpdateContact contacts={contacts} isUpdate isOpen={isOpen} onClose={onClose}/>
        </>
    );
};
export default ContactCard; 