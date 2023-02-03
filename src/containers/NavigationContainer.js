import { connect } from 'react-redux';
import Navigation from './Navigation';

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    };
};

export const NavigationContainer = connect(mapStateToProps)(Navigation);