import { connect } from 'react-redux';
import SignUp from './SignUp';

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    };
};

export const SignUpContainer = connect(mapStateToProps)(SignUp);