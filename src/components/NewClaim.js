import React from "react";
import "../App.css";

const NewClaim = () => {
    return (
    <div>
        <div className="container">
            <div className="text-center">
                <h1>Register new claim</h1>
            </div>
            
            <div className="container form">
                <form action="somepage.html" method="post">

                    <label htmlFor="policyNumber" >Policy Number *</label>
                    <input type="text" name="policyNumber" id="policyNumber" placeholder="policy number" required/>

                    <label htmlFor="title">Title *</label>
                    <select id="title" name="title" required>
                    <option value="" disabled={true}> ---select---</option>
                        <option value="mr">Mr</option>
                        <option value="ms">Ms</option>
                        <option value="mx">Mx</option>
                    </select>
                    
                    
                    <label htmlFor="firstName" >First name *</label>
                    <input type="text" name="firstName" id="firstName" placeholder="first name" required/>
                    
                    
                    <label htmlFor="surname" >Surname *</label>
                    <input type="text" name="surname" id="surname" placeholder="surname" required/>

                    <label htmlFor="email" >Email *</label>
                    <input type="text" name="email" id="email" placeholder="email" required/>

                    <label htmlFor="phoneNum" >Phone Number *</label>
                    <input type="text" name="phoneNum" id="phoneNum" placeholder="phone number" required/>

                    <button className="button text-center">Submit</button>
                </form>
            </div>  
        </div>
    </div>);
}

export default NewClaim;