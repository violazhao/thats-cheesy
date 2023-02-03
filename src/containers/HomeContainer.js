import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    };
};

export const HomeContainer = connect(mapStateToProps)(Home);