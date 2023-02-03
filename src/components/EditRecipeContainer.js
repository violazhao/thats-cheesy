import { connect } from 'react-redux';
import EditRecipe from './EditRecipe';

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    };
};

export const EditRecipeContainer = connect(mapStateToProps)(EditRecipe);