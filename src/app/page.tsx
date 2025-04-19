"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
    console.log('A-whenthishappens')
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log("filtering advocates...");
    const filteredAdvocatesNew = advocates.filter((advocate) => {
      return (
        advocate?.firstName?.toLowerCase().includes(searchTerm) ||
        advocate?.lastName?.toLowerCase().includes(searchTerm) ||
        advocate?.city?.toLowerCase().includes(searchTerm) ||
        advocate?.degree?.toLowerCase().includes(searchTerm)  ||
        advocate?.specialties?.filter(specialty=>specialty.toLowerCase().includes(searchTerm)).length > 0 ||
        advocate?.yearsOfExperience.toString()===(searchTerm) ||
        advocate?.phoneNumber.toString()===(searchTerm)
      );
    });
    
    setFilteredAdvocates(filteredAdvocatesNew);
  };

  const onClick = () => {
    document.getElementById("search-input").value = "";
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input id="search-input" style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table style={{border: "1px"}}>
        <thead>
          <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <tr key={index}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td> 
                  {advocate.specialties.map((s, i) => (
                    <div key={i + s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
