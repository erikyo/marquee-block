import { registerBlockType } from '@wordpress/blocks';
import { mediaAndText } from '@wordpress/icons';
import { __experimentalGetCoreBlocks as getCoreBlocks } from '@wordpress/block-library';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockEdit, InspectorControls } from '@wordpress/block-editor';
import {PanelBody, RangeControl} from '@wordpress/components';
import { __ } from '@wordpress/i18n';


const NAMESPACE = 'modul-r/custom-media-text';

const MediaTextBlock = getCoreBlocks().find(
	(module) => module.name === 'core/media-text'
);
const { metadata, settings } = MediaTextBlock;

const Inspector = (props) => {
	const {
		attributes: {
			namespace,
			speed,
		},
		setAttributes,
	} = props;

	// Render the block editor and display the query post loop.
	return (
		<>
			<InspectorControls>
				<PanelBody
					key={ namespace }
					title={ __( 'Animation Controls' ) }
					initialOpen={ true }
				>
					<RangeControl
						onChange={ (value ) =>
							setAttributes( {
								speed: value ,
							} )
						}
						label={ __( 'Animation Speed' ) }
						value={ speed }
						min={ 10 }
						max={ 1000 }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

registerBlockType(NAMESPACE, {
	...metadata,
	...settings,
	name: NAMESPACE,
	title: 'Custom media-text',
	icon: mediaAndText,
	edit: createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			return <>
				<BlockEdit {...props} />
				<Inspector {...props} />
			</>;
		};
	}, 'withInspectorControl')(settings.edit),
});
