import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends React.Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  }
  render() {
    let {navList} = this.props
    navList = navList.filter(nav=> !nav.hide)
    const path = this.props.location.pathname
    return (
      <div>
        <TabBar>
          {
            navList.map((nav)=> (
              <Item 
                key={nav.path}
                title={nav.text}
                icon={{uri: require(`./images/${nav.icon}.png`)}}
                selectedIcon={{uri: require(`./images/${nav.icon}-focus.png`)}}
                selected={path===nav.path}
                onPress={()=> this.props.history.replace(nav.path)}
              >
              </Item>  
            ))
          }
        </TabBar>
      </div>
    )
  }
}


export default withRouter(NavFooter)