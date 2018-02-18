import React from 'react';
import {Dropdown, Button, Menu, Icon, message} from 'antd';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';

class CountrySearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = { country: '', region: '' };
  }

  selectCountry (val) {
    this.setState({ country: val });
  }

  selectRegion (val) {
    this.setState({ region: val });
  }

  render () {
    const { country, region } = this.state;
    return (

      <div>
        <CountryDropdown
          value={country}
          onChange={(val) => this.selectCountry(val)} />
        <RegionDropdown
          country={country}
          value={region}
          onChange={(val) => this.selectRegion(val)} />
      </div>

    );
  }
}

export const Explore = () => (
<div>
    <div>Explore</div>

    <CountrySearch />


</div>
);
