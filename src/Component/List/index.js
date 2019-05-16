import React, { Component } from 'react';
//import '../Weather/index.css';

class List extends Component {
    state = {  }
    render() { 
        return ( 
            <div className = 'left block'>
                <h2>Недавно просмотренные города</h2>
                <div className = 'cities'>
                    <ul>
                        {(this.props.watchCities.length > 0) && this.props.watchCities.map((item, i) => {
                                return  <li key = {i} name = {i} onClick = {() => this.props.selectCity(i)}>{item.city}, {item.country}</li>
                            }
                        )}
                    </ul>
                </div>
            </div>
         );
    }
}
 
export default List;