import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  ListView,
  NativeEventEmitter
} from 'react-native';
import iCloudStorage from 'react-native-icloudstore';
import { AsyncStorage, NativeModules, Platform } from 'react-native'

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
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dataSource = ds.cloneWithRows(this.props.dataSource || []);

    return (
      <ListView
        contentContainerStyle={styles.locationGrid}
        dataSource={this.dataSource}
        renderRow={(rowData) => <Location style={styles.locationGrid} name={rowData.name}></Location>}
      />
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addLocation = this.addLocation.bind(this);
    this.state = {
      locations: this.locations || []
    }
  }

  componentWillMount() {
    this.fetchLoactions();
    this.eventEmitter = new NativeEventEmitter(iCloudStorage);
    this.eventEmitter.addListener('iCloudStoreDidChangeRemotely', this.fetchLoactions);
  }

  componentWillUnmount() {
    this.eventEmitter.remove();
  }

  fetchLoactions() {
    iCloudStorage.getItem('@MyHome:Locations').then(locations => {
      this.setState({
        icloudData: locations,
        locations: []
      });
    });
  }

  addLocation() {
    this.state.locations.push({name: 'new Location'});
    this.setState({ locations: this.state.locations });
    iCloudStorage.setItem('@MyHome:Locations', JSON.stringify(this.state.locations));
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Button
          onPress={this.addLocation}
          title="+ Location" />
        <Text>{this.state.icloudData}</Text>
        <LocationGrid dataSource={this.state.locations}></LocationGrid>
      </View>
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
