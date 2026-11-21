import US_STATES from '../data/states';
import './XBankForm.css';
import { useState } from 'react';
export default function MyForm() {
  const [applicant, setApplicant] = useState({ firstname: "", lastname: "", state: "", country: "US", ssn: "", dob: "", });

  function handleChange(e) {
    const { name, value } = e.target;
    setApplicant({ ...applicant, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(applicant, null, 2));
  }

  return (
     <form onSubmit={handleSubmit} className="xbank-form">
      <fieldset><legend>Applicant Name</legend>
      <label>First Name:
         <input name="firstname" value={applicant.firstname} onChange={handleChange} />
      </label>
      <label>Last Name:
         <input name="lastname" value={applicant.lastname} onChange={handleChange} />
      </label>
      </fieldset>
      <fieldset>
      <legend>Applicant Address</legend>  
      <label>Address Line 1:
         <input name="addressline1" value={applicant.addressline1} onChange={handleChange} />
      </label>
      <label>Address Line 2:
         <input name="addressline2" value={applicant.addressline2} onChange={handleChange} />
      </label>
      <label>City:
         <input name="city" value={applicant.city} onChange={handleChange} />
      </label>
      <label>State:
        <select name="state" value={applicant.state} onChange={handleChange} required>
        <option value="">Select a state</option>
        {US_STATES.map((s) => (
        <option key={s.code} value={s.code}>{s.name}</option>
         ))}
  </select>
      </label>
      <label>Zip Code:
         <input name="zipcode" value={applicant.zipcode} onChange={handleChange} />
      </label>
        <label>Country:
         <input name="country" value={applicant.country} readOnly />   
         </label>
      </fieldset>
      <fieldset>
      <legend>Contact & Identity</legend>  
      <label>Social Security Number:
        <input
        name="ssn"
        type="password"
        value={applicant.ssn}
        onChange={handleChange}
        pattern="\d{9}"
        maxLength={9}
        inputMode="numeric"
        title="9 digits, no dashes"
        autoComplete="off"
        required  
        />
      </label>
      <label>Email Address:
         <input name="emailaddress" value={applicant.emailaddress} onChange={handleChange} />
      </label>
      <label>Primary Phone Number:
         <input name="phonenumber" 
         value={applicant.phonenumber} 
         onChange={handleChange}
         type="tel"
         pattern="[2-9]\d{2}[2-9]\d{6}"
         maxLength={10}
         inputMode="numeric"
         title="10-digit US phone number, e.g. 2015551234"
         required
      />   
      </label>   
      <label>Date of Birth:
      <input
        type="date"
        name="dob"
        value={applicant.dob}
        onChange={handleChange}
        max={new Date().toISOString().split("T")[0]}
        required
      />  
      </label>
      </fieldset>
    <input type="submit" />  
    </form>
  )
}