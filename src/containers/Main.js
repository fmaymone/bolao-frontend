import React, { Component } from 'react'
import MyList from '../components/MyList'
import Item from '../components/Item'
import { connect } from 'react-redux'

class Main extends React.Component {
  render() {
    const items = this.props.items.map((item, key) => (<Item key={key} object={item}/>))

    return (
      <MyList items={[{}, {}, {}]} />
    )
  }
}
const mapStateToProps = state => {
    return {
      data: state.data
    }
  }
export default connect(mapStateToProps,{} )(Main)