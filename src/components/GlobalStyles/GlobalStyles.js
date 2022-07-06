import './GlobalStyles.scss';
import PropTypes from 'prop-types';

function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.poropTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
