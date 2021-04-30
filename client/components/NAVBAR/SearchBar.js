import React from 'react';
import {connect} from 'react-redux';

// onclick()
const searchBar = ()=>{
    return(

        <div className="search-container">
            {/* <i className="fa fa-search searchIcon"></i> */}
            <input className="searchBox" type="search" name="search" placeholder="Search by category"/>
            <button type ="submit" value="search" className="searchButton" onClick={()=> console.log('Clicked the searchbox')}>enter</button>
        </div>
    );
}


export default connect(state => state)(searchBar);
