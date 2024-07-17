import { Equipment } from "../models/Equipment";

export const propertyTranslations: { [key in keyof Equipment]: string } = {
    name: 'Nom',
    building: 'Bâtiment',
    domain: 'Domaine',
    niveau: 'Niveau',
    local: 'Local',
    photo: 'Photo',
    brand: 'Marque',
    model: 'Modèle',
    serialNumber: 'Numéro de série',
    quantity: 'Quantité',
    status: 'Statut',
    notes: 'Remarques',
    nbFaults: 'Nombre de fautes',
};
