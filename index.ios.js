/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

export class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || 'Location'
    }
  }

  render() {
    return (
      <View style={styles.location}>
        <Text style={
          {textAlign: 'center'}
        }>{this.state.name}</Text>
      </View>
    )
  }
}

export class LocationGrid extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          id: '1', name: '主卧'
        }, {
          id: '2', name: '客厅'
        }, {
          id: '3', name: '次卧'
        }, {
          id: '4', name: '餐厅'
        }, {
          id: '5', name: '厨房'
        }, {
          id: '6', name: '阳台'
        }, {
          id: '7', name: '卫生间'
        }
      ])
    }
  }
  render() {
    return (
      <ListView
        contentContainerStyle={styles.locationGrid}
        dataSource={this.state.dataSource}
        renderRow={
          (locationData) => <Location style={styles.location} name={locationData.name}></Location>
        }
      />
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <LocationGrid></LocationGrid>
    );
  }
}

const styles = StyleSheet.create({
  location: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    justifyContent: 'center',
    margin: 5
  },

  locationGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

AppRegistry.registerComponent('myHome', () => App);
