import { connect } from 'react-redux';
import Logout from './Logout';
import { logoutAction } from '../redux/redux';

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogout: () => dispatch(logoutAction())
    }
}

export const LogoutContainer = connect(mapStateToProps, mapDispatchToProps)(Logout);