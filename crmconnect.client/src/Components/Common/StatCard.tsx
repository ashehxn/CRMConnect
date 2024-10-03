import PropTypes from 'prop-types';

const StatCard = ({ title, value, icon }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 h-40">
            <div className="text-blue-500 text-4xl">
                {icon}
            </div>
            <div>
                <h2 className="text-gray-600">{title}</h2>
                <p className="text-3xl font-bold">{value}</p>
            </div>
        </div>
    );
};

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired
};

export default StatCard;
