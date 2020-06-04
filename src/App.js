import React from 'react';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
import UsersContainer from "./component/Users/UsersContainer";
import HeaderContainer from "./component/Header/HeaderContainer";
import Login from "./component/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./Redux/app-reducer";
import Preloader from "./component/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./component/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./component/Profile/ProfileContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={withSuspense(DialogsContainer)}/>

                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)}/>

                    <Route path='/users'
                           render={() => <UsersContainer/>}/>

                    <Route path='/login'
                           render={() => <Login/>}/>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);