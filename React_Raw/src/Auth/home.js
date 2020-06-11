import React from "react";
import { Button,Form,Navbar,Nav,FormControl, NavDropdown, Row, Col} from 'react-bootstrap';
import { } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect} from "react-redux";
import * as BaseAction from "../Actions/BaseAction";
import Carousels from "../Commponets/Common/Carousels";
import Constants from "../constants";
import Navbars from "../Commponets/Common/navBar";
import Footer from "../Commponets/Common/footer";
import BodyCenter from "../Commponets/Common/BodyCenter";
import ProfileEdit from "../Commponets/Common/ProfileEdit"

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            name:localStorage.getItem("name")
        }
    }


    render() {
        return( 
        <div>
            <Navbars
            SiteName={Constants.site_Name}
            Menus = {Constants.nav_Menus}
            DropDown = {Constants.DropMenu}
            UserName = {this.state.name}
            />
            {/* <Carousels/>
            <BodyCenter
            Menu = {Constants.SidNavMenu}
            /> */}
            {/* <Footer/> */}
            <ProfileEdit/>
        </div>

        )
    }
  }

const mapStateToProps = (state) => {
    return {
        Home: state && state.Name ? state.Name  : "",
        ReducerAge: state && state.Age ? state.Age  : "",
        token_data: state && state.token_data ? state.token_data : "",
        userDetails: state && state.userDetails ? state.userDetails : "",

    }
}

const mapDispatchToProps = (dispatch) =>({
    ...bindActionCreators(BaseAction, dispatch)
})

export default connect (mapStateToProps, mapDispatchToProps)(Home)