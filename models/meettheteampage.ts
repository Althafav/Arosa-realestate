
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.0.0'
 * Timestamp: Sat May 17 2025 18:56:31 GMT+0400 (Gulf Standard Time)
 *
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Meettheteampage extends ContentItem {
    public bannerheading!: Elements.TextElement;
    public bannerdescription!: Elements.RichTextElement;
    public managementteamitems!: Elements.LinkedItemsElement<ContentItem>;
    public salesteamitems!: Elements.LinkedItemsElement<ContentItem>;
    public operationalteamitems!: Elements.LinkedItemsElement<ContentItem>;
    public metadataPagetitle!: Elements.TextElement;
    public metadataMetatitle!: Elements.TextElement;
    public metadataMetadescription!: Elements.TextElement;
    public metadataKeywords!: Elements.TextElement;
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
                if (elementName === 'metadata__keywords') {
                    return 'metadataKeywords';
                }
                return elementName;
            })
        });
    }
}
