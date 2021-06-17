import React, { Component } from 'react'
import Input from './Input';

const API_key = "ff772dc6f3ad2aeb86c3ad88dc7d0f1e"


export class weather extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city: null,
            country: null,
            icon: null,
            main: null,
            celcius: null,
            temp_max: null,
            temp_min: null,
            description: "",
            icon: undefined,
            error: false,
        }

        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-day-fog",
        };

    }
    get_weatherIcon(icons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                this.setState({ icon: icons.Thunderstorm });
                break;
            case rangeId >= 300 && rangeId <= 321:
                this.setState({ icon: icons.Drizzle });
                break;
            case rangeId >= 500 && rangeId <= 521:
                this.setState({ icon: icons.Rain });
                break;
            case rangeId >= 600 && rangeId <= 781:
                this.setState({ icon: icons.Snow });
                break;
            case rangeId >= 701 && rangeId <= 232:
                this.setState({ icon: icons.Atmosphere });
                break;
            case rangeId === 800:
                this.setState({ icon: icons.Clear });
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({ icon: icons.Clouds });
                break;
            default:
                this.setState({ icon: icons.Clouds })
        }
    }

    fetchApi = async (e) => {
        e.preventDefault()
        const city = e.target.elements.city.value
        const country = e.target.elements.country.value
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`

        if (city && country) {
            const api_call = await fetch(url)
            const response = await api_call.json()
            console.log(response)

            this.setState({
                city: `${response.name},${response.sys.country}`,
                // city: response.name,
                // country: response.sys.country,
                celcius: Math.floor(response.main.temp - 273.15),
                temp_max: Math.floor(response.main.temp_max - 273.15),
                temp_min: Math.floor(response.main.temp_min - 273.15),
                description: response.weather[0].description,
                // icon:this.weatherIcon.Thunderstorm,
                error: false
            })
            this.get_weatherIcon(this.weatherIcon,response.weather[0].id);
        }
        else {
            this.setState({ error: true })
        }
    }


    render() {

        return (
            <div className="container text-light">
                <Input submitEvent={this.fetchApi} error={this.state.error} />
                <div className="sub-container pt-4">
                    <h1>{this.state.city}</h1>
                    {/* <h5 className="py-4"><i className="wi wi-day-sunny display-1"></i></h5> */}
                    <h5 className="py-4"><i className={`wi ${this.state.icon} display-1`}></i></h5>

                    {
                        this.state.celcius ? <h1 className="py-5">{this.state.celcius}&deg;C</h1> : null
                    }
                    {
                        (this.state.temp_min && this.state.temp_max) ?
                            <h5>
                                <span className="px-5">Min:{this.state.temp_min}&deg;C</span>
                                <span className="px-5">Max:{this.state.temp_max}&deg;C</span>
                            </h5>
                            : null

                    }

                    <h4 className="py-4">{this.state.description}</h4>
                </div>
            </div>
        )
    }
}

export default weather






















// import React, { useEffect, useState } from 'react'

// const API_key = "ff772dc6f3ad2aeb86c3ad88dc7d0f1e"

// function minmaxTemp(min,max){
//     return(
//         <h3>
//             <span>{min}&deg; </span>
//             <span>{max}&deg;</span>
//         </h3>
//     )
// }

// const Weather = () => {
//     const[city,setCity] = useState('Mumbai')


//     useEffect(() => {
//         const fetchApi = async() => {
//             const url = `http://api.openweathermap.org/data/2.5/weather?q=Mumbai,IN&appid=${API_key}`
//             const api_call = await fetch(url)
//             const response = await api_call.json()
//             console.log(response)
//             // setCity(response)
//             setCity({
//                 city:response.main,
//                 //country:response.sys.country
//             })

//         }
//         fetchApi()
//     },[])
//     return (
//         <div className="container">
//             <div className="sub-container">
//                 <h1>London</h1>

//                 <h5 className="icons">
//                     <i class="wi wi-day-sunny"></i>
//                 </h5>
//                 <h1>25&deg;</h1>
//                 {minmaxTemp(10,25)}

//                 <h4>slow rain</h4>
//                 {
//                     !city ? (
//                         <p>No data found</p>
//                     ) : (
//                         <div>


//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     )
// }

// export default Weather
