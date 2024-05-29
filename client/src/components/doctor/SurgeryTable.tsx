import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Surgery {
 _id: string;
 patientEmail: string;
 surgeryDate: string;
 doctorEmail: string;
 notes?: string[];
}

const SurgeryCards: React.FC = () => {
 const [surgeries, setSurgeries] = useState<Surgery[]>([]);

 useEffect(() => {
   const fetchSurgeries = async () => {
     try {
       const response = await axios.get<Surgery[]>('http://localhost:5173/getsurgeries');
       setSurgeries(response.data);
     } catch (error) {
       console.error('Error fetching surgeries:', error);
     }
   };

   fetchSurgeries();
 }, []);

 return (
   <div className="bg-white rounded-lg shadow-md overflow-hidden">
     <div className="bg-gradient-to-r from-[#91BF77] to-[#75a559] px-6 py-4 text-white flex items-center justify-between">
       <h2 className="text-2xl font-bold">Surgeries</h2>
     </div>
     <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
       {surgeries.map((surgery) => (
         <div key={surgery._id} className="bg-white shadow rounded-lg p-4">
           <div className="flex items-center space-x-3 mb-3">
             <h3 className="text-lg font-semibold">{surgery.patientEmail}</h3>
           </div>
           <div className="text-gray-700 mb-2">
             <div className="flex items-center space-x-2">
               <span>{surgery.doctorEmail}</span>
             </div>
             <div className="flex items-center space-x-2 mt-1">
               <span>{new Date(surgery.surgeryDate).toLocaleDateString()}</span>
             </div>
           </div>
           <div className="text-gray-700 mb-2">
           <span>Notes:</span>
             <div className="flex items-center space-x-2">
               
               <ul className="list-disc ml-4">
                 {surgery.notes?.map((note, index) => (
                   <li key={index}>{note}</li>
                 ))}
               </ul>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
};

export default SurgeryCards;