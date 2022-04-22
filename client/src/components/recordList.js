import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import Create from "./create";
 
const Record = (props) => (
 <tr>
   <td>{props.record.name}</td>
   <td>{props.record.summary}</td>
   <td>{props.record.listing_url}</td>
   {/* <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td> */}
   <td>
      <Create 
        id={props.record._id}
        session_id={props.record._id}
      />
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await axios.get('/listings');
     const json = await response.data;
     console.log(json);
     setRecords(json);
   }
 
   getRecords();
 
   return;
 }, [/*records.length*/]);
 
 // This method will map out the records on the table

 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Summary</th>
           <th>Listing Url</th>
           <th>Action</th>
         </tr>
       </thead>
        <tbody>
          {records.map((record, i) => {
            return (
              <Record
                record={record}
                key={record._id}
              />
            );
          })}
        </tbody>
     </table>
   </div>
 );
}