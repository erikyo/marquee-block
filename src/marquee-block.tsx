import { registerBlockType } from '@wordpress/blocks';
import { next } from '@wordpress/icons';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __experimentalGetCoreBlocks as getCoreBlocks } from '@wordpress/block-library';
import {BlockEdit, InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {PanelBody, RangeControl} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// The block namespace
const NAMESPACE = 'wp-blocks/marquee';

// Get the core/paragraph block
const ParagraphBlock = getCoreBlocks().find(
	(module) => module.name === 'core/paragraph'
);
const { metadata, settings } = ParagraphBlock;

/**
 * Provides the options panel for the marquee block.
 *
 * @param {Object} props The block props.
 * @constructor
 */
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
					title={ __( 'Marquee Paragraph Animation Controls' ) }
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
	title: __('Marquee'),
	icon: next,
	attributes: {
		...metadata.attributes,
		speed: {
			type: 'number',
			default: 200,
		}
	},
	edit: createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			return <>
				<BlockEdit {...props} />
				<Inspector {...props} />
			</>;
		};
	}, 'withInspectorControl')(settings.edit),
});
