import { useEffect, useState } from 'react';
import '../App.css'
import Loader from './loader'


const AgentDetails = (props) => {
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])


    return (
        <>
            <div class="container">
                <div>
                    {isLoading ? <Loader /> : <div>Your content here</div>}
                </div>

                <div class="row">
                    {props.data?.map((menu, index) => (
                        <div class="col-md-4" style={{ padding: "15px" }}>
                            <div class="card">
                                <img class="card-img-top img-fluid" src="https://images.unsplash.com/photo-1537203271513-17c9f9dd3274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MzA2Njc0Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                                    style={{ height: "200px", width: "160px", margin: "auto", borderRadius: "50%", marginTop: "20px" }} alt="Card image cap" />
                                <div class="card-block">
                                    <h4 class="card-title">{menu.name}</h4>
                                    <p class="card-text">{menu.email}</p>
                                    <p class="card-text">{menu.city}</p>
                                    <p class="card-text">{menu.mobile}</p>
                                    <a href="#" class="btn btn-primary">About</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default AgentDetails;