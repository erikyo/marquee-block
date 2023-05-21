import { registerBlockType } from '@wordpress/blocks';
import { next } from '@wordpress/icons';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockEdit, InspectorControls, useBlockProps} from '@wordpress/block-editor';
import { __experimentalGetCoreBlocks as getCoreBlocks } from '@wordpress/block-library';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './marquee-block-style.scss';

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
registerBlockType(NAMESPACE, {
	...metadata,
	...settings,
	name: NAMESPACE,
	title: __('Marquee'),
	icon: next,
	attributes: {
		...metadata.attributes,
		speed: {
			default: 500,
			type: 'number'
		},
		scrollDirection: {
			default: 'left',
			type: 'string'
		}
	},
	edit: createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const {
				attributes: {
					speed,
					scrollDirection
				},
				setAttributes,
			} = props;

			console.log(props)
			console.log(speed)

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={ __( 'Marquee Paragraph Animation Controls' ) }
							initialOpen={ true }
						>
							<RangeControl
								onChange={ (value ) =>
									setAttributes( {
										speed: value
									} )
								}
								label={ __( 'Animation Speed' ) }
								value={ speed }
								min={ 10 }
								max={ 1000 }
							/>
							<SelectControl
								label={ __( 'scrollDirection' ) }
								value={ scrollDirection }
								options={ [
									{ value: 'left', label: __( 'Left' ) },
									{ value: 'right', label: __( 'Right' ) },
									{ value: 'top', label: __( 'Top' ) },
									{ value: 'bottom', label: __( 'Bottom' ) },
								] }
								onChange={ (value ) =>
									setAttributes( {
										scrollDirection: value
									} )
								}
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		};
	}, 'withInspectorControl')(settings.edit)
});
