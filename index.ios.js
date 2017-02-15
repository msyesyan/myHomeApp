import React, { Component } from 'react';
import {
  AppRegistry,
  Platform
} from 'react-native';
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
const Realm = require('realm');
const realm = new Realm({
  schema: [
    {
      name: 'Location',
      properties: {
        name: 'string'
      }
    }
  ]
});

export class LocationGrid extends Component {
  constructor(props) {
    super(props);
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
      locations: realm.objects('Location')
    }
  }

  addLocation() {
    const self = this;
    realm.write(() => {
      realm.create('Location', {name: 'Location'});
      self.setState({locations: realm.objects('Location')});
    })
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
