import React, { Component } from 'react';

class Info extends Component {
    render() { 
        const { curCity } = this.props;
        return ( 
            <div className = 'right block'>
                <form onSubmit = {this.props.handleSubmit}>
                    <input type = 'text' placeholder = 'Kiev' value = {this.props.city} name = 'city' onChange = {this.props.handleChange} />
                    <input type = 'text' placeholder = 'ua' value = {this.props.country} name = 'country' onChange = {this.props.handleChange} />
                    <button type = 'submit'>Поиск</button>
                </form>
            {!this.props.errMsg 
                ? 
                this.props.data[this.props.curCity] && 
                    <div className = 'weather-info'>
                        {<p>Город: {this.props.data[curCity].name}, {this.props.data[curCity].sys.country}</p>}
                        {<p>Температура: {Math.floor(this.props.data[curCity].main.temp - 273.15)} ℃</p>}
                        {<p>Влажность: {this.props.data[curCity].main.humidity } %</p>}
                        {<p>Давление: {this.props.data[curCity].main.humidity } мм</p>}
                    </div>
                :
                <h1>{this.props.errMsg}</h1>
            }
            </div>
         );
    }
}
 
export default Info;