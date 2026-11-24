import US_STATES from '../data/states';
import './XBankForm.css';
import { useState } from 'react';

function MyForm() {
  const [applicant, setApplicant] = useState({ name_first: "", name_last: "", address_line_1: "", address_line_2: "", address_city: "", address_state: "", address_postal_code: "", address_country_code: "US", document_ssn: "", email_address: "", phone_number: "", birth_date: "", });
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicant),
    };

    const response = await fetch('https://sandbox.alloy.co/v1/evaluations/', requestOptions);
    const data = await response.json();
    setResponseData(data);
  };

  return (
    <form onSubmit={handleSubmit}>
     <fieldset><legend>Applicant Name</legend>
      <label>First Name:
         <input name="name_first" value={applicant.name_first} onChange={handleInputChange} />
      </label>
      <label>Last Name:
         <input name="name_last" value={applicant.name_last} onChange={handleInputChange} />
      </label>
      </fieldset>
      <fieldset>
      <legend>Applicant Address</legend>  
      <label>Address Line 1:
         <input name="address_line_1" value={applicant.address_line_1} onChange={handleInputChange} required />
      </label>
      <label>Address Line 2:
         <input name="address_line_2" value={applicant.address_line_2} onChange={handleInputChange} />
      </label>
      <label>City:
         <input name="address_city" value={applicant.address_city} onChange={handleInputChange} />
      </label>
      <label>State:
        <select name="address_state" value={applicant.address_state} onChange={handleInputChange} required>
        <option value="">Select a state</option>
        {US_STATES.map((s) => (
        <option key={s.code} value={s.code}>{s.name}</option>
         ))}
  </select>
      </label>
      <label>Zip Code:
         <input name="address_postal_code" value={applicant.address_postal_code} onChange={handleInputChange} />
      </label>
        <label>Country:
         <input name="address_country_code" value={applicant.address_country_code} readOnly />   
         </label>
      </fieldset>
      <fieldset>
      <legend>Contact & Identity</legend>  
      <label>Social Security Number:
        <input
        name="document_ssn"
        type="password"
        value={applicant.document_ssn}
        onChange={handleInputChange}
        pattern="\d{9}"
        maxLength={9}
        inputMode="numeric"
        title="9 digits, no dashes"
        autoComplete="off"
        required  
        />
      </label>
      <label>Email Address:
         <input name="email_address" value={applicant.email_address} onChange={handleInputChange} required/>
      </label>
      <label>Primary Phone Number:
         <input name="phone_number" 
         value={applicant.phone_number} 
         onChange={handleInputChange}
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
        name="birth_date"
        value={applicant.birth_date}
        onChange={handleInputChange}
        max="2008-11-21"
        required
      />  
      </label>
      </fieldset>
      <button type="submit">Submit</button>
      {responseData && <div>Response: {JSON.stringify(responseData)}</div>}
    </form>
  );
}

export default MyForm;
