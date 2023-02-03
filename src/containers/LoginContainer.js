import { connect } from 'react-redux';
import Login from './Login';
import { loginAction } from '../redux/redux';

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: (user_id) => dispatch(loginAction(user_id))
    }
}

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
