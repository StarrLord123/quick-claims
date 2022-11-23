const NewClaim = () => {
    return (
    <div>
        <div class="container">
            <div class="text-center">
                <h1>Register new claim</h1>
            </div>
            
            <div class="container form">
                <form action="somepage.html" method="post">

                    <label for="policyNumber" >Policy Number *</label>
                    <input type="text" name="policyNumber" id="policyNumber" placeholder="policy number" required/>

                    <label for="title">Title *</label>
                    <select id="title" name="title" required>
                        <option value="" disabled selected>-- select --</option>
                        <option value="mr">Mr</option>
                        <option value="ms">Ms</option>
                        <option value="mx">Mx</option>
                    </select>
                    
                    
                    <label for="firstName" >First name *</label>
                    <input type="text" name="firstName" id="firstName" placeholder="first name" required/>
                    
                    
                    <label for="surname" >Surname *</label>
                    <input type="text" name="surname" id="surname" placeholder="surname" required/>

                    <label for="email" >Email *</label>
                    <input type="text" name="email" id="email" placeholder="email" required/>

                    <label for="phoneNum" >Phone Number *</label>
                    <input type="text" name="phoneNum" id="phoneNum" placeholder="phone number" required/>

                    <button class="button text-center">Submit</button>
                </form>
            </div>  
        </div>
    </div>);
}

export default NewClaim;