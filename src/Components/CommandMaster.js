// import React,{useState}from 'react'
// // import CommandMstForm from './CommandMstForm'
// import CommandMstBtn from './CommandMstBtn'

// export const CommandMaster = () => {
//     const [formData, setFormData] = useState({
//        commandName:"",
//        shortName:"",
//        remarks:""
//       });

//       const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//       };


//   return (
//     <div>
//         {/* <CommandMstForm formData={formData} handleInputChange={handleInputChange}/> */}
          
//     <div className="col">
//       <label>Command Name</label>
//       <input
//         type="text"
//         name="commandName"
//         value={formData.commandName}
//         onChange={handleInputChange}
//       />

// <label>Short Name</label>
//       <input
//         type="text"
//         name="shortName"
//         value={formData.shortName}
//         onChange={handleInputChange}
//       />

// <label>remarks</label>
//       <input
//         type="text"
//         name="remarks"
//         value={formData.remarks}
//         onChange={handleInputChange}
//       />
//     </div>

//         <CommandMstBtn/>

//     </div>
//   )
// }

// // export default CommandMaster;



////////////////////////////////
// import React, { useState} from "react";
// import axios from "axios";


// const CommandMaster = () => {
  
//   const [command, setCommand] = useState({
//     name: "",
//     shortName: "",
//     remarks: "",
//   });
 
//   const [commandsList, setCommandsList] = useState([]);

  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCommand({ ...command, [name]: value });
//     console.log("checking command dta",command);
//   };

  
//   const handleSave = async () => {
//     if (command.name && command.shortName) {
//       setCommandsList([...commandsList, command]);
//       setCommand({ name: "", shortName: "", remarks: "" }); 
//     } else {
//       alert("requird");
//     }
//     try {
//         const response = await axios.post("http://localhost:8080/api/commands", command);
//         console.log("Command saved:", response.data);
//         alert("Command saved successfully in db");
  
      
        
//       } catch (error) {
//         console.error("Error saving command:", error);
//         alert("Failed to save command.");
//       }
//   };

//   const handleDelete = (index) => {
//     const updatedList = commandsList.filter((_, i) => i !== index);
//     setCommandsList(updatedList);
//   };

  

//   return (
//     <div className="container">
//       <h2>Command Master Form</h2>
//       <div>
//         <label>Command Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={command.name}
//           onChange={handleChange}
//           placeholder="Enter command name"
//         />
//       </div>

//       <div>
//         <label>Short Name:</label>
//         <input
//           type="text"
//           name="shortName"
//           value={command.shortName}
//           onChange={handleChange}
          
//         />
//       </div>

//       <div>
//         <label>Remarks:</label>
//         <input
//           type="text"
//           name="remarks"
//           value={command.remarks}
//           onChange={handleChange}
//           placeholder="Enter remarks"
//         />
//       </div>

//       <button onClick={handleSave}>Save</button>

      
//       {commandsList.length > 0 && (
//         <div>
//           <h3>submitted data</h3>
//           <ul>
//             {commandsList.map((cmd, index) => (
//               <li key={index}>
//                 {cmd.name} ({cmd.shortName}) andd {cmd.remarks}
//                 <button onClick={() => handleDelete(index)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommandMaster;





////////////////////////



import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CommandMaster = () => {
  
  const [command, setCommand] = useState({
    name: "",
    shortName: "",
    remarks: "",
  });

  const [commandsList, setCommandsList] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommand({ ...command, [name]: value });
  };

  // Save command to backend and list
  const handleSave = async () => {
    if (!command.name || !command.shortName) {
      alert("Command Name and Short Name are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8081/api/commands", command);
      console.log("Command saved:", response.data);

      // Add new command to the list
      setCommandsList([...commandsList, command]);

      // Reset the form
      setCommand({ name: "", shortName: "", remarks: "" });
      alert("Command saved successfully!");
    } catch (error) {
      console.error("Error saving command:", error);
      alert("Failed to save command.");
    }

    setLoading(false);
  };

  // Delete command from list
  const handleDelete = (index) => {
    const updatedList = commandsList.filter((_, i) => i !== index);
    setCommandsList(updatedList);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Command Master Form</h2>

      <div className="card p-4 shadow">
        {/* Command Name */}
        <div className="mb-3">
          <label className="form-label">Command Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={command.name}
            onChange={handleChange}
            placeholder="Enter command name"
          />
        </div>

        {/* Short Name */}
        <div className="mb-3">
          <label className="form-label">Short Name:</label>
          <input
            type="text"
            className="form-control"
            name="shortName"
            value={command.shortName}
            onChange={handleChange}
            placeholder="Enter short name"
          />
        </div>

        {/* Remarks */}
        <div className="mb-3">
          <label className="form-label">Remarks:</label>
          <input
            type="text"
            className="form-control"
            name="remarks"
            value={command.remarks}
            onChange={handleChange}
            placeholder="Enter remarks"
          />
        </div>

        {/* Save Button */}
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Command List in Bootstrap Table */}
      {commandsList.length > 0 && (
        <div className="mt-4">
          <h3 className="text-center mb-3">Submitted Data</h3>
          <table className="table table-striped table-bordered table-hover shadow">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Command Name</th>
                <th>Short Name</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandsList.map((cmd, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cmd.name}</td>
                  <td>{cmd.shortName}</td>
                  <td>{cmd.remarks}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommandMaster;



