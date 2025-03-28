
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.0.0'
 * Timestamp: Fri Mar 14 2025 10:15:57 GMT+0400 (Gulf Standard Time)
 *
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Partneritem extends ContentItem {
    public name!: Elements.TextElement;
    public image!: Elements.AssetsElement;
    public content!: Elements.RichTextElement;
    public link!: Elements.TextElement;
    public type!: Elements.TextElement;
    public metadataPagetitle!: Elements.TextElement;
    public metadataMetatitle!: Elements.TextElement;
    public metadataMetadescription!: Elements.TextElement;
    constructor() {
        super({
            propertyResolver: ((elementName: string) => {
                if (elementName === 'metadata__pagetitle') {
                    return 'metadataPagetitle';
                }
                if (elementName === 'metadata__metatitle') {
                    return 'metadataMetatitle';
                }
                if (elementName === 'metadata__metadescription') {
                    return 'metadataMetadescription';
                }
                return elementName;
            })
        });
    }
}
