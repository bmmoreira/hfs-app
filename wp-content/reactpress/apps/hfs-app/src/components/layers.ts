/** @format */

import type { LayerProps } from 'react-map-gl';

export const clusterLayer: LayerProps = {
	id: 'clusters',
	type: 'circle',
	source: 'All',
	filter: ['has', 'point_count'],
	paint: {
		'circle-color': [
			'step',
			['get', 'point_count'],
			'#d1d6d7',
			100,
			'#9fa4a5',
			750,
			'#595c5d',
		],
		'circle-radius': [
			'step',
			['get', 'point_count'],
			20,
			100,
			30,
			750,
			40,
		],
	},
};

export const clusterCountLayer: LayerProps = {
	id: 'cluster-count',
	type: 'symbol',
	source: 'All',
	filter: ['has', 'point_count'],
	layout: {
		'text-field': '{point_count_abbreviated}',
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 12,
	},
};

export const unclusteredPointSymbol: LayerProps = {
	id: 'unclustered-symbol',
	type: 'symbol',
	source: 'vs_All',
	filter: ['!', ['has', 'point_count']],
	layout: {
		'text-field': ['get', 'anomalia'],
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 11,
	},
	paint: {
		'text-color': '#ffffff',
	},
};

export const unclusteredPointLayer: LayerProps = {
	id: 'unclustered-point',
	type: 'circle',
	source: 'vs_All',
	filter: ['!', ['has', 'point_count']],
	paint: {
		'circle-color': [
			'step',
			['get', 'anomalia'],
			'#51bbd6',
			-5,
			'#8f0000',
			-4,
			'#fc0000',
			-3,
			'#f72828',
			-2,
			'#ff9400',
			-1,
			'#fbc500',
			0,
			'#f9f602',
			1,
			'#b5e700',
			2,
			'#57d005',
			3,
			'#02b331',
			4,
			'#018c4e',
			5,
			'#018414',
		],
		'circle-radius': 18,
		'circle-stroke-width': 1,
		'circle-stroke-color': '#fff',
	},
};

export const clusterLayerS3A: LayerProps = {
	id: 'clusters',
	type: 'circle',
	source: 'vs_S3A',
	filter: ['has', 'point_count'],
	paint: {
		'circle-color': [
			'step',
			['get', 'point_count'],
			'#d1d6d7',
			100,
			'#9fa4a5',
			750,
			'#595c5d',
		],
		'circle-radius': [
			'step',
			['get', 'point_count'],
			20,
			100,
			30,
			750,
			40,
		],
	},
};

export const clusterCountLayerS3A: LayerProps = {
	id: 'cluster-count',
	type: 'symbol',
	source: 'vs_S3A',
	filter: ['has', 'point_count'],
	layout: {
		'text-field': '{point_count_abbreviated}',
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 12,
	},
};

export const unclusteredPointSymbolS3A: LayerProps = {
	id: 'unclustered-symbol',
	type: 'symbol',
	source: 'vs_S3A',
	filter: ['!', ['has', 'point_count']],
	layout: {
		'text-field': ['get', 'anomalia'],
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 11,
	},
};

export const unclusteredPointLayerS3A: LayerProps = {
	id: 'unclustered-point',
	type: 'circle',
	source: 'vs_S3A',
	filter: ['!', ['has', 'point_count']],
	paint: {
		'circle-color': [
			'step',
			['get', 'anomalia'],
			'#51bbd6',
			-5,
			'#8f0000',
			-4,
			'#fc0000',
			-3,
			'#f72828',
			-2,
			'#ff9400',
			-1,
			'#fbc500',
			0,
			'#f9f602',
			1,
			'#b5e700',
			2,
			'#57d005',
			3,
			'#02b331',
			4,
			'#018c4e',
			5,
			'#018414',
		],
		'circle-radius': 18,
		'circle-stroke-width': 1,
		'circle-stroke-color': '#fff',
	},
};

export const clusterLayerS3B: LayerProps = {
	id: 'clusters',
	type: 'circle',
	source: 'vs_S3B',
	filter: ['has', 'point_count'],
	paint: {
		'circle-color': [
			'step',
			['get', 'point_count'],
			'#d1d6d7',
			100,
			'#9fa4a5',
			750,
			'#595c5d',
		],
		'circle-radius': [
			'step',
			['get', 'point_count'],
			20,
			100,
			30,
			750,
			40,
		],
	},
};

export const clusterCountLayerS3B: LayerProps = {
	id: 'cluster-count',
	type: 'symbol',
	source: 'vs_S3B',
	filter: ['has', 'point_count'],
	layout: {
		'text-field': '{point_count_abbreviated}',
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 12,
	},
};

export const unclusteredPointSymbolS3B: LayerProps = {
	id: 'unclustered-symbol',
	type: 'symbol',
	source: 'vs_S3B',
	filter: ['!', ['has', 'point_count']],
	layout: {
		'text-field': ['get', 'anomalia'],
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 11,
	},
};

export const unclusteredPointLayerS3B: LayerProps = {
	id: 'unclustered-point',
	type: 'circle',
	source: 'vs_S3B',
	filter: ['!', ['has', 'point_count']],
	paint: {
		'circle-color': [
			'step',
			['get', 'anomalia'],
			'#51bbd6',
			-5,
			'#8f0000',
			-4,
			'#fc0000',
			-3,
			'#f72828',
			-2,
			'#ff9400',
			-1,
			'#fbc500',
			0,
			'#f9f602',
			1,
			'#b5e700',
			2,
			'#57d005',
			3,
			'#02b331',
			4,
			'#018c4e',
			5,
			'#018414',
		],
		'circle-radius': 18,
		'circle-stroke-width': 1,
		'circle-stroke-color': '#fff',
	},
};

export const clusterLayerS6A: LayerProps = {
	id: 'clusters',
	type: 'circle',
	source: 'vs_S3B',
	filter: ['has', 'point_count'],
	paint: {
		'circle-color': [
			'step',
			['get', 'point_count'],
			'#d1d6d7',
			100,
			'#9fa4a5',
			750,
			'#595c5d',
		],
		'circle-radius': [
			'step',
			['get', 'point_count'],
			20,
			100,
			30,
			750,
			40,
		],
	},
};

export const clusterCountLayerS6A: LayerProps = {
	id: 'cluster-count',
	type: 'symbol',
	source: 'vs_S3B',
	filter: ['has', 'point_count'],
	layout: {
		'text-field': '{point_count_abbreviated}',
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 12,
	},
};

export const unclusteredPointSymbolS6A: LayerProps = {
	id: 'unclustered-symbol',
	type: 'symbol',
	source: 'vs_S3B',
	filter: ['!', ['has', 'point_count']],
	layout: {
		'text-field': ['get', 'anomalia'],
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 11,
	},
};

export const unclusteredPointLayerS6A: LayerProps = {
	id: 'unclustered-point',
	type: 'circle',
	source: 'vs_S3B',
	filter: ['!', ['has', 'point_count']],
	paint: {
		'circle-color': [
			'step',
			['get', 'anomalia'],
			'#51bbd6',
			-5,
			'#8f0000',
			-4,
			'#fc0000',
			-3,
			'#f72828',
			-2,
			'#ff9400',
			-1,
			'#fbc500',
			0,
			'#f9f602',
			1,
			'#b5e700',
			2,
			'#57d005',
			3,
			'#02b331',
			4,
			'#018c4e',
			5,
			'#018414',
		],
		'circle-radius': 18,
		'circle-stroke-width': 1,
		'circle-stroke-color': '#fff',
	},
};

export const clusterLayerJ2: LayerProps = {
	id: 'clusters',
	type: 'circle',
	source: 'vs_S3B',
	filter: ['has', 'point_count'],
	paint: {
		'circle-color': [
			'step',
			['get', 'point_count'],
			'#d1d6d7',
			100,
			'#9fa4a5',
			750,
			'#595c5d',
		],
		'circle-radius': [
			'step',
			['get', 'point_count'],
			20,
			100,
			30,
			750,
			40,
		],
	},
};

export const clusterCountLayerJ2: LayerProps = {
	id: 'cluster-count',
	type: 'symbol',
	source: 'vs_S3B',
	filter: ['has', 'point_count'],
	layout: {
		'text-field': '{point_count_abbreviated}',
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 12,
	},
};

export const unclusteredPointSymbolJ2: LayerProps = {
	id: 'unclustered-symbol',
	type: 'symbol',
	source: 'vs_S3B',
	filter: ['!', ['has', 'point_count']],
	layout: {
		'text-field': ['get', 'anomalia'],
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 11,
	},
};

export const unclusteredPointLayerJ2: LayerProps = {
	id: 'unclustered-point',
	type: 'circle',
	source: 'vs_S3B',
	filter: ['!', ['has', 'point_count']],
	paint: {
		'circle-color': [
			'step',
			['get', 'anomalia'],
			'#51bbd6',
			-5,
			'#8f0000',
			-4,
			'#fc0000',
			-3,
			'#f72828',
			-2,
			'#ff9400',
			-1,
			'#fbc500',
			0,
			'#f9f602',
			1,
			'#b5e700',
			2,
			'#57d005',
			3,
			'#02b331',
			4,
			'#018c4e',
			5,
			'#018414',
		],
		'circle-radius': 18,
		'circle-stroke-width': 1,
		'circle-stroke-color': '#fff',
	},
};

export const clusterLayerJ3: LayerProps = {
	id: 'clusters',
	type: 'circle',
	source: 'vs_S3B',
	filter: ['has', 'point_count'],
	paint: {
		'circle-color': [
			'step',
			['get', 'point_count'],
			'#d1d6d7',
			100,
			'#9fa4a5',
			750,
			'#595c5d',
		],
		'circle-radius': [
			'step',
			['get', 'point_count'],
			20,
			100,
			30,
			750,
			40,
		],
	},
};

export const clusterCountLayerJ3: LayerProps = {
	id: 'cluster-count',
	type: 'symbol',
	source: 'vs_S3B',
	filter: ['has', 'point_count'],
	layout: {
		'text-field': '{point_count_abbreviated}',
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 12,
	},
};

export const unclusteredPointSymbolJ3: LayerProps = {
	id: 'unclustered-symbol',
	type: 'symbol',
	source: 'vs_S3B',
	filter: ['!', ['has', 'point_count']],
	layout: {
		'text-field': ['get', 'anomalia'],
		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		'text-size': 11,
	},
};

export const unclusteredPointLayerJ3: LayerProps = {
	id: 'unclustered-point',
	type: 'circle',
	source: 'vs_S3B',
	filter: ['!', ['has', 'point_count']],
	paint: {
		'circle-color': [
			'step',
			['get', 'anomalia'],
			'#51bbd6',
			-5,
			'#8f0000',
			-4,
			'#fc0000',
			-3,
			'#f72828',
			-2,
			'#ff9400',
			-1,
			'#fbc500',
			0,
			'#f9f602',
			1,
			'#b5e700',
			2,
			'#57d005',
			3,
			'#02b331',
			4,
			'#018c4e',
			5,
			'#018414',
		],
		'circle-radius': 18,
		'circle-stroke-width': 1,
		'circle-stroke-color': '#fff',
	},
};
