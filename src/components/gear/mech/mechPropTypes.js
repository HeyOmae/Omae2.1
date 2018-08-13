import PropTypes from 'prop-types';

export const mechType = PropTypes.shape({
	name: PropTypes.string.isRequired,
	page: PropTypes.string.isRequired,
	source: PropTypes.string.isRequired,
	accel: PropTypes.string.isRequired,
	armor: PropTypes.string.isRequired,
	avail: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	cost: PropTypes.string.isRequired,
	handling: PropTypes.string.isRequired,
	pilot: PropTypes.string.isRequired,
	sensor: PropTypes.string.isRequired,
	speed: PropTypes.string.isRequired,
	mods: PropTypes.object,
});

export const mechModType = PropTypes.shape({
	name: PropTypes.string.isRequired,
	rating: PropTypes.string.isRequired,
	slot: PropTypes.string,
	avail: PropTypes.string.isRequired,
	cost: PropTypes.string.isRequired,
	source: PropTypes.string.isRequired,
	page: PropTypes.string.isRequired,
});

export default {
	mechType,
	mechModType,
};
