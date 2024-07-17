import React from 'react';
import Select from 'react-select';
import { propertyTranslations } from '../../utils/propertyTranslations';
import { Equipment } from '../../models/Equipment';

interface PropertySelectorProps {
    selectedProperties: Array<keyof Equipment>;
    onSelect: (selectedOptions: any) => void;
    equipments: Equipment[];
}

const PropertySelector: React.FC<PropertySelectorProps> = ({ selectedProperties, onSelect, equipments }) => {
    const equipmentProperties = Object.keys(equipments[0] || {}) as Array<keyof Equipment>;
    const propertyOptions = equipmentProperties
        .filter(property => property !== 'photo')
        .map((property) => ({
            value: property,
            label: propertyTranslations[property] || property
        }));

    return (
        <div className="property-selector">
            <label htmlFor="property-select">Filter Properties: </label>
            <Select
                id="property-select"
                isMulti
                options={propertyOptions}
                value={propertyOptions.filter(option => selectedProperties.includes(option.value))}
                onChange={onSelect}
            />
        </div>
    );
};

export default PropertySelector;
