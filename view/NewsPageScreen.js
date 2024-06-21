import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { WebView } from 'react-native-webview';

export default class NewsPageScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loading: false,
      link: ""
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    let link = this.props.navigation.getParam('link')
    if (link !== "") {
      this.setState({
        link: link, loading: false
      })
    }
  }
  
  render() {
    return (
      this.state.link === "" ? 
      <View>
        <ActivityIndicator/>
      </View>
      :
      <WebView
        source={{uri: this.state.link}}
        style={{marginTop: 20}}
      />
    )
  }
}
