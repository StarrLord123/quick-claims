import React from 'react';
import LogoOnly from './Images/LogoOnly.png'

const Welcome = () => {
    return (
        <div className="container">
            <div className="row text-center g-4">
                <div className="col-md">
                    <div className="card bg-dark text-light text-center">
                        <div className="card-body">
                            <h3 className="card-title mb-3">Welcome to <b>SpeedyClaims</b></h3>
                            <p className="card-text">
                                We focus on simplifying the claim process, with a platform that works for
                                you.
                            </p>
                            <p className="card-text">
                                SpeedyClaims is a platform where you can add claims, view claims by status, and search
                                for specific claims. You can also view claim details and edit.
                            </p>
                            <p className="card-text">
                                Please log in to access the platform.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md">
                    <div className="card bg-dark text-light text-center">
                        <div className="container-body img-fluid">
                            <img className="menuImage" src={LogoOnly} asp-append-version="true" alt="Logo Only"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Welcome;