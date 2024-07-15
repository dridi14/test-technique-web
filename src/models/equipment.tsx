
/** Equipment model definition **/
export interface Equipment {
    name: string;
    building: string;
    domain: string;
    niveau: string;
    local: string;
    photo: string;
    brand: string;
    model: string;
    serialNumber: string;
    quantity: number;
    status: string;
    notes: string;
    equipmentKey?: string;
    nbFaults: number;
}
  
/** Checkpoint model definition **/
export interface Checkpoint {
    equipmentKey: string;
    name: string;
    fault?: string;
    recommendation?: string;
}
  