import React, { Component } from 'react';
import Weather from './Weather';

const API_KEY = "c5bb57c6f9c64033bca6a1190b47e679";



class Form extends Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    getWeather = async (e) => {
        e.preventDefault();

        const city = e.target.elements.city.value; //etenv
        const country = e.target.elements.country.value;



        if (city && country) {

            const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&mode=json&appid=${
                API_KEY}&units=metric`);
            const data = await request.json();

            if (data.cod!=="404") {
                console.log(data);

                this.setState({

                    temperature: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    error: ""
                });
            }
            else{
                console.log("ERROR");
                this.setState({
                    error:"Error in handling your request.."
                });
            }


        }
        else {
            this.setState({
                error: "All fields are required"
            });
        }

    }

    render() {
        return (
            <div>
                <form onSubmit={this.getWeather}>
                    <input type="text" name="city" placeholder="Enter city Name..." />
                    <input type="text" name="country" placeholder="Enter country name..." />
                    <button>Get Weather</button>

                </form>
                <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}


                />
            </div>
        );
    }
};

export default Form;