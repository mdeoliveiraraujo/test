export class RequisitionModel{
    constructor(
        public radius: number,
        public coords: {
            lat: number,
            lng: number
        },
        public sound: string
    ){}
}