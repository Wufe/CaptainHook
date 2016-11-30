/// <reference path="../../../typings/index.d.ts" />

declare module "react-particles-js"{

	import {Component} from 'react';

	interface ParticlesProps{
		width: string;
		height: string;
		params: any;
		style: any;
	}

	class Particles extends Component<ParticlesProps, any>{}

	export {
		Particles,
		ParticlesProps
	};
	export default Particles;
}