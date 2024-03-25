import Navbar from "./components/Navbar"
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import {collection, getDocs, onSnapshot} from  "firebase/firestore";
import {db} from  "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal"
import AddandUpdateContact from "./components/AddandUpdateContact";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

const App=()=> {
  const [contacts,setContacts]=useState([]);

  const {onClose,onOpen,isOpen}=useDisclose();


  useEffect( () =>{

    const getContacts=async()=>{

      try{

        const contactsRef=collection(db,"contacts");
      

        onSnapshot(contactsRef,(snapshot)=>{

        const contactLists=snapshot.docs.map((doc)=>{
          return{
          id: doc.id,
          ...doc.data(),
        };
      });
      setContacts(contactLists);
      return contactLists;
    })
      }catch(error){}
    }

    getContacts();
  },[]);

  const filterContacts=(e)=>{
    const value=e.target.value;
    const contactsRef=collection(db,"contacts");
      

        onSnapshot(contactsRef,(snapshot)=>{

        const contactLists=snapshot.docs.map((doc)=>{
          return{
          id: doc.id,
          ...doc.data(),
        };
      });
      

      const filteredContacts=contactLists.filter((contacts)=>contacts.name.toLowerCase().includes(value.toLowerCase()))
      setContacts(filteredContacts);
      return filteredContacts;
  })
}

  return (
    <>
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar/>
      <div className="flex gap-2">
      <div className="relative flex flex-grow items-center">
        <FiSearch className="absolute ml-1 text-3xl text-white"/>
        <input onChange={filterContacts} type="text"
        className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
        />
      </div>
      
      <AiFillPlusCircle onClick={onOpen} className="text-5xl cursor-pointer text-white" />
      
    </div>

    <div className="mt-4 flex flex-col gap-3">
      {contacts.length<=0?(<NotFoundContact/>):(contacts.map((contacts)=>(
        <ContactCard key={contacts.id} contacts={contacts}/>
      )))}
    </div>
    </div>
   <AddandUpdateContact onClose={onClose} isOpen={isOpen}/>
   <ToastContainer
   position="bottom-center"
   />
    </>
  )
}
export default App;