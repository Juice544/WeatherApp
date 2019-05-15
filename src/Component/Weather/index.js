import React, { Component } from 'react';
import { getWeather, newWeather } from '../../action/action';
import { connect } from 'react-redux';
import './index.css';

const API_KEY = '291a14dfaf03274b82e10696fcd39d78';


class Weather extends Component {
    constructor (props) {
        super(props);
        this.state = {
            city:    '',
            country: '',
            watchCities: [],
            curCity: 0,
            errMsg: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        this.getWeather();
    };

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    selectCity (id) {
        this.setState({
            curCity: id,
            errMsg:  ''
        })
    }

    handleSubmit (e) {
        e.preventDefault();
        let val = 0;
        this.state.watchCities.forEach(item => {
            if(item.city.toLowerCase() === this.state.city.toLowerCase()) {
                val ++;
            }
        })
        if (val === 0) {
            this.getNewWeather(this.state.city, this.state.country).then(actData => {
                    if(actData.data.cod === 200) {
                        this.setState({
                            watchCities: this.state.watchCities.concat([{
                                city:    actData.data.name,
                                country: actData.data.sys.country
                            }]),
                            curCity: this.state.watchCities.length,
                            errMsg: '',
                            city: '',
                            country: ''
                        })
                    }
                }
            )
            .catch(() => {
                this.setState({
                    errMsg: 'Город не найден или что-то пошло не так. Попробуйте ввести город еще раз.',
                    city: '',
                    country: ''
                })
            })
        }
    }

    getNewWeather(city, country) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
            .then(data => data.json())
            .then(data => {
                if (data.cod === 200) {
                   return this.props.newWeather(data);
                }
            });
    }

    getWeather() {
        return  fetch('http://api.sypexgeo.net/json/')
                    .then(res => res.json())
                    .then(data => {
                        return {
                            city: data.city.name_en === 'Zaporizhia' ? 'Zaporizhzhya' : data.city.name_en,
                            country: data.country.iso.toLowerCase()
                        }
                    })
                    .then(weather => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weather.city},${weather.country}&appid=${API_KEY}`))
                    .then(data => data.json())
                    .then(getData => {
                        this.setState({
                            watchCities: this.state.watchCities.concat([{
                                city: getData.name,
                                country: getData.sys.country
                            }])
                        })
                       return this.props.getWeather(getData)
                    });
    }
    render() { 
        return ( 
            <div className = 'wrapper'>
                <div className = 'application'>
                    <div className = 'left block'>
                        <h2>Недавно просмотренные города</h2>
                        <div className = 'cities'>
                            <ul>
                                {(this.state.watchCities.length > 0) && this.state.watchCities.map((item, i) => {
                                      return  <li key = {i} name = {i} onClick = {() => this.selectCity(i)}>{item.city}, {item.country}</li>
                                    }
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className = 'right block'>
                        <form onSubmit = {this.handleSubmit}>
                            <input type = 'text' placeholder = 'Kiev' value = {this.state.city} name = 'city' onChange = {this.handleChange} />
                            <input type = 'text' placeholder = 'ua' value = {this.state.country} name = 'country' onChange = {this.handleChange} />
                            <button type = 'submit'>Поиск</button>
                        </form>
                    {!this.state.errMsg 
                        ? 
                        this.props.data[this.state.curCity] && 
                            <div className = 'weather-info'>
                                {<p>Город: {this.props.data[this.state.curCity].name}, {this.props.data[this.state.curCity].sys.country}</p>}
                                {<p>Температура: {Math.floor(this.props.data[this.state.curCity].main.temp - 273.15)} ℃</p>}
                                {<p>Влажность: {this.props.data[this.state.curCity].main.humidity } %</p>}
                                {<p>Давление: {this.props.data[this.state.curCity].main.humidity } мм</p>}
                            </div>
                        :
                        <h1>{this.state.errMsg}</h1>
                    }
                    </div>
                </div>
            </div>
         );
    }
}

function mapStateToProps(state) {
    return {
      data: state
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getWeather: data => dispatch(getWeather(data)),
      newWeather: data => dispatch(newWeather(data))
    };
  }
 
export default connect(mapStateToProps, mapDispatchToProps)(Weather);