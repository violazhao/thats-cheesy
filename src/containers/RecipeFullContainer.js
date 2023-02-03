import { connect } from 'react-redux';
import RecipeFull from './RecipeFull';

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    };
};

export const RecipeFullContainer = connect(mapStateToProps)(RecipeFull);