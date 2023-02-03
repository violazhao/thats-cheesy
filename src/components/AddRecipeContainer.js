import { connect } from 'react-redux';
import AddRecipe from './AddRecipe';

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    };
};

export const AddRecipeContainer = connect(mapStateToProps)(AddRecipe);