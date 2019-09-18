
// @flow

/**
 * utils - esri leaflet
 * @module utils/esri-leaflet
 */


const L = window.L;

/**
 * - arc server layers
 * store layers instances, with service url as map key
 * @const
 */
const Dynamic_Layers = new Map();


/**
 * load arc server dynamic layer
 *
 * @export
 * @param {string} service_url
 * @param {L.map} map
 * @returns
 */
export function load_dynamic_layer (service_url: string, map: L.map) {

	if (!service_url) return null;

	let arc_server_dynamic_layer = Dynamic_Layers.get(service_url);

	/* exist */
	if (arc_server_dynamic_layer) {

		if (map.hasLayer(arc_server_dynamic_layer)) {
			arc_server_dynamic_layer.remove();
		}

		return arc_server_dynamic_layer;
	}

	/* get new layer */
	// request
	arc_server_dynamic_layer = L.esri.dynamicMapLayer({ url: service_url }).on('requesterror', err => {

		if (!err.params.where) {
			alert([err.code, err.message].join('：'));
		}

		return err;
	});

	if (arc_server_dynamic_layer) {
		Dynamic_Layers.set(service_url, arc_server_dynamic_layer);
	}

	return arc_server_dynamic_layer || null;

}


/**
 * remove arc server dynamic layer from map
 *
 * @export
 * @param {string} service_url
 * @param {L.map} map
 */
export function remove_dynamic_layer (service_url: string, map: L.map) {

	if (!service_url) return;

	const arc_server_dynamic_layer = Dynamic_Layers.get(service_url);

	if (arc_server_dynamic_layer) {
		Dynamic_Layers.delete(service_url);
	}

	if (map.hasLayer(arc_server_dynamic_layer)) {
		arc_server_dynamic_layer.remove();
	}

}


/**
 * clear map query result
 */
export function map_query_result_clear () {
	identity_features_layer && identity_features_layer.remove();
	identity_features_layer = null;
}

/**
 * identity feature layer
 */
let identity_features_layer = null;

/**
 * identity features handle
 *
 * @export
 * @param {*} e
 * @param {string} service_url
 * @param {L.map} map
 * @param {Function} [cb]
 * @param {*} [options]
 */
export function handle_dynamic_layer_identity (e: any, service_url: string, map: L.map, cb?: Function, options?: any) {
	console.log(e, Dynamic_Layers);
	const arc_server_dynamic_layer = Dynamic_Layers.get(service_url);

	if (!arc_server_dynamic_layer || !map.hasLayer(arc_server_dynamic_layer)) {
		cb && ((typeof cb) === 'function') && cb(true);
		return;
	}

	// clear old result
	map_query_result_clear();

	/* start handle */
	// options
	options = options || ((typeof cb) !== 'function' && cb) || {};
	options = {
		layers: 'all',
		...options
	};

	// identity
	arc_server_dynamic_layer.identify().layers(options.layers).on(map).at(e.latlng).run((error, featureCollection/* , response */) => {

		if (error) {
			cb && ((typeof cb) === 'function') && cb(error);
			return alert(error.message);
		}

		// make sure at least one feature was identified.
		if (featureCollection.features.length) {

			identity_features_layer = L.geoJSON(featureCollection, {
				style: () => ({
					color: 'rgba(244, 67, 54, .75)',
					weight: 5,
					/* fillColor: 'rgba(202, 202, 202, 1)',
					fillOpacity: 0 */
				})
			}).on('add', e => {
				map.fitBounds(e.target.getBounds());

				cb && ((typeof cb) === 'function') && cb(null, e.target, featureCollection);
			}).addTo(map);

		} else {
			// eslint-disable-next-line
			console.log('No features identified.');
		}

	});

}
