import React, { Component } from 'react';
import {
  AppRegistry,
  NativeEventEmitter
} from 'react-native';
import iCloudStorage from 'react-native-icloudstore';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Title,
  Icon,
  Footer,
  FooterTab,
  Content,
  List,
  ListItem,
  Text
} from 'native-base';

export class LocationGrid extends Component {
  constructor(props) {
    super(props);
    console.log('dataSource', this.props.dataSource)
  }

  render() {
    return (
      <List
        dataArray={this.props.dataSource}
        renderRow={
          item => <ListItem><Text>{item.name}</Text></ListItem>
        }
      ></List>
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
    iCloudStorage.getItem('@MyHome:Locations').then((locations = '[]') => {
      console.log('iCloudStorage, locations, ', locations);
      this.setState({
        locations: JSON.parse(locations)
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
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Locations</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.addLocation}>
              <Icon name='ios-add' />
            </Button>
          </Right>
        </Header>

        <Content>
          <LocationGrid dataSource={this.state.locations}></LocationGrid>
        </Content>

        <Footer>
            <FooterTab>
                <Button transparent>
                    <Icon name='ios-call' />
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}

AppRegistry.registerComponent('myHome', () => App);
